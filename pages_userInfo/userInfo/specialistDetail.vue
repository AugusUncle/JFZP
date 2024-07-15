<template>
	<view class="page">
		
		<!-- <view class="date">{{specialist.gmtCreate}}</view> -->
		<view class="box">
			<image class="img" :src="specialist.headPic"></image>
		</view>
		<view class="box">
			<view class="title">{{specialist.name}}</view>
		</view>
		<view class="">
			<!-- <view class="detail">
				{{specialist.introduction}}
			</view> -->
			
			<mp-html :content="specialist.introduction" />
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: "",
				specialist:{},
				token:''
			}
		},
		onLoad: function(option) {
			this.token = uni.getStorageSync("token")
			console.log(option.id);
			this.id = option.id;
			this.getSpecialistDetail();
			
		},
		methods: {

			getSpecialistDetail() {
				uni.request({
					url: this.reqUrl + "/expert/" + this.id,
					method: 'GET',
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log(res)
						this.specialist = res.data.data
					}
				})
			}
		}
	}
</script>

<style>
	.box {
		text-align: center;
	}

	.title {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		width: 90%;
		margin: 25px 5px 5px 10px;
		font-size: 40rpx;
	}

	.date {
		color: #9E9E9E;
		font-size: 25rpx;
		margin: 15rpx 15rpx 20rpx 43rpx;
	}

	.img {

		border-radius: 5px 5px 5px 5px;
		/* width: 96%;
		height: 290rpx; */
	}

	.detail {
		width: 90%;
		text-align: left;
		margin: 25px 5px 5px 15px;
		font-size: 30rpx;
		font-family: monospace;

	}

	.mp {
		padding: 2%;
	}
</style>