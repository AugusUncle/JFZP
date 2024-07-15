<template>
	<view class="page">

		<view style="padding: 0 2vw;">
			<view class="page_row">
				<view class="job_name">{{data.name}}</view>
				<view class="money">需求：{{data.number}}人</view>
			</view>
			
			<view class="page_row top">
				<uni-icons class="icon" type="location-filled" color="grey"></uni-icons>
				<view class="address text">{{data.cityName}}</view>
			
				<!-- <uni-icons class="xueli" type="auth-filled" color="grey"></uni-icons>
					<view class="text" v-if="data.minEducation === 0">专科</view>
					<view class="text" v-if="data.minEducation === 1">本科</view>
					<view class="text" v-if="data.minEducation === 2">硕士</view>
			
					<uni-icons class="year" type="wallet-filled" color="grey"></uni-icons>
					<view class=" text">{{data.needNumber}}人</view> -->
			</view>
			
			<view class="line"></view>
			
			<view class="job_detail">职位详情</view>
			
			<text class="detail">
				{{data.notes}}
			</text>
			
			<view class="line"></view>
			
			<view class="page_row" @tap="toCompanyPage(data.memberId)">
				<view>
					<image class="pic" :src="data.headPic"></image>
				</view>
				<view class="page_column">
					<view class="company">{{data.memberName}}</view>
					<!-- <view class="info text">{{data.jobType}}</view> -->
				</view>
				<view>
					<uni-icons type="forward" color="grey"></uni-icons>
				</view>
			
			</view>
			
			<view class="line"></view>
			
		</view>

		<view class="btn" v-if="data.isAbilityConcat === 0">
			<button @click="dialogToggle('info')">申请岗位</button>
		</view>

		<view class="btn" v-if="data.isAbilityConcat">
			<button @click="dialogToggle('info')" disabled>已申请</button>
		</view>


		<view>
			<!-- 提示窗示例 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog type="info" title="填写信息" @confirm="dialogConfirm">
					<uni-forms style="width: 100%;">
						<uni-forms-item label="联系人:" required>
							<uni-easyinput v-model="data1.name" placeholder="请输入联系人姓名" />
						</uni-forms-item>
						<uni-forms-item label="电话:" required>
							<uni-easyinput v-model="data1.mobile" placeholder="请输入联系人电话" />
						</uni-forms-item>
					</uni-forms>
				</uni-popup-dialog>
			</uni-popup>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [],
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
					abilityId: 0,
					memberId: 0,
					mobile: '',
					name: ''
				},
				queryId: '',
			};

		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log("岗位ID", option.id); //打印出上个页面传递的参数。
			this.token = uni.getStorageSync("token")
			this.data1.memberId = uni.getStorageSync('userId')
			this.queryId = option.id
			this.getJobDetail();

		},
		methods: {
			getJobDetail() {
				uni.request({
					url: this.reqUrl + "/abilityTrain/" + this.queryId,
					method: 'GET',
					header: {
						'Authorization': this.token
					},
					success: (res) => {
						console.log(res)
						this.data = res.data.data
						this.data1.abilityId = res.data.data.id

					},
				})
			},
			toCompanyPage(id) {
				uni.navigateTo({
					url: '/pages/company/commpanyDetail?memberId=' + id
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
					url: this.reqUrl + '/resume/list',
					method: 'get',
					data: this.query,
					header: {
						'Authorization': this.token
					},
					success: (res) => {
						console.log(res.data.data.list)
						this.resume = res.data.data.list

						this.sexs = res.data.data.list.map(item => {
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
					url: this.reqUrl + '/abilityTrain/concat',
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
		/* padding: 2%; */
		background-color: #FFFFFF;
		height: 100vh;
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
		border-bottom: 1px solid #F7f7f7;
		/* 设置横线的颜色和样式 */
	}

	.job_detail {
		font-size: 18px;
		white-space: pre-line;
	}

	.detail {
		margin-top: 2vh;
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
		position: absolute;
		bottom: 0;
		background-color: white;
		width: 96%;
		padding: 5vh 2vw;
	}

	.address {
		width: 60%;
	}

	button {
		border: none;
		/* width: 100%; */
		/* height: 100%; */
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
	
	.uni-forms{
		width: 100%;
	}
</style>