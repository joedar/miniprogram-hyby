export default (() => {
  return {
    GET: () => {
      return wx.getStorageSync('Cookie') || null
    },
    SET: (cookie) => {
      wx.setStorageSync('Cookie', cookie)
    }
  }
})()
