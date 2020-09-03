// components/newItemList/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemList: {
      type: Array,
      observer: function(e) {
        this.setData({
          itemGoodsList: e.slice()
        });
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    itemGoodsList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTapItem (event) {
      const { item, index } = event.currentTarget.dataset
      this.triggerEvent("tapitem", { item, index });
    }
  }
})