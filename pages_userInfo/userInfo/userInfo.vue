<template>
	<view>
		<view class="item">
			<button open-type="chooseAvatar" @chooseavatar="onChooseAvatar">头像</button>
			<!-- <view class="left-icon"><uni-icons type="person-filled" color="#38BDF8"></uni-icons></view> -->
			<view class="right-icon">
				<!-- <image class="photo" :src="user.headPic"></image> -->

				<image class="photo" :src="user.headPic"></image>

			</view>
		</view>
		<view class="item" @tap="editInfo('name',user.name)">
			<button >昵称</button>
			<!-- <view class="left-icon"><uni-icons type="auth-filled" color="#38BDF8"></uni-icons></view> -->
			<text class="right-icon1" v-if="user.name!==null">{{user.name}}</text>
			<view class="right-icon"><uni-icons type="forward" color="#38BDF8"></uni-icons></view>
		</view>
		<!-- <view class="item">
			<button disabled>账号</button>
			<view class="left-icon"><uni-icons type="upload" color="#38BDF8"></uni-icons></view>
			<text class="right-icon1">{{user.account=== null ? '' : user.account}}</text>
			<view class="right-icon"><uni-icons type="forward" color="#38BDF8"></uni-icons></view>
		</view>
		<view class="item" @tap="editMobile()">
			<button >手机号码</button>
			<view class="left-icon"><uni-icons type="upload" color="#38BDF8"></uni-icons></view>
			<text class="right-icon1">{{user.mobile}}</text>
			<view class="right-icon"><uni-icons type="forward" color="#38BDF8"></uni-icons></view>
		</view> -->
		<view class="item">
			<button @tap="editInfo('education',user.education)">最高学历</button>
			<!-- <view class="left-icon"><uni-icons type="upload" color="#38BDF8"></uni-icons></view> -->
			<text class="right-icon1">{{getGenderText(user.education)}}</text>
			<view class="right-icon"><uni-icons type="forward" color="#38BDF8"></uni-icons></view>
		</view>
		<view class="item">
			<button @tap="editInfo('graduatedSchoolId',user.graduatedSchoolName)">毕业院校</button>
			<!-- <view class="left-icon"><uni-icons type="upload" color="#38BDF8"></uni-icons></view> -->
			<text class="right-icon1" v-if="user.graduatedSchoolId !== null">{{user.graduatedSchoolName}}</text>
			<view class="right-icon"><uni-icons type="forward" color="#38BDF8"></uni-icons></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageUrl: "../../static/user.png",
				formData: {
					id: ""
				},
				token:'',
				user: {
					headPic: '../../static/user.png',
					name: "",
					mobile: "",
					account: "",
					universityLevel: "",
					graduatedSchoolId: ""

				}
			}
		},
		onShow(options) {
			this.token = uni.getStorageSync("token")
			this.getUserInfo()
		},
		methods: {
			editMobile() {
				uni.navigateTo({
					url: '/pages_userInfo/userInfo/editPhone'
				})
			},
			editInfo(key, value) {
				uni.navigateTo({
					url: '/pages_userInfo/userInfo/editName?key=' + key + "&value=" + value
				})
			},
			getGenderText(value) {
				const genderMap = {
					0: '高中',
					1: '专科',
					2: '本科',
					3: '硕士',
				};

				return genderMap[value] || '其他';
			},
			// chooseImage() {
			// 	uni.chooseImage({
			// 		count: 1, // 选择图片的数量
			// 		sizeType: ['compressed'], // 压缩图像
			// 		sourceType: ['album'], // 从相册选择
			// 		success: (res) => {
			// 			// 选择成功后的回调函数
			// 			this.formData.id = this.userId
			// 			console.log("id", this.formData.id)
			// 			// 在这里可以处理上传头像的逻辑
			// 			this.uploadImage(res.tempFilePaths[0]);
			// 			this.user.headPic = res.tempFilePaths[0]
			// 		},
			// 		fail: (err) => {
			// 			// 选择失败后的回调函数
			// 			console.log(err.errMsg);
			// 		}
			// 	})
			// },
			onChooseAvatar(e) {
				this.user.headPic = e.mp.detail.avatarUrl;
				this.uploadImage(e.mp.detail.avatarUrl);
			},
			uploadImage(imageUrl) {
				this.formData.id = uni.getStorageSync("userId")
				uni.uploadFile({
					url: this.reqUrl + "/member/edit/headPic",
					filePath: imageUrl,
					name: 'headPic', // 服务端接收的字段名
					formData: this.formData,
					header: {
						'Authorization': this.token
					},
					success: (uploadRes) => {
						console.log('上传成功', uploadRes.data);
					},
					fail: (error) => {
						console.error('上传失败', error);
						// 处理上传失败的逻辑
					},
				})
			},

			getUserInfo() {
				let userId = uni.getStorageSync("userId")
				uni.request({
					url: this.reqUrl + "/member/userInfo/" + userId,
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log(res)
						this.user = res.data.data
					},
				})
			}
		},

	}
</script>

<style>
	.item {
		height: 90rpx;
		background: white;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #F4F4F5;
		font-size: 30rpx;
	}

	.right-icon {
		position: absolute;
		right: 15px;
	}

	.right-icon1 {
		position: absolute;
		right: 35px;
		color: gray;
	}

	.left-icon {
		position: absolute;
		left: 15px;
	}

	button {
		border: none;
		width: 100%;
		height: 100%;
		text-align: left;
		margin: 0;
		font-size: 30rpx;
		text-indent: 2%;
		background: white;
		line-height: 3;
	}

	button::after {
		border: none;
		border-radius: 0;
	}

	.photo {
		width: 35px;
		height: 35px;
	}
</style>