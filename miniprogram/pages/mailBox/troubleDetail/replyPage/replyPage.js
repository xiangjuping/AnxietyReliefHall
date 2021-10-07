import Dialog from '../../../../miniprogram_npm/@vant/weapp/dialog/dialog'
let reply = []
let content = ''
let name = ''
let id = ''

Page({
  data:{
    huifu:[],
    show:false,
  },
  onLoad(options) {
    console.log('列表参数',options)
    id = options.id
    wx.cloud.database().collection('mail')
    .doc(id)
    .get()
    .then(res =>{
      this.setData({
        huifu: res.data 
      })
      if (res.data.reply) {
        reply=res.data.reply
        console.log("reply=",reply)
      }
    })
    .catch(err =>{
      console.log('请求失败',err)
    })
  },

  //获取内容
  onMessage(e){
    //console.log("内容："+ e.detail.value)
    content = e.detail.value
    // console.log("回信内容："+ content)
    // this.setData({
    //   message:e.detail.value
    // })
  },

  //获取署名
  onChange(e){
    // console.log("署名："+e.detail.value)
    name = e.detail.value
    // console.log("署名："+ name)
  },

  //提交 
  publish(){
    if (content.length < 5){
      wx.showToast({
        icon:"none",
        title: '内容不能过短',
      })
      return
    }else if (name.length < 1) {
      wx.showToast({
        icon:"none",
        title: '署名不能为空',
      })
      return
    }
    let replyItem = {}
    replyItem.name = name
    replyItem.content = content
    reply.push(replyItem)
    console.log("添加后的回复：",reply)
    wx.cloud.callFunction({
      name:"update",
      data:{
        id: id,
        action:"reply",
        reply:reply
      }
    }).then(res=>{
      console.log("回复成功",res)
      Dialog.alert({
        title: '回复成功',
        message: '有八百万人就有八百万种孤独 \n 总有一个人愿意倾听你的孤独',
        confirmButtonColor:'#F2911B',
      })
      .then(() => {
        console.log("确认")
        wx.navigateBack({
          delta: 1,
        })
      })
      // .catch(() => {
      //   // on cancel
      // });
    }).catch(err=>{
      console.log("回复失败",err)
    })
  }
})