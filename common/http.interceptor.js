export default function httpInterceptor() {
	// 请求拦截器
	uni.addInterceptor('request', {
		// async invoke(request) {
		// 	// 在请求发送前做一些处理
		// 	// 例如：添加token到请求头部
		// 	// const token = uni.getStorageSync('token')
		// 	// if(token){
		// 	// 	request.header['Authorization'] = 'Bearer ' + token;
		// 	// }
		// 	return request;
		// },
		success(args) {
			if (args.data.code === 401) {
				// uni.showToast({
				// 	title: '登录状态已失效，请重新登录',
				// 	icon: 'none'
				// });
				// 可以跳转至登录页面
				uni.showModal({
					// title: '提示',
					content: '您还未登录，请先登录',
					showCancel: true,
					cancelText:'取消',
					confirmText: '去登录',
					success: (res) => {
						if (res.confirm) {
							// 用户点击确定，跳转到登录页面
							uni.redirectTo({
								url: '/pages_login/login/wxLogin'
							});
						}
					}
				})
				return false; // 阻止跳转
			}
			
		},
	});
}