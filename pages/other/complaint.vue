<template>
	<view style="height: 100%;">
		<!-- <uni-nav-bar fixed="t CWWArue" border="false" />
		<uni-nav-bar left-icon="left" left-text="正文" :border="false" fixed="true" @clickLeft="back()" title="举报" /> -->
		<view style="background-color: #FDEBD0  ; color: #F39C12; font-size: 14px;padding: 16rpx;">
			您的举报信息将在24小时内受理，请提交详细的举报材料</view>

		<!-- <view style="padding:  30rpx;background-color: white; ">
			<view style="display: flex;flex-direction: row; margin: 20rpx 0;">投诉<view style="color: #38BDF8 ;">@大叔Augus
				</view>的圈子：</view>
			<view style="background-color: #F4F6F6 ; padding: 20rpx; color: grey;border-radius: 10px;">@大叔Augus: 发布圈子
				哈哈哈哈哈哈哈哈哈哈</view>
		</view> -->

		<view style="padding:  30rpx;background-color: white; margin-top: 1vh; ">
			<view style="font-weight: 500; color: grey;">请选择你要举报的类型:</view>
			<view class="labels">
				<view :class="{active: activeIndex === index}" class="label" v-for="(label,index) in labels"
					:key="index" @click="selectLabel(label,index)">{{label}}</view>
			</view>
		</view>

		<view style="padding: 30rpx; background-color: white; margin: 20rpx 0 0 0;" v-if="activeIndex !== -1 ">
			<view style="font-weight: 500; color: grey;margin-bottom: 6rpx;">问题描述</view>
			<view class="view2">
				<textarea maxlength="500" v-model="data.problemContent" placeholder="请详细叙述您发现的问题:"></textarea>
			</view>
			<view class="view3">
				<view style="padding: 30rpx 0; font-weight: 500; color: grey;">材料截图</view>
				<view>
					<uni-file-picker limit="5" @select="select" v-model="data.url"
						size-type="compressed"></uni-file-picker>
				</view>
			</view>
		</view>

		<view
			style="padding: 30rpx; background-color: white;   position: position: absolute; text-align: center; bottom: 0; overflow: hidden;">
			<checkbox-group class="uni-list" style="margin-bottom: 20rpx;" @change="checkbox">
				<label style="font-size: 12px; color: grey;">
					<checkbox value="agree" color="#FFCC33" style="transform:scale(0.5)" />允许平台使用当前页面的数据作为公正材料
				</label>
			</checkbox-group>
			<button :disabled="disable" style="color:white; border-radius: 60rpx;" @tap="addDefend()">提交</button>
		</view>

	</view>
</template> 

<script>
	export default {
		data() {
			return {
				labels: [
					"涉黄信息",
					"涉政信息",
					"有害信息",
					"网络暴力",
					"涉及未成年",
					"不实信息",
					"虚假造谣",
					"诈骗信息",
					"涉企侵权",
					"违规营销",
					"人身攻击",
					"其他"
				],
				activeIndex: -1,
				data: {
					content: '',
					url: [],
					classType: 2,
					reportType: ''
				},
				disable: false,
				token:'',
				agree: false,
			}
		},
		onLoad() {
			this.token = uni.getStorageSync('token')
		},
		computed: {
			flag() {
				console.log("1111111111111")
				console.log("1222222222222", this.activeIndex)
				if (this.activeIndex !== -1) {
					this.disable = false
				}
			}
		},
		methods: {
			checkbox(event) {
				this.agree = event.detail.value.includes('agree');
				console.log(this.agree)
			},
			back() {
				uni.navigateBack()
			},
			selectLabel(label, index) {
				if (this.activeIndex === index) {
					this.activeIndex = -1
				} else {
					this.activeIndex = index
					this.data.reportType = label
				}
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

				if (this.data.problemContent === '') {
					uni.showToast({
						title: '描述不能为空！',
						icon: 'error'

					})
				} else {
					uni.request({
						url: this.reqUrl + "/common/text_detection",
						method: 'POST',
						data: {
							content: this.data.problemContent
						},
						success: (req) => {
							console.log('文本检测', req)
							if (req.data.code === 200) {
								this.submit()
							} else {
								uni.showToast({
									title: req.data.message,
									icon: 'error'
								})
							}
						}
					})
				}
			},

			submit() {
				if (this.agree) {
					uni.request({
						url: this.reqUrl + "/tip_off",
						method: 'POST',
						header: {
							"Authorization": this.token
						},
						data: this.data,
						success: (res) => {
							console.log("提交", res)
							uni.showToast({
								title: '提交成功！'
							})
							uni.navigateBack()
						}
					})
				} else {
					uni.showToast({
						title: '请允许平台使用当前页面的数据作为公正材料！',
						icon: 'none'
					})
				}
			},
		}
	}
</script>

<style>
	.labels {
		display: flex;
		padding: 1vh 0;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.label {
		background-color: #F4F6F6;
		color: grey;
		padding: 1vw 0;
		border-radius: 6px;
		width: 28vw;
		margin-bottom: 20rpx;
		text-align: center;
	}

	.active {
		background-color: #38BDF8;
		color: white;
	}

	button {
		background-color: #38BDF8;
	}

	button::after {
		border: none;
	}
</style>