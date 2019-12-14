// pages/login/login.js
const app = getApp();
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  getid:function(e){
    wx.login({
      success:function(res){
        wx.getUserInfo({
          success: function (res) {
            app.globalData.userInfo = res.userInfo;
          }
        });
        var appid ='wxe1cc7f0f4f8dc8a9'
        var secret ='92872351035dc74e68fd7b9f3767a3d1'
       
        var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code';
        wx.request({
          url: l,
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
          // header: {}, // 设置请求的 header  
          success: function (res) {
            var obj = {};
            obj.openid = res.data.openid;
            console.log(obj);
            wx.setStorageSync('user', obj);//存储openid  
          }
        });

      }
    })
    var obj = wx.getStorageSync('user');
    wx.request({
      url: 'http://localhost:8080/login',
      data:{
          'openid':obj.openid
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        console.log("1++"+res.data)
        wx.switchTab({
          url: '/pages/home/home',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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