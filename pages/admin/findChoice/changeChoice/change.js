const { $Message } = require('../../../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkList: new Array(false, false, false, false),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var id = wx.getStorageSync("choiceId")
    wx.request({
      url: 'http://' + getApp().globalData.ipAdress + '/getChoiceById',
      data: {
        id : id
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var checklist = new Array(false, false, false, false)
        that.setData({
          choice:res.data,
          difficulty: res.data.difficulty,
          title: res.data.title,
          opA: res.data.opA,
          opB: res.data.opB,
          opC: res.data.opC,
          opD: res.data.opD,
          answer: res.data.answer
        })
        
        switch (res.data.answer) {
          case "A":
            checklist[0] = true
            break;
          case "B":
            checklist[1] = true
            break;
          case "C":
            checklist[2] = true
            break;
          case "D":
            checklist[3] = true
            break;
        }
        that.setData({
          checkList:checklist
        })
      }
    })
  },



  change:function(){
    var that = this
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
      url: 'http://' + getApp().globalData.ipAdress + '/saveChoice',
      data: {
        id: wx.getStorageSync("choiceId"),
        difficulty: difficulty,
        title: title,
        opA: opA,
        opB: opB,
        opC: opC,
        opD: opD,
        answer: answer
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var pages = getCurrentPages();
        var beforePage = pages[pages.length - 2];
        beforePage.onLoad();
        wx.navigateBack({
          delta: 1,
        })
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