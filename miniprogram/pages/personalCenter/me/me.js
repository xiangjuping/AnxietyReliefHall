let sex = ''
Page({
  data:{
    userInfo: '',
    gender:'',
    sex:''
  },
  onLoad() {
    // 获取缓存
    let user = wx.getStorageSync('user')
    console.log('获取用户缓存',user)
    if (user.gender == 1) {
      sex = '男'
    }else if (user.gender == 2) {
      sex = '女'
    }
    this.setData({
      userInfo:user,
      sex:sex
    })
  },
})