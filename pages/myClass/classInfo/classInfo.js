// pages/myClass/classInfo/classInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    judgeTeacher:false,
    memberIds:null,
    teacherId:null,
    teacher:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8080/getMemberIds',
      data: {
        classId: id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          memberIds: res.data
        })
        console.log(that.data.memberIds)
        wx.request({
          url: 'http://127.0.0.1:8080/getNameByMemberIds',
          data: {
            memberIds: JSON.stringify(that.data.memberIds)
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            that.setData({
              member: res.data
            })
          }
        })
      }
    }),
    console.log(that.data.member)
    wx.request({
      url: 'http://127.0.0.1:8080/getDetailById',
      data: {
        id: id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          teacherId: res.data.masterId,
        })
        wx.request({
          url: 'http://127.0.0.1:8080/getNameById',
          data: {
            openid: that.data.teacherId
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            that.setData({
              teacher: res.data,
            })
          }
        })
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  
})