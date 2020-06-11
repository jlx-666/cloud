const { $Message } = require('../../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenLeave:true,
    hiddenDelete:true,
    userType:{},
    detail:null,
    who:null,
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
    wx.setNavigationBarTitle({
      title: that.data.detail.name + '(' + that.data.detail.id + ')',
    })
    wx.request({
      url: 'http://' + getApp().globalData.ipAdress + '/judgeWho',
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
            url: 'http://' + getApp().globalData.ipAdress + '/getClassPaperListByState',
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
            url: 'http://' + getApp().globalData.ipAdress + '/getClassPaperListByState',
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
        } else if (that.data.who =='student'){
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
                url: 'http://' + getApp().globalData.ipAdress + '/findHomeworkOfSomeoneInClassIdByState',
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
                url: 'http://' + getApp().globalData.ipAdress + '/findHomeworkOfSomeoneInClassIdByState',
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
        }else{
          that.getNotJoinInfo()
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
      url: 'http://' + getApp().globalData.ipAdress + '/joinClass',
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
      url: 'http://' + getApp().globalData.ipAdress + '/findHomeworkOfSomeoneInClassIdByState',
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
        wx.setStorageSync("checkType", 'homework')
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
    console.log("id:"+e.currentTarget.dataset.id+"         data:"+this.data.notOver)
    //var id = homework.paper_id;
    console.log(id)
    wx.setStorageSync("homeworkOver",true)
    wx.request({
      url: 'http://' + getApp().globalData.ipAdress + '/getById',
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
      url: 'http://' + getApp().globalData.ipAdress + '/getById',
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

  getNotJoinInfo:function(){
    var that = this
    var id = that.data.detail.id
    wx.request({
      url: 'http://' + getApp().globalData.ipAdress + '/getMemberIds',
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
          url: 'http://' + getApp().globalData.ipAdress + '/getNameByMemberIds',
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
      url: 'http://' + getApp().globalData.ipAdress + '/getDetailById',
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
          detail: res.data
        })
        wx.request({
          url: 'http://' + getApp().globalData.ipAdress + '/getNameById',
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
  deleteInput: function (e) {
    this.setData({
      deleteCheck: e.detail.value
    })
  },
  leaveInput: function (e) {
    this.setData({
      leaveCheck: e.detail.value
    })
  },
  deleteClass: function () {
    this.setData({
      hiddenDelete: false
    })
  },
  leave: function () {
    this.setData({
      hiddenLeave: false
    })
  },
  cancel: function () {
    this.setData({
      hiddenLeave: true,
      hiddenDelete:true,
    })
  },
  confirmDelete: function () {
    var that = this
    var deleteCheck = this.data.deleteCheck
    if (deleteCheck != '确认') {
      $Message({
        content: '请输入“确认”！',
        type: 'error'
      })
      return
    }
    wx.request({
      url: 'http://' + getApp().globalData.ipAdress + '/deleteClass',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        classId: that.data.detail.id
      },
      success: function (res) {
        that.setData({
          hiddenDelete: true
        })
        var pages = getCurrentPages();
        var beforePage = pages[pages.length - 2];
        beforePage.onLoad();
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  },
  confirmLeave: function () {
    var that = this
    var leaveCheck = this.data.leaveCheck
    if (leaveCheck != '确认') {
      $Message({
        content: '请输入“确认”！',
        type: 'error'
      })
      return
    }
    wx.request({
      url: 'http://' + getApp().globalData.ipAdress + '/leaveClass',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        openid:  getApp().globalData.openid,
        classId: that.data.detail.id
      },
      success: function (res) {
        that.setData({
          hiddenLeave: true
        })
        var pages = getCurrentPages();
        var beforePage = pages[pages.length - 2];
        beforePage.onLoad();
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  },
})