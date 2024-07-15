<template>
	<view>
		<view class="item" @tap="editAccount(user.account)">
			<button>账号</button>
			<!-- <view class="left-icon"><uni-icons type="contact-filled" color="#38BDF8"></uni-icons></view> -->
			<text class="right-icon1">{{user.account=== null ? '' : user.account}}</text>
			<view class="right-icon"><uni-icons type="forward" color="#38BDF8"></uni-icons></view>
		</view>
		<view class="item" @tap="editMobile()">
			<button>手机号码</button>
			<!-- <view class="left-icon"><uni-icons type="phone-filled" color="#38BDF8"></uni-icons></view> -->
			<text class="right-icon1">{{user.mobile}}</text>
			<view class="right-icon"><uni-icons type="forward" color="#38BDF8"></uni-icons></view>
		</view>
		<view class="item">
			<button @tap="toEditPsd(user.account,user.password)">密码</button>
			<!-- <view class="left-icon"><uni-icons type="locked-filled" color="#38BDF8"></uni-icons></view> -->
			<text class="right-icon1">{{user.password === "0" ? "未设置":"已设置"}}</text>
			<view class="right-icon"><uni-icons type="forward" color="#38BDF8"></uni-icons></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token: '',
				user: {}
			}
		},
		onShow() {
			this.token = uni.getStorageSync("token")
			this.getUserInfo()
		},
		methods: {
			editAccount(account) {
				uni.navigateTo({
					url: '/pages/setting/editAccount?account=' + account
				})
			},
			editMobile() {
				uni.navigateTo({
					url: '/pages_userInfo/userInfo/editPhone'
				})
			},
			toEditPsd(account, psd) {
				uni.navigateTo({
					url: '/pages/setting/editPassword?account=' + account + "&password=" + psd
				})
			},
			getUserInfo() {
				let userId = uni.getStorageSync("userId")
				uni.request({
					// url: this.reqUrl + "/member/userInfo/" + userId,
					url: this.reqUrl + "/userInfo",
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log(res)
						this.user = res.data.data
					},
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
</style>