const router = require('koa-router')();

//路由模块
const user = require('./user')

router.get('/', async (ctx)=>{
   ctx.body={code:0,msg:'成功'}
})

router.use('/user',user)

module.exports = router.routes()