<template>
	<view class="page">
		<view class="box">
			<text class="icon" type="person">您的姓名</text>
			<input class="inp" placeholder="请输入:" v-model="data.legalPerson"></input>
		</view>
		<view class="box">
			<text class="icon" type="person">身份证号</text>
			<input class="inp" placeholder="请输入:" v-model="data.idCardNo"></input>
		</view>
		<button class="btn" hover-class="btn1" @tap="submit()">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: {
					legalPerson: "",
					idCardNo: "",
					type: 1,
					id: ""
				}

			}
		},
		methods: {
			submit() {

				if (this.data.legalPerson === '' || this.data.idCardNo == '') {
					uni.showToast({
						title: "请写完整信息",
						icon: "none"
					})
				} else {
					this.data.id = uni.getStorageSync("userId")
					let token = uni.getStorageSync("token")
					uni.request({
						url: this.reqUrl + "/member/auth",
						method: 'POST',
						data: this.data,
						header: {
							"Authorization": token
						},
						success: (res) => {
							console.log(res)
							console.log(this.data)
							if(res.data.code === 200){
								uni.navigateBack()
								uni.showToast({
									title:'提交成功',
									icon:'success'
								})
								// this.getUserInfo()
								// uni.navigateBack()
							}else{
								uni.showToast({
									title:res.data.message,
									icon:'none'
								})
							}
						},
						fail: (res) => {
							console.log(res)
						}
					})
				}

			}

		},
		getUserInfo() {
			let token = uni.getStorageSync("token")
			uni.request({
				url: this.reqUrl + "/userInfo",
				method: 'GET',
				header: {
					'Authorization': token
				},
				success: (req) => {
					console.log(req)
					// uni.setStorageSync('user', req.data.data)
					uni.navigateBack()
				}
			})
		},
	}
</script>

<style>
	.inp {
		flex: 1;
		border: none;
		outline: none;
		padding: 0;
		margin-top: 20px;
		font-size: 16px;
	}

	.page {
		padding: 2%;
		background-color: #FFFFFF;
		height: 100vh;
	}

	.inp::placeholder {
		color: #E5E5E5;
	}

	.box {
		display: flex;
		align-items: ;
		border-bottom: 1rpx solid #E5E5E5;
		width: 100%;
	}

	.icon {
		color: #777;
		margin-left: 4%;
		margin-right: 10%;
		margin-top: 20px;
		font-size: 16px;

	}

	.btn {
		margin-top: 10%;
		width: 80%;
		color: white;
		background-color: #38BDF8;
		border-radius: 10px;
	}

	.btn1 {
		background-color: #0EA5E9;
		/* 点击后的颜色 */
		color: #E5E5E5;
		/* 点击后的文字颜色 */
	}
</style>