// pages/detail/detail.js
import Request from '../../utils/request'
import checkAuth from '../../utils/auth'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        topSwiper: [],
        current: 0,
        desc: [],
        feature: '',
        comments: [],
        id: null

    },
    getDetail(id) {
        Request({
            url: `/goods/${id}`,
            method: 'GET'
        }).then(res => {
            // console.log(res);
            this.setData({
                topSwiper: res.slides,
                desc: res.desc,
                feature: res.feature,
                id: res.id
            })
        })
    },

    // 获取评论数据
    getComments() {
        Request({
            url: '/comments',
            method: 'GET'
        }).then(res => {
            //  console.log(res);
            this.setData({
                comments: res
            })
        })
    },

    //点击切换
    handleTap(evt) {
        var index = Number(evt.currentTarget.dataset.index)
        this.setData({
            current: index
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //   console.log(options);
        wx.setNavigationBarTitle({
            title: options.title,
        })
        this.getDetail(options.id)
        this.getComments()
    },

    //跳转购物车
    handelToCar(){
     wx.reLaunch({
       url: '/pages/shopcar/shopcar',
     })
    },

    //加入购物车
    handleAdd() {
        checkAuth(() => {
            // console.log("输出了");
            wx.showToast({
                title: '加入成功',
                icon: 'success',
                duration: 2000
            });
            Request({
                url: `/carts?goodId=${this.data.id}&tel=${wx.getStorageSync('tel')}`
            }).then(res => {
                // console.log(res);
                if (res.length === 0) {
                    Request({
                        url: '/carts',
                        method: 'POST',
                        data: {
                            goodId: this.data.id,
                            number: 1,
                            username: wx.getStorageSync('token').nickName,
                            tel: wx.getStorageSync('tel'),
                            checked: false,
                        }
                    })
                } else {
                    Request({
                        url: `/carts/${res[0].id}`,
                        method: 'PATCH',
                        data: {
                            number: res[0].number + 1
                        }
                    })
                }
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        wx.showLoading({
            title: '加载中',
        })

        setTimeout(function () {
            wx.hideLoading()
        }, 500)
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