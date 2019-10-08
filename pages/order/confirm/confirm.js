import AJAX from '../../../utils/ajax.js'
import STORAGE from '../../../utils/storage.js'

// pages/order/confirm/confirm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: [
      // {
      //   id: 25,
      //   title: '窗帘遮光简约现代卧室北欧网红款ins棉麻风灰色全轻奢布客厅隔热',
      //   price: 39,
      //   image: 'https://g-search2.alicdn.com/img/bao/uploaded/i4/i4/3346370706/TB1kYQjrh1YBuNjy1zcXXbNcXXa_!!0-item_pic.jpg',
      //   sku: ['红色', '40码'],
      //   discounts: ['miaosha', 'temai'],
      //   count: 2
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      this.setData({
        itemList: data.data
      })
    })
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
    console.log(this.data.itemList)
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

  },


})