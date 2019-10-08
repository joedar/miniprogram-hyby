import AJAX from '../../utils/ajax'

// pages/carts/carts.js
Page({

  data: {
    managed: false,
    selectAllChecked: false,
    totalPrice: 0,
    checkedIds: [],
    cartList: [],
    // cartItem 用于增加或减少购物车数字
    cartItem: {}
  },

  // 生命周期 - 当界面加载的时候
  onLoad: function() {

  },

  // 生命周期 - 当界面显示的时候
  onShow: function() {
    this.getCartList()
  },

  getCartList() {
    AJAX.POST({
      url: '/api/wx/cart/list'
    }).then((res) => {
      console.log(res.data.data.list)
      this.setData({ cartList: res.data.data.list })
    }).catch((err) => {
      console.log(err)
    })
  },

  // 左上角管理按钮点击事件
  manageClick () {
    this.setData({
      managed: !this.data.managed
    })
  },

  // 每个产品左侧的checkbox点击事件
  checkboxClick (e) {
    let cartList = this.data.cartList
    let totalPrice = this.data.totalPrice
    let checkedIds = this.data.checkedIds
    if (e.type === 'change') {
      let id = e.currentTarget.dataset.id
      // let price = e.currentTarget.dataset.price
      // value已判断checkbox是否选中
      let value = e.detail.value[0]
      // 遍历循环cartList
      cartList.forEach((item) => {
        // 如果是该产品
        if (id === item.id) {
          // 定义价格为 价格*数量
          let price = item.price * item.count
          // 如果选中
          if (value) {
            // 该产品checked
            item.checked = true
            // 总价格增加此价格
            totalPrice += price
            // 向checkedIds数组里push(id)
            checkedIds.push(Number(id))
          } else {
            // 移除该产品checked
            delete item.checked
            // 总价格减去此价格
            totalPrice -= price
            // 从checkedIds数组移除该id
            for (let i = 0; i < checkedIds.length; i++) {
              if (checkedIds[i] === id) { checkedIds.splice(i, 1) }
            }
          }
        }
      })
      this.setData({ cartList, totalPrice, checkedIds })
    }
    console.log('---------- 每个产品左侧的checkbox点击事件 ----------')

  },

  // 全选按钮点击事件
  selectAllChange (e) {
    let selectAllChecked = e.detail.value[0] ? true : false
    this.setData({ selectAllChecked })
    
    let cartList = this.data.cartList
    let totalPrice = 0
    let checkedIds = []

    cartList.forEach((item) => {
      // 定义价格为 价格*数量
      let price = item.price * item.count

      if (selectAllChecked) {
        // 每个产品checked
        item.checked = true
        // 总价格增加此价格
        totalPrice += price
        // 向checkedIds数组里push(item.id)
        checkedIds.push(Number(item.id))
      } else {
        // 移除每个产品checked
        delete item.checked
        // 总价格减去此价格
        totalPrice = 0
        // 清空checkedIds数组
        checkedIds = []
      }
    })
    this.setData({ cartList, totalPrice, checkedIds })
    console.log('---------- 全选按钮点击事件 ---------')
  },

  // 每个产品购物车增加或减少按钮点击事件
  countClick (e) {
    let type = e.currentTarget.dataset.type
    let id = e.currentTarget.dataset.id
    let cartList = this.data.cartList
    let totalPrice = this.data.totalPrice
    let cartItem = {}
    cartItem.id = id
    cartList.forEach((item) => {
      // 如果是该产品
      if (id === item.id) {
        // 如果是减少
        if (type === 'less') {
          // 如果count小于2 则返回
          if (item.count < 2) {
            // count为1
            item.count = 1
            return
          } else {
            // count递减1
            item.count--
          }
          // 如果该产品选中
          if (item.checked) totalPrice -= item.price
        // 如果是增加
        } else if (type === 'plus') {
          // count递加1
          item.count++
          // 如果该产品选中
          if (item.checked) totalPrice += item.price
        }
        cartItem.count = item.count
      }
    })
    this.setData({ cartList, totalPrice, cartItem })
    // 购物车商品数量改变事件
    this.cartItemCountChange()
  },

  // 购物车商品数量改变事件
  cartItemCountChange() {
    console.log(this.data.cartItem)
    AJAX.POST({ url: '/api/wx/cart/item.count', data: this.data.cartItem }).catch((err) => {
      console.log(err)
    })
  },

  // 删除操作
  deleteClick () {
    console.log('---------- 删除操作 ----------')
    let checkedIds = this.data.checkedIds
    let len = checkedIds.length
    if (!len) return
    // 弹出提示框
    wx.showModal({
      title: '提示',
      content: '确认将这' + len +'个产品移除购物车？',
      success: (res) => {
        if (res.confirm) {
          console.log('请求接口，已删除')
        }
      }
    })
  },

  // 结算按钮点击事件
  orderClick () {
    // 如果总价为零，则返回
    if (!this.data.totalPrice || !this.data.checkedIds.length) return
    let cartList = []
    this.data.cartList.forEach((item) => {
      if (item.checked) {
        cartList.push(item)
      }
    })
    wx.navigateTo({
      url: '/pages/order/confirm/confirm',
      success: function (res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', {data: cartList})
      }
    })
  },
})