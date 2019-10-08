import DATE from '../../../utils/date'
import AJAX from '../../../utils/ajax'

// pages/diary/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: '',
    formData: {}
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
      formData: { title, content, createDate }
    })
    this.add()
  },
  add() {
    AJAX.POST({ url: '/api/wx/diary/add', data: this.data.formData }).then((res) => {
      // 返回上一页
      wx.navigateBack({ delta: 1 })
    }).catch((err) => {
      console.log(err)
    })
  }
})