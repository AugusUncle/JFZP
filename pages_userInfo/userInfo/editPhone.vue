<template>
	<view class="page">
		
		<page-back></page-back>
		<view  class="view-title">更换手机号</view>

		
		<view class="view-content">
			<view class="input-container">
				<view class="name">手机号</view>
				<input type="text" placeholder="输入手机号" maxlength="11" v-model="mobile" />
			</view>

			<view class="input-container">
				<view class="name">验证码</view>
				<input type="text" placeholder="输入验证码" maxlength="6" v-model="code" />
				<button size="mini" :disabled="!(mobile.length>10 && !countingDown) "  @click="getVerifyCode()">{{ countingDown ? `${countDownNum}s后重新发送` : '发送验证码' }}</button>
			</view>
		</view>

		<button :disabled="!(mobile&&code)" class="btn-submit" @tap="checkVerifyCode()">提交</button>


	</view>

</template>

<script>
	export default {
		data() {
			return {
				mobile:"",
				code:"",
				key: "",
				value: 0,
				userInfo: {
					id: ""
				},
				token:"",
				countDownNum: 60, // 初始倒计时时间
				countingDown: false // 是否正在倒计时的标识
			};
		},
		onLoad(options) {
			console.log("opt", options)
			this.key = options.key
			this.value = options.value
			this.index = options.value
			this.token = uni.getStorageSync("token")
			this.userInfo.id = uni.getStorageSync("userId")
		},
		methods: {
			getVerifyCode(){
				
				uni.request({
					url:this.reqUrl + "/verification/sendSms",
					method:'POST',
					header:{
						"Authorization": this.token
					},
					data:{
						phone: this.mobile
					},
					success: (res) => {
						console.log("获取验证码",res)
						if(res.data.code === 200){
							this.startCountdown()
						}
					}
					
				})
			},
			checkVerifyCode(){
				uni.request({
					url:this.reqUrl + "/verification/checkCode",
					method:'POST',
					header:{
						"Authorization": this.token
					},
					data:{
						phone: this.mobile,
						code: this.code
					},
					success: (res) => {
						console.log("验证验证码",res)
						if(res.data.code === 200){
							this.editPhone()
						}else{
							uni.showToast({
								title:res.data.message,
								icon:'error'
							})
						}
					}
					
				})
			},
			editPhone(){
				uni.request({
					url:this.reqUrl + "/member/edit/mobile",
					method:'PUT',
					header:{
						"Authorization": this.token
					},
					data:{
						id: this.userInfo.id,
						code: this.code,
						mobile: this.mobile
					},
					success: (res) => {
						console.log("修改手机号",res)
						uni.navigateTo({
							url:'/pages/setting/account'
						})
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
			}
		}
	};
</script>

<style>
	

	.view-title {
		position: absolute;
		top: 20%;
		left: 30%;
		width: 40%;
		font-size: 20px;
		font-weight: 400;
		text-align: center;
	}

	.view-content {
		position: absolute;
		top: 40%;
		background-color: #FAFAFA;
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.input-container {
		display: flex;
		align-items: center;
		width: 85%;
		
	}

	.input-container input {
		background: #fafafa;
		height: 50px;
		width: 50%;
		font-size: 14px;
	}

	.input-container button {
		position: absolute;
		right: 5%;
		border: none;
		background-color: #38BDF8;
		color: white;
		cursor: pointer;
	}

	.name {
		width: 25%;
	}

	.btn-submit {
		position: absolute;
		width: 60%;
		left: 20%;
		bottom: 20%;
		color: white;
		background-color: #38BDF8;
	}
</style>