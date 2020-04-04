// 云函数入口文件
const cloud = require('wx-server-sdk')

// cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var str = event.webhtm;
  // var regu= /[a-zA-z]\-[a-zA-z]+/[^"]*/;
　var res = str.match(/[a-zA-z]\-[a-zA-z]+\/[a-zA-Z0-9]*[^"]*/);
  return{
    re: res,
  }
  // console.log('yunhanshu'+ event.a);
  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}