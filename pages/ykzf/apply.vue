<template>
	<view class="page">
		<uni-icons class="icon" type="back" color="white" @tap="back()" size="30"></uni-icons>

		<image :src="imageUrl" mode="widthFix" style="width: 100%;" />
		<button class="btn" hover-class="btn1" @tap="apply_dj()">立即报名</button>

		<view class="form-view">
			<input class="name" type="text" v-model="form.name" maxlength="11" placeholder="姓名:" />
			<input class="phone" type="number" v-model="form.mobile" maxlength="11" placeholder="联系电话:" />
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageUrl: "https://jfzp.ykfly.com/jfht/app/apply.jpg",
				form:{
					name:'',
					mobile:'',
					memberId:''
				}
			}
		},
		onLoad() {
			this.getApplyInfo()
		},
		methods: {
			apply_dj() {
				let token = uni.getStorageSync("token")
				this.form.memberId = uni.getStorageSync("userId")
				uni.request({
					url:this.reqUrl + "/fly/fly_add",
					method:'POST',
					data: this.form,
					header:{
						"Authorization": token
					},
					success: (res) => {
						console.log("无人机报名",res)
						if(res.data.code === 200){
							uni.showToast({
								title:'报名成功！',
								icon:'success'
							})
							this.form = ''
						}
					},
					fail: (res) => {
						console.log("无人机报名失败",res)
					}
					
				})
			},
			back() {
				uni.navigateBack();
			},
			getApplyInfo(){
				let token = uni.getStorageSync("token")
				let memberId = uni.getStorageSync("userId")
				uni.request({
					url:this.reqUrl + "/fly/user?memberId="+ memberId,
					method:'GET',
					header:{
						"Authorization": token
					},
					success: (res) => {
						console.log("无人机报名",res)
						if(res.data.data.code === 200){
							uni.showToast({
								title:'报名成功！',
								icon:'success'
							})
							this.form = ''
						}
					},
					fail: (res) => {
						console.log("无人机报名失败",res)
					}
					
				})
			},
		}
	}
</script>

<style>
	.page {
		overflow: hidden;
	}

	.btn {
		width: 60%;
		position: absolute;
		top: 68%;
		left: 20%;
		border-radius: 10px;
		color: white;
		background: #2563EB;
	}

	.icon {
		position: fixed;
		top: 6%;
		left: 4%;
	}
	
	.name{
		background: white;
		border: 1px solid #ccc;
		border-radius: 10px;
		padding: 5px;
		margin-top: 20px;
		width: 100%;
		height: 30px;
	}
	.phone{
		background: white;
		border: 1px solid #ccc;
		border-radius: 10px;
		padding: 5px;
		margin-top: 20px;
		width: 100%;
		height: 30px;
	}
	.form-view{
		width: 66%;
		position: absolute;
		top: 48%;
		left: 15%;
	}
</style>