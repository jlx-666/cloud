// pages/mine/myCollections/myCollections.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paperbase:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://' + getApp().globalData.ipAdress + '/getMyCollections',
      data:{
        openId: getApp().globalData.openid
      },
      method:'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        var paperbase = res.data
        console.log(res.data)
        that.setData({
          paperbase:paperbase
        })
      }
    })
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
 
})