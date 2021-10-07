// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})

// 云函数入口函数
exports.main = async (event, context) => {
  return await  cloud.database().collection('psycho')
    .get()
    .then(res=>{
      console.log('成功',res)
      return res
    })
    .catch(err=>{
      console.log('成功',err)
      return err
    })
}