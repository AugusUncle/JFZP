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
									<view>计算机网络</view>
									<view>会计</view>
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
						<view class="swiper-item" v-for="(item,index) in jobUserList" :key="index" @tap="toUserDetailPage(item.memberId)">
							<view class="head-view">
								<image class="headPic" :src="item.headPic"></image>
							</view>
							<view style="width: 500rpx;">
								<view class="title">
									<text style="font-size: 30rpx; font-weight: 500;">{{item.name}}</text>
									<!-- <text style="color: #38BDF8; font-size: 30rpx;">k</text> -->
								</view>
								<view class="zy1">
									<view>{{item.bt}}岁</view>
									<view>|</view>
									<view>本科</view>
									<view>|</view>
									<view>{{item.wt}}年</view>
								</view>
								<view class="ad">
									<view>期望职位：{{item.jobName}}</view>
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
					name: '求职信息',
				}],
				current: 0,
				scJobList: [],
				jobUserList: [],
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
			this.getUserJobList();
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
					url: this.reqUrl + "/abilityTrain/list?page=" + this.list1.page + "&size=" + this.list1.size,
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
			getUserJobList() {
				uni.request({
					url: this.reqUrl + "/resume/list?page=" + this.list2.page + "&size=" + this.list2.size,
					method: 'GET',
					header:{
						'Authorization' : uni.getStorageSync('token')
					},
					success: (res) => {
						console.log("求职者", res)
						this.jobUserList = this.jobUserList.concat(res.data.data.list)
						this.calculateAge()
					},
				})
			},
			calculateAge() {
				const currentYear = new Date().getFullYear();
				this.jobUserList.forEach(user => {
					const workDate = new Date(user.workTime);
					const birthdayDate = new Date(user.birthday);
					const workYear = workDate.getFullYear();
					const birthYear = birthdayDate.getFullYear();
					console.log(workYear, birthYear)
					user.wt = currentYear - workYear;
					user.bt = currentYear - birthYear;
				});
			},
			getMore() {
				console.log("我被拉了")
				this.list1.page++
				this.getSCJob()
			},
			getMore1() {
				console.log("我被拉了1")
				this.list2.page++
				this.getUserJobList()
			},
			toscJobPage(id) {
				uni.navigateTo({
					url: '/pages/job/scJob?id=' + id
				})
			},
			toUserDetailPage(id) {
				uni.navigateTo({
					url: '/pages/index/userInfo/userInfo?id=' + id
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
	
	.head-view {
		width: 134rpx;
		height: 134rpx;
	
		border-radius: 4rpx;
		margin: 29rpx 22rpx 40rpx 20rpx;
		display: flex;
		/* justify-content: center; */
		align-items: center;
	}
	
	.headPic {
		width: 134rpx;
		height: 134rpx;
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

	.zy1 {
		display: flex;
		border-radius: 4rpx;
		font-size: 24rpx;
		margin-bottom: 14rpx;
	}

	.zy1 view {
		padding: 4rpx;
		border-radius: 4rpx;
		margin-right: 16rpx;
	}
	
	.zy {
		display: flex;
		border-radius: 4rpx;
		font-size: 24rpx;
		margin: 5rpx 0;
		color: #38BDF8;
	}
	
	
	.zy view {
		padding: 4rpx 0;
		
		background: #E6F7FF;
		border-radius: 4rpx;
		margin-right: 15rpx;
		/* margin-right: 15rpx; */
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
		background: #FFFFFF;
		border-radius: 16rpx;
		box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(200, 200, 200, 0.5);
	}
</style>