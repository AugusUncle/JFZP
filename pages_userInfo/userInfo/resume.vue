<template>
	<view>

		<uni-swipe-action>
			<uni-swipe-action-item class="container" :right-options="options2" @click="bindClick($event, item.id)"
				v-for="(item,index) in resume" @tap="openFile(item.resume,item.name)" :key="index">
				<view class="content-box">
					<image class="img" src="../../static/icon_cb/pdf.png"></image>
					<view>
						<text class="content-text">{{item.name}}</text>
					</view>
				</view>
			</uni-swipe-action-item>
			<view>
				<web-view :src="fileUrl" v-if="showPreview"></web-view>
			</view>
		</uni-swipe-action>

		
		<view class="example-body">
			<uni-file-picker limit="1" :preview="false" file-mediatype="all" @select="select()">
				<button class="btn">上传简历</button>
			</uni-file-picker>
			<!-- <button class="btn" type="primary" @tap="addResume()" size="mini">保存</button> -->
		</view>
		<!-- </uni-section> -->

		<view v-for="(item, index1) in resume1" :key="index1">
			<iframe :src="item.resume" frameborder="0" width="100%" height="500px"></iframe>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				resume: [],
				resume1: [],
				data: {
					resume: "",
					memberId: "",
					name: "",
					type: ""
				},
				query: {
					page: 1,
					size: 10,
					memberId: ""
				},
				fileUrl: '', // 存储文件链接
				showPreview: false, // 控制是否显示预览
				startY: 0,
				moveY: 0,
				token: '',
				options2: [{
						text: '取消',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#F56C6C'
						}
					}
				],

			}
		},
		onShow() {
			this.token = uni.getStorageSync("token")
			this.userId = uni.getStorageSync("userId")
			this.getFiles()
		},
		methods: {
			select(e) {
				console.log(e)
				const url = e.tempFilePaths[0]
				this.data.name = e.tempFiles[0].name
				this.data.type = e.tempFiles[0].extname
				uni.uploadFile({
					url: this.reqUrl + "/file/upload",
					filePath: url,
					name: 'file', // 服务端接收的字段名
					header: {
						'Authorization': this.token
					},
					success: (uploadRes) => {
						console.log(JSON.parse(uploadRes.data).data)
						this.data.resume = JSON.parse(uploadRes.data).data
						this.addResume()
					},
					fail: (error) => {
						console.error('上传失败', error);
						// 处理上传失败的逻辑
					},
				})

			},

			addResume() {
				console.log(this.data)
				// this.data.resume = JSON.stringify(this.data.resume);
				this.data.memberId = uni.getStorageSync("userId")
				uni.request({
					url: this.reqUrl + '/resume/upload',
					method: 'POST',
					data: this.data,
					header: {
						'Authorization': this.token
					},
					success: (res) => {
						console.log(res)
						this.getFiles()
						this.resume1 = []
					},
					fail: (err) => {
						console.error('API请求失败', err);
					}
				})
			},

			getFiles() {
				this.query.memberId = uni.getStorageSync("userId")
				uni.request({
					url: this.reqUrl + '/resume/fileList',
					method: 'get',
					data: this.query,
					header: {
						'Authorization': this.token
					},
					success: (res) => {
						console.log(res)
						this.resume = res.data.data
					},
					fail: (err) => {
						console.error('API请求失败', err);
					}
				})
			},
			bindClick(e, id) {
				console.log("111", e.index);
				console.log("222", id);
				if (e.index === 1) {
					uni.request({
						url: this.reqUrl + '/resume/' + id,
						method: 'DELETE',
						header: {
							"Authorization": this.token
						},
						success: (res) => {
							console.log(res)
							this.getFiles()
						}
					})
				}
			},
			openFile(fileUrl, name) {
				// this.fileUrl = fileUrl
				// this.showPreview = true
				uni.navigateTo({
					url: '/pages_userInfo/userInfo/previewResume?url=' + fileUrl + "&name=" + name
				})
			},
			// openFilePreview(url) {
			// 	this.fileUrl = url; // 设置要预览的文件链接
			// 	this.showPreview = true; // 显示预览
			// },

			// change(e) {
			// 	this.isOpened = e;
			// 	console.log('返回：', e);
			// },


		}
	}
</script>

<style>
	.example-body {
		position: absolute;
		bottom: 0;
		background-color: white;
		width: 100%;
	}

	button {
		margin-top: 5%;
		margin-bottom: 10%;
		width: 90%;
		background-color: #38bdf8;
		color: white;
	}


	.content-box {
		display: flex;
		justify-content: left;
		align-items: center;
		height: 50px;
		background-color: white;
		margin-top: 2%;
		padding: 3%;
		/* border-radius: 10px; */
	}

	.content-text {
		margin-left: 5px;
		font-size: 15px;
	}

	.img {
		width: 30px;
		height: 30px;
	}

	.page {
		padding: 2%;
	}
</style>