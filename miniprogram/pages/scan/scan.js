// pages/scan/scan.js
const db = wx.cloud.database();
import Dialog from '@vant/weapp/dialog/dialog';
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  scan: function (options) {
    wx.getUserInfo({
      success: (res) => {
        wx.scanCode({
          success: (res) => {
            // var openid;
            if (res.scanType == "QR_CODE") {
              console.log(res.result)
              // console.log(arrUserInfo)
              // console.log(arrMedicInfo)
              if (res.result.split("%").length == 2) {
                if(res.result.split("%")[1].split("@").length==4){
                  var arrUserInfo = res.result.split("%")[1].split("@")
                var arrMedicInfo = res.result.split("%")[0].split("*")
                var re = res
                Dialog.confirm({
                    message: '是否将数据导入本机？',
                  })
                  .then(() => {
                    wx.request({
                      url: 'http://bishe.cn/index/adduser/adduser', //服务器获取token的api   
                      method: 'POST',
                      data: {
                        name: arrUserInfo[1],
                        age: arrUserInfo[2],
                        sex: arrUserInfo[0],
                        openid: arrUserInfo[3]
                      },
                      success: function (res) {
                        // console.log(res)
                      }
                    })
                    wx.request({
                      url: 'http://bishe.cn/index/addmdc/addmdc', //服务器获取token的api   
                      method: 'POST',
                      data: {
                       mdcarr: arrMedicInfo
                      },
                      success: function (res) {
                        // console.log(res)
                      }
                    })
                    Toast.success('添加完成');
                  })
                  .catch(() => {
                    // on cancel
                  });

                }else{
                  Toast.fail('无法识别的二维码');
                }
                
                //     if (res.data.length == 0) {
                // if(res.result.split("@")[7])
                // for(var i=0;i<res.result.split("*").length;i++){

                // }
                // console.log(res.result.split("*")[1].length)
              }else{
                Toast.fail('无法识别的二维码');
              }
              // console.log(res)
              // console.log(res.result.split("@"))

            } else {
              console.log('saomiaowanc')
              console.log(res)
              wx.request({
                url: 'https://www.315jiage.cn/search.aspx?where=barcode&keyword=' + res.result,
                success: (res) => {
                  console.log(res)
                  wx.request({
                    url: 'http://bishe.cn/index/getinfofromweb/getinfofromweb', //服务器获取token的api   
                    method: 'POST',
                    data: {
                      webhtm: res.data
                    },
                    success: function (res) {
                      console.log(res)
                      if(res.data[0].length==0){
                        Dialog.alert({
                                message: '没有当前药品信息'
                              })
                      }else{
                        Toast.loading({
                        duration: 1000,
                        loadingType: 'spinner',
                        mask: true,
                        message: '处理中...'
                      });
                      // console.log(res.result);
                      wx.request({
                        url: 'https://www.315jiage.cn/' + res.data[0][0],
                        success: (res) => {
                          wx.request({
                            url: 'http://bishe.cn/index/getdetile/getdetile', //服务器获取token的api   
                            method: 'POST',
                            data: {
                              webhtm: res.data
                            },
                            success: function (res) {
                              console.log(res)
                            var name = res.data[0][0].substring(
                              res.data[0][0].indexOf("【"),res.data[0][0].indexOf("/") - 1)
                            var component = res.data[0][3].substring(
                              res.data[0][3].indexOf("【"), res.data[0][3].indexOf("/") - 1)
                            var effect = res.data[0][4].substring(
                              res.data[0][4].indexOf("【"), res.data[0][4].indexOf("】") + 1) +
                              res.data[0][4].substring(
                                res.data[0][4].indexOf("】") + 27, res.data[0][4].lastIndexOf("/") - 6)
                            var count = res.data[0][5].substring(
                              res.data[0][5].indexOf("【"),res.data[0][5].indexOf("/") - 1)
                            var ADRs = res.data[0][6].substring(
                              res.data[0][6].indexOf("【"), res.data[0][6].indexOf("/") - 1)
                              // console.log(name,component,effect,count,ADRs);
                              wx.request({
                                url: 'http://bishe.cn/index/addmdc/addmdcmore', //服务器获取token的api   
                                method: 'POST',
                                data: {
                                  name: name,
                                  component: component,
                                  effect: effect,
                                  count: count,
                                  ADRs: ADRs
                                },
                                success: function (res) {
                                  console.log(res)
                                  wx.request({
                                    url: 'http://bishe.cn/index/addscanned/addscanned', //服务器获取token的api   
                                    method: 'POST',
                                    data: {
                                      med_id:res.data,
                                      user_id:wx.getStorageSync('openid')
                                    },
                                    success: function (res) {

                                    }
                                  })
                                }
                              })
                              wx.navigateTo({
                                url: '../detail/detail?name=' + name +
                                  '&component=' + component +
                                  '&effect=' + effect +
                                  '&count=' + count +
                                  '&ADRs=' + ADRs,
                              })
                            }
                          })
                        }
                      })
                      }
                    }
                  })
                  
                  

                  // wx.cloud.callFunction({
                  //   name: 'getinfo',
                  //   data: {
                  //     webhtm: res.data
                  //   },
                  // }).then(res => {
                  //   // console.log(res.result);
                  //   if (res.result.re == null) {
                  //     Dialog.alert({
                  //       message: '没有当前药品信息'
                  //     })
                  //   } else {
                  //     Toast.loading({
                  //       duration: 1000,
                  //       loadingType: 'spinner',
                  //       mask: true,
                  //       message: '处理中...'
                  //     });
                  //     // console.log(res.result);
                  //     wx.request({
                  //       url: 'https://www.315jiage.cn/' + res.result.re[0],
                  //       success: (res) => {
                  //         wx.cloud.callFunction({
                  //           name: 'getdetail',
                  //           data: {
                  //             webhtm: res.data
                  //           },
                  //         }).then(res => {
                  //           // for(var i=0;i<=19;i++){
                  //           // console.log(res.result.re[0]);
                  //           // }
                  //           // console.log(res);

                  //           var name = res.result.re[0].substring(
                  //             res.result.re[0].indexOf("【"), res.result.re[0].indexOf("/") - 1)
                  //           var component = res.result.re[3].substring(
                  //             res.result.re[3].indexOf("【"), res.result.re[3].indexOf("/") - 1)
                  //           var effect = res.result.re[4].substring(
                  //               res.result.re[4].indexOf("【"), res.result.re[4].indexOf("】") + 1) +
                  //             res.result.re[4].substring(
                  //               res.result.re[4].indexOf("】") + 27, res.result.re[4].lastIndexOf("/") - 6)
                  //           var count = res.result.re[5].substring(
                  //             res.result.re[5].indexOf("【"), res.result.re[5].indexOf("/") - 1)
                  //           var ADRs = res.result.re[6].substring(
                  //             res.result.re[6].indexOf("【"), res.result.re[6].indexOf("/") - 1)
                  //           // var openid;
                  //           // console.log();
                  //           // console.log();
                  //           // console.log();
                  //           // console.log();
                  //           // console.log();
                  //           // var that=res;
                  //           // wx.cloud.callFunction({
                  //           //   name: 'login',
                  //           // }).then(res => {
                  //           //   // console.log(res.result.openid)
                  //           //   openid = res.result.openid
                  //           // })
                  //           db.collection('medicine').where({
                  //             name: db.command.eq(name),
                  //             _openid: db.command.eq(openid)
                  //           }).get().then(
                  //             res => {
                  //               // console.log(res)
                  //               // var re1=that.result.re[0].replace(/([^\x00-\xff]+)[^<]+/g,'');
                  //               // var re2=that.result.re[3].replace(/([^\x00-\xff]+)[^<]+/g,'');
                  //               // var re3=that.result.re[4].replace(/([^\x00-\xff]+)[^<]+/g,'');
                  //               // var re4=that.result.re[5].replace(/([^\x00-\xff]+)[^<]+/g,'');
                  //               // var re5=that.result.re[6].replace(/([^\x00-\xff]+)[^<]+/g,'');
                  //               if (res.data.length == 0) {
                  //                 db.collection('medicine').add({
                  //                     // data 字段表示需新增的 JSON 数据
                  //                     // data: {
                  //                     //   name: re1,
                  //                     //   component: re2,
                  //                     //   effect: re3,
                  //                     //   count: re4,
                  //                     //   ADRs: re5
                  //                     // }
                  //                     data: {
                  //                       name: name,
                  //                       component: component,
                  //                       effect: effect,
                  //                       count: count,
                  //                       ADRs: ADRs
                  //                     }
                  //                   })
                  //                   .then(res => {

                  //                     console.log(res)
                  //                   })
                  //               }
                  //             }
                  //           )
                  //           db.collection('user').where({
                  //             _openid: db.command.eq(openid)
                  //           }).get().then(
                  //             res => {
                  //               if (res.data.length == 0) {
                  //                 db.collection('user').add({
                  //                     // data 字段表示需新增的 JSON 数据
                  //                     data: {
                  //                       name: '',
                  //                       age: 0,
                  //                       sex: 0
                  //                     }
                  //                   })
                  //                   .then(res => {
                  //                     console.log(res)
                  //                   })
                  //               }

                  //             })
                  //           // console.log(res.result.re[4]);
                            
                    //       })
                    //     }
                    //   })
                    // }



                  // })
                  // console.log(res1.data)
                }
              })
            }

          }
        })
      },
      fail: (res) => {
        Dialog.alert({
          message: '登录后功能更详尽'
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: 'http://bishe.cn/index/getsession/getcode', //服务器获取token的api   
            method: 'POST',
            data: {
              code: res.code
            },
            success: function (res) {
              console.log(res.data)
              wx.setStorageSync('openid', res.data)
            }
          })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})