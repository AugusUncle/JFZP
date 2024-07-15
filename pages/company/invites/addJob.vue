<template>
	<!-- <view class="box"> -->

	<view class="page">
		<view v-if="btnshow0" style="font-size: 28px; font-weight: 400;margin-top: 1vh;">发布岗位需求</view>
		<view v-if="btnshow1" style="font-size: 28px; font-weight: 400;margin-top: 1vh;">修改岗位需求</view>
		<view style="font-size: 14px; color: grey; margin-top: 6px;">精确的信息有利于千里马的匹配</view>
		<!-- <view v-if="btnshow1" style="font-size: 14px; color: grey; margin-top: 6px;">完善岗位需求，寻找合适人才。</view> -->
		<view style="display: flex;flex-direction: row; align-items: center; margin: 2vh 0;">
			<view style="margin: 1.5vh 0;">招聘类型</view>
			<view class=" ">
				<uni-segmented-control :current="data.workType" :values="items" :style-type="styleType"
					:active-color="activeColor" @clickItem="onClickItem" />
			</view>
		</view>

		<view style="border-bottom: 0.1px solid #f7f7f7; margin-bottom: 2vh;"></view>
		
		<view>
			<view style="font-size: 14px; color: gray;">招聘标题</view>
			<view style="display: flex; flex-direction: row;align-items: center; margin: 2vh 0;">
				<view style="display: flex; flex-direction: row; align-items: center; margin: 2vh 0;">
					<input  v-model="data.jobName" placeholder="请输入招聘标题"/>
				</view>
				<uni-icons type="right" size="16" color="grey" style=" position: absolute; right: 5%; "></uni-icons>
			</view>
		</view>
		<view>
			<view style="font-size: 14px; color: gray;">工作城市</view>
			<view style="display: flex; flex-direction: row;align-items: center; margin: 2vh 0;">

				<view class="section">
					<!-- <view class="cityT">所在城市</view> -->
					<uni-data-picker :placeholder="info1" style="width: 100vw;" :clear-icon="false"
						popup-title="请选择工作城市" :localdata="provinces" v-model="data.cityName" @change="onchange()">
					</uni-data-picker>
				</view>
				<uni-icons type="right" size="16" color="grey" style="position: absolute; right: 5%; "></uni-icons>
			</view>
		</view>

		<view style="border-bottom: 0.1px solid #f7f7f7; margin-bottom: 2vh;"></view>
		<view>
			<view style="font-size: 14px; color: gray;">招聘岗位</view>
			<view style="display: flex; flex-direction: row;align-items: center; margin: 2vh 0;">
				<view class="section">
					<!-- <view class="cityT">所在城市</view> -->
					<uni-data-picker :placeholder="info" style="width: 100vw;" :clear-icon="false" popup-title="请选择招聘岗位"
						:localdata="jobs" @change="onchange1()">
					</uni-data-picker>
				</view>

				<uni-icons type="right" size="16" color="grey" style="position: absolute; right: 5%; "></uni-icons>
			</view>
		</view>

		<view>
			<view style="font-size: 14px; color: gray;">学历</view>
			<view style="display: flex; flex-direction: row;align-items: center; margin: 2vh 0;">
				<view style="display: flex; flex-direction: row; align-items: center; margin: 2vh 0;">
					<picker @change="bindPickerChange" range-key="name" style="width: 100vw;" :value="data.minEducation"
						:range="distList">
						<view class="uni-input">{{distList[data.minEducation].name}}</view>
					</picker>
				</view>
				<uni-icons type="right" size="16" color="grey" style="position: absolute; right: 5%; "></uni-icons>
			</view>
		</view>

		<view style="border-bottom: 0.1px solid #f7f7f7; margin-bottom: 2vh;"></view>
		<view>
			<view style="font-size: 14px; color: gray;">岗位薪资</view>
			<view style="display: flex; flex-direction: row;align-items: center; margin: 2vh 0;">
				<view style="display: flex; flex-direction: row; align-items: center; margin: 2vh 0;">
					<picker mode="multiSelector" @change="bindPickerChange1" style="width: 100vw; " :value="index1"
						:range="[arr1,arr2]">
						<view class="uni-input" style="margin-left: 4px;">{{arr1[index1[0]]}}-{{arr2[index1[1]]}}K
						</view>
					</picker>
				</view>
				<uni-icons type="right" size="16" color="grey" style=" position: absolute; right: 5%; "></uni-icons>
			</view>
		</view>

		<view style="border-bottom: 0.1px solid #f7f7f7; margin-bottom: 2vh;"></view>

		<view>
			<view style="font-size: 14px; color: gray;">招聘人数</view>
			<view style="display: flex; flex-direction: row;align-items: center; margin: 2vh 0;">
				<view style="display: flex; flex-direction: row; align-items: center; margin: 2vh 0;">
					<input type="number" v-model="data.needNumber" placeholder="请输入招聘人数"/>
				</view>
				<uni-icons type="right" size="16" color="grey" style=" position: absolute; right: 5%; "></uni-icons>
			</view>
		</view>

		<view style="border-bottom: 0.1px solid #f7f7f7; margin-bottom: 2vh;"></view>
		<view style="margin-bottom: 14vh;">
			<view style="font-size: 14px; color: gray;">岗位介绍</view>
			<view style="display: flex; flex-direction: row;align-items: center; margin: 2vh 0;">
				<textarea type="number" v-model="data.jobDescribe" placeholder="请详细描述岗位"/>
			</view>
		</view>

		<!-- <view style="border-bottom: 0.1px solid #f7f7f7; margin-bottom: 2vh;"></view> -->

		<view class="btn-footer">
			<button @tap="save()">保存</button>
		</view>
		<p @click="del()" v-if="type==='1'"
			style="position: absolute; right: 4%; font-size: 12px; color: grey; margin: 10px 0;">删除</p>
	</view>





	<!-- </view> -->
</template>

<script>
	export default {
		data() {
			return {
				top1: "",
				items: ['全职', '兼职'],
				activeColor: '#38bdf8',
				styleType: 'button',
				current: 0,
				btnshow1: false,
				btnshow0: false,
				provinces: [],
				jobs: [],
				type: '',
				token: '',
				userId: '',
				info: '请选择期望岗位',
				info1: '请选择工作城市',
				data: {
					enterpriseId: 0, //用户ID
					jobCode: "",
					jobDescribe: "",
					jobType: 0, //工作种类
					minEducation: 3, //学历
					needNumber: '',
					salaryMax: "",
					salaryMin: "",
					salaryUnit: 0,
					workAddress: "", //工作地址
					workType: 0 //全职，兼职
				},
				jobName: '选择岗位',
				index: 0,
				index1: [3, 8],
				index2: [],
				distList: [],
				show: false,
				arr1: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18',
					'19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
				],
				arr2: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18',
					'19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
				]



			}
		},
		onLoad(query) {
			this.top1 = uni.getSystemInfoSync().statusBarHeight
			this.token = uni.getStorageSync('token')
			this.data.enterpriseId = uni.getStorageSync('userId')
			this.data.memberId = uni.getStorageSync('userId')
			this.type = query.type
			this.getCity()
			this.getJob()
			this.getDistList('education_type')
			if (query.type === '0') {
				this.btnshow0 = true

			} else if (query.type === '1') {
				this.btnshow1 = true
				console.log(query.id)
				this.getJobNeed(query.id)
			}

		},
		methods: {
			showView() {
				this.show === 'false' ? 'true' : 'false'
			},

			toggle() {
				this.$refs.popup.open()
			},
			onClickItem(e) {
				console.log(e.currentIndex)
				this.data.jobType = e.currentIndex

			},
			save() {
				if (this.type === '0') {
					this.add()
				} else {
					this.edit()
				}
			},
			onchange(e) {
				this.data.cityCode = e.detail.value[1].value
			},
			onchange1(e) {
				console.log(e)
				this.data.jobCode = e.detail.value[2].value
				this.data.jobType = e.detail.value[1].value
			},
			getJobNeed(id) {
				console.log(id)
				uni.request({
					url: this.reqUrl + '/jobNeed/' + id,
					method: 'GET',
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("工作期望", res)
						if (res.data.code === 200) {
							this.data = res.data.data
							this.index2.push(res.data.data.salaryMin)
							this.index2.push(res.data.data.salaryMax)
							this.index1 = this.index2
							this.info = res.data.data.jobName
							this.info1 = res.data.data.cityName
						}
					}
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
			edit() {
				uni.request({
					url: this.reqUrl + '/job_expectation/edit',
					method: 'PUT',
					header: {
						"Authorization": this.token
					},
					data: this.data,
					success: (res) => {
						console.log("修改期望职位", res)
						uni.navigateBack()
					}
				})
			},

			add() {

				uni.request({
					url: this.reqUrl + '/jobNeed/add',
					method: 'POST',
					header: {
						"Authorization": this.token
					},
					data: this.data,
					success: (res) => {
						console.log("发布期望岗位", res)
						uni.navigateBack()
					}
				})


			},
			getCity() {
				uni.request({
					// url: this.reqUrl + "/dropDown/districtByParent?level=2",
					url: this.reqUrl + "/dropDown/dicDistrict",
					method: "GET",
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("市", res.data.data)
						this.provinces = res.data.data
					}
				})
			},

			getJob() {
				uni.request({
					// url: this.reqUrl + "/dropDown/districtByParent?level=2",
					url: this.reqUrl + "/dropDown/allJob",
					method: "GET",
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("市", res.data.data)
						this.jobs = res.data.data
					}
				})
			},
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
				this.getCity()

			},
			bindPickerChange: function(e) {
				console.log(e)
				this.data.minEducation = e.detail.value
				// this.data.minEducation = this.distList[this.index].id
			},
			bindPickerChange1: function(e) {
				console.log(e.detail.value)
				this.index1 = e.detail.value
				this.data.salaryMin = this.arr1[e.detail.value[0]]
				this.data.salaryMax = this.arr1[e.detail.value[1]]
			},
			del() {
				uni.request({
					url: this.reqUrl + '/jobNeed/' + this.data.id,
					method: 'DELETE',
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("删除工作期望", res)
						uni.navigateBack()
					}
				})
			}
		}
	}
</script>

<style>
	.page {
		background-color: #FFFFFF;
		/* display: flex;
		flex-direction: column; */
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


	/* .page1 {
		position: fixed;
		background-color: white;
		width: 100%;
		z-index: 999;
	} */

	image {
		width: 5.5vw;
		height: 5.5vw;
		margin-bottom: 6px;
		margin-left: 3px;
	}

	body {
		/* overflow: hidden; */
	}

	.box {
		/* height: auto; */
		/* 设置容器高度，填满整个视口 */
		/* overflow-y: auto; */
		/* 允许垂直滚动 */
		/* -webkit-overflow-scrolling: touch; */
		/* 在iOS设备上使用原生滚动 */
	}

	button {
		background-color: #38BDF8;
		color: #FFFFFF;
		width: 90%;
	}

	.btn-footer {
		position: fixed;
		bottom: 0;
		width: 92%;
		padding: 10px 0 40px 0;
		/* box-shadow: 0px -4px 6px 1px rgba(0, 0, 0, 0.09); */
		/* background-color: #FFFFFF; */
	}

	.uni-list-item__content-note {
		margin-top: 15rpx !important;
		color: #000000 !important;
		font-size: 18px !important;

	}

	.segmented-control.data-v-064e9cd1 {
		width: 40vw;
		margin-left: 60%;
	}

	textarea {
		cursor: auto;
		display: block;
		/* height: 200px !important; */
		overflow: hidden;
		position: relative;
		/* width: 95% !important; */
		padding: 2vw;
		border-radius: 10px;
		border: 1px solid lightgray;
		width: 100% !important;
		height: 200px !important;
		/* margin-bottom: 20vh; */
	}

	.jobType {
		width: 100vw;
		height: 100vh;
	}

	.input-value-border {
		border: none !important;
		border-radius: 0 !important;
	}
	input{
		width: 90vw;
	}

	.input-value {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: nowrap;
		font-size: 14px;
		padding: 0 !important;
		overflow: hidden;
		height: 35px;

	}
</style>