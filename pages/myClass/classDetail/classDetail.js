// pages/myClass/classDetail/classDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userType:{},
    detail:null,
    who:"notJoin",
    teacher:null,
    homeworkOver:null,
    homeworkNotOver:null,
    over:{},
    notOver:{},
    noNotOver:true,
    noOver:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      detail:wx.getStorageSync("detail"),
      userType:getApp().globalData.userType
    })
    wx.request({
      url: 'http://127.0.0.1:8080/judgeWho',
      data: {
        openId:getApp().globalData.openid,
        classId:that.data.detail.id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          who:res.data
        })
        if(that.data.who=='teacher'){
          wx.request({
            url: 'http://127.0.0.1:8080/getClassPaperListByState',
            data: {
              classId: that.data.detail.id,
              state: '未完成'
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              that.setData({
                notOver: res.data
              })
              if (that.data.notOver.length != 0) {
                that.setData({
                  noNotOver: false
                })
              }
            },
          })
          wx.request({
            url: 'http://127.0.0.1:8080/getClassPaperListByState',
            data: {
              classId: that.data.detail.id,
              state: '已完成'
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              that.setData({
                over: res.data
              })
              if (that.data.over.length != 0) {
                that.setData({
                  noOver: false
                })
              }
            },
          })
        }else{
          wx.request({
            url: 'http://127.0.0.1:8080/changeSomeoneState',//HomeworkController
            data: {
              openid: getApp().globalData.openid,
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              wx.request({
                url: 'http://127.0.0.1:8080/findHomeworkOfSomeoneInClassIdByState',
                data: {
                  openId: getApp().globalData.openid,
                  classId: that.data.detail.id,
                  state: '未完成'
                },
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  that.setData({
                    homeworkNotOver: res.data,
                  })
                  if (that.data.homeworkNotOver.length != 0) {
                    that.setData({
                      noNotOver: false
                    })
                  }
                }
              })
              wx.request({
                url: 'http://127.0.0.1:8080/findHomeworkOfSomeoneInClassIdByState',
                data: {
                  openId: getApp().globalData.openid,
                  classId: that.data.detail.id,
                  state: '已完成'
                },
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  that.setData({
                    homeworkOver: res.data,
                  })
                  if (that.data.homeworkOver.length != 0) {
                    that.setData({
                      noOver: false
                    })
                  }
                }
              })
            }
          })
        }
        
      },  
    })

   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  join:function(){
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8080/joinClass',
      data: {
        openId: getApp().globalData.openid,
        classId: that.data.detail.id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          who:'student'
        }),
          wx.switchTab({
            url: '/pages/myClass/myClass',
            success(res) {
              let page = getCurrentPages().pop()
              if (page == undefined || page == null) {
                return
              }
              page.onLoad()
            }
          })
      }
    })
  },
  goInfo:function(){
    var id = this.data.detail.id
    wx.navigateTo({
      url: '/pages/myClass/classInfo/classInfo?id='+id,
    })
  },

  toAdd:function(){
    var that = this
    let classId = that.data.detail.id
    wx.navigateTo({
      url: '/pages/homework/addHomework?classId='+classId,
    })
  },

  findPersonalHomework:function(){
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8080/findHomeworkOfSomeoneInClassIdByState',
      data: {
        openid: getApp().globalData.openid,
        classId: that.data.detail.id,
        state:'未完成'
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          homework:res.data
        })
        console.log(res.data)
      }
    })
  },
  goDoHomework: function (e) {
    var homework = e.currentTarget.dataset.item;
    var paper_id = homework.paper_id;
    wx.request({
      url: 'http://127.0.0.1:8080/getById',
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
      url: 'http://127.0.0.1:8080/getById',
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
  goOverCheck: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.setStorageSync("homeworkOver",true)
    wx.request({
      url: 'http://127.0.0.1:8080/getById',
      data: {
        id: id
      },
      success: function (res) {
        wx.setStorageSync("paper", res.data)
        console.log(res.data)
        wx.navigateTo({
          url:'/pages/myClass/classDetail/check/check'
        })
      }
    })
  },
  goNotOverCheck: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.setStorageSync("homeworkOver",false)
    wx.request({
      url: 'http://127.0.0.1:8080/getById',
      data: {
        id: id
      },
      success: function (res) {
        wx.setStorageSync("paper", res.data)
        console.log(res.data)
        wx.navigateTo({
          url: '/pages/myClass/classDetail/check/check'
        })
      }
    })
  },
})