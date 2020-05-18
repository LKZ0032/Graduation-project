// pages/userinfo/userinfo.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagsrc: '../../images/tou.png',
    name: '我',
    haveinfo: false,
    user_open_id: '',
    username: '分析师(空)',
    industry: '行业(空)',
    organ: '机构(空)',
    message: '备注(空)',
    currentDate: '时间(空)',
    islogin: false,
    checked: false,
    disabled: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var _this = this;
    wx.getUserInfo({
      complete: (res) => {},
      success: (res) => {
        var url = res.userInfo.avatarUrl;
        wx.cloud.callFunction({
          name: 'login',
        }).then(res => {
          // console.log(res)
          this.setData({
            imagsrc: url,
            user_open_id: res.result.openid,
            islogin: true
          })
          db.collection('medicine').where({
            _openid: this.data.user_open_id,
          }).get().then(
            res => {
              console.log(res)
            }
          )

        });
      },
      fail: (res) => {
        this.setData({
          islogin: false
        })
      }
    })
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