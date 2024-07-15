<template>
	<view class="page">
		<u-tabs :list="tabList" :current='current' @change="tabChange"></u-tabs>

		<view class="list" :style="{height: message+'px'}">
			<swiper class="swiper" duration="200" :current="current" @change="swiperChange">
				<swiper-item>
					<scroll-view  style="height: 100%;" scroll-y="true" @scrolltolower="getMore()">
						<view class="swiper-item" v-for="(item,index) in scJobList" :key="index" @tap="toscJobPage(item.id)">
							<view class="logo-view">
								<image class="logo" :src="item.headPic"></image>
							</view>
							<view style="width: 500rpx;">
								<view class="title">
									<text style="font-size: 30rpx; font-weight: 500;">{{item.name}}</text>
									<text style="color: #38BDF8; font-size: 30rpx;">{{item.number}}人</text>
								</view>
								<view class="zy">
									<view>酿酒专业</view>
									<view>酿酒专业</view>
								</view>
								<view class="ad">
									<view>{{item.memberName}}</view>
									<view style="display: flex; flex-direction: row;">
										<u-icon name="map-fill" color="#999999"></u-icon>
										{{item.cityName}}
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>

				<swiper-item>
					<scroll-view style="height: 100%;" scroll-y="true" @scrolltolower="getMore1()">
						<view class="swiper-item" v-for="(item,index) in jobList" :key="index" @tap="toJobDeatil(item.id)">
							<view class="logo-view">
								<image class="logo" :src="item.enterpriseHeaderPic"></image>
							</view>
							<view style="width: 500rpx;">
								<view class="title">
									<text style="font-size: 30rpx; font-weight: 500;">{{item.jobName}}</text>
									<text
										style="color: #38BDF8; font-size: 30rpx;">{{item.salaryMin}}-{{item.salaryMax}}k</text>
								</view>
								<view class="zy">
									<view>酿酒专业</view>
									<view>酿酒专业</view>
								</view>
								<view class="ad">
									<view>{{item.enterpriseName}}</view>
									<view style="display: flex; flex-direction: row;">
										<u-icon name="map-fill" color="#999999"></u-icon>
										{{item.cityName}}
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			message: {
				type: String,
				default: 700 // 默认值为空字符串
			}
		},
		data() {
			return {
				tabList: [{
					name: '校企合作',
				}, {
					name: '公司直招',
				}],
				current: 0,
				scJobList: [],
				jobList: [],
				list1: {
					page: 1,
					size: 10
				},
				list2: {
					page: 1,
					size: 10
				}
			}
		},
		created() {
			this.getSCJob()
			this.getJobList();
		},
		methods: {
			tabChange(e) {
				this.current = e.index
			},
			swiperChange(e) {
				this.current = e.detail.current
			},
			getSCJob() {
				uni.request({
					url: this.reqUrl+ "/abilityTrain/list?page=" + this.list1.page + "&size=" + this.list1.size,
					method: 'GET',
					header:{
						'Authorization' : uni.getStorageSync('token')
					},
					success: (res) => {
						console.log("校企合作", res)
						this.scJobList = this.scJobList.concat(res.data.data.list)
					},
				})
			},
			getJobList() {
				uni.request({
					url: this.reqUrl + "/jobNeed/list?page=" + this.list2.page + "&size=" + this.list2.size + "&isExamine=" + 1,
					method: 'GET',
					header:{
						'Authorization' : uni.getStorageSync('token')
					},
					success: (res) => {
						console.log("直招：", res)
						this.jobList = this.jobList.concat(res.data.data.list)
					},
				})
			},
			getMore() {
				console.log("我被拉了")
				this.list1.page++
				this.getSCJob()
			},
			getMore1() {
				console.log("我被拉了1")
				this.list2.page++
				this.getJobList()
			},
			toscJobPage(id) {
				uni.navigateTo({
					url: '/pages/job/scJob?id=' + id
				})
			},
			toJobDeatil(id) {
				uni.navigateTo({
					url: '/pages/job/job?id=' + id
				})
			},
		},
	}
</script>

<style scoped>
	.swiper {
		height: 100%;
		/* border-radius: 26rpx; */
	}

	.swiper-item {
		height: 182rpx;
		border-bottom: 1rpx solid #EFEFEF;
		display: flex;
		flex-direction: row;
		/* justify-content: center; */
		align-items: center;

	}

	.logo-view {
		width: 134rpx;
		height: 134rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0, 0, 0, 0.07);
		border-radius: 4rpx;
		margin: 29rpx 22rpx 40rpx 20rpx;
		display: flex;
		/* justify-content: center; */
		align-items: center;
	}

	.logo {
		width: 134rpx;
		height: 109rpx;

	}

	.title {
		display: flex;
		justify-content: space-between;

	}

	.zy {
		display: flex;
		border-radius: 4rpx;
		color: #38BDF8;
		font-size: 24rpx;
		margin: 10rpx 0;
	}

	.zy view {
		background: #E6F7FF;
		padding: 4rpx;
		border-radius: 4rpx;
		margin-right: 29rpx;
	}

	.ad {
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
		color: #999999;
	}

	.u-tabs__wrapper__nav__item__text.data-v-48634e29 {
		font-size: 30rpx !important;
		/* color: #999999 !important; */

	}

	.list {
		/* height: 620rpx; */
		border-radius: 36rpx;
		/* background: #FFFFFF; */
		/* box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(200, 200, 200, 0.5); */

	}
	.page {
		margin-top: 22rpx;
		border-radius: 16rpx;
		box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(200, 200, 200, 0.5);
	}
</style>