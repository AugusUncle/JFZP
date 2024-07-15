<template>
	<view class="box">
		<!-- <view class="page1">
			<image :style="{'margin-top': top1+11+'px'}" src="../../../static/back.png" @click="back()"></image>
		</view> -->
		<view class="page">
			<view style="font-size: 28px; font-weight: 400;margin-top: 1vh;">你好：伯乐</view>
			<view style="font-size: 14px; color: grey; margin-top: 6px;">发布不同需求，寻找合适人才。</view>
			<uni-section class="section" titleFontSize="17px" title="岗位直招" type="line">
				<template v-slot:right>{{jobList.length}}/10</template>
				<uni-list>
					<uni-list-item v-for="(item,index) in jobList" :key="index" @tap="toDetailPage(item.id,1)"
						ellipsis="1" :title="'['+item.cityName+']' + item.jobName"
						:note="item.salaryMin +'-'+item.salaryMax+ 'K' + '|' +'专科'" showArrow />
				</uni-list>
				<!-- <button @tap="toDetailPage(0)">+ 发布直招岗位</button> -->
				<view @tap="toDetailPage(0,0)"
					style="border: 1.5px dashed #38bdf8; color: #38bdf8; padding: 4vw; font-size: 16px; font-weight: 400; border-radius: 10px; text-align: center; margin-top: 1vh;">
					+ 发布直招岗位</view>
			</uni-section>

			<uni-section class="section" titleFontSize="17px" title="校企合作" type="line">
				<template v-slot:right>{{scJobList.length}}/10</template>
				<uni-list>
					<uni-list-item v-for="(item1,index1) in scJobList" :key="index1" @tap="toDetailPage1(item1.id,1)"
						ellipsis="1" :title="'['+item1.cityName+']' + item1.name"
						:note=" '需求：' +  item1.number + '人' + '|' +'专科'" showArrow />
				</uni-list>
				<!-- <button style="margin-bottom: 60px;">+ 添加校企合作</button> -->
				<view @tap="toDetailPage1(0,0)"
					style="border: 1.5px dashed #38bdf8; color: #38bdf8; padding: 4vw; font-size: 16px; font-weight: 400; border-radius: 10px; text-align: center;margin-top: 1vh;">
					+ 添加校企合作</view>
			</uni-section>

			<uni-section class="section" titleFontSize="17px" title="人才定制" type="line">
				<template v-slot:right>{{planJobList.length}}/10</template>
				<uni-list>
					<uni-list-item v-for="(item1,index1) in planJobList" :key="index1" @tap="toDetailPage2(item1.id,1)"
						ellipsis="1" :note=" item1.title" showArrow />
				</uni-list>
				<!-- <button style="margin-bottom: 60px;">+ 添加校企合作</button> -->
				<view @tap="toDetailPage2(0,0)"
					style="border: 1.5px dashed #38bdf8; color: #38bdf8; padding: 4vw; font-size: 16px; font-weight: 400; border-radius: 10px; text-align: center;margin: 1vh 0 10vh 0;">
					+ 发布人才定制</view>
			</uni-section>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				top1: "",
				token: '',
				userId: '',
				jobList: [],
				scJobList: [],
				planJobList: []
			}
		},
		// onLoad() {
		// 	this.token = uni.getStorageSync('token')
		// 	this.userId = uni.getStorageSync('userId')
		// 	this.getJobNeedList()
		// 	this.getSCJobList()
		// },
		onShow() {
			this.token = uni.getStorageSync('token')
			this.userId = uni.getStorageSync('userId')
			this.getJobNeedList()
			this.getSCJobList()
			this.getPlanJobList()


		},
		methods: {
			back() {
				uni.navigateBack()
			},
			toDetailPage(id, type) {
				uni.navigateTo({
					url: '/pages/company/invites/addJob?type=' + type + "&id=" + id
				})
			},
			toDetailPage1(id, type) {
				uni.navigateTo({
					url: '/pages_userInfo/userInfo/addscJob?type=' + type + "&id=" + id
				})
			},
			toDetailPage2(id, type) {
				uni.navigateTo({
					url: '/pages_userInfo/userInfo/addPlanJob?type=' + type + "&id=" + id
				})
			},
			getJobNeedList() {
				uni.request({
					url: this.reqUrl + '/jobNeed/list/?enterpriseId=' + this.userId,
					method: 'GET',
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("岗位", res.data.data.list)

						if (res.data.code === 200) {
							this.jobList = res.data.data.list
						}
					}
				})
			},
			getPlanJobList() {
				uni.request({
					url: this.reqUrl + '/talentCustom/list?memberId=' + this.userId,
					method: 'GET',
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("计划岗位", res.data.data.list)
						if (res.data.code === 200) {
							this.planJobList = res.data.data.list
						}
					}
				})
			},
			getSCJobList() {
				uni.request({
					url: this.reqUrl + '/abilityTrain/list?memberId=' + this.userId,
					method: 'GET',
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("岗位", res.data.data.list)
						if (res.data.code === 200) {
							this.scJobList = res.data.data.list
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