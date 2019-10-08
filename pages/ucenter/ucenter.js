const app = getApp()

import AJAX from '../../utils/ajax'
import STORAGE from '../../utils/storage'

// pages/ucenter/ucenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    USERINFO: true
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    // 判断是否授权登录
    this.ISAUTH()
  },

  // 授权用户信息回调
  bindGetUserInfo(e) {
    let errMsg = e.detail.errMsg
    let USERINFO = false
    if (/fail/.test(errMsg)) { USERINFO = false }
    else if (/ok/.test(errMsg)) { USERINFO = true }
    // 设置全局变量
    app.globalData.SCOPE.USERINFO = USERINFO
    // 设置STORAGE
    STORAGE.SET('USERINFO', USERINFO)
    // 改变this.data
    this.setData({ USERINFO: !USERINFO })

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

  // 设置我的授权
  openSetting () {
    app.OPENSETTING()
  },


  // 判断是否授权登录
  ISAUTH () {
    setTimeout(() => {
      let SCOPE = STORAGE.GET('SCOPE')
      let USERINFO = SCOPE.USERINFO

      this.setData({
        USERINFO: !SCOPE.USERINFO
      })

    }, 500)
  }
})