import AJAX from '../../../utils/ajax'
import { NEXTPAGE } from '../../../utils/hasNextPage'

// 翻页所需的变量
let page = 1
let pageSize = 8
let totalCount = 0

//------------------------------------
// 用来累加图片的高度
// 由计算结果来判断，图片放左边还是右边
//------------------------------------
let col1H = 0, col2H = 0

//----------------------------------------
// 用来存放请求返回的list以及翻页返回的list
// 将返回的list循环遍历
// 将变量的每一项push到这里来
//----------------------------------------
let dataList = []

//--------------------------
// 用来存放瀑布流的列表
// 左一个列表，由一个列表
//--------------------------
let list = [[], []]

// pages/item/list/list.js
Page({

  data: {
    // 请求接口返回的list
    dataList: [],
    // 用于渲染页面的list
    list: []
  },

  onImageLoad(e) {
    // item的id
    const id = e.currentTarget.dataset.id
    // item的图片的URL
    const image = e.currentTarget.dataset.image
    // item的标题
    const title = e.currentTarget.dataset.title
    // 构建对象
    let obj = { id, image, title }
    // 该图片的宽高比
    const scale = Number((e.detail.width / e.detail.height).toFixed(3))

    if (col1H <= col2H) {
      col1H += scale
      list[0].push(obj)
    } else {
      col2H += scale
      list[1].push(obj)
    }
    this.setData({ list })
  },

  onLoad: function (options) {
    // 获取列表
    this.GETLIST()
  },

  GETLIST() {
    AJAX.POST({
      url: '/api/wx/item/list',
      data: { page, pageSize }
    }).then((res) => {
      const data = res.data ? res.data : {}
      if (data.success === 'true') {
        totalCount = data.data.totalCount
        data.data.list.forEach((item) => {
          dataList.push(item)
        })
        this.setData({ dataList })
      }
    })
  },

  // 当页面触及底部的时候
  onReachBottom: function() {
    let can = NEXTPAGE({ page, pageSize, totalCount })
    if (can) {
      page++
      this.GETLIST()
    }
  },

  // 列表点击事件
  itemClick(e) {
    let id = e.currentTarget.dataset.id
    if (!id) return
    wx.navigateTo({
      url: '/pages/item/detail/detail',
      success: function (res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', { id })
      }
    })
  },

  onShareAppMessage(options) {
    return {
      // 分享的标题
      title: '好运布艺窗帘',
      // 分享窗口的图片，如不传默认显示该页面的缩略图
      imageUrl: 'https://hybyapi.wwwj.com.cn/UPLOAD/images/element/92a71335!!1569741458.jpg',
      // 分享的小程序要打开的页面
      path: '/pages/index/index'
    }
  }
})