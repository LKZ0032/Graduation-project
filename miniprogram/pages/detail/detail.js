// pages/detail/detail.js
import Toast from '@vant/weapp/toast/toast';
var WxParse = require('../../wxParse/wxParse')
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
  playVoice: function () {
    var plugin = requirePlugin("WechatSI");
    plugin.textToSpeech({
      lang: "zh_CN",
      tts: true,
      content: this.data.name + " " + this.data.count + " " + this.data.effect,
      success: function (res) {
        Toast.loading({
          duration: 1000,
          loadingType: 'spinner',
          mask: true,
          message: '处理中...'
        });
        // console.log("succ tts", res.filename)
        const innerAudioContext = wx.createInnerAudioContext()
        innerAudioContext.autoplay = true
        innerAudioContext.src = res.filename
          innerAudioContext.onPlay(() => {
            // console.log('开始播放')
          })
        innerAudioContext.onError((res) => {
          console.log(res.errMsg)
          console.log(res.errCode)
        })
      },
      fail: function (res) {
        console.log("fail tts", res)
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name,
      component: options.component,
      effect: options.effect,
      count: options.count,
      ADRs: options.ADRs
    })
    // console.log(options.effect);
    // var name = this.data.name;
    // var component = this.data.component;
    // var effect = this.data.effect;
    // var count = this.data.count;
    // var ADRs = this.data.ADRs;
    // var that = this;
    // WxParse.wxParse('name', 'html', name, that,5);
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