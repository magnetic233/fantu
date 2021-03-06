// miniprogram/pages/homepage/homepage.js
const app = getApp()
const db=wx.cloud.database();
const _=db.command
let searchKey = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchKey:'',
    searchResult:null,
    banner: [
      {
        picUrl:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1532844980,1238263623&fm=26&gp=0.jpg'
      },
      {
        picUrl:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1902356188,3396580504&fm=26&gp=0.jpg'
      },
      {
        picUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1556646393,2359856313&fm=26&gp=0.jpg'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    searchKey = '' //每次返回首页时，清空搜索词
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getSearchKey(event) { //获取搜索词
    var _this=this;
    console.log("搜索词", event.detail.value)
    _this.data.searchKey = event.detail.value
    searchKey = event.detail.value
    db.collection('dish').where({
      img_name: _.eq(searchKey)
    }).get({
      success: function(res) {
        _this.setData({
          searchKey:searchKey
          })
      // 输出 [{ "title": "The Catcher in the Rye", ... }]
      console.log('查询成功',res.data)
    }
    
    })
  },
  
  goSearch() { //去搜索页
    var that = this
    wx.navigateTo({
      url: '../search/search?searchKey=' + that.data.searchKey
    })
    db.collection('dish').where({
      img_name: _.eq(searchKey)
    
  }).get({
    success: function(res) {
    // 输出 [{ "title": "The Catcher in the Rye", ... }]
    console.log('查询成功',res.data)
  }
  })

  },


  //菜品浏览
  btnclick2: function() {
    wx.navigateTo({
      url: '../canteen/canteen'
    })
  },


})
