// pages/myClass/myClass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myFound:null,
    noMyfound:true,
    myJoin:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(getApp().globalData.openid)
    wx.request({
      url: 'http://127.0.0.1:8080/getMyFound',
      data:{
        openid : getApp().globalData.openid
      },
      method:'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        that.setData({
          myFound:res.data
        })
        if (that.data.myFound.length==0){
          that.setData({
            noMyFound:true
          })
        }
        else{
          that.setData({
            noMyFound:false
          })
        }
      }

    })
    wx.request({
      url: 'http://127.0.0.1:8080/getMyJoin',
      data: {
        openid: getApp().globalData.openid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          myJoin: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  toAddClass:function(){
    wx.navigateTo({
      url: '/pages/myClass/addClass/addClass',
    })
  },

  goDetail:function(e){
    wx.request({
      url: 'http://127.0.0.1:8080/getDetailById',
      data: {
        id: e.currentTarget.dataset.id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.setStorageSync("detail", res.data)
        wx.navigateTo({
          url: '/pages/myClass/classDetail/classDetail',
        })
      }
    })
  },

  goFindClass:function(){
    wx.navigateTo({
      url: '/pages/myClass/findClass/findClass',
    })
  }
})