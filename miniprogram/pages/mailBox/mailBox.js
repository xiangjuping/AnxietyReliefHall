Page({
  data: {
    list:[]
  },
 
  onLoad: function (options) {
    this.getList()
  },
  //获取数据
  getList(){
    wx.cloud.callFunction({
      name:'getData',
    })
    .then(res=>{
      console.log('成功',res)
      this.setData({
        list: res.result.data
      })
    })
    .catch(err=>{
      console.log('失败',err)
    })
  },

  toDetail(e) { 
    console.log('点击跳转到详情页的id',e)
    // console.log('点击跳转到详情页的id',e.currentTarget.dataset.id)
    wx.navigateTo({
      //跳转详情页并携带id
      url:'/pages/mailBox/troubleDetail/troubleDetail?id=' + e.currentTarget.dataset.id, 
    })
  },

  // 触发下拉刷新时执行
  onPullDownRefresh: function() {
    this.getList()
  },
})