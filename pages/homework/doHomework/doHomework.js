var answer;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    exercise: null,
    homework: wx.getStorageSync('homework'),
    classId:wx.getStorageSync('homework').class_id,
    nowPage: 0,
    lastChoice: 0,
    lastBlank: 0,
    lastWordProblem: 0,
    answer: null,
    checkList: new Array(false, false, false, false),
    saveState: '未完成'
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('classid'+wx.getStorageSync('homework').class_id)
    var that = this
    var data = wx.getStorageSync("paper")
    console.log(data)
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
    if (that.data.homework.state=='未完成') {
          that.setData({
            saveState: true          
          })
          that.setAnswer()
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
      console.log(a)
      var checklist = new Array(false, false, false, false)
      switch (a.get(nowpage - 1)) {
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
      if (nowpage > 1) {
        answer = a.get(nowpage - 1)
      }
      this.setData({
        answer: answerMap,
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
    console.log(answerMap)
    answerMap.set(nowpage, answer)
    if (nowpage >= 0) {
      //选择题操作
      console.log("选择")
      var a = that.data.answer
      var checklist = new Array(false, false, false, false)
      switch (a.get(nowpage + 1)) {
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
      answer = a.get(nowpage + 1)
      this.setData({
        answer: answerMap,
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
    console.log(this.data.answer)
    that.saveHomework()
    this.setData({
      nowPage: that.data.nowPage + 1,
    })
  },
  radiochange: function (e) {
    answer = e.detail.value
  },

 
  saveHomework: function () {
    var that = this
    let obj = Object.create(null);
    for (let [k, v] of that.data.answer) {
      obj[k] = v;
    }
    if (this.data.saveState) {
      wx.request({
        url: 'http://127.0.0.1:8080/saveHomework',
        data: {
          classId: that.data.classId,
          openId: app.globalData.openid,
          paperId: that.data.exercise.id,
          answer: JSON.stringify(obj)
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },

      })
    }
  },




  setAnswer: function () {
    var that = this
    console.log(this.data.saveState)
    var paperId = this.data.exercise.id
    var openId = app.globalData.openid
    var answerMap
    if (this.data.saveState) {
      console.log("etAnswer")
      wx.request({
        url: 'http://127.0.0.1:8080/getHomeworkAnswer',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          paperId: paperId,
          openId: openId,
          classId: that.data.classId
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
      console.log("notget")
      answerMap = new Map()
      that.setData({
        answer: answerMap
      })
    }
    console.log("2")
  },

  confirm:function(){
    var that=this
    let obj = Object.create(null);
    for (let [k, v] of that.data.answer) {
      obj[k] = v;
    }
    wx.request({
      url: 'http://127.0.0.1:8080/homeworkDone',
      data: {
        classId: that.data.classId,
        openId: app.globalData.openid,
        paperId: that.data.exercise.id,
        answer: JSON.stringify(obj),
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },

    })
    wx.redirectTo({
      url: '/pages/myClass/classDetail/check/checkStu/checkStu',
    })
  }
})