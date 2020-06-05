// pages/homework/myHomework/myHomework.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notDone:null,
    haveDone:null,
    noNotDone:null,
    noHaveDone:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(getApp().globalData.openid)
    wx.request({
      url: 'http://' + getApp().globalData.ipAdress + '/changeSomeoneState',//HomeworkController
      data: {
        openid: getApp().globalData.openid,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.request({
          url: 'http://' + getApp().globalData.ipAdress + '/findPersonalHomeworkByState',
          data: {
            openid: getApp().globalData.openid,
            state: '未完成'
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            that.setData({
              notDone: res.data
            })
            if (that.data.notDone.length == 0) {
              that.setData({
                noNotDone: true
              })
            }
            else {
              that.setData({
                noNotDone: false
              })
            }
          }

        })
        wx.request({
          url: 'http://' + getApp().globalData.ipAdress + '/findPersonalHomeworkByState',
          data: {
            openid: getApp().globalData.openid,
            state: '已完成'
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            that.setData({
              haveDone: res.data
            })
            if (that.data.haveDone.length == 0) {
              that.setData({
                noHaveDone: true
              })
            }
            else {
              that.setData({
                noHaveDone: false
              })
            }
          }
        })
      }
    })
   
  },

  goDoHomework: function (e) {
    var homework = e.currentTarget.dataset.item;
    var paper_id = homework.paper_id;
    wx.request({
      url: 'http://' + getApp().globalData.ipAdress + '/getById',
      data: {
        id: paper_id,
      },
      success: function (res) {
        wx.setStorageSync("paper", res.data)
        wx.setStorageSync("homework", homework),
        //console.log(res.data.classId+'1')
        wx.navigateTo({
          url: '/pages/homework/doHomework/doHomework',
        })
      }
    })
  },

  goCheck: function (e) {
    var homework = e.currentTarget.dataset.item;
    var id = homework.paper_id;
    console.log(id)
    wx.request({
      url: 'http://' + getApp().globalData.ipAdress + '/getById',
      data: {
        id: id
      },
      success: function (res) {
        wx.setStorageSync("paper", res.data)
        wx.setStorageSync("homework", homework),
          console.log(res.data)
        wx.navigateTo({
          url: '/pages/myClass/classDetail/check/checkStu/checkStu',
        })
      }
    })
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