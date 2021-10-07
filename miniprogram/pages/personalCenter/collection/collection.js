Page({
  data:{
    read:[],
    radio:[],
    length1:'',
    length2:'',
    active: 0,
  },
  onLoad(options) {
    this.getList()
  },

  //获取数据
  getList(){
    wx.cloud.database().collection('read')
    .where({
      collection: true
    })
    .get()
    .then(res=>{
      console.log('成功',res)
      this.setData({
        read: res.data,
        length1: res.data.length
      })
    })
    .catch(err=>{
      console.log('失败',err)
    })

    wx.cloud.database().collection('radio')
    .where({
      collection: true
    })
    .get()
    .then(res=>{
      console.log('成功',res)
      this.setData({
        radio: res.data,
        length2: res.data.length
      })
    })
    .catch(err=>{
      console.log('失败',err)
    })
  },

  //阅读
  toRead(e){
    console.log('点击跳转到详情页',e)
    wx.navigateTo({
      //跳转详情页并携带id
      url:'/pages/index/read/read?id=' + e.currentTarget.dataset.id, 
    })
  },
  //音乐
  tomusicPage(e){
    //console.log('点击跳转到详情页的id',e)
      wx.navigateTo({
        url: '/pages/index/radio/musicPage/musicPage?id='+ e.currentTarget.dataset.id,
      })
    },

    // 触发下拉刷新时执行
    onPullDownRefresh: function() {
      this.getList()
    },
})