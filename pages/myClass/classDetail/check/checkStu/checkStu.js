// pages/doExercise/doExercise.js
var answer;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paperAnswer:null,
    homework:null,
    selctEnable:true,
    exercise: null,
    nowPage: 0,
    lastChoice: 0,
    lastBlank: 0,
    lastWordProblem: 0,
    answer: null,
    rightOrNot:null,
    noSelect:false,
    trueSelect:null,
    yourSelect:null,
    checkList: new Array(false, false, false, false),
    color:new Array('black','black','black','black')
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var data = wx.getStorageSync("paper")
    var choicesLength = data.choices.length
    var blanksLength = data.blanks.length
    var wordProblemLength = data.wordProblems.length
    var answerMap = new Map()
    this.setData({
      exercise: data,
      lastChoice: choicesLength,
      lastBlank: choicesLength + blanksLength,
      lastWordProblem: choicesLength + blanksLength + wordProblemLength,
    })
    var paperId = this.data.exercise.id
    var openId = app.globalData.openid
    this.getPaperAnswer()
    if (paperId != 0) {
      that.getAnswer()
      console.log("setSuccess")
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
    var answerMap = this.data.answer
    answerMap.set(nowpage, answer)
    if (nowpage > 1) {
      //选择题操作
      console.log("选择")
      var a = that.data.answer
      var b = that.data.paperAnswer
      var checklist = new Array(false, false, false, false)
      var color = new Array('black', 'black', 'black', 'black')
      switch (a.get(nowpage - 1)) {
        case "A":
          color[0] = 'red'
          break;
        case "B":
          color[1] = 'red'
          break;
        case "C":
          color[2] = 'red'
          break;
        case "D":
          color[3] = 'red'
          break;
      }
      switch (b.get(nowpage - 1)) {
        case "A":
          checklist[0] = true
          color[0] = 'green'
          break;
        case "B":
          checklist[1] = true
          color[1] = 'green'
          break;
        case "C":
          checklist[2] = true
          color[2] = 'green'
          break;
        case "D":
          checklist[3] = true
          color[3] = 'green'
          break;
      }
      
      answer = a.get(nowpage - 1)
      var rightOrNot = null
      var trueSelect = b.get(nowpage - 1)
      var yourSelect = answer
      if (typeof (answer) == 'undefined') {
        var noSelect = true
      } else {
        var noSelect = false
        yourSelect = answer
        if (answer == b.get(nowpage - 1)) {
          rightOrNot = true
        } else {
          rightOrNot = false
        }
      }
      this.setData({
        answer: answerMap,
        checkList: checklist,
        color: color,
        noSelect: noSelect,
        rightOrNot: rightOrNot,
        trueSelect: trueSelect,
        yourSelect: yourSelect,
        noSelect: noSelect
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
    console.log(this.data.answer)
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
    var answerMap = this.data.answer;
    answerMap.set(nowpage, answer)
    if (nowpage >= 0) {
      //选择题操作
      console.log("选择")
      var a = that.data.answer
      var b = that.data.paperAnswer
      var checklist = new Array(false, false, false, false)
      var color = new Array('black', 'black', 'black', 'black')
      switch (a.get(nowpage + 1)) {
        case "A":
          color[0] = 'red'
          break;
        case "B":
          color[1] = 'red'
          break;
        case "C":
          color[2] = 'red'
          break;
        case "D":
          color[3] = 'red'
          break;
      }
      switch (b.get(nowpage + 1)) {
        case "A":
          checklist[0] = true
          color[0] = 'green'
          break;
        case "B":
          checklist[1] = true
          color[1] = 'green'
          break;
        case "C":
          checklist[2] = true
          color[2] = 'green'
          break;
        case "D":
          checklist[3] = true
          color[3] = 'green'
          break;
      }
      
      answer = a.get(nowpage + 1)
      var rightOrNot = null
      var trueSelect = b.get(nowpage + 1)
      var yourSelect = answer
      if(typeof(answer)=='undefined'){
        var noSelect=true
      }else{
        var noSelect = false
        yourSelect = answer
        if (answer == b.get(nowpage + 1)){
          rightOrNot = true
        }else{
          rightOrNot = false
        }
      }
      this.setData({
        answer: answerMap,
        checkList: checklist,
        color:color,
        noSelect:noSelect,
        rightOrNot:rightOrNot,
        trueSelect:trueSelect,
        yourSelect:yourSelect,
        noSelect:noSelect
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
    console.log(this.data.answer)
    this.setData({
      nowPage: that.data.nowPage + 1,
    })
  },

  seeCheck:function(){
    this.setData({
      //selectEnable:false
    })
    this.nextPage()
  },


  getAnswer: function () {
    var that = this
    console.log(this.data.saveState)
    var paperId = this.data.exercise.id
    var openId = app.globalData.openid
    var answerMap
    if (wx.getStorageSync("checkCollection")) {
      wx.request({
        url: 'http://' + getApp().globalData.ipAdress + '/getAnswer',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          paperId: paperId,
          openId: openId
        },
        success: function (res) {
          answerMap = res.data
          let strMap = new Map();
          for (let k of Object.keys(answerMap)) {
            let key = parseInt(k)
            strMap.set(key, answerMap[k]);
          }
          console.log(strMap)
          that.setData({
            answer: strMap
          })
        }
      })
    }
    else {
      wx.request({
        url: 'http://' + getApp().globalData.ipAdress + '/getHomeworkAnswer',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          paperId: paperId,
          openId: openId,
          classId: wx.getStorageSync("homework").class_id
        },
        success: function (res) {
          answerMap = res.data
          let strMap = new Map();
          for (let k of Object.keys(answerMap)) {
            let key = parseInt(k)
            strMap.set(key, answerMap[k]);
          }
          console.log(strMap)
          that.setData({
            answer: strMap
          })
        }
      })
    }
  },

  getPaperAnswer: function () {
    var that = this
    console.log(this.data.saveState)
    var paperId = this.data.exercise.id
    var openId = app.globalData.openid
    var answerMap
    wx.request({
      url: 'http://' + getApp().globalData.ipAdress + '/findAnswerByPaperId',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        paperId: paperId,
      },
      success: function (res) {
        answerMap = res.data
        let strMap = new Map();
        for (let k of Object.keys(answerMap)) {
          let key = parseInt(k)
          strMap.set(key, answerMap[k]);
        }
        console.log(strMap)
        that.setData({
          paperAnswer: strMap
        })
      }
    })
  }

  
})