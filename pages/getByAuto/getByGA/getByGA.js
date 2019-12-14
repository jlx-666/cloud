// pages/getByAuto/getByGA/getByGA.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isloading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  setDifficulty: function (e) {
    this.setData({
      difficulty: e.detail.value
    })
  },
  getPaperGA: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/getGA',
      data: {
        difficulty: this.data.difficulty
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.setStorageSync("GApaper", res.data)
        console.log(res.data)
        that.setData({
          isloading:true
        })
      }
    })
  },

goExercise:function(){
  wx.navigateTo({
    url: '/pages/doExercise/doExercise',
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