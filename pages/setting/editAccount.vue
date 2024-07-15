<template>
	<view class="page">

		<page-back></page-back>
		<view class="title">修改账号</view>
		<view class="account1">原账号（{{account1}}）</view>
		<view class="content">账号为登录凭证，一年仅可修改一次，请避免包含个人信息（如姓名、生日等）</view>
		<view class="account">
			<text>新账号</text>
			<input class="inp" @input="input" maxlength="20" v-model="account" />
		</view>
		<view v-if="message === 0 && account.length >= 6" class="message">用户名可用</view>
		<view v-if="message === 1 && account.length >= 6" class="message1">用户名被占用</view>

		<button :disabled="!(account.length >= 6)" @tap="checkAccount()">下一步</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account: '',
				account1: '',
				message: 2,
				user:{}
			}
		},
		onLoad(query) {
			this.account1 = query.account
			this.getUserInfo()
		},
		methods: {
			input() {
				let token = uni.getStorageSync("token")
				uni.request({
					url: this.reqUrl + "/common/queryUserByAccount",
					method: 'GET',
					header: {
						"Authorization": token
					},
					data: {
						account: this.account
					},
					success: (res) => {
						if(this.account === null || this.account === ""){
							this.message = 2
						}else{
							this.message = res.data.data
						}
						
					}
				
				})
			},

			// 检查账号是否唯一
			checkAccount() {
				if(this.user.password==='0'){
					uni.showToast({
						title:'请设置密码后进行修改',
						icon:'none'
					})
					return
				}
				let token = uni.getStorageSync("token")
				uni.request({
					// url:this.reqUrl + "/common/queryUserByAccount?account="+ this.account,
					url: this.reqUrl + "/common/queryUserByAccount",
					method: 'GET',
					header: {
						"Authorization": token
					},
					data: {
						account: this.account
					},
					success: (res) => {
						console.log(res)
						if(res.data.data === 0){
							this.toCheckPsd()
						}
					}

				})
				 
			},
			// 跳转页面，验证密码
			toCheckPsd() {
				uni.navigateTo({
					url: '/pages/setting/passwordCheck?account=' + this.account
				})
			},
			getUserInfo() {
				let userId = uni.getStorageSync("userId")
				let token = uni.getStorageSync("token")
				uni.request({
					// url: this.reqUrl + "/member/userInfo/" + userId,
					url: this.reqUrl + "/userInfo",
					header: {
						"Authorization": token
					},
					success: (res) => {
						console.log(res)
						this.user = res.data.data
					},
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
	
	.account1 {
		position: absolute;
		top: 18%;
		left: 10%;
		width: 80%;
		font-size: 16px;
		/* font-weight: 400; */
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

	.message {
		position: absolute;
		right: 10%;
		top: 43%;
		font-size: 12px;
		color: green;
	}

	.message1 {
		position: absolute;
		right: 10%;
		top: 43%;
		font-size: 12px;
		color: red;
	}
</style>