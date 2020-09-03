// pages/catalog/catalog.js
import { getCategorySimpleList, getSubCateList } from "../../api/product"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList: [],
    currentIndex: 0,
    subCate: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.initMain()
  },

  initMain () {
    this.fetchData()
  },

  fetchData () {
    let { categoryList, subCate } = this.data
    getCategorySimpleList().then(res => {
      categoryList = res.data
      return getSubCateList(res.data[0]._id)
    }).then(res => {
      subCate = res.data.subCategoryList
      this.setData({
        categoryList,
        subCate
      })
    }).catch(err => {
      console.log(err)
    })
  },

  fetchSubCateData (categoryId) {
    let { subCate } = this.data
    getSubCateList(categoryId).then(res => {
      subCate = res.data.subCategoryList
      this.setData({ subCate })
    }).catch(err => {
      console.log(err)
    })
  },

  handleTapTabBarItem (event) {
    const currentTarget = event.currentTarget
    if (this.data.currentIndex === currentTarget.dataset.index) return
    this.setData({ currentIndex: currentTarget.dataset.index })
    this.fetchSubCateData(currentTarget.dataset.id)
  },

  handleTapSubCate (event) {
    const currentTarget = event.currentTarget
    wx.navigateTo({
        url: "/pages/category/category?cateId=" + currentTarget.dataset.cateId + "&subCateId=" + currentTarget.dataset.subCateId
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