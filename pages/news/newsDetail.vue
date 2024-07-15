<template>
	<view class="page">
		<view class="box">
			<view class="title">{{article.title}}</view>
		</view>
		<view class="date">{{article.gmtCreate}}</view>
		<view class="box">
			<image class="img" :src="article.frontCoverUrl" ></image>
		</view>
		<view class="mp">
			<mp-html :content="article.content" />
		</view>
		
		<!-- <view class="box">
			<view class="detail">
				{{article.content}}
			</view>
		</view> -->

	</view>
</template>

<script>
	export default {

		data() {
			return {
				articleId: "",
				article:{
					title:"",
					gmtCreate:"",
					content:""
				}
			}
		},

		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option.id); //打印出上个页面传递的参数。
			this.articleId = option.id;
			this.getNewsDetail();
		},
		
		mounted() {
			
		},
		methods: {
			getNewsDetail() {
				let token = uni.getStorageSync("token")
				uni.request({
					url: this.reqUrl + "/articles/"+this.articleId,
					method: 'GET',
					header: {
						"Authorization": token
					},
					success: (res) => {
						console.log(res)
						this.article = res.data.data
					}
				})
			}

		}
	}
</script>

<style>
	.page {}

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
		width: 96%;
		height: 290rpx;
	}

	.detail {
		width: 90%;
		text-align: left;
		margin: 25px 5px 5px 15px;
		font-size: 30rpx;
		font-family: monospace;

	}
	.mp{
		padding: 2%;
	}
</style>