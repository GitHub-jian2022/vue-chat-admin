const router = require('koa-router')();
const fs = require('fs');
const path = require('path');
const { sign, verify } = require('../../../utils/TokenUtil')
const { decrypt } = require('../../../utils/Tool')
const auth = require('../../../middleware')
const genTestUserSig = require('../../../sdk/GenUserSig')

router.post('/login', async (ctx) => {
    const { username, password } = ctx.request.body
    console.log('username', username)
    let res = fs.readFileSync(path.join(__dirname, '../../../static/user/user.json'), 'utf8')
    let { data } = JSON.parse(res)
    let userId = ''
    let flag = false
    flag = data.some((item, index) => {
        if (item.username === username && decrypt(item.password) === decrypt(password)) {
            userId = item.userId
            return true
        }
    })
    if (flag) {
        //生成token
        const token = sign(userId)
        ctx.body = {
            code: 200,
            msg: 'success',
            data: token
        }
    } else {
        ctx.body = {
            code: 401,
            msg: '账号或密码不正确'
        }
    }
})

router.post('/getUserInfo', auth, async (ctx) => {
    let { token } = ctx.request.body
    token = verify(token).decoded
    // console.log('token: ', token);
    const { userId } = token
    let res = fs.readFileSync(path.join(__dirname, '../../../static/user/user.json'), 'utf8')
    let { data } = JSON.parse(res)
    let [user] = data.filter(item => item.userId === userId)
    ctx.body = {
        msg: 'success',
        code: 200,
        data: user
    }
})

router.post('/userSig', auth, async (ctx) => {
    const { authorization } = ctx.request.header
    let token = authorization.split(' ').pop()
    token = token.replace(/\"/g, "")
    token = verify(token).decoded
    // console.log('token: ', token);
    const { userId } = token

    //把数据读出来,然后进行修改
    let res = fs.readFileSync(path.join(__dirname, '../../../static/user/user.json'), 'utf8')
    res = JSON.parse(res)
    //获取修改后的用户信息
    let user = {}
    for (let i = 0; i < res.data.length; i++) {
        if (userId == res.data[i].userId) {
            //生成新的userSig
            const { userSig } = genTestUserSig(userId)
            res.data[i].userSig = userSig
            user = res.data[i]
        }
    }
    let str = JSON.stringify(res,null,"\t");
    fs.writeFile(path.join(__dirname, '../../../static/user/user.json'), str, function (err) {
        err && console.error(err);
        console.log('--------------------修改成功');
    })
    ctx.body = {
        msg: 'success',
        code: 200,
        data: user
    }
})

router.get('/users', auth, async (ctx) => {
    let res = fs.readFileSync(path.join(__dirname, '../../../static/user/user.json'), 'utf8')
    let { data } = JSON.parse(res)
    ctx.body = {
        msg: 'success',
        code: 200,
        data
    }
})

module.exports = router.routes()