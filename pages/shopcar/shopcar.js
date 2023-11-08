// pages/shopcar/shopcar.js
import checkAuth from '../../utils/auth'
import Request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        slideButtons: [{
            type: 'warn',
            text: '删除',
        }],
        carMessage: [],
    },

    getMessage() {
        Request({
            url: `/carts?_expand=good&nickName=${wx.getStorageSync('token').nickName}&tel=${wx.getStorageSync('tel')}`
        }).then(res => {
            // console.log(res, "改变");
            this.setData({
                carMessage: res
            })
        })
    },
    slideButtonTap(e) {
        console.log('slide button tap', e.currentTarget.dataset.id)
        this.setData({
            carMessage:this.data.carMessage.filter(item=>{
                if(item.id!=e.currentTarget.dataset.id){
                    return item
                }
            })
        })
        Request({
            url:`/carts/${e.currentTarget.dataset.id}`,
            method:'DELETE'
        })
    },

    handleCheck(evt) {
        let item = evt.currentTarget.dataset.item
        // console.log(item);
        item.checked = !item.checked
        this.handleUpdate(item)
    },

    handleMinus(evt) {
        let item = evt.currentTarget.dataset.item
        if (item.number == 1) {
            return item.number = 1
        }
        item.number = --item.number 
        this.handleUpdate(item)
    },
    handleAdd(evt) {
        let item = evt.currentTarget.dataset.item
        item.number = ++item.number
        this.handleUpdate(item)
    },

    handleUpdate(item) {
        this.setData({
            carMessage: this.data.carMessage.map(value => {
                if (value.id === item.id) {
                    return item
                } else {
                    return value
                }

            })
        })

        Request({
            url: `/carts/${item.id}`,
            method: 'PATCH',
            data: {
                checked: item.checked,
                number: item.number
            }
        })

    },

    handleAllChecked(evt){
        // console.log(evt.detail);
        if(evt.detail.value.length===0){
            // console.log(1);
            this.setData({
                carMessage:this.data.carMessage.map(item=>{
                    item.checked=false
                    return item
                })
            })
        }else{
            this.setData({
                carMessage:this.data.carMessage.map(item=>{
                    item.checked=true
                    return item
                })
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getMessage()
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
        checkAuth(() => {
            // console.log('成功了');

        })
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