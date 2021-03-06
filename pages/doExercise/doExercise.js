// pages/doExercise/doExercise.js
var answer;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    exercise:null,
    nowPage:0,
    lastChoice:0,
    lastBlank:0,
    lastWordProblem:0,
    answer:{},
    checkList: new Array(false,false,false,false),
    saveState:false,
    color: new Array('#fff', '#fff', '#fff', '#fff')
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
      exercise : data,
      lastChoice : choicesLength,
      lastBlank : choicesLength+blanksLength,
      lastWordProblem : choicesLength+blanksLength+wordProblemLength,
    })
    var paperId = this.data.exercise.id
    var openId = app.globalData.openid
    if(paperId!=0){
      wx.request({
        url: 'http://' + getApp().globalData.ipAdress + '/judgeById',
        data:{
          paperId : paperId,
          openId:openId
        },
        method:'POST',
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        success:function(res){
          that.setData({
            saveState:res.data
          })
          console.log("微信请求成功后：" + that.data.saveState)
          that.setAnswer()
        }
      })
      console.log("请求方法后：" +this.data.saveState)
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
      if(nowpage>1){
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
    let obj = Object.create(null);
    for (let [k, v] of this.data.answer) {
      obj[k] = v;
    }

    console.log(JSON.stringify(obj))
    wx.setStorageSync("eAnswer", JSON.stringify(obj))
    if(nowpage>1){
      this.setData({
        nowPage: that.data.nowPage - 1,
      })
    }
    
    
  },

  nextPage:function(){
    var that = this
    var nowpage = this.data.nowPage
    console.log(nowpage+1)
    var answerMap = this.data.answer;
    console.log(answerMap+"ansMap")
    answerMap.set(nowpage, answer)
    
    if(nowpage >= 0){
      //选择题操作
      console.log("选择")
      var a = that.data.answer
      var checklist = new Array(false, false, false, false)
      switch (a.get(nowpage +1 )) {
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
    } else if (nowpage > this.data.lastChoice){
      //填空题操作

      console.log("填空")
    } else if (nowpage > this.data.lastBlank){
      //应用题操作
      console.log("应用")
    } else if (nowpage > this.data.lastWordProblem){
      //交卷  
      
    }else{
      console.log("初始")
    }
    let obj = Object.create(null);
    for (let [k, v] of this.data.answer) {
      obj[k] = v;
    }

    console.log(JSON.stringify(obj))
    wx.setStorageSync("eAnswer", JSON.stringify(obj))
    that.saveCollection()
    if (nowpage<this.data.lastWordProblem){
    this.setData({
      nowPage: that.data.nowPage + 1,
    })
    }
  },
  radiochange:function(e){
    answer = e.detail.value
  },
  
  addCollection:function(){
    var that = this
    var openid = app.globalData.openid
    var paperid = this.data.exercise.id
    console.log("openid:"+openid)
    wx.request({
      url: 'http://' + getApp().globalData.ipAdress + '/addCollection',
      data:{
        openId:openid,
        paperId:paperid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          saveState: true
        })
      }
    })
  },
  saveCollection:function(){
    if (this.data.saveState) {
    var that = this
    let obj = Object.create(null);
    for (let [k, v] of that.data.answer) {
      obj[k] = v;
    }
    
      wx.request({
        url: 'http://' + getApp().globalData.ipAdress + '/saveCollection',
        data:{
          openId:app.globalData.openid,
          paperId:that.data.exercise.id,
          answer:JSON.stringify(obj)
        },
        method:'POST',
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        
      })
    }
  },


  dropCollection:function(){
    var that = this
    wx.request({
      url: 'http://' + getApp().globalData.ipAdress + '/dropCollection',
      data:{
        openId: app.globalData.openid,
        paperId: that.data.exercise.id,
      },
      method:'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        that.setData({
          saveState:false
        })
      }
    })
  },


  setAnswer:function(){
    var that = this
    console.log(this.data.saveState)
    var paperId = this.data.exercise.id
    var openId = app.globalData.openid
    var answerMap
    if (this.data.saveState) {
      console.log("etAnswer")
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
            answer:strMap
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
    this.nextPage()
    if(this.data.saveState){
      wx.setStorageSync("checkType", "collection")
      wx.redirectTo({
        url: '/pages/myClass/classDetail/check/checkStu/checkStu',
      })
    }else{
      wx.setStorageSync("checkType", "exercise")
      wx.redirectTo({
        url: '/pages/myClass/classDetail/check/checkStu/checkStu',
      })
    }
    
  }
})