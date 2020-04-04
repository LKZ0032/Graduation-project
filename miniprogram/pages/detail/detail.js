// pages/detail/detail.js
// var WxParse = require('../../wxParse/wxParse')
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    component: '',
    effect: '',
    count: '',
    ADRs: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      naem: options.name,
      component: options.component,
      effect: options.effect,
      count: options.count,
      ADRs: options.ADRs
    })
    // var naem = this.data.naem;
    // var component = this.data.component;
    // var effect = this.data.effect;
    // var count = this.data.count;
    // var ADRs = this.data.ADRs;
    // var that = this;
    // WxParse.wxParse('naem', 'html', naem, that,5);
    // WxParse.wxParse('component', 'html', component, that,5);
    // WxParse.wxParse('effect', 'html', effect, that,5);
    // WxParse.wxParse('count', 'html', count, that,5);
    // WxParse.wxParse('ADRs', 'html', ADRs, that,5);
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