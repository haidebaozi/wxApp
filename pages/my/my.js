// pages/my/my.js
import {ClassicModel} from '../../models/classic'
import {BookModel} from '../../models/book'

const classicModel = new ClassicModel()
const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 旧的获取用户信息方法 wx.getUserInfo 授权弹窗
    // wx.getUserInfo({
    //   success: data => {
    //     console.log(data)
    //   }
    // })
    this.userAuthorized()
    this.getMyBookCount()
  },
  userAuthorized() {
    wx.getSetting({
      success: data => {
        // console.log(data)
        if(data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              // console.log(data)
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        } else {
          console.log('未授权')
        }
      }
    })
  },
  getUserInfo(event) {
    // console.log(event)
  },
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    // console.log(userInfo)
    if (userInfo) {
      this.setData({
        authorized: true,
        userInfo
      })
    }
  },
  onJumpToAbout(event) {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },
  onStudy(event) {
    wx.navigateTo({
      url: '/pages/course/course'
    })
  },
  getMyBookCount() {
    bookModel.getMyBookCount()
    .then(res=>{
      this.setData({
        bookCount: res.count
      })
    })
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