// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: '' //用于显示的页面访问次数数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //方法一 数据库操作写在云函数中，前端仅负责调用
    /*     
    wx.cloud.callFunction({
          name: 'pageCounter',
          data: {},
          success: res => {
            console.error('[云函数] [pageCounter] 调用结果', res.result)
            this.setData({
              count: res.result.count
            })
          },
          fail: err => {
            console.error('[云函数] [pageCounter] 调用失败', err)
          }
        }) 
    */

    //方法二 前端直接操作数据库
    this.pageCounter()
  },

  /**
   * 本地调用数据库更新页面访问次数
   */
  pageCounter: function () {
    // 微信云数据库
    const db = wx.cloud.database()
    // 获取数据库查询及更新指令
    const _ = db.command
    // 获取集合的引用
    // 方法接受一个 name 参数，指定需引用的集合名称
    db.collection('counters')
      // 获取集合数据，或获取根据查询条件筛选后的集合数据。
      .get()
      .then(res => {
        // 判断数据库中是否已有用户的页面访问次数记录，以决定执行规则 4 或 规则 5
        if (res.data.length > 0) {
          // doc 获取记录的引用，方法接受一个 id 参数，指定需引用的记录 ID
          // update 更新多条记录
          // 规则 5 ：当用户再次打开页面，该用户数据记录的 打开页面次数 加 1
          db.collection('counters').doc(res.data[0]._id).update({
            data: {
              // db.command.inc
              // 更新指令。用于指示字段自增某个值，这是个原子操作，使用这个操作指令而不是先读数据、再加、再写回的好处是：
              
              // 原子性：多个用户同时写，对数据库来说都是将字段加一，不会有后来者覆写前者的情况
              // 减少一次网络请求：不需先读再写
              count: _.inc(1)
            }
          })
          this.setData({
            count: res.data[0].count + 1
          })
        } else {
          // 在集合上新增记录
          // 规则 4 ：当用户第一次打开页面，需要在数据库表中添加一条该用户打开页面次数的数据记录，
          // 并设置打开页面的次数为 1
          db.collection('counters').add({
            data: {
              count: 1
            }
          })
          this.setData({
            count: 1
          })
        }
      });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})