import STORAGE from './storage'

export default (() => {
  return {
    GET: () => {
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
    OPEN: () => {
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
    }
  }
})()
