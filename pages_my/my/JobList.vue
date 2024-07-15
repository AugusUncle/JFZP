<template>
	<view>
		<!-- <button class="btn" hover-class="btn1" @tap="toAddPage()">+发布岗位</button> -->

		<view class="card1" v-for="(job,index) in jobList" :key="index" @tap="toJobDeatil(job.id,job.jobName)">
			<view class="card2">
				<view class="text1">{{job.jobName}}</view>
				<view class="text4">{{job.salaryMin/1000}}k~{{job.salaryMax/1000}}k</view>
			</view>
			<view class="text2">{{job.enterpriseName}}</view>
			<view class="card2">
				<view class="text3">{{job.gmtUpdate}}</view>
				<view class="text6">{{job.needNumber}}人</view>
				<view class="text5">{{job.cityName}}</view>
			</view>
		</view>

		<uni-fab @tap="toAddPage()"  :pattern="pattern" horizontal="right">发帖</uni-fab>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				jobList: {
					auditingComments: "",
					enterpriseHeaderPic: "",
					enterpriseId: "",
					enterpriseName: "",
					gmtUpdate: "",
					jobName: "",
					minEducation: '',
					needNumber: '',
					salaryMax: '',
					salaryMin: '',
					salaryUnit: '',
				},
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#bfbfbf',
					buttonColor: '#38BDF8',
					iconColor: '#fff'
				},
				page: 1,
				size: 10,
				isOversea: "",
				isTrain: "",

			}
		},
		onLoad() {
			this.getJobList()
		},
		onShow() {
			this.getJobList()
		},
		methods: {
			getJobList(isOversea) {
				let memberId = uni.getStorageSync("userId")
				let token = uni.getStorageSync("token")
				uni.request({
					url: this.reqUrl + "/jobNeed/list?page=" + this.page + "&size=" + this.size + "&memberId=" +
						memberId,
					method: 'GET',
					header: {
						'Authorization': token
					},
					success: (res) => {
						console.log(res)
						this.jobList = res.data.data
					},
				})
			},
			toJobDeatil(id, name) {
				uni.navigateTo({
					url: '/pages_my/my/addJob?id=' + id + "&name=" + name
				})
			},
			toAddPage() {
				uni.navigateTo({
					url: '/pages_my/my/addJob'
				})
			}

		}
	}
</script>

<style>
	.card1 {
		width: 96%;
		height: 30%;
		background: white;
		display: flex;
		margin: auto;
		margin-top: 2%;
		flex-direction: column;
		border-radius: 10px;
		box-shadow: 0 4px 4px 0 #E5E7EB;
		padding: 5px;

	}

	.card2 {
		width: 96%;
		height: 30%;
		display: flex;
		/* align-items: center; */
		justify-items: center;
		margin-top: 2%;
		flex-direction: row;
	}

	.text1 {
		margin: 0 0 0 15px;
		font-size: 18px;
		width: 80%;
	}

	.text2 {
		margin: 5px 0 0 15px;
		font-size: 13px;
		color: #737373;
	}

	.text3 {
		margin: 5px 0 10px 15px;
		font-size: 13px;
		color: #737373;
	}

	.text6 {
		margin: 5px 0 10px 50px;
		font-size: 13px;
		color: #737373;
	}


	.text4 {
		font-size: 13px;
		color: #38BDF8;
		position: absolute;
		right: 5%;
	}

	.text5 {
		font-size: 13px;
		color: #737373;
		position: absolute;
		margin-top: 5px;
		right: 20px;
	}

	.nav-bar {
		display: flex;
		justify-content: space-around;
		padding: 10px;
	}

	.nav-bar text {
		color: #ccc;
		/* 默认字体颜色为浅灰色 */
	}

	.nav-bar text.selected {
		color: #000;
		/* 选中菜单字体为黑色 */
	}

	.underline {
		position: absolute;
		bottom: 0;
		height: 2px;
		background-color: #000;
		/* 下划线颜色 */
		transition: left 0.3s ease;
		/* 添加过渡效果 */
	}

	.btn {
		margin-top: 10%;
		width: 80%;
		color: white;
		background-color: #38BDF8;
		border-radius: 10px;
	}

	.btn1 {
		background-color: #0EA5E9;
		/* 点击后的颜色 */
		color: #E5E5E5;
		/* 点击后的文字颜色 */
	}
</style>