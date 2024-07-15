<template>
	<view class="content">
		<view class="index">
			<view>
				<p class="text" :style="{marginTop:statusBarHeight+'px'}">首页</p>
			</view>

			<view class="search" @tap="toSearchPage()">
				<view class="search-icon">
					<u-icon style="margin-left: 14rpx;" name="search" size="28" color="#FFFFFF"></u-icon>
					<text>请输入你想找的</text>
				</view>
				<view class="search-btn">
					<text>搜索</text>
				</view>
			</view>

			<view>
				<swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="500">
					<swiper-item v-for="(item,index) in swiperList" :key="index">
						<image class="image" :src="item.url"></image>
					</swiper-item>
				</swiper>
			</view>

			<view class="menu">
				<view class="menu-item" @tap="toNewsList()">
					<image class="menu-img" src="../../static/home/news.png"></image>
					<text>热点新闻</text>
				</view>
				<view class="menu-item" @tap="toFlyHome()">
					<image class="menu-img" src="../../static/home/fly.png"></image>
					<text>飞行员之家</text>
				</view>
				<view class="menu-item" @tap="toCompetition()">
					<image class="menu-img" src="../../static/home/game.png"></image>
					<text>赛事中心</text>
				</view>
				<view class="menu-item" @tap="toSpecialist()">
					<image class="menu-img" src="../../static/home/team.png"></image>
					<text>专家团队</text>
				</view>
			</view>

		</view>

		<JobList :message="h" v-if="type ===1 || type === ''"></JobList>
		<infoList :message="h" v-if="type ===2"></infoList>
		<infoJobList :message="h" v-if="type ===3"></infoJobList>

	</view>
</template>

<script>
	import JobList from '@/components/home/jobList.vue'
	import infoList from '@/components/home/infoList.vue'
	import infoJobList from '@/components/home/InfoJobList.vue'

	export default {
		components: {
			JobList,
			infoList,
			infoJobList
		},
		data() {
			return {
				statusBarHeight: 0,
				url1: "https://jfzp.ykfly.com/jfht/v2/swiper.png",
				swiperList: [{
					url: "https://jfzp.ykfly.com/jfht/v2/swiper.png"
				}, {
					url: "https://jfzp.ykfly.com/jfht/v2/swiper.png"
				}, {
					url: "https://jfzp.ykfly.com/jfht/v2/swiper.png"
				}],
				current: 0,
				h: 276,
				type: 3
			}
		},
		onLoad() {
			const systemInfo = uni.getSystemInfoSync();
			console.log("系统信息", systemInfo)
			const tabBarHeight = systemInfo.screenHeight - systemInfo.safeArea.bottom + 75;
			console.log("tarbar高度", tabBarHeight)
			const h1 = systemInfo.windowHeight
			console.log("窗口高度", h1)

			const custom = wx.getMenuButtonBoundingClientRect()
			this.statusBarHeight = custom.top
			uni.createSelectorQuery().select('.text').boundingClientRect(data => {
				this.statusBarHeight = this.statusBarHeight + (32 - data.height) / 2
			}).exec();
			
			uni.createSelectorQuery().selectViewport().scrollOffset(scroll => {
				// 使用uni.createSelectorQuery().select()获取元素信息
				uni.createSelectorQuery().in(this).select('.index').boundingClientRect(rect => {
					// 获取到元素的高度
					this.h = h1-rect.height -custom.top-15;
					console.log("123123123123123123",rect)
				}).exec();
			}).exec();
			
			
			this.type = uni.getStorageSync('type')

		},
		methods: {
			toSearchPage(){
				uni.navigateTo({
					url:'/pages/index/search'
				})
			},
			toFlyHome() {
				uni.navigateTo({
					url: "/pages/ykzf/FlyHome"
				})
			},
			toCompetition() {
				uni.navigateTo({
					url: "/pages/ykzf/Competition"
				})
			},
			toNewsList() {
				uni.navigateTo({
					url: "/pages/news/newsList"
				})
			},
			toSpecialist() {
				uni.navigateTo({
					url: "/pages_userInfo/userInfo/specialist"
				})
			},

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		background-image: url("https://jfzp.ykfly.com/jfht/v2/home/bg.png");
		background-size: 100% auto;
		position: relative;
		padding: 0 30rpx;
		height: 491rpx;
		background-repeat: no-repeat;
	}

	.text {
		/* margin-left: 30rpx; */
		font-weight: 500;
		font-size: 44rpx;
		color: #FFFFFF;
		align-items: center;
	}

	.search {
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* width: 690rpx; */
		height: 60rpx;
		background: rgba(255, 255, 255, 0.38);
		border-radius: 60rpx;
		margin-top: 15rpx;
		color: #FFFFFF;
		font-size: 28rpx;
		padding: 8rpx;
	}

	.search-icon {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.search-btn {
		width: 102rpx;
		height: 48rpx;
		background: #38BDF8;
		border-radius: 38rpx;
		/* margin-right: 6rpx; */
		text-align: center;
		padding: 8rpx 0 0 0;
	}

	.text1 {
		width: 57rpx;
		height: 40rpx;
		font-weight: 400;
		font-size: 28rpx;
		color: #FAFAFA;
		line-height: 40rpx;
		text-align: left;

	}

	.swiper {
		height: 304rpx;
		margin-top: 22rpx;
	}

	.image {

		width: 100%;
		/* height: 600rpx; */
		height: 100%;
	}

	.menu {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 643rpx;
		height: 180rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(200, 200, 200, 0.5);
		border-radius: 16rpx;
		margin-top: 22rpx;
		padding: 0 24rpx;
	}

	.menu-img {
		width: 87rpx;
		height: 87rpx;
		margin-bottom: 6rpx;
	}

	.menu-item {
		display: flex;
		flex-direction: column;
		font-size: 24rpx;
		align-items: center;
	}

	.job {
		width: 690rpx;
		height: 1196rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(200, 200, 200, 0.5);
		margin-top: 22rpx;
	}
</style>