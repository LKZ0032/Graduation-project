// miniprogram/pages/map/map.js
// const key = 'ZMVBZ-RALWK-3WQJX-A465N-JQKI6-XNFX7'; //使用在腾讯位置服务申请的key
// const referer = 'wx6b1efe40c95c0671'; //调用插件的app的名称
// const location = JSON.stringify({
//   latitude: 39.89631551,
//   longitude: 116.323459711
// });
// const category = '生活服务,娱乐休闲';

// 引入SDK核心类
var QQMapWX = require('../../qqmap-wx-jssdk.js');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'ZMVBZ-RALWK-3WQJX-A465N-JQKI6-XNFX7' // 必填
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // keyWord: '',
    value: '',
    longitude: 116.38,
    latitude: 39.90,
    markers: [{
      title: '',
      iconPath: "../../images/location.png",
      id: 0,
      latitude: 40.002607,
      longitude: 116.487847,
      width: 35,
      height: 45
    }]
  },
  searchNew: function (e) {
    console.log(this.data.value)
    var _this = this;
    // 调用接口
    qqmapsdk.search({
      keyword: this.data.value, //搜索关键词
      location: {
        longitude: this.data.longitude,
        latitude: this.data.latitude,
      }, //设置周边搜索中心点
      success: function (res) { //搜索成功后的回调
        var mks = []
        // for (var i = 0; i < res.data.length; i++) {
        //   mks.push({ // 获取返回结果，放到mks数组中
        //     title: res.data[i].title,
        //     id: res.data[i].id,
        //     latitude: res.data[i].location.lat,
        //     longitude: res.data[i].location.lng,
        //     iconPath: "../../images/location.png", //图标路径
        //     width: 20,
        //     height: 20
        //   })
        // }
        _this.setData({ //设置markers属性，将搜索结果显示在地图中
          latitude: res.data[0].location.lat,
          longitude: res.data[0].location.lng,
        })
        console.log(_this.data.latitude,_this.data.longitude)
        _this.onShow();
        
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
  onChange(event) {
    // event.detail 为当前输入的值
    this.setData({
      value: event.detail
    })
    // console.log(event.detail);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.authorize({scope: "scope.userInfo"})
    console.log(options.longitude)
    this.setData({
      longitude: parseFloat(options.longitude),
      latitude: parseFloat(options.latitude),
    })


    // wx.navigateTo({
    //   url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
    // });
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
    console.log(this.data.longitude,this.data.latitude)
    var _this = this;
    // 调用接口
    qqmapsdk.search({
      keyword: '药', //搜索关键词
      location: {
        longitude: this.data.longitude,
        latitude: this.data.latitude,
      }, //设置周边搜索中心点
      success: function (res) { //搜索成功后的回调
        var mks = []
        for (var i = 0; i < res.data.length; i++) {
          mks.push({ // 获取返回结果，放到mks数组中
            title: res.data[i].title,
            id: res.data[i].id,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng,
            iconPath: "../../images/location.png", //图标路径
            width: 20,
            height: 20
          })
        }
        _this.setData({ //设置markers属性，将搜索结果显示在地图中
          markers: mks
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
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