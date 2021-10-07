let id = ''
Page({
  data:{
    text:[],
    time:''
},
  onLoad(options){
    console.log('列表参数',options)
    id = options.id
    this.getList()
  },

  getList(options){
    // console.log('列表参数',options)
    // id = options.id
    wx.cloud.database().collection('mail')
      .doc(id)
      .get()
      .then(res =>{
        console.log('请求成功',res),
        console.log('时间',res.data._createTime),
        this.setData({
          text: res.data,
          time: res.data._createTime
        })
      })
      .catch(err =>{
        console.log('请求失败',err)
      })
  },
  
  toReply(e){
    console.log('点击了',e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/mailBox/troubleDetail/replyPage/replyPage?id='+e.currentTarget.dataset.id,
    })
  },

  toCheck(e){
    console.log('点击了',e)
  },

  // 触发下拉刷新时执行
  onPullDownRefresh: function() {
    this.getList()
  },
})