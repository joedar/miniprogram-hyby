import COOKIE from './cookie'
import STORAGE from './storage'

export default (() => {
  return {
    /**
     * OBJ = {
     *  url: 'https://www.xxx.com/v1',
     *  data: {
     *    token: '9F8G09DSF8GDD0F98G',
     *    page: 1,
     *    pageSize: 10
     *  }
     * }
     */
    POST: (OBJ) => {
      // 如果没有传OBJ 或者 OBJ.url没有传
      if (!OBJ || !OBJ.url) {
        console.log('no url request')
        return
      }

      // 获取缓存的token
      let token = STORAGE.GET('token')
      if (!token) {
        console.log('no token')
        return
      }

      // 获取cookie
      let cookie = COOKIE.GET()
      if (!cookie) {
        console.log('no cookie')
        return
      }

      // 定义请求头
      let header = {}
      header['content-type'] = 'application/x-www-form-urlencoded'
      header['cookie'] = cookie

      // 请求的地址连接
      let url = 'https://hybyapi.wwwj.com.cn' + OBJ.url
      // 所传来的data
      let data = OBJ.data || {}

      // 需要传递给后端的
      let param = {}
      param.token = token
      for (let key in data) { param[key] = data[key] }

      // 返回 Promise
      return new Promise((resolve, reject) => {
        wx.request({
          url,
          method: 'post',
          data: param,
          header: header,
          success: resolve,
          fail: reject
        })
      })
    },

    POSTS: (OBJ) => {
      // 如果没有传OBJ 或者 OBJ.url没有传
      if (!OBJ || !OBJ.url) {
        console.log('no url request')
        return
      }

      // 定义请求头
      let header = {}
      header['content-type'] = 'application/x-www-form-urlencoded'

      // 请求的地址连接
      let url = 'https://hybyapi.wwwj.com.cn' + OBJ.url
      // 所传来的data
      let data = OBJ.data || {}

      // 需要传递给后端的
      let param = {}
      for (let key in data) { param[key] = data[key] }

      // 返回 Promise
      return new Promise((resolve, reject) => {
        wx.request({
          url,
          method: 'post',
          data: param,
          header: header,
          success: resolve,
          fail: reject
        })
      })
    },

    GETS: (OBJ) => {
      // 如果没有传OBJ 或者 OBJ.url没有传
      if (!OBJ || !OBJ.url) {
        console.log('no url request')
        return
      }

      // 定义请求头
      let header = {}
      header['content-type'] = 'application/x-www-form-urlencoded'

      // 请求的地址连接
      let url = 'https://hybyapi.wwwj.com.cn' + OBJ.url

      // 返回 Promise
      return new Promise((resolve, reject) => {
        wx.request({
          url,
          method: 'get',
          header: header,
          success: resolve,
          fail: reject
        })
      })
    },

    GET: (OBJ) => {
      // 如果没有传OBJ 或者 OBJ.url没有传
      if (!OBJ || !OBJ.url) {
        console.log('no url request')
        return
      }

      // 获取缓存的token
      let token = STORAGE.GET('token')
      if (!token) {
        console.log('no token')
        return
      }

      // 获取cookie
      let cookie = COOKIE.GET()
      if (!cookie) {
        console.log('no cookie')
        return
      }

      // 定义请求头
      let header = {}
      header['content-type'] = 'application/x-www-form-urlencoded'
      header['cookie'] = cookie

      // 请求的地址连接
      let url = 'https://hybyapi.wwwj.com.cn' + OBJ.url + '?token=' + token

      // 返回 Promise
      return new Promise((resolve, reject) => {
        wx.request({
          url,
          method: 'get',
          header: header,
          success: resolve,
          fail: reject
        })
      })
    },

    // 百度ajax请求
    BAIDU: (OBJ) => {
      // 如果没有传OBJ 或者 OBJ.url没有传
      if (!OBJ || !OBJ.url) {
        console.log('no url request')
        return
      }
      // 定义请求地址的链接
      let host = 'https://api.map.baidu.com'
      // 请求的地址连接
      let url = host + OBJ.url
      // 所传来的data
      let data = OBJ.data || {}

      // 需要传递给后端的
      let param = {}
      for (let key in data) { param[key] = data[key] }

      // 定义请求头
      let header = {}
      header['content-type'] = 'application/x-www-form-urlencoded'

      // 返回 Promise
      return new Promise((resolve, reject) => {
        wx.request({
          url,
          method: 'post',
          data: param,
          header: header,
          success: resolve,
          fail: reject
        })
      })
    }
  }
})()
