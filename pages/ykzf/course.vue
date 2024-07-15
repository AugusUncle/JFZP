<template>
	<view class="page">
		<scroll-view scroll-y style="height: 100vh;" :scroll-with-animation="true">
			<!-- <video class="video" object-fit="fill"
				src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4" @error="videoErrorCallback"
				:danmu-list="danmuList" enable-danmu danmu-btn controls></video> -->
			<image class="img" src="https://jfzp.ykfly.com/jfht/app/hangmo.jpeg"></image>
			<image :src="imageUrl" mode="widthFix" style="width: 100%;" />
			<button class="btn" hover-class="btn1" @tap="toApply()">点击报名</button>
			<uni-icons class="back" type="left" size="30" color="white" @tap="back()"></uni-icons>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageUrl: "https://jfzp.ykfly.com/jfht/app/w-course2023-1.jpg"
			}
		},
		methods: {
			toApply(){
				uni.navigateTo({
					url:'/pages/ykzf/apply'
				})
			},
			back() {
				uni.navigateBack();
			},
		}
	}
</script>

<style>
	
	.video {
		width: 88%;
		position: absolute;
		top: 50%;
		left: 6%;
		border-radius: 10px;
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
	
	.back{
		position: fixed;
		top: 6%;
		left: 4%;
	}
	
	
</style>