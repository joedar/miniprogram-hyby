import AJAX from '../../utils/ajax'

// pages/morning/morning.js
Page({

  // 生成01~19的随机数
  RANDOMS(type) {
    let a = Math.round(Math.random())
    let b = Math.floor(Math.random() * 10)
    let val = null
    if (type === 'day') val = 'day' + a + '' + b
    if (type === 'num') val = Number(a + '' + b)
    return val
  },

  /**
   * 页面的初始数据
   */
  data: {
    days: '',
    totalCount: 0,
    status: {
      big: '',
      small: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('morning.wxml -- onLoad')
    // 增加打卡记录
    this.morningAdd()


    // 获取随机数 - days00
    this.getDays()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log('morning.wxml -- onReady')
    console.log('days - ', this.data.days)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log('morning.wxml -- onShow')

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log('morning.wxml -- onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log('morning.wxml -- onUnload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log('morning.wxml -- onPullDownRefresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log('morning.wxml -- onReachBottom')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  // 获取随机数 - days00
  getDays() {
    this.setData({
      days: this.RANDOMS('day')
    })
  },

  // 增加打卡记录
  morningAdd() {
    AJAX.POST({
      url: '/api/wx/morning/add'
    }).then((res) => {
      let msg, big, small, totalCount = 0
      if (res.data.success === 'true') {
        msg = res.data.data.msg
        totalCount = res.data.data.totalCount
      } else {
        msg = res.data.msg.msg
        totalCount = res.data.msg.totalCount
      }
      switch (msg) {
        case 'ok':
          big = '恭喜！打卡成功'
          small = '您是个非常自律的人，明天继续！'
          break
        case 'early':
          big = '您起的太早了'
          small = '打卡时间为每日6:00~9:00间哦'
          break
        case 'late':
          big = '您起的太晚了'
          small = '明天9点前记得来哦'
          break
        case 'recorded':
          big = '已成功打卡'
          small = '您是个非常自律的人，明天继续！'
          break
        case 'fail':
          big = '打开失败'
          small = '服务器内部错误，不怪您哦'
          break
        default:
          break
      }
      this.setData({
        totalCount,
        status: {
          big,
          small
        }
      })
    }).catch((err) => {
      console.log(err)
    })
  }
})