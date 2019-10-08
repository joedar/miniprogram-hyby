import AJAX from '../../../utils/ajax'
// pages/diary/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    page: 1,
    pageSize: 15,
    list: []
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
    this.getList()
  },

  getList() {
    AJAX.POST({
      url: '/api/wx/diary/list',
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

  // 当长按的时候
  longpress(e) {
    // 获取id
    const id = e.currentTarget.dataset.id
    this.setData({ id: e.currentTarget.dataset.id })
    wx.showActionSheet({
      itemList: ['重新编辑', '删除'],
      success: (res) => {
        if (res.tapIndex === 0) {
          wx.navigateTo({
            url: '/pages/diary/modify/modify',
            success: function (res) {
              res.eventChannel.emit('acceptDataFromOpenerPage', { id })
            }
          })
        } else if (res.tapIndex === 1) {
          this.del()
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  del() {
    AJAX.POST({
      url: '/api/wx/diary/del',
      data: { id: this.data.id }
    }).then((res) => {
      this.setData({
        page: 1
      })
      this.getList()
    }).catch((err) => {
      console.log(err)
    })
  },

  diaryClick(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/diary/detail/detail',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { id })
      }
    })
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