<template>
	<view>
		<!-- <view class="card1" v-for="(job,index) in jobList" :key="index" @tap="toJobDeatil(job.id)">
			<view class="card2">
				<view class="text1">{{job.jobName}}</view>
				<view class="text4">{{job.salaryMin}}~{{job.salaryMax}}</view>
			</view>
			<view class="text2">{{job.enterpriseName}}</view>
			<view class="card2">
				<view class="text3">{{job.gmtUpdate}}</view>
				<view class="text6">{{ job.req !== null && job.req !== undefined ? job.req : '0'}}/{{job.needNumber}}人
				</view>
				<view class="text5">{{job.cityName}}</view>
			</view>
		</view>
		 -->
		
		<view class="card1" v-for="(job,index) in jobList" :key="index" @tap="toJobDeatil(job.id)">
			<view class="card2">
				<view class="text1">{{job.jobName}}</view>
				<view v-if="job.salaryMin" class="text4">{{job.salaryMin}}-{{job.salaryMax}}k</view>
				<view v-if="job.salaryUnit===4" class="text4">面议</view>
			</view>
			<view class="text2">{{job.enterpriseName}}</view>
			<view class="card2">
				<view class="text3">{{job.gmtUpdate}}</view>
				<view class="text6">
					{{ job.req === undefined ? 0 :job.req }}/{{job.req === undefined ? 0 :job.req }}人
				</view>
				<view class="text5">{{job.cityName}}</view>
			</view>
		</view>


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

				query: {
					page: 1,
					size: 10,
					memberId: ''
				},
				token:''

			}
		},
		onLoad(query) {
			console.log(query.isOversea)
			this.token = uni.getStorageSync("token")
			this.getJobList(query.isOversea)
		},
		
		methods: {
			getJobList(isOversea) {
				this.query.memberId = uni.getStorageSync("userId")
				uni.request({
					url: this.reqUrl + "/memberJob/askToJob",
					// ?page=" + this.page + "&size=" + this.size + "&isOversea=" + this.isOversea,

					method: 'GET',
					data: this.query,
					header: {
						'Authorization': this.token
					},
					success: (res) => {
						console.log(res)
						this.jobList = res.data.data.list
					},
				})
			},
			toJobDeatil(id) {
				uni.navigateTo({
					url: '/pages/job/job?id=' + id
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
		margin: 0 2% 2% 2%;
		/* margin-top: 2%; */
		flex-direction: column;
		border-radius: 6px;
		box-shadow: 0 4px 4px 0 #E5E7EB;
		/* padding: 5px; */
	}
	
	.card2 {
		/* width: 96%; */
		height: 30%;
		display: flex;
		/* align-items: center; */
		justify-items: center;
		margin-top: 2%;
		flex-direction: row;
	}
	
	.text1 {
		margin: 0 0 0 15px;
		width: 80%;
		font-size: 16px;
		font-weight: 500
	}
	
	.text2 {
		margin: 5px 0 0 15px;
		font-size: 12px;
		/* color: #737373; */
	}
	
	.text3 {
		margin: 5px 0 10px 15px;
		font-size: 12px;
		/* color: #737373; */
	}
	
	.text6 {
		margin: 5px 0 10px 0px;
		font-size: 12px;
		/* color: #737373; */
	}
	
	
	.text4 {
		font-size: 16px;
		position: absolute;
		right: 6%;
		color: #38BDF8;
	}
	
	.text5 {
		font-size: 13px;
		color: #737373;
		position: absolute;
		margin-top: 5px;
		right: 20px;
	}
</style>