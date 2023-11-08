// pages/telform/telform.js
import Request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputValue: null
    },

    formInputChange(evt) {
        //   console.log(evt.detail.value);
        this.setData({
            inputValue: evt.detail.value
        })
    },

    handleAjax() {
        wx.setStorageSync('tel', this.data.inputValue)
        let { nickName } = wx.getStorageSync('token')
        Request({
            url: `/users?tel=${this.data.inputValue}&nickName=${nickName}`
        }).then(res => {
            console.log(res);
            if (res.length === 0) {
                Request({
                    url: '/users',
                    method: 'POST',
                    data: {
                        tel: this.data.inputValue,
                        ...wx.getStorageSync('token')
                    }
                }).then(res => {
                    wx.navigateBack({
                        delta: 2
                    })
                })
            } else {
                wx.navigateBack({
                    delta: 2
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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