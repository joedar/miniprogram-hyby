import AJAX from '../../utils/ajax'


// components/morning/morning.js
Component({
  
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 生命周期
   */
  lifetimes: {
    attached: function(){
      console.log('Component - morning - attached')
    },
    detached: function(){
      console.log('Component - morning - detached')
    },
    ready: function () {
      console.log('Component - morning - ready')
    }
  },

  pageLifetimes: {
    show: function () {
      console.log('Component - morning - pageLifetimes - show')
      // 获取打卡总数
      this.getTotalCount()
    },
    hide: function () {
      console.log('Component - morning - pageLifetimes - hide')
    },
    resize: function () {
      console.log('Component - morning - pageLifetimes - resize')
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    totalCount: 0,
    recordType: '天累计'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取打卡总数
    getTotalCount () {
      try {
        AJAX.POST({
          url: '/api/wx/morning/totalCount'
        }).then((res) => {
          if (res.data.success === 'true') {
            let totalCount = res.data.data.totalCount
            this.setData({
              totalCount
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      } catch (err) {
        console.log('err - ', err)
        this.setData({
          totalCount: 0
        })
      }
    }
  }
})
