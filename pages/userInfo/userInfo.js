// pages/userInfo/userInfo.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    newName:{},
    administrator:false,
    nickname: null,
    hiddenChangeName:true,
    userInfo: {},
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true,
    })
    wx.request({
      url: 'http://127.0.0.1:8080/getNameById',
      data: {
        openid: getApp().globalData.openid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          nickname: res.data
        })
      }
    })
    console.log(this.data.userInfo)
    console.log(app.globalData.openid)
  },

  judgeAdmin:function(){
    if (app.globalData.openid =="o1PFH4-_5S71Wp4swBpfAMMPn40A"){
      this .setData({
        administrator:true
      })
    }
  },

  goCollection:function(){
    wx.navigateTo({
      url: '/pages/mine/myCollections/myCollections',
    })
  },

  goMyHomework: function () {
    wx.navigateTo({
      url: '/pages/homework/myHomework/myHomework',
    })
  },

  showChangeName: function () {
    this.setData({
      hiddenChangeName:false
    })
  },
  setNewName: function (e) {
    this.setData({
      newName: e.detail.value
    })
  },
  cancel: function () {
    this.setData({
      hiddenChangeName: true
    })
  },
  confirm: function () {
    var that =this
    this.setData({
      hiddenChangeName: true
    });
    var name = this.data.newName;
    wx.request({
      url: 'http://127.0.0.1:8080/saveUser',
      data: {
        openid: getApp().globalData.openid,
        name:name
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          nickname: name
        })
      }
    })
  },
})