<template>
	<view>
		<view class="item">
			<button @tap="toAccountPage()">账号信息</button>
			<!-- <view class="left-icon"><uni-icons type="person-filled" color="#38BDF8"></uni-icons></view> -->
			<view class="right-icon"><uni-icons type="forward" color="#38BDF8"></uni-icons></view>
		</view>
		<view class="item">
			<button @tap="toUserInfo()">个人资料</button>
			<!-- <view class="left-icon"><uni-icons type="person-filled" color="#38BDF8"></uni-icons></view> -->
			<view class="right-icon"><uni-icons type="forward" color="#38BDF8"></uni-icons></view>
		</view>
		<!-- <view class="item">
			<button @tap="loginOut()">退出登录</button>
			<view class="left-icon"><uni-icons type="undo-filled" color="#38BDF8"></uni-icons></view>
			<view class="right-icon"><uni-icons type="forward" color="#38BDF8"></uni-icons></view>
		</view> -->
		<view class="item">
			<button @tap="deleteUser()">删除账户</button>
			<!-- <view class="left-icon"><uni-icons type="trash" color="#38BDF8"></uni-icons></view> -->
			<view class="right-icon"><uni-icons type="forward" color="#38BDF8"></uni-icons></view>
		</view>
		
		<button @tap="loginOut()" class="exit-btn">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token:'',
			}
		},
		onLoad() {
			this.token = uni.getStorageSync("token")
		},
		methods: {
			editName() {
				uni.navigateTo({
					url: '/pages_userInfo/userInfo/editName'
				})
			},
			toUserInfo() {
				uni.navigateTo({
					url: '/pages_userInfo/userInfo/userInfo'
				})
			},
			toAccountPage() {
				uni.navigateTo({
					url: '/pages/setting/account'
				})
			},
			loginOut() {
				uni.showModal({
					title: '提示',
					content: '确定退出登录？',
					showCancel: true,
					confirmText: '确定',
					success: (res) => {
						if (res.confirm) {
							// 用户点击确定，跳转到登录页面
							uni.request({
								url: this.reqUrl + "/logout",
								method: 'GET',
								header: {
									"Authorization": this.token
								},
								success: (res) => {
									console.log('退出登录',res)
									uni.reLaunch({
										url: '/pages_login/login/wxLogin'
									})
									this.cleanCaches()
								}
							})
						}
					}
				})

			},
			cleanCaches() {
				uni.removeStorage({
					key: "userId",
					success: (res) => {
						console.log("user清除成功", res)
					},
					fail: (res) => {
						console.log("user清除失败", res)
					}
				})
				uni.removeStorage({
					key: "token",
					success: (res) => {
						console.log("token清除成功", res)
					},
					fail: (res) => {
						console.log("token清除失败", res)
					}
				})
				uni.removeStorage({
					key: "type",
					success: (res) => {
						console.log("type清除成功", res)
					},
					fail: (res) => {
						console.log("type清除失败", res)
					}
				})

			},
			deleteUser() {
				const id = uni.getStorageSync("userId")
				uni.showModal({
					title: '提示',
					content: '账户删除后不可恢复，确定删除？',
					showCancel: true,
					confirmText: '确定',
					success: (res) => {
						if (res.confirm) {
							// 用户点击确定，跳转到登录页面
							uni.request({
								url: this.reqUrl + "/member/" + id,
								method: 'DELETE',
								header: {
									"Authorization": this.token
								},
								success: (res) => {
									uni.redirectTo({
										url: '/pages_login/login/wxLogin'
									})

									this.cleanCaches()
								}
							})
						}
					}
				})
			}

		}
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
	
	.exit-btn{
		text-align: center;
		margin-top: 5%;
	}
</style>