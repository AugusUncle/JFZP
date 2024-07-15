<template>
	<view>
		<!-- 菜单 -->
		<u-sticky bgColor="#fff">
			<u-tabs :list="tabList" @click="switchTab()"></u-tabs>
		</u-sticky>
		<!-- 轮播图 -->
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item v-for="(swiper,index) in swiperList " :key="index" @tap="toDetailPage(swiper.id)">
					<view class="swiper-item ">
						<image class="image" mode="scaleToFill" :src="swiper.frontCoverUrl"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 视频 -->
		<view class="box">
			<view class="img-view" v-for="(video, index) in videoList" :key="index" @tap="toDetailPage(video.id)">
				<image class="img" :src="video.frontCoverUrl"></image>
				<view class="title-text">{{video.title}}</view>
				<view class="name-text">发布于{{video.gmtCreate}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoList: [],
				swiperList: [{}, {}, {}],
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 550,
				tabList: [{
					name: '测试'
				}],
				query: {
					size : 10,
					page: 1,
					tag: ''
				}
			}
		},
		onShow() {
			this.getVideoList()
			this.getDistData()
		},
		methods: {
			toDetailPage(id) {
				uni.navigateTo({
					url: '/pages/index/videoDetail?id=' + id
				})
			},
			getDistData() {
				uni.request({
					url: this.reqUrl + "/dropDown/video_tag",
					method: 'GET',
					header: {
						Authorization: uni.getStorageSync("token")
					},
					success: (res) => {
						console.log("视频标签", res)
						this.tabList = res.data.data
					}
				})
			},
			getVideoList() {
				uni.request({
					url: this.reqUrl + "/workPlan/list?page="+this.query.page+"&size="+ this.query.size+"&tag="+this.query.tag,
					method: 'GET',
					// data: this.query,
					header: {
						'Authorization': uni.getStorageSync("token")
					},
					success: (res) => {
						console.log("视频",res)
						if (res.data.code === 200) {
							this.videoList =  this.videoList.concat(res.data.data.workPlans) 
							this.swiperList = res.data.data.banners
						}
					},
				})
			},
			onReachBottom() {
				// 上拉触底时，加载下一页的新闻数据
				this.query.page++;
				console.log("啦啦啦1111")
				this.getVideoList();
			},
			switchTab(item) {
				 console.log('item', item);
				 this.videoList = []
				 this.query.page = 1
				 this.query.tag = item.id
				 if(item.id === "0"){
					 this.query.tag = ''
				 }
				 this.getVideoList()
			},
		}
	}
</script>

<style>
	.box {
		display: flex;
		flex-flow: row wrap;
		/* justify-content: center; */
		width: 100%;
		padding: 0.3%;
	}

	.img-view {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 48.7%;
		margin-left: 1%;
		margin-top: 1%;
		background-color: white;
		border-radius: 5px;
	}

	.img {
		width: 100%;
		height: 140px;
	}

	.title-text {
		padding: 4%;
		font-size: 14px;
	}

	.name-text {
		padding: 0 4%;
		font-size: 12px;
		color: grey;
	}

	.swiper {
		height: 210px;
		margin: 1.3% 0.3% 0 1.3%;
	}

	.image {
		border-radius: 10px;
		width: 100%;
		height: 100%;
	}

	.swiper-item {
		display: block;
		height: 100%;
		line-height: 400rpx;
		text-align: center;
	}
</style>