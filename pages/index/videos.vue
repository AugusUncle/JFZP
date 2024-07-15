<template>
	<view class="page">
		<swiper :current="currentIndex" @change="swiperChange" vertical="true">
			<swiper-item v-for="(video, index) in videoList" :key="index">
				<view>
					<video id="myVideo" :id="'video_' + index" :src="video.videoUrl" controls loop object-fit="contain"
						enable-play-gesture="true" auto-pause-if-open-native auto-pause-if-navigate
						></video>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoList: [{
						src: 'http://111.229.98.163:9090/jfht/1.mp4'
					},
					{
						src: 'http://111.229.98.163:9090/jfht/2.mp4'
					},
					{
						src: 'http://111.229.98.163:9090/jfht/3.mp4'
					},
					{
						src: 'http://111.229.98.163:9090/jfht/4.mp4'
					}
					// 添加更多视频信息
				],
				currentIndex: 0,
				lastIndex: 0,
			};
		},

		onLoad() {
			this.getVideoList()
		},
		methods: {
			getVideoList() {
				uni.request({
					url: this.reqUrl + "/workPlan/list",
					method: 'GET',
					data: this.data,
					header: {
						'Authorization': uni.getStorageSync("token")
					},
					success: (res) => {
						console.log(res)
						if (res.data.code === 200) {
							this.videoList = res.data.data.list
						} 

					},
					fail: (res) => {
						console.log("失败", res)
					}
				})
			},
			swiperChange(e) {
				this.lastIndex = this.currentIndex;
				this.currentIndex = e.detail.current;

				const diff = this.currentIndex - this.lastIndex;

				if (diff > 0) {
					this.playVideo(this.lastIndex, this.currentIndex);
				} else if (diff < 0) {
					this.playVideo(this.lastIndex, this.currentIndex);
				}
			},
			onVideoLoaded() {
			      const videoElement = uni.createSelectorQuery().select('#myVideo');
			
			      videoElement.context((res) => {
			        const videoWidth = res.width; // 获取视频宽度
			        const videoHeight = res.height; // 获取视频高度
			        
			        console.log('视频宽度:', videoWidth);
			        console.log('视频高度:', videoHeight);
			
			        // 更新数据
			        this.videoWidth = videoWidth;
			        this.videoHeight = videoHeight;
			      }).exec();
			    },
			playVideo(lastIndex, currentIndex) {
				const lastVideoContext = uni.createVideoContext(`video_${lastIndex}`);
				const currentVideoContext = uni.createVideoContext(`video_${currentIndex}`);
				lastVideoContext.pause();
				currentVideoContext.play();
			},
		},

	};
</script>

<style>
	video {
		width: 100%;
		height: 100vh;
	}

	swiper {
		height: 100%;
		width: 100%;
	}

	.page {
		height: 100vh;
	}
</style>