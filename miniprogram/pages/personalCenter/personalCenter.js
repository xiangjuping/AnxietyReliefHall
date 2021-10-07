import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({
  data:{
    //提示弹窗 ？
    modalHidden: true,
    // 用户信息
    userInfo: null,
    // 退出登录弹窗
    show: false,
    // 分享
    showShare: false,
    options: [
      { name: '微信', icon: 'wechat', openType: 'share' },
      { name: '微博', icon: 'weibo' },
      { name: '复制链接', icon: 'link' },
      { name: '分享海报', icon: 'poster' },
      { name: '二维码', icon: 'qrcode' },
    ],
  },

  onLoad() {
    // 获取缓存
    let user = wx.getStorageSync('user')
    console.log('获取用户缓存',user)
      this.setData({
        userInfo:user
      })
  },

  // 显示弹窗 ？
  buttonTap: function() {
    this.setData({
      modalHidden: false
    })
  },

  // 授权登录 ?
  login: function() {
    wx.getUserProfile({
      lang:"zh_CN",
      desc:'授权才能继续使用',
      success: res => {
        let user = res.userInfo
        //缓存用户信息到本地
        wx.setStorageSync('user', user)
        console.log('用户信息',user)
        this.setData({
          modalHidden:true,
          userInfo: user
        })
      },
      fail: res => {
        console.log('授权失败',res)
      }
    })
  },

  //点击取消
  modalCandel: function() {
    // do something
    this.setData({
      modalHidden: true
    })
  },

  // 退出登录弹窗
  onClickConfirm() {
    this.setData({
        fasong: true
    }),
    Dialog.confirm({
      title: '退出登录',
      message:'是否确认退出登录？',
      confirmButtonColor:'#F2911B'
    }).then((logout) => {  
      //退出登录
      console.log('确认退出')
      this.setData({
        userInfo:''
      })
      //清空缓存
      wx.setStorageSync('user', null)
    }).catch(() =>{
      console.log('取消退出')
    })
  },

  // 分享
  onClick(event) {
    this.setData({ showShare: true });
  },
  onClose() {
    this.setData({ showShare: false });
  },
  onSelect(event) {
    Toast(event.detail.name);
    this.onClose();
  },
})