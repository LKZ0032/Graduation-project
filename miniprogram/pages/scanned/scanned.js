// miniprogram/pages/scanned.js
import Dialog from '@vant/weapp/dialog/dialog';
import Toast from '@vant/weapp/toast/toast';
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    list: []
  },

  naTo: function (e) {
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        Toast.success('位置已授权');
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        wx.navigateTo({
          url: '../map/map?latitude=' + latitude +
            '&longitude=' + longitude,
        })
        // console.log(latitude, longitude, speed, accuracy)
      },
      fail(res) {
        Dialog.alert({
          message: '此功能需要在设置中打开位置授权',
        }).then(() => {
          // on close
        });
        // console.log(res)
      }
    })
  },

  // onChange(event) {
  //   wx.showToast({
  //     title: `切换到标签 ${event.detail.name}`,
  //     icon: 'none',
  //   });
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    Toast.loading({
      loadingType	:'spinner',
      mask: true,
      message: '加载中...',
    });
    wx.request({
      url: 'http://bishe.cn/index/getscanned/getscanned', //服务器获取token的api   
      method: 'POST',
      data: {
        user_id:wx.getStorageSync('openid')
      },
      success: function (res) {
        // console.log(res);
        _this.setData({
          list: res.data
        })
      }
    })
    // db.collection('medicine').where({
    //   // _openid: "oZmy25FUaRFlCNB53K5xhd6yZD-A"
    //   _openid: options.openid
    // }).get().then(
    //   res => {
    //     console.log(res.data)
    //     this.setData({
    //       list: res.data
    //     })
    //   }
    // )
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