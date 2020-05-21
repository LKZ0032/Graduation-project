// miniprogram/pages/qrcode/qrcode.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:"http://qr.liantu.com/api.php?bg=f3f3f3&fg=4198b9&el=l&w=200&m=10&text="
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
    var text1 = ""
    var text2= ""
    wx.cloud.callFunction({
      name: 'login',
    }).then(res => {
      var re=res
      // console.log(res)
      db.collection('medicine').where({
        _openid: db.command.eq(res.result.openid)
      }).get().then(
        res => {
          res.data.forEach(element => {
            text1 = text1+element.name
            text1=text1+"@"
            text1 = text1+element.effect
            text1=text1+"@"
            text1 = text1+element.count
            text1=text1+"@"
            text1 = text1+element.component
            text1=text1+"@"
            text1 = text1+element.ADRs
            text1=text1+"*"
            // console.log(text1)
          });
          // text1 = res.data.toString()
          // console.log(text1)
          db.collection('user').where({
            _openid: db.command.eq(re.result.openid)
          }).get().then(
            res => {
              // console.log(text1)
              text2 = text1+"%"
              text2 = text2+res.data[0].sex
              text2=text2+"@"
              text2 = text2+res.data[0].name
              text2=text2+"@"
              text2 = text2+res.data[0].age
              text2=text2+"@"
              text2 = text2+res.data[0]._openid
              text2=this.data.src+text2
              // console.log(text2)
              this.setData({
                src:text2
              })
            })
        })
        
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