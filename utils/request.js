function Requset(params,state=false){

    return new  Promise((resolve,reject)=>{
        wx.request({
           ...params,
           url: 'http://localhost:5000'+params.url,
           success(res){
                if(state){
                    resolve({
                        data:res.data,
                        current:res.header['X-Total-Count']
                    })
                }else{
                    resolve(res.data)
                }
           },
           fail(err){
               reject(err)
           }
        })
    })
}

 export default Requset