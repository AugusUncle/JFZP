<template>
	<view class="pages">
		<view class="view1">问题描述</view>
		<view class="view2">
			<textarea maxlength="500" v-model="data.problemContent" placeholder="请输入您遇到的问题:"></textarea>
		</view>
		<view class="view3">
			<view style="padding: 30rpx 0;">材料截图</view>
			<view>
				<uni-file-picker limit="5" @select="select" v-model="data.corporateStyles"
					size-type="compressed"></uni-file-picker>
			</view>
		</view>
		<view class="view4">
			<checkbox-group class="uni-list" @change="checkbox">
				<label style="font-size: 12px; color: grey;">
					<checkbox value="agree" color="#FFCC33" style="transform:scale(0.5)" />允许平台使用当前页面的数据作为公正材料
				</label>
			</checkbox-group>
			<view>
				<button class="btn" type="primary" @tap="addDefend">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				agree: false,
				data: {
					memberId: 0,
					problemContent: "",
					status: 1,
					url: [],
				},
				token:''
			}
		},
		onLoad() {
			this.data.memberId = uni.getStorageSync('userId')
			this.token = uni.getStorageSync('token')
		},
		methods: {
			checkbox(event) {
				this.agree = event.detail.value.includes('agree');
				console.log(this.agree)
			},
			select(e) {
				console.log("11111111111", e)
				let arr = []
				e.tempFilePaths.forEach(item => {
					this.uploadImage(item).then((imageUrl) => {
						// 成功上传图片并拿到链接后，再去调用其他方法
						uni.request({
							url: this.reqUrl + "/corporateStyle/add",
							method: 'POST',
							header: {
								"Authorization": this.token
							},
							data: {
								url: imageUrl,
								memberId: this.userId,
								type: 1
							},
							success: (req) => {
								console.log('图片检测', req)
								if (req.data.code === 200) {
									arr.push(imageUrl)
								} else {
									arr.push("https://jfzp.ykfly.com/jfht/app/weigui.png")
								}
							}
						})
						console.log(imageUrl)
					}).catch((error) => {
						// 处理上传图片失败的情况
						console.error('图片上传失败：', error);
					})
				});
				this.data.url = arr
				console.log("上传结束")
			},
			uploadImage(image) {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: this.reqUrl + "/file/upload",
						filePath: image,
						name: 'file', // 服务端接收的字段名
						formData: this.formData,
						header: {
							'Authorization': this.token
						},
						success: (uploadRes) => {
							console.log("uploadRes", uploadRes)
							if (uploadRes.statusCode === 200) {
								resolve(JSON.parse(uploadRes.data).data);
							} else {
								uni.showToast({
									title: '上传失败！',
									icon: 'error'
								})
							}
						},
						fail: (error) => {
							console.error('上传失败', error);
							// 处理上传失败的逻辑
							reject(error);
						},
					})
				})
			},
			addDefend() {
				if(this.agree){
					uni.request({
						url: this.reqUrl + "/protection",
						method: 'POST',
						header: {
							"Authorization": this.token
						},
						data: this.data,
						success: (res) => {
							console.log("提交", res)
							uni.navigateBack()
							uni.showToast({
								title:'提交成功！'
							})
						}
					})
				}else{
					uni.showToast({
						title:'请允许平台使用当前页面的数据作为公正材料！',
						icon:'none'
					})
				}
			},
		}
	}
</script>

<style scoped>
	.pages {
		display: flex;
		flex-direction: column;
		border-radius: 26rpx;
		background-color: white;
		padding: 30rpx;
		height: 100vh;
	}

	.view1 {
		/* display: flex; */
		border-bottom: 1rpx solid #f0f0f0;
		padding: 20rpx;
	}

	.view2 {
		border-bottom: 1rpx solid #f0f0f0;
		padding: 20rpx;
	}

	.view3 {
		border-bottom: 1rpx solid #f0f0f0;
		padding: 20rpx;
	}
	
	.view4{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-top: 15vh;
	}
	.btn{
		width: 40vw;
		margin-top: 2vh;
		margin-bottom: 10vh;
	}
</style>