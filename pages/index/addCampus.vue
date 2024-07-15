<template>
	<view class="page">
		<view>
			<uni-easyinput maxlength="300" type="textarea" autoHeight :placeholderStyle="placeholderStyle"
				:inputBorder="false" v-model="data.content" :styles="styles" placeholder="分享新鲜事...">
			</uni-easyinput>
		</view>

		<uni-section title="选择图片" type="line">
			<view class="example-body">
				<uni-file-picker limit="9" @select="select" size-type="compressed"></uni-file-picker>
			</view>
		</uni-section>

		<uni-section title="选择类型" type="line">
			<uni-data-select v-model="data.type" :localdata="range" @change="change"></uni-data-select>
		</uni-section>

		<button class="mini-btn" size="mini" @tap="add()">发布</button>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				range: [{
						value: 1,
						text: "闲置物品"
					},
					{
						value: 2,
						text: "美食"
					},
					{
						value: 3,
						text: "活动"
					},
					{
						value: 4,
						text: "校内兼职"
					},
					{
						value: 5,
						text: "文化"
					}
				],
				content: "",
				images: [],
				token: '',
				styles: {
					disableColor: "#2979FF"
				},
				placeholderStyle: "color:#bfbfbf;font-size:14px",

				data: {
					images: "",
					content: "",
					type: '',
					memberId: ""

				},

			}
		},
		onShow() {
			this.token = uni.getStorageSync("token")
		},
		methods: {
			select(e) {
				console.log("11111111111",e)
				let arr = []
				e.tempFilePaths.forEach(item => {
					this.uploadImage(item).then((imageUrl) => {
						// 成功上传图片并拿到链接后，再去调用其他方法
						uni.request({
							url: this.reqUrl + "/common/img_detection",
							method: 'POST',
							data: {
								imageUrl: imageUrl
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
				this.data.images = arr
				console.log("上传结束")
			},



			change(e) {
				this.type = e
				console.log(e)
			},

			add() {
				
				uni.request({
					url: this.reqUrl + "/common/text_detection",
					method: 'POST',
					data: {
						content: this.data.content
					},
					success: (req) => {
						console.log('文本检测', req)
						if (req.data.code === 200) {
							if (this.data.content === '') {
								uni.showModal({
									title: '提示',
									content: '内容不能为空'
							
								})
							} else if (this.data.type === '') {
								uni.showModal({
									title: '提示',
									content: '请选择类型'
								})
							} else {
								this.create()
								uni.navigateBack()
							}
						} else {
							uni.showToast({
								title: req.data.message,
								icon: 'error'
							})
							
						}
					}
				})
			},

			create() {
				console.log(this.data);
				// this.data.images = this.data.images.toString()
				this.data.memberId = uni.getStorageSync("userId")
				this.data.images = JSON.stringify(this.data.images);
				uni.request({
					url: this.reqUrl + "/schoolLife/save",
					method: 'POST',
					data: this.data,
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("发布成功", res)
					},
				})
			},

			// 假设你有一个函数用于上传图片
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
		}

	}
</script>

<style>
	.page {
		padding: 4%;
	}

	.pic {
		margin-top: 30%;
	}

	.mini-btn {
		position: absolute;
		right: 5%;
		margin-top: 5%;
	}

	button {
		background: "#38BDF8";
		background-color: deepskyblue;
		color: azure;
		border-radius: 6px;
	}

	.example-body {
		padding: 10px;
		padding-top: 0;
	}
</style>