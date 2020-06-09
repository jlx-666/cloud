// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paperbases: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '首页',
    })
    
    this.getPaperIds()
  },


  goExercise: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: 'http://' + getApp().globalData.ipAdress + '/getById',
      data: {
        id: id
      },
      success: function (res) {
        wx.setStorageSync("paper", res.data)
        console.log(res.data)
        wx.navigateTo({
          url: '/pages/doExercise/doExercise',
        })
      }
    })
  },

  getPaperAuto:function(){
      wx.navigateTo({
        url: '../getByAuto/getByGA/getByGA'
      })
  },

  getPaperIds:function(){
    var that = this
    wx.request({
      url: 'http://' + getApp().globalData.ipAdress + '/getPaperIds',
      data: {
        size: 10
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          paperbases: res.data
        })
      }
    })
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