// pages/doExercise/doExercise.js
var answer;
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
    answer:null,
    checkList: new Array(false,false,false,false)
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data = wx.getStorageSync("GApaper")
    var choicesLength = data.choices.length
    var blanksLength = data.blanks.length
    var wordProblemLength = data.wordProblems.length
    var answerMap = new Map();
    this.setData({
      exercise : data,
      lastChoice : choicesLength,
      lastBlank : choicesLength+blanksLength,
      lastWordProblem : choicesLength+blanksLength+wordProblemLength,
      answer : answerMap
    })
  
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
    answerMap.set(nowpage, answer)
    if(nowpage > 0){
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
      console.log("交卷")
    }else{
      console.log("初始")
    }
    console.log(this.data.answer)
    
    this.setData({
      nowPage: that.data.nowPage + 1,
    })
  },
  radiochange:function(e){
    answer = e.detail.value
  },


  

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