const app = getApp();
var answer;
Page({

  data: {
    nowCheck: false,
    homeworkOver: false,
    deleteCheck:"",
    hiddenModal:true,
    classId: null,
    exercise: null,
    nowPage: 0,
    answer: null,
    checkResult: null,
    lastChoice: 0,
    lastBlank: 0,
    lastWordProblem: 0,

    checkList: new Array(false, false, false, false),
    color: new Array('black', 'black', 'black', 'black'),
    saveState: false,
    enable: true,
    trueSelect: null,
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
      homeworkOver: wx.getStorageSync("homeworkOver"),
      lastChoice: choicesLength,
      lastBlank: choicesLength + blanksLength,
      lastWordProblem: choicesLength + blanksLength + wordProblemLength,
      classId: wx.getStorageSync("detail").id,
    })
    var paperId = this.data.exercise.id
    var openId = app.globalData.openid
    this.getPaperAnswer()
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
      var checklist = new Array(false, false, false, false)
      var color = new Array('black', 'black', 'black', 'black')
      switch (a.get(nowpage - 1)) {
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
      
      /*if (typeof (answer) == 'undefined') {
        var noSelect = true
      } else {
        var noSelect = false
        yourSelect = answer
        if (answer == b.get(nowpage - 1)) {
          rightOrNot = true
        } else {
          rightOrNot = false
        }
      }*/
      this.setData({
        answer: answerMap,
        checkList: checklist,
        color: color,
        trueSelect: answer
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
      var checklist = new Array(false, false, false, false)
      var color = new Array('black', 'black', 'black', 'black')
      switch (a.get(nowpage + 1)) {
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
     

      /*if (typeof (answer) == 'undefined') {
        var noSelect = true
      } else {
        var noSelect = false
        yourSelect = answer
        if (answer == b.get(nowpage + 1)) {
          rightOrNot = true
        } else {
          rightOrNot = false
        }
      }*/
      this.setData({
        answer: answerMap,
        checkList: checklist,
        color: color,
        trueSelect: answer
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
  /*radiochange: function (e) {
     answer = e.detail.value
   },*/

  getPaperAnswer: function () {
    var that = this
    console.log(this.data.saveState)
    var paperId = this.data.exercise.id
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
          answer: strMap
        })
      }
    })
  },

  setInput: function (e) {
    this.setData({
      deleteCheck:e.detail.value
    })
  },
  deletePaper: function () {
    this.setData({
      hiddenModal: false
    })
  },
  cancel: function () {
    this.setData({
      hiddenModal: true
    })
  },
  confirm: function () {
    var that=this
    var deleteCheck = this.data.deleteCheck
    if (deleteCheck!='确认') {
      $Message({
        content: '请输入“确认”！',
        type: 'error'
      })
      return
    }
    wx.request({
      url: 'http://' + getApp().globalData.ipAdress + '/deletePaperById',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        paperId: this.data.exercise.id,
      },
      success: function (res) {
        that.setData({
          hiddenModal: true
        })
      }
    })
  },
 
})