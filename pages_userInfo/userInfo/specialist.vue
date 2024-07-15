<template>
	<view class="page">
		<view class="page1" v-for="(user ,index) in specialist" :key="index" @tap="toDetailPage(user.id)">
			<view class="">
				<image class="pic" :src="user.headPic"></image>
			</view>
			<view class="page2">
				<view class="text1">{{user.name}}</view>
				<view v-if="user.introduction" class="text2">{{user.introduction.replace(/[^\u4e00-\u9fa5]/g, '')}} </view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				specialist: [],
				token:''
			}
		},
		onLoad() {
			
			this.token = uni.getStorageSync("token")
			this.getSpecialist()
		},
		methods: {
			getSpecialist() {
				uni.request({
					url: this.reqUrl + "/expert/list",
					method: 'GET',
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log(res)
						this.specialist = res.data.data.list
					}
				})
			},
			toDetailPage(id) {
				uni.navigateTo({
					url: '/pages_userInfo/userInfo/specialistDetail?id=' + id
				})
			},
		}
	}
</script>

<style>
	.page {
		padding: 2%;
		height: 100%;
	}

	.page1 {
		padding: 2%;
		background: white;
		border-radius: 5px;
		display: flex;
		/* justify-items: center; */
		flex-direction: row;
		margin-top: 2%;
	}

	.page2 {
		padding: 3%;
		margin-left: 3%;
		/* background: yellowgreen; */
	}

	.pic {
		width: 140rpx;
		height: 160rpx;
		/* position: absolute; */
		right: 5px;
	}

	.text2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		margin-top: 3%;
	}
</style>