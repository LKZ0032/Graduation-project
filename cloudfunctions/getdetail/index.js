// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  var str = event.webhtm;
  // var regu= /[a-zA-z]\-[a-zA-z]+/[^"]*/;
　var res = str.match(/【.*?[^\<]*/g);//<li>.*?</li>（返回结果带<li>标签）
  return{
    re: res,
  }
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}