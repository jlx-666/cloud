// pages/admin/admin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  goAdd:function(){
    wx.navigateTo({
      url: '/pages/admin/addChoice/add',
    })
  },
  goSearch: function () {
    wx.navigateTo({
      url: '/pages/admin/findChoice/findChoice',
    })
  },
  goPaper: function () {
    wx.navigateTo({
      url: '/pages/admin/paper/paper',
    })
  },
  
})