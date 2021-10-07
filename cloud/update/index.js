// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})

// 云函数入口函数
exports.main = async (event, context) => {
  if (event.action == 'collection') {
    return await cloud.database().collection('read')
    .doc(event.id)
    .update({
      data:{
        collection: event.collection
      }
    })
    .then(res=>{
      console.log("改变收藏状态成功",res)
      return res
    })
    .catch(res=>{
      console.log("改变收藏状态失败",res)
      return res
    })
  }
  else if (event.action == 'reply') {
    return await cloud.database().collection('mail')
    .doc(event.id)
    .update({
      data:{
        reply: event.reply
      }
    })
    .then(res=>{
      console.log("回复成功",res)
      return res
    })
    .catch(res=>{
      console.log("回复失败",res)
      return res
    })
  }
  else if (event.action == 'collection1') {
    return await cloud.database().collection('radio')
    .doc(event.id)
    .update({
      data:{
        collection: event.collection
      }
    })
    .then(res=>{
      console.log("改变收藏状态成功",res)
      return res
    })
    .catch(res=>{
      console.log("改变收藏状态失败",res)
      return res
    })
  }
}