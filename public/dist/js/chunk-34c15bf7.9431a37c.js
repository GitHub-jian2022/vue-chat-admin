(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-34c15bf7"],{"0481":function(t,e,a){"use strict";var s=a("307c"),c=a.n(s);c.a},"307c":function(t,e,a){},8578:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page"},[a("van-nav-bar",{attrs:{title:"设置","left-text":"返回","left-arrow":""},on:{"click-left":t.back}}),a("van-cell-group",{staticClass:"mt-10"},[a("van-cell",{attrs:{title:"账号",value:t.userInfo.username}}),a("van-cell",{attrs:{isLink:"",title:"登录密码",value:"******"}})],1),a("div",{staticClass:"logout f16 flex fcc bg-fff fixed w100pc",on:{click:t.logout}},[a("p",{staticClass:"blue"},[t._v("退出登录")])])],1)},c=[],l=(a("47e2"),a("2241")),o=(a("2f62"),{data(){return{userInfo:{}}},methods:{back(){history.back()},async logout(){l["a"].confirm({title:"退出登录"}).then(()=>{this.$store.commit("user/reset"),this.$router.push("/login"),this.tim.logout().then(t=>{console.log("tim退出成功")}).catch(t=>{console.log("退出失败")})}).catch(()=>{})}},created(){this.userInfo=JSON.parse(localStorage.getItem("userInfo"))||{}}}),n=o,i=(a("0481"),a("2877")),r=Object(i["a"])(n,s,c,!1,null,"62a2d732",null);e["default"]=r.exports}}]);
//# sourceMappingURL=chunk-34c15bf7.9431a37c.js.map