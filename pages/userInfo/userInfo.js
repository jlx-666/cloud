// pages/userInfo/userInfo.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })
    console.log(this.data.userInfo)
    console.log(app.globalData.openid)
  },

  goCollection:function(){
    wx.navigateTo({
      url: '/pages/mine/myCollections/myCollections',
    })
  },

})