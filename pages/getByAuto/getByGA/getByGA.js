// pages/getByAuto/getByGA/getByGA.js
const { $Message } = require('../../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isloading:false,
    paper:null,
    apiLoading: false,
    id:null
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
    var difficulty = this.data.difficulty
    if(!this.data.difficulty) {
      $Message({
        content: '难度值不能为空！',
        type: 'error'
      })
      return
    }
    if (difficulty>=1||difficulty<=0) {
      $Message({
        content: '难度值超出范围！',
        type: 'error'
      })
      return
    }
    var that = this;
    this.setData({
      apiLoading: true
    })
    wx.request({
      url: 'http://' + getApp().globalData.ipAdress + '/getGA',
      data: {
        difficulty: difficulty
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          isloading:true,
          paper:res.data,
          apiLoading: false
        })
      }
    })
  },

goExercise:function(){
  var that = this
  var paper = this.data.paper
  console.log(paper)
  if (this.data.isloading) {
    wx.request({
      url: 'http://' + getApp().globalData.ipAdress + '/savePaper',
      data: {
        paper: JSON.stringify(paper)
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var id = res.data
        that.setData({
          id: id
        })
        if (that.data.isloading) {
          wx.request({
            url: 'http://' + getApp().globalData.ipAdress + '/getById',
            data: {
              id: that.data.id
            },
            success: function (res) {
              wx.setStorageSync("paper", res.data)
              console.log(res.data)
              wx.navigateTo({
                url: '/pages/doExercise/doExercise',
              })
            }
          })

        }
      }
    })
  }
  console.log(that.data.id)
  
},

save:function(){
  var that = this
  var paper = this.data.paper
  console.log(paper)
  if (this.data.isloading) {
    wx.request({
      url: 'http://' + getApp().globalData.ipAdress + '/savePaper',
      data: {
        paper: JSON.stringify(paper)
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success:function(res){
        var id = res.data
        that.setData({
          id:id
        })
        console.log(id+"id")
      }
    })
  }
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