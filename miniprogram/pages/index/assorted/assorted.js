let id = ''
Page({
  data:{
    text:[],
  },

  onLoad(options){
    console.log('列表参数',options)
    id = options.id
    wx.cloud.database().collection('psycho')
      .doc(id)
      .get()
      .then(res =>{
        console.log('请求成功',res),
        this.setData({
          text: res.data,
        })
      })
      .catch(err =>{
        console.log('请求失败',err)
      })
  },
})