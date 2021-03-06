// pages/myClass/findClass/findClass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classId:0,
  },
  search:function(e){
    var that = this
    console.log(this.data.classId)
    if(this.data.classId==0){
      wx.showToast({
        title: '请输入班级号',

      })
    }
    else{
      wx.request({
        url: 'http://' + getApp().globalData.ipAdress + '/getDetailById',
        data: {
          id: that.data.classId
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (res.data != ""){
            console.log(res.data)
            wx.setStorageSync("detail", res.data)
            wx.navigateTo({
              url: '/pages/myClass/classDetail/classDetail',
            })
          }
          else{
            wx.showToast({
              title: '不存在该班级',
              icon: 'none',
              duration:1000,
            })
          }
        }
      })
    }
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
  setClassId: function (e) {
    this.setData({
      classId: e.detail.value
    })
  },
})