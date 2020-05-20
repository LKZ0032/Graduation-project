// pages/userinfo/userinfo.js
const db = wx.cloud.database();
import Toast from '@vant/weapp/toast/toast';
// import Dialog from '@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagsrc: '../../images/tou.png',
    user_open_id: '',
    islogin: false,
    // name: '我',
    // haveinfo: false,
    // username: '分析师(空)',
    // industry: '行业(空)',
    // organ: '机构(空)',
    // message: '备注(空)',
    // currentDate: '时间(空)',
    // checked: false,
    // disabled: false
  },
  handleContact(e) {
    console.log(e.detail.path)
    console.log(e.detail.query)
  },
  showScanned: function (e) {
    db.collection('medicine').where({
      _openid: db.command.eq(this.data.user_open_id)
    }).get().then(
      res => {
        if (res.data.length == 0) {
          Toast.fail('您还没有扫描过');
        } else {
          wx.navigateTo({
            url: '../scanned/scanned?openid=' + this.data.user_open_id
          })
        }
      })
  },
  onGotUserInfo: function (e) {
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
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Toast.loading({
      mask: true,
      loadingType: 'spinner',
      message: '加载中...',
    });
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
          // db.collection('medicine').where({
          //   _openid: this.data.user_open_id,
          // }).get().then(
          //   res => {
          //     // console.log(res)
          //   }
          // )

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