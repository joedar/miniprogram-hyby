import DATE from '../../../utils/date'
import AJAX from '../../../utils/ajax'

// pages/diary/modify/modify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    title: '',
    content: '',
    formData: {}
  },

  getRequestId() {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      this.setData({ id: data.id })
      console.log(data.id)
    })
  },

  onLoad: function() {
    this.getRequestId()
  },

  onShow: function() {
    this.getDetail()
  },

  getDetail() {
    AJAX.POST({
      url: '/api/wx/diary/detail',
      data: { id: this.data.id }
    }).then((res) => {
      const data = res.data.data
      this.setData({ title: data.title, content: data.content })
    }).catch((err) => {
      console.log(err)
    })
  },

  diaryTitleInput(e) {
    this.setData({
      title: e.detail.value
    })
  },

  diaryContentInput(e) {
    this.setData({
      content: e.detail.value
    })
  },

  SUBMITCLICK() {
    const title = this.data.title
    if (!title) {
      wx.showToast({ title: '请输入标题', icon: 'none', duration: 2000 })
      return
    }
    const content = this.data.content
    if (!content) {
      wx.showToast({ title: '请输入内容', icon: 'none', duration: 2000 })
      return
    }
    const createDate = DATE.GET('Y-M-Dhms', +new Date())
    this.setData({
      formData: { title, content, createDate, id: this.data.id }
    })

    console.log(this.data.formData)
    this.modify()
  },
  modify() {
    AJAX.POST({ url: '/api/wx/diary/modify', data: this.data.formData }).then((res) => {
      // 返回上一页
      wx.navigateBack({ delta: 1 })
    }).catch((err) => {
      console.log(err)
    })
  }
})
