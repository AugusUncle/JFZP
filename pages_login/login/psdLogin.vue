<template>
	<view>
		<page-back></page-back>
		<view class="box">
			<image class="logo" src="https://jfzp.ykfly.com/jfht/app/app-logo.png"></image>

			<view class="view-content">
				<view class="input-container">
					<input class="inp-t" type="text" placeholder="账号:" v-model="mobile" />
				</view>

				<view class="input-container">
					<input class="inp-b" type="password" placeholder="密码:" v-model="code" />

				</view>
				<checkbox-group style="margin-top: 1vh;" @change="checkbox">
					<label style="font-size: 10px;">
						<checkbox value="agree" color="#FFCC33" style="transform:scale(0.5)" />已阅读并同意
					</label>
					<text class="link" @tap="viewPrivacyPolicy">《服务协议》</text>
					<text style="font-size: 10px;">与</text>
					<text class="link" @tap="viewPrivacyPolicy1">《隐私政策》</text>
				</checkbox-group>
			</view>

			<view class="loginview">
				<button class="loginBtn" :disabled="!(mobile&&code)" @tap="login">登录...</button>
			</view>
			<!-- <view class="box4">
				<text class="text">忘记密码?</text>
				<text class="text1" @tap="register()">注册</text>
			</view> -->

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: "",
				code: "",
				agree: false,
				// clientType: "APP",
			}
		},
		methods: {

			login() {
				if (!this.agree) {
					uni.showToast({
						title: '请阅读并同意用户协议',
						icon: 'none',
					})
					return
				}
				uni.request({
					url: this.reqUrl + "/login",
					method: 'POST',
					data: {
						loginType: "PASSWORD",
						username: this.mobile,
						password: this.code
					},
					success: (res) => {
						if (res.data.code === 200) {
							console.log(res.data.data.token)
							uni.setStorageSync('token', res.data.data.token)
							this.getUserInfo(res.data.data.token)
						} else {
							uni.showToast({
								title: res.data.message,
								icon:'none'
							})
							
						}
					},
				})

			},
			checkbox(event) {
				console.log(event)
				this.agree = event.detail.value.includes('agree');
				// this.agree = event.detail.value.includes('agree');
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
						uni.reLaunch({
							url: '/pages/index/index'
						})
					}
				})
			},
			register() {
				uni.redirectTo({
					url: '/pages_login/login/register'
				})
			},
		}
	}
</script>

<style>
	.loginview {
		display: flex;
		/* align-items: center; */
		justify-content: center;
		flex-direction: column;
		width: 80%;
	}

	.box {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.link {
		color: #38BDF8;
		font-size: 10px;
	}

	.checkbox {
		/* font-size: 12px; */
		transform: scale(0.6);
		/* 放大复选框 */
		margin-right: 8px;
		/* 调整与文本之间的间距 */
	}

	.logo {
		width: 340px;
		height: 340px;
		margin-top: 30%;
	}


	.loginBtn {
		margin-top: 25%;
		width: 100%;
		border-radius: 10px;
		font-size: 15px;
		color: #38BDF8;
		font-size: 20px;
		background-color: transparent;
		/* background-color: #38BDF8; */
		/* box-shadow: 0 4px 4px 0px rgba(0, 0, 0, 0.1); */

	}

	.getCode {
		background-color: transparent;
		position: absolute;
		right: 12%;
		border: none;
		color: #38BDF8;
		cursor: pointer;
		z-index: 99;
	}

	.forgetPsd {
		width: 40%;
		border-radius: 10px;
		color: gray;
		font-size: 10px;
		position: absolute;
		right: -3%;
		bottom: 13px;
		background-color: transparent;
	}


	.box4 {
		margin-top: 2%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: row;
		width: 70%;
	}

	.text {
		color: #9E9E9E;
		font-size: 25rpx;
		flex: 1;
	}

	.text1 {
		color: #9E9E9E;
		font-size: 25rpx;
	}


	.view-content {
		/* margin-top: 15%; */
		position: relative;
		/* top: 80%; */
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.input-container {
		display: flex;
		align-items: center;
		width: 80%;

	}

	.inp-t {
		border: 0.8px solid lightgray;
		border-bottom: 0;
		border-radius: 10px 10px 0 0;
		padding: 3% 5%;
		width: 100%;
		/* text-indent: 90px; */
	}

	.inp-b {
		border: 0.8px solid lightgray;
		border-radius: 0 0 10px 10px;
		padding: 3% 5%;
		width: 100%;
	}



	button::after {
		border: none;
		/* background-color: transparent; */
	}

	.getcode {
		position: absolute;
		right: 11%;
	}

	.name {
		width: 25%;
	}

	.privacy {
		margin-top: 5%;
		width: 85%;
	}
</style>