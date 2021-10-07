// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  //不换当前环境是哪一个，都可以自由切换
   env: cloud.DYNAMIC_CURRENT_ENV,
})

// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection('mail')
  .orderBy("_createTime",'desc')
  .get()
  .then(res=>{
    return res
  })
  .catch(err=>{
    return err
  })
}