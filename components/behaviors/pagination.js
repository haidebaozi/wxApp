const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: null,
    noneResult: false
  },
  methods: {
    setMoreData(dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },
    getCurrentStart() {
      return this.data.dataArray.length
    },
    setTotal(total) {
      this.data.total = total
      if(total === 0) {
        this.setData({
          noneResult: true
        })
      }
    },
    // 是否还有更多的数据需要加载
    hasMore() {
      // total
      if(this.data.dataArray.length >= this.data.length) {
        return false
      } else {
        return true
      }
    },
    initialize() {
      // this.data.dataArray = []
      this.setData({
        dataArray: [],
        noneResult: false
      })
      this.data.total = null
    }
  }
})

export {
  paginationBev
}