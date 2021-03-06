const { $Message } = require('../../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jump: 0,
    page: 0,
    size: 15,
    list: {},
    maxPage: 0,
    hiddenModal: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://' + getApp().globalData.ipAdress + '/getPaperMaxPage',
      data: {
        size: that.data.size
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          maxPage: res.data
        })
      }
    })
    this.getList()
    console.log(this.data.list)
  },

  nextPage: function () {
    if (this.data.page + 1 == this.data.maxPage) {
      $Message({
        content: '这是最后一页！',
        type: 'error'
      })
      return
    }
    var that = this
    this.setData({
      page: that.data.page + 1
    })
    this.getList()
  },


  lastPage: function () {
    if (this.data.page - 1 < 0) {
      $Message({
        content: '这是第一页！',
        type: 'error'
      })
      return
    }
    var that = this
    this.setData({
      page: that.data.page - 1
    })
    this.getList()
  },

  getList: function () {
    var that = this
    var page = this.data.page
    var size = this.data.size
    wx.request({
      url: 'http://' + getApp().globalData.ipAdress + '/findPaperPage',
      data: {
        page: page,
        size: size
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          list: res.data
        })
      }
    })
  },

  goDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.setStorageSync("homeworkOver", false)
    wx.request({
      url: 'http://' + getApp().globalData.ipAdress + '/getById',
      data: {
        id: id
      },
      success: function (res) {
        wx.setStorageSync("paper", res.data)
        console.log(res.data)
        wx.navigateTo({
          url: '/pages/admin/paper/detail/detail'
        })
      }
    })
  },

  setPage: function (e) {
    this.setData({
      jump: e.detail.value - 1
    })
  },
  goPage: function () {
    this.setData({
      hiddenModal: false
    })
  },
  cancel: function () {
    this.setData({
      hiddenModal: true
    })
  },
  confirm: function () {
    var jump = this.data.jump
    if (jump < 0 || jump > this.data.maxPage - 1) {
      $Message({
        content: '页码超出范围！',
        type: 'error'
      })
      return
    }
    this.setData({
      hiddenModal: true,
      page: jump
    })
    this.getList()
  },
})