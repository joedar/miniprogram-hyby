import AJAX from '../../../utils/ajax'
import REPLACE from '../../../utils/replace'

// pages/news/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    title: '',
    image: '',
    createDate: ''
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getDetail()
  },

  getDetail() {
    AJAX.POST({
      url: '/api/wx/news/detail',
      data: { id: this.data.id }
    }).then((res) => {
      let data = res.data
      if (data.success === 'true') {
        const content = data.data.content ? REPLACE.charsToHtml(data.data.content) : ''
        const title = data.data.title
        const createDate = data.data.createDate
        const image = data.data.image
        this.setData({ title, image, createDate, content })
        
      } else {
        console.log(data.msg)
      }
    })
  },

  onShareAppMessage(options) {
    const data = {}
    // 分享的小程序要打开的页面
    data.path = '/pages/index/index'
    // 分享的标题
    data.title = this.data.title
    // 分享窗口的图片，如不传默认显示该页面的缩略图
    this.data.image ? data.imageUrl = this.data.image : delete data.imageUrl
    return data
  }
})