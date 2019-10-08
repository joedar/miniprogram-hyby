import AJAX from '../../../utils/ajax'

// pages/news/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pageSize: 15,
    list: []
  },

  onLoad: function (options) {
    this.getList()
  },

  getList() {
    AJAX.POST({
      url: '/api/wx/news/list',
      data: {
        page: this.data.page,
        pageSize: this.data.pageSize
      }
    }).then((res) => {
      console.log(res.data.data.list)
      this.setData({
        list: res.data.data.list
      })
    }).catch((err) => {
      console.log(err)
    })
  },

  onShow: function () {

  },

  newsClick(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/news/detail/detail',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { id })
      }
    })
  }
})