// pages/category/category.js
import { getGoodsList, getSubCateList } from "../../api/product"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loaded: false,
    loading: true,
    size: 20,
    currentIndex: 0,
    category: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initMain(options)
    // this.initMain({cateId: "5f3139095081221952e70995", subCateId: "5f313ff19a2ecb1c6e372d8a"})
  },

  initMain (options) {
    this.fetchDetailData(options).then(({ category, currentIndex, loading }) => {
      this.setData({ category, currentIndex, loading, loaded: true })
      wx.setNavigationBarTitle({
        title: category.name
      })
    })
  },

  fetchDetailData (options) {
    let { category, currentIndex, loading, size } = this.data
    return getSubCateList(options.cateId).then(res => {
      category = res.data
      return getGoodsList({ size, page: 1, category_id: options.subCateId })
    }).then(res => {
      for (var i = 0; i < category.subCategoryList.length; i++) {
        category.subCategoryList[i].hasMore = true
        if(category.subCategoryList[i]._id === options.subCateId) {
          category.subCategoryList[i].itemList = res.data.list
          category.subCategoryList[i].loaded = true
          category.subCategoryList[i].hasMore = res.data.currentPage < res.data.totalPage
          category.subCategoryList[i].page = res.data.currentPage
          currentIndex = i
        } else {
          category.subCategoryList[i].loaded = false
        }

      }
      loading = false
      return { category, currentIndex, loading }
    }).catch(err => {
      console.log(err)
    })
  },

  handleNavItemTap (event) {
    let currentIndex = event.currentTarget.dataset.index
    this.setData({ 
      currentIndex: currentIndex, 
      loading: true
    })
  },

  handleSwiperChange (event) {
    let { category, currentIndex, loading, size } = this.data
    currentIndex = event.detail.current
    let currentItem = category.subCategoryList[currentIndex]
    this.setData({ 
      currentIndex: currentIndex,
    })

    if (currentItem.loaded) {
      this.setData({ loading: false })
    } else {
      this.setData({ loading: true })
      getGoodsList({ size, page: 1, category_id: currentItem._id }).then(res => {
        category.subCategoryList[currentIndex].itemList = res.data.list
        category.subCategoryList[currentIndex].loaded = true
        category.subCategoryList[currentIndex].hasMore = res.data.currentPage < res.data.totalPage
        category.subCategoryList[currentIndex].page = res.data.currentPage
        loading = false
        this.setData({ loading, category })
      }).catch(err => {
        console.log(err)
      })
    }
  },

  handleScrollToLower () {
    let { category, currentIndex, loading, loaded, size } = this.data
    let currentItem = category.subCategoryList[currentIndex]
    if (currentItem.hasMore && currentItem.loaded && !loading) {
      this.setData({ loading: true })
      getGoodsList({ size, page: currentItem.page + 1, category_id: currentItem._id })
      .then(res => {
        category.subCategoryList[currentIndex].itemList = [...category.subCategoryList[currentIndex].itemList, ...res.data.list]
        category.subCategoryList[currentIndex].loaded = true
        category.subCategoryList[currentIndex].hasMore = res.data.currentPage < res.data.totalPage
        category.subCategoryList[currentIndex].page = res.data.currentPage
        this.setData({ loading, category, loading: false })
      }).catch(err => {
        console.log(err)
      })
    }
  },

  handleTapItem (event) {
    const { item, index } = event.detail
    wx.navigateTo({
      url: `/pages/goods/goods?id=${ item._id }`
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})