export default (() =>{
  return {
    SET: (key, value) => {
      let data = wx.getStorageSync('HYBYDATA') || {}
      data[key] = value
      wx.setStorageSync('HYBYDATA', data)
    },
    GET: (key) => {
      let data = wx.getStorageSync('HYBYDATA') || {}
      return data[key] || null
    },
    del: (key) => {
      let data = wx.getStorageSync('HYBYDATA') || {}
      delete data[key]
      wx.setStorageSync('HYBYDATA', data)
    }
  }
})()
