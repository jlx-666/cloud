// pages/homework/preview/preview.js
const app = getApp();
Page({

  data: {
    userType:app.globalData.userType,
    hiddenSetTime:true,
    day:0,
    hour:0,
    minute:0,
    classId:null,
    exercise: null,
    nowPage: 0,
    lastChoice: 0,
    lastBlank: 0,
    lastWordProblem: 0,
    checkList: new Array(false, false, false, false),
    saveState: false,
    enable: true
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var data = wx.getStorageSync("paper")
    console.log(data)
    var choicesLength = data.choices.length
    var blanksLength = data.blanks.length
    var wordProblemLength = data.wordProblems.length
    var classId = options.classId
    console.log(classId)
    this.setData({
      exercise: data,
      lastChoice: choicesLength,
      lastBlank: choicesLength + blanksLength,
      lastWordProblem: choicesLength + blanksLength + wordProblemLength,
      classId : classId
    })
    var paperId = this.data.exercise.id
    var openId = app.globalData.openid
    if (paperId != 0) {
      wx.request({
        url: 'http://127.0.0.1:8080/judgeById',
        data: {
          paperId: paperId,
          openId: openId
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          that.setData({
            saveState: res.data
          })
          console.log("微信请求成功后：" + that.data.saveState)
    
        }
      })
      console.log("请求方法后：" + this.data.saveState)
    }
    else {
      this.setData({
        answer: new Map()
      })
    }
  },

  lastPage: function () {
    var that = this
    var nowpage = this.data.nowPage
    console.log(this.data.nowPage - 1)
    if (nowpage > 1) {
      //选择题操作
      console.log("选择")
      var checklist = new Array(false, false, false, false)
      this.setData({
        checkList: checklist
      })
    } else if (nowpage > this.data.lastChoice) {
      //填空题操作

      console.log("填空")
    } else if (nowpage > this.data.lastBlank) {
      //应用题操作
      console.log("应用")
    } else if (nowpage > this.data.lastWordProblem) {
      //交卷  
      console.log("交卷")
    }
    if (nowpage > 1) {
      this.setData({
        nowPage: that.data.nowPage - 1,
      })
    }


  },

  nextPage: function () {
    var that = this
    var nowpage = this.data.nowPage
    console.log(nowpage + 1)
    if (nowpage >= 0) {
      //选择题操作
      console.log("选择")
      var checklist = new Array(false, false, false, false)
      this.setData({
        checkList: checklist
      })
    } else if (nowpage > this.data.lastChoice) {
      //填空题操作

      console.log("填空")
    } else if (nowpage > this.data.lastBlank) {
      //应用题操作
      console.log("应用")
    } else if (nowpage > this.data.lastWordProblem) {
      //交卷  
      console.log("交卷")
    } else {
      console.log("初始")
    }
    this.setData({
      nowPage: that.data.nowPage + 1,
    })
  },
  radiochange: function (e) {
    answer = e.detail.value
  },

  addHomework:function(){
    var that = this
    var paperId = this.data.exercise.id
    var classId = this.data.classId
    var day = this.data.day
    var hour = this.data.hour
    var minute = this.data.minute
    var how_long = (60*(24*day+hour)+minute)
    console.log(how_long)
    console.log('preview:classId='+classId+'    paperId='+paperId)
    wx.request({
      url: 'http://127.0.0.1:8080/addHomework',
      data: {
        paperId: paperId,
        classId: classId,
        how_long:how_long
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          saveState: res.data
        })
      }
    })
  },

  setDay:function(e){
    this.setData({
      day:e.detail.value
    })
  },
  setHour: function (e) {
    this.setData({
      hour: e.detail.value
    })
  },
  setMinute: function (e) {
    this.setData({
      minute: e.detail.value
    })
  },
  setTime:function(){
    this.setData({
      hiddenSetTime:false
    })
  },
  cancel: function () {
    this.setData({
      hiddenSetTime: true
    })
  },
  confirm: function () {
    this.setData({
      hiddenSetTime: true
    })
   this.addHomework()
  },
})