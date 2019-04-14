//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bt: "备忘录",
    tj: '../images/tj.png',
    sc: '../images/sc.png',
    value: null,
    list: [],
    but1: "添加",
    but2: "删除",
    startX: 0, //开始坐标 
    startY: 0,
    delBtnWidth:67
    //delBtnWidth
    // right:""
  },
  int(e) {
    var value = e.detail.value;
    this.setData({
      value: value
    })
  },

  btpclick() {
    if (this.data.value == null || this.data.value == "") {
      wx.showToast({
        title: '添加失败',
      })
    } else {
      wx.showToast({
        title: '添加成功',
      })
      var obj={}
      var data = this.data.value;
      obj={txtStyle:"",list:data}
      this.data.list.push(obj);
      this.setData({
        list: this.data.list
      })
    }
  },
  sc(e) {
    var i = e.currentTarget.dataset.id;
    var data2 = this.data.list;
    data2.splice(i, 1)
    this.setData({
      list: data2
    })

  },
  touchStart: function (e) {
    if (e.touches.length === 1) {
      this.setData({
        // 触摸起始的X坐标
        startX: e.touches[0].clientX
      })
    }
  },
 touchM:function(e){
    if(e.touches.length==1){
      var movex=e.touches[0].clientX;
      var disx=this.data.startX-movex;
      var delBtnWidth = this.data.delBtnWidth
      var txtStyle='';
      if (disx == 0 || disx < 0) {
        txtStyle = 'left:0px'      
      }else if(disx>0){
        txtStyle = 'left:-' + disx + 'px'
        if(disx>=delBtnWidth){
          txtStyle='left:-'+delBtnWidth+'px';
        }
      }
      var index = e.currentTarget.dataset.index;
      var list=this.data.list;
      list[index].txtStyle=txtStyle;
      this.setData({
        list:list
      })
    }
  },
  touchE: function (e) {
    // console.log('停止：' + JSON.stringify(e))
    var that = this
    if (e.changedTouches.length === 1) {
      // 手指移动结束后触摸点位置的X坐标
      var endX = e.changedTouches[0].clientX
      // 触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX
      var delBtnWidth = that.data.delBtnWidth
      // 如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? 'left:-' + delBtnWidth + 'rpx' : 'left:0'
      // 获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index
      var list = that.data.list
      list[index].txtStyle = txtStyle
      // 更新列表的状态
      that.setData({
        that: list
      });
    }
  },
})