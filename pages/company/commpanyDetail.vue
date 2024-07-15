<template>

	<view class="page1 text">
		<view class="back">
			<uni-icons class="icon" type="back" @tap="back" size="30"></uni-icons>
		</view>

		<view class="page_row ">

			<view class="page_column">
				<view class="company ">{{data.name}}</view>
				<!-- <view class="info ">无人机培训服务·100人</view> -->
			</view>

			<view>
				<image class="pic" :src="data.headPic"></image>
			</view>
			<!-- <view>
					<uni-icons type="forward" color="grey"></uni-icons>
				</view> -->
		</view>

	<!-- 	<view class="page_row top">
			<uni-icons class="" type="location-filled" color="white"></uni-icons>
			<view class="address text">上午09:00-下午18:00</view>

			<uni-icons class="xueli" type="auth-filled" color="white"></uni-icons>
			<view class="text">双休</view>
		</view> -->

		<view class="job_detail">公司地址</view>
		<view class="detail text">
			{{data.address}}
		</view>


		<view class="job_detail">公司相册</view>
		<view style="margin-top: 1vh;">
			<scroll-view class="scroll-view" scroll-x="true">
				<view class="scroll-view-item" v-for="(pic,index) in picList" :key="index" v-if="pic.type ===1">
					<image @click="previewImage(pic)" class="fly" :src="pic.url"></image>
				</view>
			</scroll-view>

		</view>

		<view class="job_detail">公司详情</view>
		<view v-if="data.introduction" class="detail ">
			{{data.introduction.replace(/\/n/g, '\n')}}

		</view>



		<!-- <view class="job_detail">公司视频</view>
		<view class="">
			<scroll-view class="scroll-view" scroll-x="true">
				<view class="scroll-view-item" v-for="(video,index) in picList" :key="index" v-if="video.type ===2">
					<video  class="fly" :src="video.file"></video>
				</view>
			</scroll-view>

		</view> -->

		<!-- <view class="job_detail">用户须知</view>
		<view class="detail ">
			暂无
		</view> -->

	</view>

</template>

<script>
	export default {
		data() {
			return {
				data: {
					page: 1,
					size: 10,
					token: ''
				},
				picList: [{
						url: "http://111.229.98.163:9090/jfht/922489222076563456-cefc1e178a82b9017dfbcd1704dab37a3912ef20.webp",
					},
					{
						url: "http://111.229.98.163:9090/jfht/922489222076563456-cefc1e178a82b9017dfbcd1704dab37a3912ef20.webp",
					},
					{
						url: "http://111.229.98.163:9090/jfht/922489222076563456-cefc1e178a82b9017dfbcd1704dab37a3912ef20.webp",
					},
					{
						url: "http://111.229.98.163:9090/jfht/922489222076563456-cefc1e178a82b9017dfbcd1704dab37a3912ef20.webp",
					}
				],

				videoList: [{
						url: "http://111.229.98.163:9090/jfht/v1.mp4",
					},
					{
						url: "http://111.229.98.163:9090/jfht/v2.mp4",
					},
					{
						url: "http://111.229.98.163:9090/jfht/v3.mp4",

					},
					{
						url: "http://111.229.98.163:9090/jfht/v4.mp4",
					},
				],
				data: []
			}
		},
		onLoad(query) {
			console.log(query.memberId)
			this.token = uni.getStorageSync("token")
			this.getCommpany(query.memberId)
		},
		methods: {
			getCommpany(id) {
				uni.request({
					url: this.reqUrl + "/member/userInfo/" + id,
					method: 'GET',
					header: {
						'Authorization': this.token
					},
					data: this.data,
					success: (res) => {
						console.log(res)
						this.data = res.data.data
						this.picList = res.data.data.corporateStyles
					},
				})
			},
			back() {
				uni.navigateBack();
			},

			previewImage(pic) {
				// 使用filter方法筛选type为1的数据
				// const filteredUserList = userList.filter(user => user.type === 1);
				// 使用map方法提取所有的name字段
				const urls = this.picList.map(p => p.url);
				uni.previewImage({
					current: pic.url,
					urls: urls
				});
			},
			// previewVideo(pic) {
			// 	// 使用filter方法筛选type为1的数据
			// 	// const filteredUserList = userList.filter(user => user.type === 1);
			// 	// 使用map方法提取所有的name字段
			// 	const urls = this.videoList.map(p => p.url);
			// 	uni.video({
			// 		current: pic.url,
			// 		urls: urls
			// 	});
			// }
		}
	}
</script>

<style>
	.page1 {
		padding: 4%;
		background-color: rgba(0, 0, 0, 0.8);
	}


	.page_row {
		display: flex;
		justify-items: center;
		align-items: center;
		/* margin-top: 24%; */

	}

	.page_column {
		display: flex;
		justify-items: center;
		width: 100%;
		flex-direction: column;
	}

	.top {
		margin-top: 8%;
	}

	.job_name {
		font-size: 25px;
	}

	.money {
		color: #38BDF8;
		position: absolute;
		right: 5%;
	}

	.text {
		color: white;
	}

	.xueli {
		margin-left: 4%;
	}

	.year {
		margin-left: 4%;
	}

	.line {
		width: 100%;
		margin: 5% 0 5% 0;
		/* 设置横线的宽度为100% */
		border-bottom: 1px solid #ECEFF1;
		/* 设置横线的颜色和样式 */
	}

	/* .icon {
		color: #777;
		margin-top: 10%;
		margin-left: 2%;
	} */

	.job_detail {
		font-size: 18px;
		margin-top: 10%;
	}

	.detail {
		margin-top: 4%;
		font-size: 14px;
		line-height: 25px;
		letter-spacing: 2px;
	}

	.pic {
		width: 90px;
		height: 90px;
		border-radius: 50%;
	}


	.info {
		margin-top: 1%;
		font-size: 14px;
	}

	.map {
		height: 30%;
		border-radius: 10px;
		margin-top: 4%;
	}

	.btn {
		margin-top: 4%;
	}

	.company {
		font-size: 26px;
		width: 100%;
	}

	button {
		border: none;
		width: 100%;
		height: 100%;
		margin: 0;
		font-size: 30rpx;
		color: white;
		background: #38BDF8;
		line-height: 3;
	}

	button::after {
		border: none;
		border-radius: 0;
	}

	.scroll-view {
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item {
		display: inline-block;
		width: 45%;
		height: 200rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}

	.fly {
		width: 300rpx;
		height: 200rpx;
		border-radius: 5px;

	}

	.back {
		width: 100%;
		margin-top: 15%;
	}

	.icon {
		color: #777;
		margin-top: 10%;
		margin-left: 2%;
	}
</style>