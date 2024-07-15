<template>
	<view class="page">
		<view class="logo-view">
			<image class="logo" src="https://jfzp.ykfly.com/jfht/icon/icon.png"></image>
			<p style="font-size: 18px; margin-top: 2vh; font-family: PingFang SC-Regular;">几方职聘</p>
		</view>

		<view class="list-view">
			<uni-list>
				<uni-list-item title="操作说明" showArrow link="redirectTo" @tap="openFile()" />
				<uni-list-item title="联系客服" showArrow link="redirectTo" @tap="callPhone()" />
				<uni-list-item title="营业执照" showArrow link="redirectTo" @click="toImagePage(1)" />
				<uni-list-item title="人力资源许可证" showArrow link="redirectTo" @click="toImagePage(2)" />
			</uni-list>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},

		methods: {
			callPhone() {
				uni.makePhoneCall({
					phoneNumber: '0917-3652000' //仅为示例
				});
			},
			toImagePage(type) {
				uni.navigateTo({
					url: '/pages/app/license?type=' + type
				})
			},
			openFile() {
				uni.downloadFile({
					url: 'https://jfzp.ykfly.com/jfht/app/jfzp.pdf',
					success: function(res) {
						var filePath = res.tempFilePath;
						// 下载成功后，打开PDF文件
						uni.openDocument({
							filePath: filePath,
							success: function(res) {
								console.log('打开文档成功');
							},
							fail: function(error) {
								console.log('打开文档失败', error);
							}
						});
					},
					fail: function(error) {
						console.log('下载文件失败', error);
					}
				});
			}

		}
	}
</script>

<style>
	.page {
		background-color: #FFFFFF;
		height: 100vh;
	}

	.logo-view {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.logo {
		width: 23.5vw;
		height: 23.5vw;
		margin-top: 6.6vh;
	}

	.list-view {
		margin-top: 16.6vh;
	}

	.uni-list-item__content-title {
		font-size: 14px;
		color: #3b4144;
		overflow: hidden;
		margin: 1vh 0;
	}
</style>