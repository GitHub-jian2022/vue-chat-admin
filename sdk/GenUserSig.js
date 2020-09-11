const TLSSigAPIv2 = require('tls-sig-api-v2');
// var TLSSigAPIv2 = require('./TLSSigAPIv2'); // 源码集成需要使用相对路径

function genTestUserSig(userID) {
  // 腾讯云 SDKAppId
  const SDKAPPID = 1400277699;
  // 计算签名用的加密密钥
  const SECRETKEY = '281d8830bb13fa0923bc5c34cc13690faac214906fd5342782daba5a3e645f3c';
  // 默认时间：7 x 24 x 60 x 60 = 604800 = 7 天
  const EXPIRETIME = 604800;

  var api = new TLSSigAPIv2.Api(SDKAPPID, SECRETKEY);

  var sig = api.genSig(userID, EXPIRETIME);
  console.log(sig);
  return {
    userSig: sig
  };
}

module.exports = genTestUserSig
