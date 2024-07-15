<template>
	<view>
		<view style="padding: 5vw 5vw 20vw 2vw; ">
			<uni-forms :modelValue="data">
				<uni-forms-item label="名称" name="name">
					<uni-easyinput type="text" v-model="data.name" placeholder="请输入学校(企业)名称" />
				</uni-forms-item>
				<uni-forms-item label="简介" name="name">
					<textarea class="texts" v-model="data.introduction" maxlength="10000"
						 placeholder="请输入学校(企业)简介" />
				</uni-forms-item>
				<!-- <uni-forms-item label="学校专业" name="name">
					<view class="title" v-for="(item1,index1) in data.specialities" :key="index1">
						<view v-if="item1">{{item1}}</view>
					</view>
					<button type="primary" size="mini" @tap="add()"> 添加</button>
				</uni-forms-item> -->

				<uni-forms-item label="图片" name="age">
					<uni-file-picker limit="99" @select="select" v-model="data.corporateStyles"
						size-type="compressed"></uni-file-picker>
				</uni-forms-item>
			</uni-forms>
		</view>
		<view class="saveBtn"><button @tap="editUser()">保存</button></view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				data: {},
				token: '',
				userId: '',
				l:'学校'
			};

		},
		onLoad() {
			this.token = uni.getStorageSync('token')
			this.userId = uni.getStorageSync('userId')
			this.getInfo()
		},
		methods: {
			getInfo() {
				uni.request({
					url: this.reqUrl + "/member/userInfo/" + this.userId,
					method: "GET",
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("用户信息", res)
						this.data = res.data.data
					}
				})
			},

			editUser() {
				uni.request({
					url: this.reqUrl + "/member/edit",
					method: 'PUT',
					header: {
						"Authorization": this.token
					},
					data: this.data,
					success: (res) => {
						console.log("修改用户信息", res)
						this.data = res.data.data
						this.getInfo()
					}
				})

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
				this.data.images = arr
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
			add(){
				uni.navigateTo({
					url:'/pages_userInfo/userInfo/moreInfo/addSpecialities'
				})
			},

		},
	};
</script>

<style>
	button {
		background-color: #38bdf8;
		color: white;
	}

	.saveBtn {
		position: absolute;
		bottom: 0;
		width: 96vw;
		background-color: white;
		padding: 3vw 2vw 8vw 2vw;
	}

	.texts {
		width: 74vw;
		background-color: white;
		padding: 5px;
		border-radius: 6px;
		border: 1px solid lightgray;
	}
	
	.title {
		border: #39BDF7 1px solid;
		border-radius: 3px;
		margin: 1vh 1vw;
		font-size: 10px;
		color: #39BDF7;
		padding: 1px;
		flex-wrap: wrap;
	}
</style>