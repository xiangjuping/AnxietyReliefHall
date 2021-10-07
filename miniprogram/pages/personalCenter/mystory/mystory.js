let userInfo = ''
Page({
  data: {
    list:[],
    length:'',
  },
  onLoad(options) {
    userInfo =wx.getStorageSync('user')
    // console.log('用户昵称：',userInfo.nickName)
    this.getList()
  },

  //获取数据
  getList(){
    wx.cloud.database().collection('mail')
    .where({
      name:userInfo.nickName
    })
    .get()
    .then(res=>{
      console.log('成功',res)
      this.setData({
        list: res.data,
        length: res.data.length
      })
    })
    .catch(err=>{
      console.log('失败',err)
    })
  },

  toCheck(e) { 
    console.log('点击跳转到详情页的id',e)
    console.log('点击跳转到详情页的id',e.currentTarget.dataset.id)
    wx.navigateTo({
      //跳转详情页并携带id
      url:'/pages/personalCenter/mystory/receive/receive?id=' + e.currentTarget.dataset.id, 
    })
  },
  
  // 触发下拉刷新时执行
  onPullDownRefresh: function() {
    this.getList()
  },
})