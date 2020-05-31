// pages/homework/addHomework.js
Page({

  data: {
    classId:null,
    isbind:false,
    getByCollection:false,
    getByGA:false,
    isloading: false,
    paper: null,
    paperbase: null
  },


  onLoad: function (options) {
    var classId = options.classId
    var that = this
    wx.request({
      url: 'http://' + getApp().globalData.ipAdress + '/getMyCollections',
      data: {
        openId: getApp().globalData.openid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var paperbase = res.data
        console.log(res.data)
        that.setData({
          paperbase: paperbase,
          classId:classId
        })
      }
    })
    
    
  },
  goDoHomework: function (e) {
    var that =this
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: 'http://' + getApp().globalData.ipAdress + '/getById',
      data: {
        id: id
      },
      success: function (res) {
        wx.setStorageSync("paper", res.data)
        wx.navigateTo({
          url: '/pages/homework/preview/preview?classId='+that.data.classId,
        })
      }
    })
  },


  onReady: function () {

  },

  findInCollection:function(){
    let getByCollection = true
    let getByGA = false
    let isbind = true
    this.setData({
      isbind: isbind,
      getByCollection: getByCollection,
      getByGA: getByGA,
    })
  },
  
})