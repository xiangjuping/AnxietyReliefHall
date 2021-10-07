//获取应用实例
const bgMusic = wx.getBackgroundAudioManager()
const app = getApp()

let collection = false
let id = '' 

Page({
  data: {
    text:[],
    collectImg:"../../../../images/collect_no.png",
    isOpen: false,//播放开关
    starttime: '00:00', //正在播放时长
    //duration: '08:02',   //总时长
    duration:[],
    // src:"https://636c-cloud1-2g80dbl090309d49-1307246739.tcb.qcloud.la/radio-music/music1.mp3"
    src:[]
  },
  onLoad(options){
    console.log('列表参数',options)
    id = options.id
    wx.cloud.database().collection('radio')
      .doc(id)
      .get()
      .then(res =>{
        console.log('请求成功',res),
        collection = res.data.collection
        this.setData({
          text: res.data,
          src:res.data.music,
          duration:res.data.duration,
          collectImg: collection? "../../../../images/collect_yes.png" : "../../../../images/collect_no.png"
        })
      })
      .catch(err =>{
        console.log('请求失败',err)
      })
  },

  //收藏
  clickCollect(){
    this.setData({
      collectImg: collection? "../../../../images/collect_no.png" : "../../../../images/collect_yes.png"
    })
    collection=!collection
    wx.cloud.callFunction({
      name:"update",
      data:{
        id: id,
        action:"collection1",
        collection: collection
      }
    })
    .then(res=>{
      console.log("改变收藏状态成功")
    })
    .catch(err=>{
      console.log("改变收藏状态失败")
    })
  },

  // 播放
  listenerButtonPlay: function () {
    var that = this
    //bug ios 播放时必须加title 不然会报错导致音乐不播放
    bgMusic.title = '此时此刻'  
    bgMusic.epname = '此时此刻'
    bgMusic.src = that.data.src;
    // bgMusic.src = text.music;
    bgMusic.onTimeUpdate(() => { 
      // bgMusic.duration总时长  bgMusic.currentTime当前进度
      // console.log(bgMusic.currentTime)
      // var duration = bgMusic.duration; 
      // var offset = bgMusic.currentTime;  
      var currentTime = parseInt(bgMusic.currentTime);
      var min = "0" + parseInt(currentTime / 60);
      var max = parseInt(bgMusic.duration);
      var sec = currentTime % 60;
      if (sec < 10) {
        sec = "0" + sec;
      };
      var starttime = min + ':' + sec;   /*  00:00  */
      that.setData({
        offset: currentTime,
        starttime: starttime,
        max: max,
        changePlay: true
      })
    })
    //播放结束
    bgMusic.onEnded(() => {
      that.setData({
        starttime: '00:00',
        isOpen: false,
        offset: 0
      })
      console.log("音乐播放结束");
    })
    bgMusic.play();
    that.setData({
      isOpen: true,
    })
  },
  //暂停播放
  listenerButtonPause(){
     var that = this
    bgMusic.pause()
    that.setData({
      isOpen: false,
    })
  },
  listenerButtonStop(){
    var that = this
    bgMusic.stop()
  },
  // 进度条拖拽
  sliderChange(e) {
    var that = this
    var offset = parseInt(e.detail.value);
    bgMusic.play();
    bgMusic.seek(offset);
    that.setData({
      isOpen: true,
    })
  },
  // 页面卸载时停止播放
  onUnload() {
    var that = this
    that.listenerButtonStop()//停止播放
    console.log("离开")
  },
})