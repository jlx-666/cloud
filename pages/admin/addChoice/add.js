const { $Message } = require('../../../dist/base/index');
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

  commit:function(){
    var that = this
    var difficulty = this.data.difficulty
    var title = this.data.title
    var opA = this.data.opA
    var opB = this.data.opB
    var opC = this.data.opC
    var opD = this.data.opD
    var answer = this.data.answer
    if (!this.data.title) {
      $Message({
        content: '题目不能为空！'
      })
      return
    }
    if (!this.data.opA || !this.data.opB || !this.data.opC || !this.data.opD) {
      $Message({
        content: '选项不能为空！'
      })
      return
    }
    if (!this.data.difficulty) {
      $Message({
        content: '难度值不能为空！',
        type: 'error'
      })
      return
    }
    if (difficulty >= 1 || difficulty <= 0) {
      $Message({
        content: '难度值超出范围！',
        type: 'error'
      })
      return
    }
    if (!this.data.answer) {
      $Message({
        content: '请选择答案',
        type: 'error'
      })
      return
    }
    wx.request({
      url: 'http://' + getApp().globalData.ipAdress + '/addChoice',
      data: {
        difficulty: difficulty,
        title: title,
        opA:opA,
        opB:opB,
        opC:opC,
        opD:opD,
        answer:answer
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("suc add")
      }
    })
  },

  setTitle: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  setOpA: function (e) {
    this.setData({
      opA: e.detail.value
    })
  },
  setOpB: function (e) {
    this.setData({
      opB: e.detail.value
    })
  },
  setOpC: function (e) {
    this.setData({
      opC: e.detail.value
    })
  },
  setOpD: function (e) {
    this.setData({
      opD: e.detail.value
    })
  },
  setDif: function (e) {
    this.setData({
      difficulty: e.detail.value
    })
  },
  radiochange: function (e) {
    var answer = e.detail.value
    this.setData({
      answer: answer
    })
  },
})