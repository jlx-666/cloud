// pages/myClass/classInfo/classInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    judgeTeacher:false,
    member:null,
    teacher:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8080/getMemberIds',
      data: {
        classId: id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          member: res.data
        })
      }
    }),
    wx.request({
      url: 'http://127.0.0.1:8080/getDetailById',
      data: {
        id: id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          teacher: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  
})