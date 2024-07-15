<template>
	<view class="page">

		<view v-if="type === 1">
			<view class="swiper-item" v-for="(item,index) in jobList" :key="index" @tap="toJobDeatil(item.id)">
				<view class="logo-view">
					<image class="logo" :src="item.enterpriseHeaderPic"></image>
				</view>
				<view style="width: 500rpx;">
					<view class="title">
						<text style="font-size: 30rpx; font-weight: 500;">{{item.jobName}}</text>
						<text style="color: #38BDF8; font-size: 30rpx;">{{item.salaryMin}}-{{item.salaryMax}}k</text>
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
		</view>

		<view v-if="type === 3 || type === 2">
			<view class="swiper-item" v-for="(item,index) in userList" :key="index"
				@tap="toUserDetailPage(item.memberId)">
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
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 0,
				userId: '',
				page: 1,
				size: 10,
				jobList: [],
				userList: []
			}
		},
		onLoad() {
			this.type = uni.getStorageSync('type')
			this.userId = uni.getStorageSync('userId')
			if (this.type === 1) {
				this.getJobList()
			} else {
				this.getUserList()
			}

		},
		methods: {
			getJobList() {
				uni.request({
					url: this.reqUrl + "/memberJob/recordByMember?page=" + this.page + "&size=" + this.size +
						"&memberId=" + this.userId,
					header: {
						'Authorization': uni.getStorageSync('token')
					},
					method: 'GET',
					success: (res) => {
						console.log("沟通岗位记录", res)
						this.jobList = this.jobList.concat(res.data.data.list)
					},
				})
			},
			calculateAge() {
				const currentYear = new Date().getFullYear();
				this.userList.forEach(user => {
					const workDate = new Date(user.workTime);
					const birthdayDate = new Date(user.birthday);
					const workYear = workDate.getFullYear();
					const birthYear = birthdayDate.getFullYear();
					console.log(workYear, birthYear)
					user.wt = currentYear - workYear;
					user.bt = currentYear - birthYear;
				});
			},
			getUserList() {
				
				uni.request({
					url: this.reqUrl + "/memberJob/recordByCompany?page=" + this.page + "&size=" + this.size +
						"&memberId=" + this.userId,
					header: {
						'Authorization': uni.getStorageSync('token')
					},
					method: 'GET',
					success: (res) => {
						console.log("求职者1", res)
						this.userList = this.userList.concat(res.data.data.list)
						this.calculateAge()
					},
				})
			},
			toJobDeatil(id) {
				uni.navigateTo({
					url: '/pages/job/job?id=' + id
				})
			},
			toUserDetailPage(id) {
				uni.navigateTo({
					url: '/pages/index/userInfo/userInfo?id=' + id
				})
			},
		}
	}
</script>

<style>
	.page {
		padding: 30rpx;
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
	.swiper-item {
		height: 182rpx;
		border-bottom: 1rpx solid #EFEFEF;
		display: flex;
		flex-direction: row;
		/* justify-content: center; */
		align-items: center;
	
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
	
</style>