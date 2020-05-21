// miniprogram/pages/impinfo/impinfo.js
const db = wx.cloud.database();
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordId:'',
    name: '',
    age: 0,
    sex: 0,
    sex_ch: '请选择性别'
  },
  addInfo: function () {
    wx.cloud.callFunction({
      name: 'login',
    }).then(res => {
      // console.log(this.data.recordId)
      
      db.collection('user').doc(this.data.recordId).update({
        // data 传入需要局部更新的数据
        data: {
          name: this.data.name,
          age: this.data.age,
          sex: this.data.sex
        },
        success: function (res) {
          // console.log(res)
        },
        fail: function(res){
          Toast.fail('出错了，请重试');
        }
      })
    })
  },
  onChangeName(event) {
    // event.detail 为当前输入的值
    this.setData({
      name: event.detail
    })
    // console.log(event.detail);
  },
  onChangeAge(event) {
    // event.detail 为当前输入的值


    this.setData({

      age: event.detail.value
    })
    // console.log(event.detail);
  },
  onChangeSex(event) {
    // event.detail 为当前输入的值
    if (event.detail == 1) {
      this.setData({
        sex_ch: '女',
        sex: event.detail
      })
    } else if (event.detail == -1) {
      this.setData({
        sex_ch: '男',
        sex: event.detail
      })
    }

    // console.log(event.detail);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('user').where({
      _openid: db.command.eq(this.data.user_open_id)
    }).get().then(
      res => {
        // console.log(res.data[0]._id)
        if (res.data[0].sex == 1) {
          this.setData({
            recordId:res.data[0]._id,
            name: res.data[0].name,
            age: res.data[0].age,
            sex_ch: '女',
            sex: res.data[0].sex
          })
        } else if (res.data[0].sex == -1) {
          this.setData({
            recordId:res.data[0]._id,
            name: res.data[0].name,
            age: res.data[0].age,
            sex_ch: '男',
            sex: res.data[0].sex
          })
        }else{
          this.setData({
            recordId:res.data[0]._id,
            name: res.data[0].name,
            age: res.data[0].age,
            sex_ch: '请滑动选择性别',
            sex: res.data[0].sex
          })
        }
      }
    )
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