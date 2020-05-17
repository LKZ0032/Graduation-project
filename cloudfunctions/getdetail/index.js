// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  var str = event.webhtm;
  // var regu= /[a-zA-z]\-[a-zA-z]+/[^"]*/;
  var regu= new RegExp("<li>【.*?</li>","g");
  // var regu=regu.toString();
// 　var res = str.match(/【.*?[^\<]*/g);
  var res = str.match(regu);
  //<li>.*?</li>（返回结果带<li>标签）
  // res.forEach(function(e){  
  //   e.toString().replace(/([^\x00-\xff]+)[^<]+/g,'');
  // });
//   res.forEach(function(item,index,arr){
//     arr[index] = arr[index].toString().replace(/[a-z]/g,'1');;
// })
  // res[0]=res[0].toString().replace(/([^\x00-\xff]+)[^<]+/g,'');
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