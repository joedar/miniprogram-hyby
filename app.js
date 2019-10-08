import AJAX from './utils/ajax'
import STORAGE from './utils/storage'
import COOKIE from './utils/cookie'

//app.js
App({
  globalData: {},

  // 查看授权设置
  GETSETTING () {
    wx.getSetting({
      success: (res) => {
        let SCOPE = {}
        // 是否授权用户信息，对应接口 wx.getUserInfo
        SCOPE.USERINFO = res.authSetting['scope.userInfo']
        // 是否授权地理位置，对应接口 wx.getLocation, wx.chooseLocation
        SCOPE.USERLOCATION = res.authSetting['scope.userLocation']
        // 是否授权通讯地址，对应接口 wx.chooseAddress
        SCOPE.ADDRESS = res.authSetting['scope.address']
        // 是否授权发票抬头，对应接口 wx.chooseInvoiceTitle
        SCOPE.INVOICETITLE = res.authSetting['scope.invoiceTitle']
        // 是否授权获取发票，对应接口 wx.chooseInvoice
        SCOPE.INVOICE = res.authSetting['scope.invoice']
        // 是否授权微信运动步数，对应接口 wx.getWeRunData
        SCOPE.WERUN = res.authSetting['scope.werun']
        // 是否授权录音功能，对应接口 wx.startRecord
        SCOPE.RECORD = res.authSetting['scope.record']
        // 是否授权保存到相册 wx.saveImageToPhotosAlbum, wx.saveVideoToPhotosAlbum
        SCOPE.WRITEPHOTOALBUM = res.authSetting['scope.writePhotosAlbum']
        // 是否授权摄像头，对应[camera]((camera)) 组件
        SCOPE.CAMERA = res.authSetting['scope.camera']
        this.globalData.SCOPE = SCOPE
        STORAGE.SET('SCOPE', SCOPE)
      }
    })
  },
  // 打开授权设置
  OPENSETTING () {
    wx.openSetting({
      success: (res) => {
        // 是否授权用户信息，对应接口 wx.getUserInfo
        this.globalData.SCOPE.USERINFO = res.authSetting['scope.userInfo']
        // 是否授权地理位置，对应接口 wx.getLocation, wx.chooseLocation
        this.globalData.SCOPE.USERLOCATION = res.authSetting['scope.userLocation']
        if (res.authSetting['scope.userLocation']) this.GETLOCATION()
        // 是否授权通讯地址，对应接口 wx.chooseAddress
        this.globalData.SCOPE.ADDRESS = res.authSetting['scope.address']
        // 是否授权发票抬头，对应接口 wx.chooseInvoiceTitle
        this.globalData.SCOPE.INVOICETITLE = res.authSetting['scope.invoiceTitle']
        // 是否授权获取发票，对应接口 wx.chooseInvoice
        this.globalData.SCOPE.INVOICE = res.authSetting['scope.invoice']
        // 是否授权微信运动步数，对应接口 wx.getWeRunData
        this.globalData.SCOPE.WERUN = res.authSetting['scope.werun']
        // 是否授权录音功能，对应接口 wx.startRecord
        this.globalData.SCOPE.RECORD = res.authSetting['scope.record']
        // 是否授权保存到相册 wx.saveImageToPhotosAlbum, wx.saveVideoToPhotosAlbum
        this.globalData.SCOPE.WRITEPHOTOALBUM = res.authSetting['scope.writePhotosAlbum']
        // 是否授权摄像头，对应[camera]((camera)) 组件
        this.globalData.SCOPE.CAMERA = res.authSetting['scope.camera']

        console.log(this.globalData)
        STORAGE.SET('SCOPE', this.globalData.SCOPE)
      }
    })
  },

  // 获取地理位置
  GETLOCATION () {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        AJAX.BAIDU({
          url: '/reverse_geocoding/v3/',
          data: {
            ak: 'N8hY8lDO4OxAdbZuYmDzbWy8UibvBm4Q',
            location: res.latitude + ',' + res.longitude,
            output: 'json'
          }
        }).then((res) => {
          this.globalData.userAddress = res.data.result.addressComponent
        }).catch((err) => {
          console.log(err)
        })
      },
      fail: (err) => {
        console.log(err)
        delete this.globalData.userAddress
      }
    })
  },

  /**
   * ===================================================
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   * ===================================================
   */
  onLaunch: function () {
    // 设置全局data并写入storage
    if (!wx.getStorageSync('HYBYDATA')) { wx.setStorageSync('HYBYDATA', {}) }

    // 查看是否授权
    this.GETSETTING()

    // 获取地理位置
    this.GETLOCATION()

    // wx.request({
    //   url: 'https://hybyapi.wwwj.com.cn/api/wx/user/get',
    //   method: 'get',
    //   header: { 'content-type': 'application/x-www-form-urlencoded' },
    //   success: (res) => {
    //     console.log('/api/wx/user/get - ', res)
    //   }
    // })

    // wx.getUserInfo({
    //   success: function (res) {
    //     var userInfo = res.userInfo
    //     var nickName = userInfo.nickName
    //     var avatarUrl = userInfo.avatarUrl
    //     var gender = userInfo.gender //性别 0：未知、1：男、2：女
    //     var province = userInfo.province
    //     var city = userInfo.city
    //     var country = userInfo.country
    //   }
    // })

    // wx.getLocation({
    //   type: 'wgs84',
    //   success: (res) => {
    //     console.log(res)
    //     const latitude = res.latitude
    //     const longitude = res.longitude
    //     const speed = res.speed
    //     const accuracy = res.accuracy
    //   }
    // })

    // 如果没有token 就登录
    if (!wx.getStorageSync('HYBYDATA') || !wx.getStorageSync('HYBYDATA').token) {
      console.log('如果没有token')
      this.login()
    // 如果有token 就判断是否登录
    } else {
      console.log('如果有token')
      this.loginJudge()
    }
  },

  // 小程序登录，获取token
  login () {
    // wx.login
    wx.login({
      success: (res) => {
        // 获取code
        const code = res.code
        // wx.request
        wx.request({
          url: 'https://hybyapi.wwwj.com.cn/api/wx/login.token',
          method: 'post',
          data: { code },
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: (res) => {
            // 如果有响应头 将cookie写入storage
            if (res.header) {
              let cookie = null
              if (res.header['Set-Cookie']) cookie = res.header['Set-Cookie']
              if (res.header['set-cookie']) cookie = res.header['set-cookie']
              COOKIE.SET(cookie)
            }
            // 如果请求成功
            if (res.data.success === 'true') {
              // 设置缓存Storage
              STORAGE.SET('token', res.data.data.token)
              // 添加微信用户
              this.WXUSERADD()
            } else {
              console.log(res.data.msg)
            }
          },
          fail: (err) => {
            console.log(err)
          }
        })
      }
    })
  },

  // 判断是否登录
  loginJudge () {
    AJAX.GET({
      url: '/api/wx/login.judge'
    }).then((res) => {
      // 如果请求成功
      if (res.data.success === 'true') {
        // 如果登录 写入全局变量true
        if (res.data.data.logined) this.globalData.logined = true

        // 添加微信用户
        this.WXUSERADD()

      } else {
        // 未登录 写入全局变量false
        this.globalData.logined = false
        // 重新登录
        this.login()
      }
    }).catch((err) => {
      console.log(err)
    })
  },

  // 添加微信用户
  WXUSERADD () {
    AJAX.GET({ url: '/api/wx/user/add' }).then((res) => {
      if (res.data.success === 'true') {
        console.log('添加微信用户至数据库成功')
      } else {
        console.log('该微信用户已存在数据库')
      }
    }).catch((err) => {
      console.log(err)
    })
  }
})


/**
 * ---------------------------------
 *     在需要授权的页面做以下配置
 * ---------------------------------
 * 
 * 点击跳去 ‘使用我的用户信息’ 设置
 * <button open-type="openSetting">按钮</button>
 * 
 * 点击 直接弹出授权弹出层
 * -------- xxx/xxx.wxml --------
 * <button wx:if="{{canIUse}}" open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="bindGetUserInfo">授权登录</button>
 * <view wx:else>请升级微信版本</view>
 * -------- xxx/xxx.js --------
 * data: {
 *   canIUse: wx.canIUse('button.open-type.getUserInfo')
 * },
 * bindGetUserInfo (e) {
 *   // ...
 * }
 */

// {
//   "pagePath": "pages/carts/carts",
//     "text": "购物车",
//       "iconPath": "static/images/tabBar/cart.png",
//         "selectedIconPath": "static/images/tabBar/cart-selected.png"
// },
// {
//   "pagePath": "pages/item/list/list",
//     "text": "产品列表",
//       "iconPath": "static/images/tabBar/item.png",
//         "selectedIconPath": "static/images/tabBar/item-selected.png"
// },