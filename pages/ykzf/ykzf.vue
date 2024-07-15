<template>
	<view class="page">
		<view scroll-y style="height: 100vh;" :scroll-with-animation="true">
			<!-- <video class="video" object-fit="fill"
				src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4" @error="videoErrorCallback"
				controls="false" autoplay="false"></video> -->
			<image class="img" src="https://jfzp.ykfly.com/jfht/app/caac.webp"></image>
			<image :src="imageUrl" mode="widthFix" style="width: 100%;" />
			<button class="btn" hover-class="btn1" @tap="toApply()">点击报名</button>
			<uni-icons class="back" type="left" size="30" color="white" @tap="back()"></uni-icons>
		</view>
		<!-- <view class="back">
			<uni-icons class="icon" type="back" @tap="back" size="30"></uni-icons>
		</view> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageUrl: "https://jfzp.ykfly.com/jfht/app/caac-bg.jpg"
			}
		},
		methods: {
			back() {
				uni.navigateBack();
				// uni.reLaunch({
				// 	url: '/pages/index/index'
				// })
			},
			toApply() {
				uni.navigateTo({
					url: '/pages/ykzf/apply'
				})
			},
		}
	}
</script>

<style>
	.page {
		width: 100%;
		height: 100vh;
		/* 设置高度，可以根据需要进行调整 */
		/* background-image: url("https://jfadm.ykfly.com/jfht/app/caac-bg.jpg");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-attachment: fixed;
		display: flex; */
	}
	.img{
		width: 88%;
		position: absolute;
		top: 50%;
		left: 6%;
		border-radius: 10px;
		height: 28%;
	}

	.btn {
		width: 80%;
		position: absolute;
		top: 248%;
		left: 10%;
		border-radius: 10px;
		background: white;
	}

	.back {
		position: fixed;
		top: 6%;
		left: 4%;
	}

	.video {
		width: 88%;
		position: absolute;
		top: 50%;
		left: 6%;
		border-radius: 10px;
	}

	.icon {
		color: white;
		margin-top: 10%;
		margin-left: 2%;
	}
</style>