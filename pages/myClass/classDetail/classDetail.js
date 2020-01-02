// pages/myClass/classDetail/classDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:null,
    who:"notJoin",
    teacher:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      detail:wx.getStorageSync("detail")
    })
    wx.request({
      url: 'http://127.0.0.1:8080/judgeWho',
      data: {
        openId:getApp().globalData.openid,
        classId:that.data.detail.id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          who:res.data
        })
      }
    })
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  join:function(){
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8080/joinClass',
      data: {
        openId: getApp().globalData.openid,
        classId: that.data.detail.id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          who:'student'
        })
      }
    })
  },
  goInfo:function(){
    var id = this.data.detail.id
    wx.navigateTo({
      url: '/pages/myClass/classInfo/classInfo?id='+id,
    })
  },
})