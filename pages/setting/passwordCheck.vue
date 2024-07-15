<template>
	<view class="page">

		<page-back></page-back>
		<view class="title">安全验证</view>
		<view class="content">填写当前账户登录密码，验证本人身份。</view>
		<view class="account">
			<text>密码</text>
			<input class="inp" password type="text" v-model="password" />
		</view>
		<view class="forgotPsd">忘记密码</view>

		<button :disabled="!password" @tap="toCheckPsd()">验证</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				password: '',
				account: ''
				
			}
		},
		onLoad(query) {
			this.account = query.account
		},
		methods: {
			toCheckPsd() {
				let token = uni.getStorageSync("token")
				let userId = uni.getStorageSync("userId")
				uni.request({
					url: this.reqUrl + "/member/verification-password",
					method: 'POST',
					header: {
						"Authorization": token
					},
					data: {
						id: userId,
						password: this.password
					},
					success: (res) => {
						console.log("密码验证", res)
						if (res.data.code === 200) {
							this.editAccount()
						} else {
							uni.showToast({
								title: '密码错误',
								icon: 'error'
							})
						}
					}
				})
			},
			editAccount() {
				let token = uni.getStorageSync("token")
				let userId = uni.getStorageSync("userId")
				uni.request({
					url: this.reqUrl + "/member/edit-account",
					method: 'PUT',
					header: {
						"Authorization": token
					},
					data: {
						id: userId,
						account: this.account
					},
					success: (res) => {
						console.log(res)
						if (res.data.code === 200) {
							// uni.navigateTo({
							// 	url: '/pages/setting/account'
							// })
							uni.navigateBack()
						
							uni.showToast({
								title: '修改成功！',
								icon: 'success'
							})
							
						}
					}
				})
			},
			
		}
	}
</script>

<style>
	.page {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.title {
		position: absolute;
		top: 15%;
		left: 30%;
		width: 40%;
		font-size: 20px;
		font-weight: 400;
		display: flex;
		justify-content: center;
	}

	.content {
		position: absolute;
		top: 22%;
		left: 10%;
		width: 80%;
		font-size: 16px;
		display: flex;
		justify-content: center;
		text-align: center;
	}

	.account {
		position: absolute;
		top: 35%;
		left: 10%;
		width: 80%;
		font-size: 16px;
		display: flex;
		/* 	justify-content: center; */
		flex-direction: row;
		/* text-align: center; */
		border-bottom: 1px solid #ECEFF1;
		border-top: 1px solid #ECEFF1;
		/* height: 50px; */
		padding: ;
	}

	.account text {
		margin: 15px 0;
	}

	.account input {
		margin: 15px;
	}

	button {
		position: absolute;
		width: 60%;
		left: 20%;
		top: 60%;
		background-color: #38BDF8;
		color: white;
	}

	button::after {
		border: none;
	}

	.forgotPsd {
		position: absolute;
		left: 10%;
		top: 43%;
		font-size: 12px;
		color: deepskyblue;
	}
</style>