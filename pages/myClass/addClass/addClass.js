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
  onShow: function (options) {

  },

  addClass:function(){
    wx.setNavigationBarTitle({
      title: '创建班级',
    })
    let openid = getApp().globalData.openid
    let name = this.data.name
    wx.request({
      url: 'http://' + getApp().globalData.ipAdress + '/addClass',
      data:{
        openid:openid,
        name:name
      },
      method:'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        wx.setStorageSync("detail", res.data)
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