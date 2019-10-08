// 实例化全局app.js
const app = getApp()
import AJAX from '../../utils/ajax'

let page = 1
let pageSize = 6
//------------------------------------
// 用来累加图片的高度
// 由计算结果来判断，图片放左边还是右边
//------------------------------------
let col1H = 0
let col2H = 0

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

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Swiper: {
      imgUrls: [
        'https://hybyapi.wwwj.com.cn/MINIPROGRAM/images/banner/2019082301.jpg',
        'https://hybyapi.wwwj.com.cn/MINIPROGRAM/images/banner/2019082302.jpg',
        'https://hybyapi.wwwj.com.cn/MINIPROGRAM/images/banner/2019082303.jpg'
      ]
    },
    SwiperImageList: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 请求接口返回的list
    dataList: [],
    // 用于渲染页面的list
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { console.log('pages - index - onLoad') },

  // 授权用户信息回调
  bindGetUserInfo(e) {
    // 设置全局变量ISAUTH为true
    app.globalData.ISAUTH = true
    // 将用户信息存到全局数据中
    app.globalData.userInfo = e.detail.userInfo
    if (/ok/.test(e.detail.errMsg)) {
      const userInfo = e.detail.userInfo
      AJAX.POST({
        url: '/api/wx/user/update',
        data: userInfo
      }).then((res) => {
        // console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取banner列表
    this.getBannerList()
    // 获取商品列表
    this.getItemList()
  },

  // 获取banner列表
  getBannerList() {
    try {
      AJAX.GETS({
        url: '/api/wx/banner/list'
      }).then((res) => {
        this.setData({
          SwiperImageList: res.data.data.list
        })
      })
    } catch (err) {
      console.log('err -', err)

    }
    
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

  // 获取商品列表
  getItemList() {
    try {
      AJAX.POSTS({
        url: '/api/wx/item/list',
        data: { page, pageSize }
      }).then((res) => {
        const data = res.data ? res.data : {}
        if (data.success === 'true') {
          this.setData({
            dataList: data.data.list
          })
        }
      })
    } catch (err) {
      console.log('err - ', err)
    }
  },

  buttonClick () {
    console.log(app.globalData)
  },

  goMorningClick () {
    // console.log('goMorningClick - app.globalData - ', app.globalData)
    // 判断是否授权地理位置
    let USERLOCATION = app.globalData.SCOPE.USERLOCATION
    if (!USERLOCATION) {
      wx.showModal({
        title: '温馨提示',
        content: '您未授权地理位置，无法使用此功能！是否授权地理位置？',
        cancelText: '不授权',
        confirmText: '现在授权',
        success: (res) => {
          if (res.confirm) app.OPENSETTING()
        }
      })
      return
    }
    // 获得地理位置
    // 如果非克拉玛依，弹出提示
    // let address = app.globalData.userAddress
    // let province = address.province
    // let city = address.city
    // if (!/克拉玛依/.test(city)) {
    //   wx.showModal({
    //     title: '温馨提示',
    //     content: '您所在的地区，无法使用该功能！'
    //   })
    //   return
    // }
    // 页面跳转morning页面
    wx.navigateTo({
      url: '/pages/morning/morning',
    })
  },
  openSetting () { app.OPENSETTING() },

  itemClick (e) {
    console.log(e)
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
      title: '好运布艺',
      // 分享窗口的图片，如不传默认显示该页面的缩略图
      imageUrl: 'https://hybyapi.wwwj.com.cn/MINIPROGRAM/images/banner/2019082301.jpg',
      // 分享的小程序要打开的页面
      path: '/pages/index/index'
    }
  }
  
})

