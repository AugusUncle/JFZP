<template>
	<view class="page">
		<view class="page1">
			<view class="page_row">
				<view class="job_name">{{data.jobName}}</view>
				<!-- <view class="money">{{data.salaryMin/1000}}k-{{data.salaryMax/1000}}k{{danwei(data.salaryUnit)}}</view> -->
				<view class="money">{{data.salaryMin}}-{{data.salaryMax}}k</view>
			</view>

			<view class="page_row top">
				<uni-icons class="icon" type="location-filled" color="grey"></uni-icons>
				<view @tap="navigateTo()" class="address text">{{data.cityName}}</view>

				<uni-icons class="xueli" type="auth-filled" color="grey"></uni-icons>
				<view class="text">{{distList[data.minEducation].name}}</view>


				<uni-icons class="year" type="wallet-filled" color="grey"></uni-icons>
				<view class=" text">{{data.needNumber}}人</view>
			</view>

			<view class="line"></view>

			<view class="job_detail">职位详情</view>

			<view class="detail">
				{{data.jobDescribe}}
			</view>

			<view class="line"></view>



			<view class="page_row" @tap="toCompanyPage()">
				<view>
					<image class="pic" :src="data.enterpriseHeaderPic"></image>
				</view>
				<view class="page_column">
					<view class="company">{{data.enterpriseName}}</view>
					<!-- <view class="info text">{{data.jobType}}</view> -->
				</view>
				<view>
					<uni-icons type="forward" color="grey"></uni-icons>
				</view>

			</view>
			<view class="map" @click="navigateTo">
				<map :longitude="data.longitude" :latitude="data.latitude" :markers="markers"
					style="width: 100%; height: 300px;"></map>
			</view>

			<view class="btn-footer">
				<button
					@tap="toChat(data.enterpriseId,data.headPic,data.enterpriseName,sessionType,data.id)">立即沟通</button>
			</view>

			<!-- <view class="btn" v-if="data.isReq ===0" >
				<button @click="dialogToggle('info')">投递简历</button>
			</view>

			<view class="btn" v-if="data.isReq ===1" >
				<button @click="dialogToggle('info')" disabled>已投递</button>
			</view> -->
		</view>

		<view>
			<!-- 提示窗示例 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog type="info" title="选择简历" @confirm="dialogConfirm">
					<uni-forms-item>
						<uni-data-checkbox v-model="data1.resumeId" :localdata="sexs" />
					</uni-forms-item>
				</uni-popup-dialog>
			</uni-popup>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: {
					page: 1,
					size: 10
				},
				markers: [{
					id: 1,
					longitude: 0,
					latitude: 0,
					height: 35,
					width: 25
				}],
				sexs: [{
					text: '男',
					value: 0
				}, {
					text: '女',
					value: 1
				}],
				resume: [],
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				value: '',
				token: '',
				query: {
					page: 1,
					size: 10,
					memberId: ''
				},
				data1: {
					enterpriseId: 0,
					jobId: 0,
					memberId: 0,
					resumeId: 0
				},
				queryId: '',
				distList: '',
				sessionType: 2
			};

		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log("岗位ID", option.id); //打印出上个页面传递的参数。
			this.token = uni.getStorageSync("token")
			this.queryId = option.id
			this.query.memberId = uni.getStorageSync("userId")
			this.data1.memberId = uni.getStorageSync("userId")
			this.data1.jobId = option.id
			this.getJobDetail();
			this.getDistList('education_type')

		},
		methods: {
			getJobDetail() {
				uni.request({
					url: this.reqUrl + "/jobNeed/" + this.queryId,
					method: 'GET',
					header: {
						'Authorization': this.token
					},
					success: (res) => {
						console.log(res)
						this.data = res.data.data
						this.data1.enterpriseId = res.data.data.enterpriseId
						this.markers[0].latitude = parseFloat(res.data.data.latitude)
						this.markers[0].longitude = parseFloat(res.data.data.longitude)
					},
				})
			},
			toChat(memberId, headPic, name, type, jobId) {
				
				uni.navigateTo({
					url: '/pages/message/chat?id=' + memberId + "&img=" + headPic + "&name=" + name + "&type=" +
						type + "&jobId=" + jobId
				})
			},
			getDistList(type) {
				uni.request({
					url: this.reqUrl + '/dropDown/' + type,
					method: 'GET',
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("字典", res)
						if (res.data.code === 200) {
							this.distList = res.data.data

						}
					}
				})
			},
			toCompanyPage() {
				uni.navigateTo({
					url: '/pages/company/commpanyDetail?memberId=' + this.data.enterpriseId
				})
			},

			danwei(unit) {
				if (unit === 0) {
					return "元/小时"
				} else if (unit === 1) {
					return "元/天"
				} else if (unit === 2) {
					return "元/月"
				} else if (unit === 3) {
					return "元/年"
				} else {
					return "面议"
				}
			},
			navigateTo() {
				uni.openLocation({
					longitude: this.markers[0].longitude,
					latitude: this.markers[0].latitude,
					name: '目标位置',
					scale: 18
				});
			},
			dialogToggle(type) {
				this.msgType = type
				this.$refs.alertDialog.open()
				this.query.memberId = uni.getStorageSync("userId")
				console.log("获取简历", this.userId)
				this.getFiles()
			},
			dialogConfirm() {
				console.log('点击确认')
				this.applyJob()
			},
			getFiles() {

				console.log("请求对象", this.query)
				uni.request({
					url: this.reqUrl + '/resume/fileList',
					method: 'get',
					data: this.query,
					header: {
						'Authorization': this.token
					},
					success: (res) => {
						console.log(res.data.data)
						this.resume = res.data.data

						this.sexs = res.data.data.map(item => {
							return {
								value: item.id,
								text: item.name
							};
						});
					},
					fail: (err) => {
						console.error('API请求失败', err);
					}
				})
			},


			reloadPage() {
				location.reload(); // 或者根据需要使用其他方法来重新加载页面
			},

			applyJob() {
				uni.request({
					url: this.reqUrl + '/memberJob/save',
					method: 'post',
					data: this.data1,
					header: {
						'Authorization': this.token
					},
					success: (res) => {
						console.log(res)
						// this.resume = res.data.data.list
						if (res.data.code === 200) {
							uni.showToast({
								title: '申请成功',
								icon: 'success'
							})
							this.data.isReq = 1;
						} else {
							uni.showToast({
								title: this.data.message,
								icon: 'fail'
							})
						}
					},
					fail: (err) => {
						console.error('API请求失败', err);
					}
				})
			}
		}

	}
</script>

<style>
	.page {
		padding: 2%;
	}

	.page1 {
		padding: 2%;
		background: white;
		border-radius: 10px;
	}


	.page_row {
		display: flex;
		justify-items: center;
		align-items: center;

	}

	.page_column {
		display: flex;
		justify-items: center;
		width: 100%;
		flex-direction: column;
	}

	.top {
		margin-top: 4%;
	}

	.job_name {
		font-size: 25px;
		width: 70%;
	}

	.money {
		color: #38BDF8;
		position: absolute;
		right: 5%;
	}

	.text {
		color: gray;
		font-size: 14px;
		width: 15%;
	}

	.xueli {
		margin-left: 4%;
	}

	.year {
		margin-left: 4%;
	}

	.line {
		width: 100%;
		margin: 5% 0 5% 0;
		/* 设置横线的宽度为100% */
		border-bottom: 1px solid #ECEFF1;
		/* 设置横线的颜色和样式 */
	}

	.job_detail {
		font-size: 18px;
	}

	.detail {
		margin-top: 4%;
		color: gray;
		font-size: 14px;
		line-height: 25px;
		letter-spacing: 2px;
	}

	.pic {
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}

	.company {
		margin-left: 5%;
	}

	.info {
		margin-left: 5%;
		margin-top: 3%;
		font-size: 14px;
	}

	.map {
		height: 30%;
		border-radius: 10px;
		margin-top: 4%;
	}

	.btn {
		margin-top: 4%;
	}

	.address {
		width: 60%;
	}

	button {
		border: none;
		width: 100%;
		height: 100%;
		margin: 0;
		font-size: 30rpx;
		color: white;
		background: #38BDF8;
		line-height: 3;
	}

	button::after {
		border: none;
		border-radius: 0;
	}
</style>