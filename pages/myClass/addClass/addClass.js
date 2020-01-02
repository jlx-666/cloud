// pages/myClass/addClass/addClass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"默认班级"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  addClass:function(){
    let openid = getApp().globalData.openid
    let name = this.data.name
    wx.request({
      url: 'http://127.0.0.1:8080/addClass',
      data:{
        openid:openid,
        name:name
      },
      method:'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log("创建成功")
        wx.navigateTo({
          url: '/pages/myClass/classDetail/classDetail',
        })
      }
    })
  },

  setClassName:function(e){
    this.setData({
      name:e.detail.value
    })
  }
})