import AJAX from '../../utils/ajax'
import DATE from '../../utils/date'

let LIST = []


// pages/morning-list/morning-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listObj: {
      page: 1,
      pageSize: 15
    },
    list: [],
    thisPage: 0,
    totalCount: 0
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取早起打卡记录列表
    this.GET()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 当前页数
    let page = this.data.listObj.page
    let thisPage = this.data.thisPage
    // 总页数
    let pages = Math.ceil(this.data.totalCount / this.data.listObj.pageSize)

    // 如果总页数小于2 或者 当前页就是总页数
    if (pages < 2 || thisPage === pages) return

    this.setData({
      listObj: { page: page++ }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 获取早起打卡记录列表
  GET () {
    console.log('morning-list - onShow - getMorningList')
    wx.showLoading()
    AJAX.POST({
      url: '/api/wx/morning/list',
      data: this.data.listObj
    }).then((res) => {
      wx.hideLoading()
      if (res.data.success === 'true') {
        this.setData({
          totalCount: res.data.data.totalCount,
          thisPage: res.data.data.thisPage
        })
        // 处理数据
        this.dealWithList(res.data.data.list)
      } else {
        console.log(data.msg)
      }
    }).catch((err) => {
      wx.hideLoading()
      console.log(err)
    })
  },

  // 处理数据
  dealWithList (arr) {
    // 如果是第一页 清空列表
    if (this.data.listObj.page === 1) LIST = []

    if (arr.length) {
      for (let i=0; i<arr.length; i++) {
        let id = arr[i].id
        let recordTime = arr[i].recordTime * 1e3
        // 将YYYY/MM/DD转换为 YYYY年MM月D日
        let recordDate_arr = arr[i].recordDate.split('/')
        let date = recordDate_arr[0] + '年' + recordDate_arr[1] + '月' + recordDate_arr[2] + '日'
        // 换算出星期几
        let day
        switch (arr[i].week) {
          case 1: day = '一'; break
          case 2: day = '二'; break
          case 3: day = '三'; break
          case 4: day = '四'; break
          case 5: day = '五'; break
          case 6: day = '六'; break
          case 7: day = '日'; break
          default: break
        }
        let week = '星期'+day
        // 打卡的几点钟
        let h = DATE.GET('h', recordTime)
        // 打卡的状态
        let good
        switch (h) {
          case 6: good = 'green'; break
          case 7: good = 'orange'; break
          case 8: good = 'red'; break
          default: break
        }
        // 具体的时间
        let hms = DATE.GET('h:m:s', recordTime)
        // 将结果push到LIST里
        LIST.push({ id, date, week, h, good, hms })
      }
    }
    this.setData({
      list: LIST
    })
  }

})