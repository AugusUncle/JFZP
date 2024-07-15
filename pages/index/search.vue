<template>
	<view class="page">
		
		<view  class="search-input">
			<u-search placeholder="请输入查询内容" v-model="keyword" @search="search" @custom="custom" focus="true"
				bgColor="#FFFFFF"></u-search>
		</view>
		
		<view v-if="!keyword" class="box">
			<view  class="">
				<view class="title" v-if="historyList.length>0">
					<text>历史搜索</text>
					<u-icon name="trash" size="20" @tap="clean()"></u-icon>
				</view>
				<view v-if="historyList.length >0" class="list">
					<view v-if="isOpen" v-for="(item,index) in historyList" :key="index" class="item">{{item}}</view>
					<view v-if="!isOpen" v-for="(item,index) in historyList.slice(0,5)" :key="index" class="item">{{item}}</view>
					<view v-if="isOpen && historyList.length >5" class="item1" @tap="close()"><image class="img" src='../../static/home/up.png'></image></view>
					<view v-if="!isOpen && historyList.length >5" class="item1" @tap="open()"><image class="img" src='../../static/home/down.png'></image></view>
				</view>
				<!-- <view class="hotSearch">
					<view style="color: #d81e06; font-weight: 500; margin: 15rpx;display: flex; align-items: center;">
						<image class="img1" src="../../static/home/fire.png"></image>大家都在搜
					</view>
					<view class="hotSearch-list">
						<view class="content" v-for="(item,index) in 10" :key="index">
							<view style="display: flex; align-items: center;">
								<view style="width: 20rpx; font-size: 35rpx; color: grey;font-weight: 500;">{{index+1}}</view>
								<view style="margin-left: 40rpx; font-size: 30rpx;">JAVA开发工程师</view>
							</view>
							<view>
								<image class="img1" src="../../static/home/top.png" style="width: 30rpx; height: 30rpx;"></image>
							</view>
						</view>
					</view>
				</view> -->
			</view>
			
		</view>
		<view v-if="keyword" style="padding: 0 20rpx;">
			<JobList :message="h" v-if="type ===1"></JobList>
			<infoList :message="h" v-if="type ===2"></infoList>
			<infoJobList :message="h" v-if="type ===3"></infoJobList>
			
		</view>
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
				keyword: '',
				historyList: [],
				isOpen:false,
				type:3,
				h:276
			}
		},
		onLoad() {
			this.type = uni.getStorageSync('type')
			const list = uni.getStorageSync('historyList')
			if (list) {
				this.historyList = list
			}
			
			const systemInfo = uni.getSystemInfoSync();
			console.log("系统信息", systemInfo)
			
			uni.createSelectorQuery().select('.search-input').boundingClientRect(data => {
				this.h = systemInfo.windowHeight - data.height-60
			}).exec();
		},
		methods: {
			search() {
				if (!this.keyword) return;
				let index = this.historyList.indexOf(this.keyword)
				console.log('suoyin', index)
				if (index < 0) {
					console.log('新郑')
					this.historyList.unshift(this.keyword)
					uni.setStorageSync('historyList', this.historyList)
				} else {
					console.log('重复替换')
					this.historyList.unshift(this.historyList.splice(index, 1)[0])
					uni.setStorageSync('historyList', this.historyList)
				}
			},
			custom() {
				this.search()
			},
			clean() {
				let that = this
				uni.showModal({
					// title: '确定删除全部查询记录？',
					content: '确定删除全部查询记录？',
					success: function(res) {
						if (res.confirm) {
							that.historyList = [];
							uni.removeStorageSync('historyList');

						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			open(){
				this.isOpen = true
			},
			close(){
				this.isOpen = false
			}
		}
	}
</script>

<style scoped>
	.page {
		background-color: #F8F8F8;
		margin-top: 0 !important;
		/* height: 100vh; */
	}
	
	.search-input{
		background-color: #F8F8F8;
		padding: 20rpx;
		position: sticky;
		z-index: 99;
		top: 0;
	}

	.box {
		background-color: #FFFFFF;
		border-radius: 30rpx;
	}

	.list {
		display: flex;
		/* margin-top: 20rpx; */
		margin-bottom: 40rpx;
		flex-wrap: wrap;
	}

	.item {
		background-color: #f0f0f0;
		border-radius: 36rpx;
		width: auto;
		padding: 10rpx 26rpx;
		margin: 15rpx 20rpx 0 0;
		font-size: 24rpx;
		font-weight: 300;
	}
	
	.item1 {
		/* background-color: #f0f0f0; */
		border-radius: 50%;
		width: auto;
		padding: 10rpx 13rpx;
		margin: 15rpx 20rpx 0 0;
		font-size: 24rpx;
		font-weight: 300;
	}

	.title {
		display: flex;
		justify-content: space-between;
	}

	.hotSearch {
		background-color: rgba(221, 141, 176, 0.3);
		border-radius: 26rpx;
		padding: 6rpx;
	}

	.hotSearch-list {
		background-color: white;
		border-radius: 24rpx;
		padding: 20rpx;
	}

	.content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 40rpx;

	}

	.img {
		width: 30rpx;
		height: 30rpx;
	}
	
	.img1 {
		width: 40rpx;
		height: 40rpx;
	}
</style>