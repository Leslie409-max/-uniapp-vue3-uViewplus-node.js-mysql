class utils{
	constructor(){
		this.baseUrl = 'http://127.0.0.1:3006'
	}
	
	getToken() {
	        return uni.getStorageSync('token') || ''
	}
	
	 requestInterceptor(config) {
	        // 获取token
	        const token = this.getToken()
	        console.log('Request interceptor token:', token)
	        // 如果有token，添加到header中
	        if (token) {
	            config.header = {
	                ...config.header,
	                'Authorization': `Bearer ${token}` // 添加 Bearer 前缀
	            }
	            console.log('Request headers:', config.header)
	        }  
	        return config
	    }
		
	 responseInterceptor(response) {
	        // 可以在这里统一处理响应
	        if (response.statusCode === 401) {
	            // token过期或无效的处理
	            console.log('Token无效或过期，需要重新登录')
	            uni.removeStorageSync('token')
	            uni.removeStorageSync('userInfo')
	            uni.removeStorageSync('role')
	            // 跳转到登录页
	            uni.navigateTo({
	                url: '/pages/login/login'
	            })
	            return Promise.reject(response)
	        }
	        return response
	    }

	
	request(url, method = 'GET', data = {}, header = {}) {
		const config = this.requestInterceptor({
            url: this.baseUrl + url,
            data,
            header,
            method
        })


        return new Promise((resolve, reject) => {
            uni.request({
                ...config,
                success: (response) => {
					const processedResponse = this.responseInterceptor(response)

                    if(processedResponse.data.code != 10000){
                        reject(processedResponse)
                    }else{
                        resolve(processedResponse.data)
                    }
                },
                fail: (error) => {
                    reject(error)
                }
            })
        })
    }
	// 直接调用request方法
    get(url, data = {}, header = {}) {
        return this.request(url, 'GET', data, header)
    }

    post(url, data = {}, header = {}) {
        return this.request(url, 'POST', data, header)
    }

    put(url, data = {}, header = {}) {
        return this.request(url, 'PUT', data, header)
    }

    delete(url, data = {}, header = {}) {
        return this.request(url, 'DELETE', data, header)
    }
}
export default new utils()