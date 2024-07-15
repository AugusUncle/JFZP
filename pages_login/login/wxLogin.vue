<template>
	<view class="page">

		<view class="box">
			<image class="logo" src="https://jfzp.ykfly.com/jfht/app/app-logo.png"></image>
			<button class="button row" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">
				手机号快捷登录
			</button>

			<button class="button1" @tap="noLogin()">稍后登录</button>


			<checkbox-group class="uni-list" @change="checkbox">
				<label style="font-size: 10px;">
					<checkbox value="agree" color="#FFCC33" style="transform:scale(0.5)" />已阅读并同意
				</label>
				<text class="link" @tap="viewPrivacyPolicy">《服务协议》</text>
				<text style="font-size: 10px;">与</text>
				<text class="link" @tap="viewPrivacyPolicy1">《隐私政策》</text>
			</checkbox-group>
		</view>

		<u-popup :show="show" mode="bottom" :round="10" @close="close">
			<view class="box">
				<view class="text">绑定手机手机号码，不错过一条消息！</view>
				<button class="btn" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">获取手机号码</button>
			</view>
		</u-popup>

		<view class="loginType">
			<view class="loginType_1">
				<image class="login-icon" @tap="usePhoneLogin()"
					src="https://jfzp.ykfly.com/jfht/app/icon-login-phone.jpg">
				</image>
				<!-- <image class="login-icon" src="https://jfzp.ykfly.com/jfht/app/icon-login-wechat.jpg">
				</image> -->
				<image class="login-icon" @tap="psdLogin()" src="https://jfzp.ykfly.com/jfht/app/login-password.jpg">
				</image>
			</view>
		</view>

	</view>
</template>
<script>
	import icon from '../../uni_modules/uview-ui/libs/config/props/icon';
	export default {
		data() {
			return {
				show: false,
				agree: false,
				token1: "",
				imgurl: ''
			}
		},
		onLoad() {
			this.imgurl = this.imgUrl
		},
		methods: {
			checkbox(event) {
				this.agree = event.detail.value.includes('agree');
			},
			viewPrivacyPolicy() {
				uni.navigateTo({
					url: '/pages/other/agreement',
				})
			},
			usePhoneLogin() {
				uni.navigateTo({
					url: '/pages_login/login/login',
				})
			},
			toLogin() {
				uni.navigateTo({
					url: '/pages_login/login/login',
				})
			},
			psdLogin() {
				uni.navigateTo({
					url: '/pages_login/login/psdLogin'
				})
			},
			viewPrivacyPolicy1() {
				uni.navigateTo({
					url: '/pages_login/other/privacy'
				})
			},

			wxLogin1(wGetPhoneCode, wLoginCode) {
				console.log(wLoginCode, wGetPhoneCode)
				uni.request({
					url: this.reqUrl + "/login",
					method: 'POST',
					data: {
						wxGetPhoneCode: wGetPhoneCode,
						loginType: 'WECHAT',
						username: wLoginCode
					},
					success: (res) => {
						console.log(res)
						if (res.data.code === 200) {
							uni.setStorageSync('token', res.data.data.token)
							// this.show = true
							this.getUserInfo(res.data.data.token)
						} else if (res.data.code === 1038) {
							this.coverInfo(res.data.data.id, res.data.data.openId)
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'none'
							})
						}

					}
				})
			},
			coverInfo(memberId, wxOpenId) {
				console.log(memberId, wxOpenId)
				uni.showModal({
					title: '提示',
					content: "此微信绑定的手机号已在平台注册，是否使用此微信绑定原来的账号？",
					showCancel: true,
					cancelText: "取消",
					confirmText: '确定',
					success: (res) => {
						if (res.confirm) {
							// 用户点击确定，跳转到登录页面
							uni.request({
								url: this.reqUrl + "/common/recordWx",
								method: "PUT",
								data: {
									id: memberId,
									wechatOpenId: wxOpenId
								},
								success: (res) => {
									console.log(res)
									uni.setStorageSync('token', res.data.data.token)
									// this.show = true
									this.getUserInfo(res.data.data.token)
								}
							})
						}
					}
				})
			},
			getUserInfo(token) {
				uni.request({
					url: this.reqUrl + "/userInfo",
					method: 'GET',
					header: {
						"Authorization": token
					},
					success: (res) => {
						console.log("用户信息", res)
						uni.setStorageSync('userId', res.data.data.id)
						uni.setStorageSync('type', res.data.data.type)
						if (res.data.data.type === 0) {
							uni.navigateTo({
								url: '/pages/index/identitySelect/identitySelect?id=' + res.data.data
									.id + "&token=" + token
							})
						} else {
							uni.reLaunch({
								url: '/pages/index/index'
							})
						}
					}
				})
			},

			onGetPhoneNumber(e) {
				// 处理获取到的手机号数据
				if (this.agree) {
					console.log('获取到的手机号信息:', e.mp.detail.code);
					uni.login({
						provider: 'weixin',
						success: (loginRes) => {
							// 登录成功，loginRes 包含 code，可以用于换取用户登录态信息
							console.log('微信登录成功', loginRes.code);
							this.wxLogin1(e.mp.detail.code, loginRes.code)
						},
					});
				} else {
					uni.showToast({
						title: '请阅读并同意用户协议',
						icon: 'none'
					})
				}
			},
			close() {
				this.show = false
			},
			noLogin() {
				uni.setStorageSync('type',1)
				uni.reLaunch({
					url: '/pages/index/index'
				})
			},
			showLoading() {
				uni.showLoading({
					title: '登陆中...', // 加载文本提示
					mask: true // 是否显示透明蒙层，防止用户触摸穿透
				});

				// 模拟加载过程，这里可以是你的异步操作
				setTimeout(() => {
					// 关闭加载图标
					uni.hideLoading();
				}, 2000); // 延时2秒钟模拟加载过程
			}
		}
	}
</script>

<style>
	.box {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.logo {
		width: 340px;
		height: 340px;
		margin-top: 40%;
	}

	.row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.button {
		margin-top: 24%;
		width: 280px;
		border-radius: 20px;
		font-size: 15px;
		background-color: #38BDF8;
		box-shadow: 0 4px 4px 0px rgba(0, 0, 0, 0.1);
		color: white;
	}

	.button1 {
		margin-top: 5%;
		width: 280px;
		border-radius: 20px;
		font-size: 15px;
		background-color: #E7E5E4;
		/* box-shadow: 0 4px 4px 0px rgba(0, 0, 0, 0.1); */
		box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.1);
	}

	.btn {
		margin: 10%;
		font-size: 15px;
		width: 280px;
		border-radius: 20px;
		background-color: #38BDF8;
		color: white;
		/* box-shadow: 0 4px 4px 0px rgba(0, 0, 0, 0.1); */
		box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.1);
		margin-top: 15%;
	}



	button::after {
		border: none;
		border-radius: 0;
	}

	.wechat {
		width: 20px;
		height: 20px;
	}

	.link {
		color: #38BDF8;
		font-size: 10px;
	}

	.checkbox {
		/* font-size: 12px; */
		transform: scale(0.6);
		/* 放大复选框 */
		/* margin-right: 8px; */
		/* 调整与文本之间的间距 */
	}

	.uni-list {
		margin-top: 5%;
		/* width: 100vw; */
	}

	.text {
		font-size: 12px;
		color: gray;
		position: absolute;
		left: 10px;
		margin-bottom: 20%;
	}

	.loginType {
		position: absolute;
		width: 60%;
		top: 90%;
		left: 20%;

	}

	.loginType_1 {
		display: flex;
		justify-content: center;

	}

	.login-icon {
		width: 25px;
		height: 25px;
		margin: 15px;

	}
</style>