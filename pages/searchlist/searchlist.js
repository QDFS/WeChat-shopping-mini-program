// pages/searchlist/searchlist.js
import Request from '../../utils/request'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goods: [],
        state: true
    },

    getSearchList(id) {
        Request({
            url: `/categories/${id}?_embed=goods`
        }).then(res => {
            console.log(res);
            wx.setNavigationBarTitle({
                title: res.title,
            })
            this.setData({
                goods: res.goods
            })

        })
    },

    handleTap(evt) {
        console.log(evt);
        wx.navigateTo({
            url: `/pages/detail/detail?id=${evt.currentTarget.dataset.id}&title=${evt.currentTarget.dataset.title}`,
        })
    },

    handlePrice() {
        this.setData({
            state: !this.data.state,
            goods: this.data.state===true?this.data.goods.sort((item1, item2) =>item1.price - item2.price
            ):this.data.goods.sort((item1, item2) =>item2.price - item1.price
            ),
        })
    },

    handleComment(){
        this.setData({
            state: !this.data.state,
            goods: this.data.state===true?this.data.goods.sort((item1, item2) =>parseInt(item1.goodcomment) -parseInt( item2.goodcomment)
            ):this.data.goods.sort((item1, item2) =>parseInt(item2.goodcomment) - parseInt(item1.goodcomment)
            ),
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options);
        this.getSearchList(options.id)
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

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})