var utils =require('../../../utils/utils')
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog'
let detail = ''
// let name = ''
// let img = ''
// let reply = []
let userInfo = ''

Page({
  data:{
    show:false,
  },
  onLoad(){
    userInfo =wx.getStorageSync('user')
    // console.log('用户头像：',userInfo.avatarUrl)
    // console.log('用户昵称：',userInfo.nickName)
  },

  //打印输入框内容
  onContent(e) {
    detail = e.detail.value
    //console.log(detail)  
  },

  //署名
  onChange(e){
    name = e.detail.value
    //console.log(name)
  },

  //添加数据到数据库
  onClickConfirm(){
    if (detail.length <5) {
      wx.showToast({
        icon:"none",
        title: '内容不能过短',
      })
    } 
    else {
      Dialog.confirm({
        title: '是否提交',
        message: '有八百万人就有八百万种孤独 \n 总有一个人愿意倾听你的孤独',
        confirmButtonColor:'#F2911B',
      })
      .then(() => {
        console.log("确认")
        var time = utils.formatTime(new Date());
        this.setData({
          time:time
        })
        console.log(time)
        wx.cloud.database().collection('mail')
        .add({
          data:{
            name: userInfo.nickName,
            detail: detail,
            img:userInfo.avatarUrl,
            reply:[],
            _createTime:time
          }
        })
        .then((res)=>{
          console.log("添加成功",res)
          wx.navigateBack({
            delta: 1,
          })
        })
        .catch((err)=>{
          console.log("添加失败",err)
        })
      })
      .catch(() => {
        
      });
    }
  }

})