<template>
	<view class="page">

		<page-back></page-back>
		<view class="title">修改密码</view>
		<view class="content">设置密码后可通过手机号/邮箱/账号 + 密码登录平台</view>
		<view v-if="psdFlg ==='1'" class="account">
			<view class="psd">
				<text>账号</text>
				<input class="inp" disabled="true" v-model="account" />
			</view>
			<view class="psd">
				<text>旧密码</text>
				<input class="inp" password v-model="oldPsd" placeholder="请填写旧密码" />
			</view>
			<view class="psd">
				<text>新密码</text>
				<input class="inp" password v-model="newPsd" placeholder="请填写新密码" />
			</view>
			<view class="psd1">
				<text>确认密码</text>
				<input class="inp" password v-model="newPsd1" placeholder="请再次填写新密码" />
			</view>
			<view class="info">密码必须包含字母和数字，且在6~18之间</view>

		</view>

		<view v-if="psdFlg ==='0'" class="account">

			<view class="psd">
				<text>新密码</text>
				<input class="inp" password v-model="newPsd" placeholder="请填写新密码" />
			</view>
			<view class="psd1">
				<text>确认密码</text>
				<input class="inp" password v-model="newPsd1" placeholder="请再次填写新密码" />
			</view>
			<view class="info">密码不能为纯数字且长度必须大于8</view>
		</view>

		<view v-if="psdFlg === '1'" class="forgotPsd">忘记密码</view>

		<button :disabled="!(newPsd && newPsd1)"  @tap="submit()">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account: '',
				psdFlg: '',
				oldPsd: '',
				newPsd: '',
				newPsd1: ''
			}
		},
		onLoad(query) {
			console.log(query)
			this.account = query.account
			this.psdFlg = query.password
			this.token = uni.getStorageSync("token")
			this.userId = uni.getStorageSync("userId")
		},
		methods: {
			submit() {
				if (this.psdFlg === '1') {
					this.editPsd()
				} else if (this.psdFlg === '0') {
					this.addPsd()
				}
			},
			addPsd() {
				if(this.newPsd === this.newPsd1){
					uni.request({
						url: this.reqUrl + "/member/resetPassword",
						method: 'PUT',
						header: {
							"Authorization": this.token
						},
						data: {
							id: uni.getStorageSync("userId"),
							newPassword: this.newPsd
						},
						success: (res) => {
							console.log(res)
							if(res.data.code ===200){
								
								uni.navigateBack({
									delta: 1
								});
								uni.showToast({
									title:'设置成功！',
									icon:"success"
								})
							}else {
								uni.showToast({
									title: res.data.message,
									icon:"none"
								})
							}
						}
					})
				}else{
					uni.showToast({
						title:"两次密码不一致",
						icon:'error'
					})
				}
				
			},
			editPsd() {
				uni.request({
					url: this.reqUrl + "/member/resetPassword",
					method: 'PUT',
					header: {
						"Authorization": this.token
					},
					data: {
						id: this.userId,
						newPassword: this.newPsd,
						oldPassword: this.oldPsd
					},
					success: (res) => {
						console.log(res)
						if(res.data.code ===200){
							uni.navigateTo({
								url: '/pages/setting/account'
							})
							uni.showToast({
								title:'修改成功！',
								icon:"success"
							})
						}
					}
				})
			}
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
		top: 30%;
		left: 10%;
		width: 80%;


	}

	.psd {
		font-size: 16px;
		display: flex;
		flex-direction: row;
		border-top: 1px solid #ECEFF1;

	}

	.psd1 {
		font-size: 16px;
		display: flex;
		flex-direction: row;
		border-bottom: 1px solid #ECEFF1;
		border-top: 1px solid #ECEFF1;
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
		top: 70%;
		background-color: #38BDF8;
		color: white;
	}

	button::after {
		border: none;
	}

	.info {
		/* position: absolute;
		left: 10%;
		top: 57%; */
		font-size: 12px;
		color: gray;
	}

	.forgotPsd {
		position: absolute;
		left: 10%;
		top: 60%;
		font-size: 12px;
		color: deepskyblue;
	}
</style>