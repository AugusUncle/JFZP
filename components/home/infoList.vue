<template>
	<view class="page" >
		<u-tabs :list="tabList" :current='current' @change="tabChange"></u-tabs>

		<view class="list" :style="{height: message+'px'}">
			<swiper class="swiper" duration="200" :current="current" @change="swiperChange">
				<swiper-item>
					<scroll-view  style="height: 100%;" scroll-y="true" @scrolltolower="getMore()">
						<view class="swiper-item" v-for="(item,index) in data" :key="index" @tap="toPartnersPage(item.id)">
							<view class="head-view">
								<image class="headPic" :src="item.headPic"></image>
							</view>
							<view style="width: 500rpx;">
								<view class="title">
									<text style="font-size: 30rpx; font-weight: 500;">{{item.name}}</text>
									<!-- <text style="color: #38BDF8; font-size: 30rpx;">{{item.number}}人</text> -->
								</view>
								<view class="zy">
									<view v-for="(item1,index1) in item.specialityName.slice(0,2)" :key="index1">
										{{item1}}</view>
								</view>
								<view class="ad">
									<view>{{item.memberName}}</view>
									<view  style="display: flex; flex-direction: row;"   >
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
					name: '院校信息',
				}, {
					name: '求职信息',
				}],
				current: 0,
				scJobList: [],
				jobUserList: [],
				data: [],
				list1: {
					page: 1,
					size: 10
				},
				list2: {
					page: 1,
					size: 10
				},
				query: {
					page: 1,
					size: 10,
					type: 3 //2:企业   3:学校
				},
			}
		},
		created() {
			this.getList()
			this.getUserJobList();
		},
		methods: {
			tabChange(e) {
				this.current = e.index
			},
			swiperChange(e) {
				this.current = e.detail.current
			},
			getList() {
				uni.request({
					url: this.reqUrl + '/member/getEnterpriseOrSchool',
					method: 'GET',
					data: this.query,
					header:{
						'Authorization' : uni.getStorageSync('token')
					},
					success: (res) => {
						console.log("学校", res)
						if (res.data.code === 200) {
							this.data = this.data.concat(res.data.data.list)
							if (res.data.data.list.length > 0) {
								this.more = false
							} else {
								this.more = true
							}
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'error'
							})
						}
					},
					fail: (err) => {
						console.error('API请求失败', err);
					}
				})
			},
			getUserJobList() {
				uni.request({
					url: this.reqUrl + "/resume/list?page=" + this.list2.page + "&size=" + this.list2.size,
					header:{
						'Authorization' : uni.getStorageSync('token')
					},
					method: 'GET',
					success: (res) => {
						console.log("求职者1", res)
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
				this.query.page++
				this.getList()
			},
			getMore1() {
				console.log("我被拉了1")
				this.list2.page++
				this.getUserJobList()
			},
			toPartnersPage(id) {
				uni.navigateTo({
					url: "/pages/company/Partners/Partners?id=" + id
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

	.title {
		display: flex;
		justify-content: space-between;

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
	
	.zy1 {
		display: flex;
		border-radius: 4rpx;
		font-size: 24rpx;
		margin: 5rpx 0;
	}
	
	
	.zy1 view {
		padding: 4rpx 0;
		
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

		background: #FFFFFF;
		/* box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(200, 200, 200, 0.5); */

	}

	.page {
		margin-top: 22rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(200, 200, 200, 0.5);
	}
</style>