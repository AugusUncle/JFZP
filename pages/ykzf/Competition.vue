<template>
	<view class="page">
		<!-- <uni-icons class="back" type="left" size="30" color="grey" @tap="back()"></uni-icons> -->
		<view class="search" style="margin: 30rpx 30rpx 10rpx 30rpx;">
			<u-search :show-action="true" action-text="搜索" bgColor="#ffffff" v-model="searchValue" @change="search"
				@search="search" @custom="search" :animation="true"></u-search>
		</view>


		<view class="list-item" v-for="(item,index) in dataList" :key="index" @tap="toDetailPage(item.id)">
			<image style="width: 690rpx; height: 357rpx; border-radius: 16rpx 16rpx 0 0;" :src="item.playBanner">
			</image>

			<view class="item">
				<view class="text1">{{item.playTitle}}</view>
				<view class="text2">类型：团体</view>
			</view>
			
			<view class="line"></view>
			
			<view class="item1">
				<view class="text3">
					<image style="width: 20rpx; height: 20rpx; margin-right: 2px;" src="https://jfzp.ykfly.com/jfht/app/location.png"></image>
					地点：{{item.playAddress}}
				</view>
				<view class="text3">人数：{{item.enrollCounts}}/{{item.needNumbers}}</view>
				
			</view>
			
			
			
			<view class="text3">
				<image style="width: 20rpx; height: 20rpx; margin-right: 2px;" src="https://jfzp.ykfly.com/jfht/app/users.png"></image>
				举办：{{item.organizers}}</view>
			<view class="text3">
				<image style="width: 20rpx; height: 20rpx; margin-right: 2px;" src="https://jfzp.ykfly.com/jfht/app/time.png"></image>
				时间：{{item.startTime}}</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				token: '',
				dataList: [],
				page: 1,
				size: 10,
				searchValue: '',
				playTitle: ''
			}
		},
		onLoad() {
			this.token = uni.getStorageSync('token')
			this.getList()
		},
		methods: {

			getList() {
				uni.request({
					url: this.reqUrl + "/play?page=" + this.page + "&size=" + this.size + "&playTitle=" + this
						.playTitle,
					method: 'GET',
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("比赛", res)
						this.dataList = res.data.data.list
					}
				})
			},
			back() {
				uni.navigateBack();
			},
			search() {
				this.playTitle = this.searchValue
				this.getList()
			},
			toDetailPage(id) {
				uni.navigateTo({
					url: '/pages/ykzf/CompetitionDetail?id=' + id
				})
			},

		}
	}
</script>

<style>
	.page {
		display: flex;
		flex-direction: column;
		/* height: 100vh; */
		/* background-image: url('https://jfzp.ykfly.com/jfht/app/bisai.png');
		background-size: cover;
		background-repeat: no-repeat;
		background-attachment: fixed;
		padding: 0 1%; */
	}


	.view-list {
		width: 100%;
		margin-top: 2%;
		overflow-y: scroll;

	}

	.game-bg {
		width: 100px;
		height: 80px;
		border-radius: 10px;
		margin: 10px;
	}

	.content {
		background-color: rgba(255, 255, 255, 0.5);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		margin-bottom: 2%;
		border-radius: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;

	}

	.content1 {
		font-size: 12px;
		padding: 0 1%;
	}

	.text {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 9px;
		margin: 4px 0;
	}

	.text image {
		width: 10px;
		height: 10px;
		margin-right: 2px;
	}

	.back {
		position: fixed;
		top: 6%;
		left: 4%;
	}

	.gameStatus {
		position: absolute;
		right: 5px;
		top: 5px;
		padding: 2px 10px;
		font-size: 11px;
		color: white;
		background-color: royalblue;
		box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
		width: auto;
		height: auto;
		border-radius: 10px;
		border: 1px solid white;
	}


	.list-item {
		width: 690rpx;
		height: 640rpx;
		margin: 20rpx 30rpx;
		background: #FFFFFE;
		box-shadow: 0rpx 2rpx 8rpx 0rpx rgba(186, 186, 186, 0.5);
		border-radius: 16rpx;
	}

	.item{
		display: flex;
		flex-direction: row;
		padding: 20rpx 30rpx;
		justify-content: space-between;
		align-items: center;
	}
	.item1{
		display: flex;
		flex-direction: row;
		/* padding: 0 30rpx; */
		justify-content: space-between;
		align-items: center;
	}
	.text1 {
		font-weight: 500;
		font-size: 32rpx;
		color: #606060;
		line-height: 45rpx;
		font-style: normal;
	}
	
	.text2{
		
		font-weight: 500;
		font-size: 26rpx;
		color: #38BDF8;
		line-height: 37rpx;
		font-style: normal;
	}
	
	.text3{
		font-weight: 400;
		font-size: 26rpx;
		color: #333333;
		line-height: 37rpx;
		font-style: normal;
		margin: 8rpx 30rpx;
	}
	
	.line{
		width: 640rpx;
		height: 1rpx;
		background: #EDEDED;
		margin: 0rpx 30rpx 20rpx 30rpx;
	}
	
	.search{
		width: 690rpx;
		height: 67rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0,0,0,0.07);
		border-radius: 34rpx;
		
	}
	
</style>