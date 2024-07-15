<template>
	<view class="page">
		<view class="page1" v-for="(commpany ,index) in commpanyList" :key="index" @tap="toDetailPage(commpany.id)">
			<view class="">
				<image class="pic" :src="commpany.headPic"></image>
			</view>
			<view class="page2">
				<view class="text1">{{commpany.name}}</view>
				<view class="text2" v-if="commpany.introduction">{{commpany.introduction.replace(/[^\u4e00-\u9fa5]/g, '')}} </view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				commpanyList: [],
				type: 2,

			}
		},
		onLoad() {
			this.getSpecialist()
		},
		methods: {
			getSpecialist() {
				let token = uni.getStorageSync("token")
				uni.request({
					url: this.reqUrl + "/member/list?type=" + this.type,
					method: 'GET',
					header: {
						"Authorization": token
					},
					success: (res) => {
						console.log(res)
						if(res.data.code){
							this.commpanyList = res.data.data.list
						}
						
					}
				})
			},
			toDetailPage(id) {
				uni.navigateTo({
					url: '/pages/company/company?id=' + id
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
		font-size: 12px;
		color: gray;
	}
</style>