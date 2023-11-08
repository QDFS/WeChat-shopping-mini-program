// pages/home/home.js
import Request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
     topSwiperList:[],
     goodsList:[],
     current:1,
     goodsTotalLength:'',
    },

    swpierList(){
        Request({
            url:'/recommends',
            method:'GET'
        }).then(res=>{
            // console.log(res);
            this.setData({
                 topSwiperList:res
            })
        })
    },
    getGoods(){
        Request({
            url:`/goods?_page=${this.data.current}&_limit=5`,
            method:'GET'
        },true).then(res=>{
            // console.log(res);
            res.current=Number(res.current)
            this.setData({
                goodsList:[...this.data.goodsList,...res.data],
                goodsTotalLength:res.current
            })
        })
    },

    changeEvent(){
        // console.log("触发了");
        wx.navigateTo({
          url: '/pages/search/search',
        })
    },

    changePage(evt){
        var id=evt.currentTarget.dataset.id;
        var title=evt.currentTarget.dataset.title
        // console.log(evt.currentTarget.dataset);
        wx.navigateTo({
          url: `/pages/detail/detail?id=${id}&title=${title}`,
        })
    },
     
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.swpierList(),
        this.getGoods()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
    
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
    // console.log(1);
     setTimeout(()=>{
         wx.stopPullDownRefresh()
     },1000)
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
    if(this.data.goodsList.length==this.data.goodsTotalLength){
        return
    }
     this.setData({
         current:++this.data.current
     })
     this.getGoods();
    //  console.log("到底了");
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})