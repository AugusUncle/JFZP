<template>
	<view class="box">
		<view class="page">
			<view style="font-size: 28px; font-weight: 400;margin-top: 2vh;">期望什么样的工作？</view>
			<view style="font-size: 14px; color: grey; margin-top: 6px;">发布自己的期望，寻找合适的岗位。</view>
			<uni-section class="section" titleFontSize="17px" title="期望岗位" type="line">
				<template v-slot:right>{{list.length}}/5</template>
				<uni-list>
					<uni-list-item v-for="(item,index) in list" :key="index" @tap="toDetailPage(item.id,1)" ellipsis="1"
						:title="'['+item.cityName+']' + item.jobName"
						:note="item.salaryMin +'-'+item.salaryMax+ 'K' + '|' +'专科'" showArrow />
				</uni-list>
				<view @tap="toDetailPage(0,0)"
					style="border: 1.5px dashed #38bdf8; color: #38bdf8; padding: 4vw; font-size: 16px; font-weight: 400; border-radius: 10px; text-align: center; margin-top: 1vh;">
					+ 添加就业期望</view>
			</uni-section>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId: '',
				token: '',
				list: ''
			}

		},
		onLoad() {
			this.userId = uni.getStorageSync('userId')
			this.token = uni.getStorageSync('token')
			this.getNeedWork()
		},
		onShow() {
			this.userId = uni.getStorageSync('userId')
			this.token = uni.getStorageSync('token')
			this.getNeedWork()
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			toDetailPage(id,type) {
				uni.navigateTo({
					url: '/pages_userInfo/userInfo/addJobNeed?type=' + type+"&id="+id
				})
			},
			getNeedWork() {
				uni.request({
					url: this.reqUrl + '/job_expectation/list?id=' + this.userId,
					method: 'GET',
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("工作期望", res)
						if (res.data.code === 200) {
							this.list = res.data.data
						}
					}
				})
			},

		}
	}
</script>

<style>
	.page {
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		padding: 4vw;
	}

	.topview {
		height: 36.9vh;
		background: linear-gradient(180deg, #39BDF7 0%, rgba(255, 255, 255, 0) 100%);
		display: flex;
		flex-direction: column;
		opacity: 0.8;
		padding: 2vw;
	}

	.uni-section {
		background-color: transparent !important;
		margin-top: 4vh;
		/* margin-top: 40%; */
	}

	.uni-section .uni-section-header {
		padding: 0 !important;
	}

	.uni-section .uni-section-header__decoration {
		margin-right: 6px;
		background-color: #38BDF8 !important;
	}

	.page1 {
		position: fixed;
		background-color: white;
		width: 100%;
		z-index: 999;
	}

	image {
		width: 5.5vw;
		height: 5.5vw;
		margin-bottom: 6px;
		margin-left: 3px;
	}

	body {
		overflow: hidden;
	}

	.box {
		height: 100vh;
		/* 设置容器高度，填满整个视口 */
		overflow-y: auto;
		/* 允许垂直滚动 */
		-webkit-overflow-scrolling: touch;
		/* 在iOS设备上使用原生滚动 */
	}

	button {
		background-color: #38BDF8;
		color: #FFFFFF;
	}
</style>