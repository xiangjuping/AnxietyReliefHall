Page({
  data: {
    active: 1,
    read:[],
    assorted:[]
  },
  onLoad(options) {
    this.getList()
    
  },

  getList(){
    //文章数据
    wx.cloud.callFunction({
      name:'getRead',
    })
    .then(res=>{
      console.log('成功',res)
      this.setData({
        read: res.result.data
      })
    })
    .catch(err=>{
      console.log('失败',err)
    })
    //科普数据
    wx.cloud.callFunction({
      name:'getMixed',
    })
    .then(res=>{
      console.log('成功',res)
      this.setData({
        assorted: res.result.data
      })
    })
    .catch(err=>{
      console.log('失败',err)
    })
  },


  //电台
  toRadio(){
    wx.navigateTo({
      url: '/pages/index/radio/radio',
    })
  },

  //写故事
  toWrite(){
    wx.navigateTo({
      url: '/pages/index/write/write',
    })
  },

  //阅读推荐
  toRead(e){
    console.log('点击跳转到详情页的id',e.currentTarget.dataset.id)
    wx.navigateTo({
      //跳转详情页并携带id
      url:'/pages/index/read/read?id=' + e.currentTarget.dataset.id, 
    })
  },

  toMixed(e){
    console.log('点击跳转到详情页的id',e.currentTarget.dataset.id)
    wx.navigateTo({
      //跳转详情页并携带id
      url:'/pages/index/assorted/assorted?id=' + e.currentTarget.dataset.id, 
    })
  },
  // 触发下拉刷新时执行
  onPullDownRefresh: function() {
    this.getList()
  },
});