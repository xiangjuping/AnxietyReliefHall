let id = ''
let collection = false
Page({
  data:{
    text:{},
    collectImg:"../../../images/collect_no.png"
},
  onLoad(options){
    console.log('列表参数',options)
    id = options.id
    wx.cloud.database().collection('read')
      .doc(id)
      .get()
      .then(res =>{
        // console.log('请求成功',res)
        collection = res.data.collection
        this.setData({
          text: res.data,
          collectImg: collection? "../../../images/collect_yes.png" : "../../../images/collect_no.png"
        })
      })
      .catch(err =>{
        console.log('请求失败',err)
      })
  },

  //收藏
  clickCollect(){
    this.setData({
      collectImg: collection? "../../../images/collect_no.png" : "../../../images/collect_yes.png"
    })
    collection=!collection
    wx.cloud.callFunction({
      name:"update",
      data:{
        id: id,
        action:"collection",
        collection: collection
      }
    })
    .then(res=>{
      console.log("改变收藏状态成功")
    })
    .catch(err=>{
      console.log("改变收藏状态失败")
    })
  }
})