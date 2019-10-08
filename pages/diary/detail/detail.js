import AJAX from '../../../utils/ajax'

// pages/diary/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    detail: {
      // title: '这个就是日记的标题啦',
      // createDate: '2019-09-29 09:03:25',
      // content: '深藏在大海中的密匣究竟是何人所留？古朴晦涩的秘文中又隐藏了怎样的秘密？千年前被抹去的一段历史到底掩盖了怎样诡异的事实？看似偶然的际遇，也许是必然的结果，问谁又能摆脱的冥冥中的安排？让我们抽丝剥茧，寻找谜题的答案'
    }
  },

  getRequestId() {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      this.setData({ id: data.id })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRequestId()
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
    this.getDetail()
  },

  getDetail() {
    if (!this.data.id) return
    console.log(this.data.id)
    AJAX.POST({
      url: '/api/wx/diary/detail',
      data: { id: this.data.id }
    }).then((res) => {
      const detail = res.data.data
      this.setData({ detail })
    }).catch((err) => {
      console.log(err)
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