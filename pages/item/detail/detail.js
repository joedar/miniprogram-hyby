import AJAX from '../../../utils/ajax'
import REPLACE from '../../../utils/replace'

// pages/item/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemId: 0,
    detail: {},
    detailContent: '',
    popShow: false,
    popshowtype: '',
    pophidetype: '',
    zan: {
      ed: '',
      count: 0
    },
    colorList: [],
    // 已选中的颜色
    colorSelected: ''
  },

  getRequestId() {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      this.setData({ itemId: data.id })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 或去传过来的ID
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
    AJAX.POST({
      url: '/api/wx/item/detail',
      data: { id: this.data.itemId || 6 }
    }).then((res) => {
      let data = res.data
      if (data.success === 'true') {
        let detailContent = data.data.content ? REPLACE.charsToHtml(data.data.content) : ''
        console.log(detailContent)
        // 处理colors数组
        let colorList = []
        data.data.colors.forEach((item) => {
          colorList.push({
            value: item
          })
        })
        this.setData({
          detail: data.data,
          detailContent,
          colorList
        })
      } else {
        console.log(data.msg)
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
  onShareAppMessage: function (res) {
    console.log(res)
  },

  shareClick () {
    console.log('shareClick')
    wx.updateShareMenu({
      withShareTicket: true
    })
  },

  // 加入购物车/立即购买 按钮点击事件
  showPopClick(e) {
    let popshowtype = e.currentTarget.dataset.popshowtype
    this.setData({ popshowtype })
    this.showPop()
  },

  // pop窗口隐藏
  hidePop() {
    this.setData({ popShow: false })
  },
  // pop窗口显示
  showPop() {
    this.setData({ popShow: true })
  },

  // 选择颜色点击事件
  popItemClick(e) {
    let colorList = this.data.colorList
    let value = e.currentTarget.dataset.value
    // 遍历颜色数组
    colorList.forEach((item) => {
      // 首先取消掉所有的选中
      item.checked = false
      // 如果 选中data-value 等于 item.value
      if (value === item.value) {
        // 如果 data.colorSelected有值 并且等于 item.value
        if (this.data.colorSelected && this.data.colorSelected === item.value) {
          // 将 选中data-value的值 为空
          value = ''
          // 取消选中
          item.checked = false
          // 否则
        } else {
          // 选中
          item.checked = true
        }
      }
    })
    this.setData({ colorList, colorSelected: value })
  },

  // 隐藏弹出层点击事件
  hidePopClick (e) {
    // 隐藏的类型：popbg|closeBtn|confirm
    let pophidetype = e.currentTarget.dataset.pophidetype
    // 显示的类型：cart|order
    let popshowtype = this.data.popshowtype

    // 如果不是确定按钮点击的话
    if (pophidetype !== 'confirm') {
      this.hidePop()
      return
    } else {
      // 如果为选择颜色的话
      if (!this.data.colorSelected) {
        wx.showToast({ title: '请选择颜色', icon: 'none' })
        return
      }
      if (popshowtype === 'cart') {
        // 添加购物车
        this.addToCart()
      } else if (popshowtype === 'order') {
        this.hidePop()
        // 跳转去订单确认页面
        this.goOrderConfirm()
      }
    }
  },

  // 添加购物车
  addToCart () {
    // this.addToCartSuccess()
    // console.log(this.data.itemId)
    AJAX.POST({
      url: '/api/wx/cart/add',
      data: {
        itemId: this.data.itemId,
        color: this.data.colorSelected
      }
    }).then((res) => {
      this.addToCartSuccess()
    }).catch((err) => {
      console.log(err)
    })
  },

  addToCartSuccess () {
    wx.showToast({
      title: '成功加入购物车',
      icon: 'success',
      duration: 1500
    })
    this.hidePop()
  },

  // 跳转去订单确认页面
  goOrderConfirm () {
    wx.navigateTo({
      url: '/pages/order/confirm/confirm',
    })
  }

})