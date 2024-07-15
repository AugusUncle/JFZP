<template>
	<view>
		<page-back></page-back>
		<view class="box">
			<image class="logo" src="https://jfzp.ykfly.com/jfht/app/app-logo.png"></image>

			<view class="view-content">
				<view class="input-container">
					<input class="inp-t" type="text" placeholder="手机号" maxlength="11" v-model="mobile" />
				</view>

				<view class="input-container">
					<input class="inp-b" type="text" placeholder="验证码" maxlength="6" v-model="code" />
					<button class="getCode" size="mini" :disabled="!(mobile.length>10 && !countingDown) "
						@click="getVerifyCode()">{{ countingDown ? `${countDownNum}s后重新发送` : '获取验证码' }}</button>
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
				countDownNum: 60, // 初始倒计时时间
				countingDown: false, // 是否正在倒计时的标识
				isGetVerifyCode: false,
			}
		},
		methods: {
			getVerifyCode() {
				uni.request({
					url: this.reqUrl + "/verification/sendSms",
					method: 'POST',
					header: {
						"Authorization": this.token
					},
					data: {
						phone: this.mobile
					},
					success: (res) => {
						console.log("获取验证码", res)
						if (res.data.code === 200) {
							this.startCountdown()
							this.isGetVerifyCode = true
						}
					}

				})
			},
			checkVerifyCode() {
				uni.request({
					url: this.reqUrl + "/verification/checkCode",
					method: 'POST',
					header: {
						"Authorization": this.token
					},
					data: {
						phone: this.mobile,
						code: this.code
					},
					success: (res) => {
						console.log("验证验证码", res)
						if (res.data.code === 200) {
							this.login()
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'error'
							})
						}
					}

				})
			},
			startCountdown() {
				// 如果不在倒计时中，则开始倒计时
				if (!this.countingDown) {
					this.countingDown = true; // 标记为正在倒计时
					const timer = setInterval(() => {
						if (this.countDownNum > 0) {
							this.countDownNum--; // 更新倒计时数字
						} else {
							clearInterval(timer); // 倒计时结束，清除计时器
							this.countingDown = false; // 标记为倒计时结束
							this.countDownNum = 60; // 重置倒计时数字
						}
					}, 1000);
				}
			},
			login() {
				if (!this.isGetVerifyCode) {
					uni.showToast({
						title: '请先获取验证码',
						icon: 'none',
					})
				} else if (!this.agree) {
					uni.showToast({
						title: '请阅读并同意用户协议',
						icon: 'none',
					})
				} else if (this.validateInputs()) {
					uni.request({
						url: this.reqUrl + "/login",
						method: 'POST',
						data: {
							loginType: "MOBILE",
							username: this.mobile,
							password: this.code
						},
						success: (res) => {
							const demo = res.data.data
							console.log(res)
							uni.setStorageSync('token', res.data.data.token)
							// this.show = true
							this.getUserInfo(res.data.data.token)
						},
						fail: (err) => {
							console.log(err)
						}

					})
				}

			},
			checkbox(event) {
				this.agree = event.detail.value.includes('agree');
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
						// if (res.data.data.mobile === '') {
						// 	// this.show = true

						// } else {
						uni.reLaunch({
							url: '/pages/index/index'
						})
						// }
					}
				})
			},


			validateInputs() {
				if (this.phone === '' || this.verifyCode === '') {
					uni.showToast({
						title: '手机号和验证码不能为空',
						icon: 'none',
					});
					return false;
				}
				return true;
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
	.getCode{
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