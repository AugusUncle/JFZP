<template>
	<view class="container">
		<uni-section title="发布新岗位" type="line">
			<view class="example">
				<!-- 自定义表单校验 -->
				<uni-forms ref="customForm" :rules="customRules" :modelValue="customFormData" label-position="top">
					<uni-forms-item label="岗位名称" required name="jobName">
						<uni-easyinput v-model="customFormData.jobName" placeholder="请输入岗位名称" :disabled="disabled" />
					</uni-forms-item>

					<uni-forms-item label="岗位描述" required name="jobDescribe">
						<uni-easyinput type="textarea" v-model="customFormData.jobDescribe" placeholder="请输入岗位描述"
							:disabled="disabled" />
					</uni-forms-item>

					<uni-forms-item label="实习期">
						<uni-data-checkbox v-model="customFormData.internship" :localdata="internship"
							:disabled="disabled" />
					</uni-forms-item>

					<uni-forms-item label="岗位属性" required name='isOversea'>
						<uni-data-checkbox v-model="customFormData.isOversea" :localdata="isOversea"
							:disabled="disabled" />
					</uni-forms-item>

					<uni-forms-item label="工作类型" required name='jobType'>
						<uni-data-checkbox v-model="customFormData.jobType" :localdata="jobType" :disabled="disabled" />
					</uni-forms-item>

					<uni-forms-item label="最低学历" required name="minEducation">
						<uni-data-select v-model="customFormData.minEducation" :localdata="xueli"
							:disabled="disabled"></uni-data-select>
					</uni-forms-item>

					<!-- <uni-section title="最低学历" type="line">
						<uni-data-select v-model="customFormData.minEducation" :localdata="xueli"></uni-data-select>
					</uni-section> -->

					<uni-forms-item label="招聘人数" required name="needNumber">
						<uni-easyinput v-model="customFormData.needNumber" placeholder="请输入招聘人数" :disabled="disabled" />
					</uni-forms-item>

					<uni-forms-item label="最低薪资">
						<uni-easyinput v-model="customFormData.salaryMin" type="number" placeholder="请输入最低薪资"
							:disabled="disabled" />
					</uni-forms-item>

					<uni-forms-item label="最高薪资">
						<uni-easyinput v-model="customFormData.salaryMax" type="number" placeholder="请输入最高薪资"
							:disabled="disabled" />
					</uni-forms-item>


					<uni-forms-item label="薪资单位" required name='salaryUnit'>
						<uni-data-checkbox v-model="customFormData.salaryUnit" :localdata="salaryUnit"
							:disabled="disabled" />
					</uni-forms-item>

					<uni-forms-item label="工作地点" required name="workAddress">
						<uni-easyinput v-model="customFormData.workAddress" placeholder="请输入工作地点"
							:disabled="disabled" />
						<!-- <view v-for="(item, index) in addressList" :key="index">
							<text>{{ item.name }}</text>
							<button v-if="addressShow" @tap="selectAddress(index)" type="default"
								size="mini">{{ item.name }}</button>
						</view> -->
					</uni-forms-item>

					<uni-forms-item label="岗位类型">
						<uni-data-select v-model="customFormData.workType" :localdata="gwType"
							:disabled="disabled"></uni-data-select>
					</uni-forms-item>
				</uni-forms>
				<view class="btn-view">
					<button v-if="disabled" class="submit" hover-class="btn" @click="editJob()">编辑</button>
					<button v-if="disabled" class="submit" hover-class="btn" type="warn"
						@click="deleteJob(customFormData.id,customFormData.jobName)">删除</button>
					<button v-if="!disabled && !edit" class="submit" hover-class="btn"
						@click="submit('customForm')">提交</button>
					<button v-if="edit" class="submit" hover-class="btn" @click="editJob1()">保存</button>
				</view>
			</view>
		</uni-section>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				// 单选数据源
				sexs: [{
					text: '男',
					value: 0
				}, {
					text: '女',
					value: 1
				}, {
					text: '保密',
					value: 2
				}],

				internship: [{
					text: '1个月',
					value: 0
				}, {
					text: '3个月',
					value: 1
				}, {
					text: '6个月',
					value: 2
				}],

				xueli: [{
						value: 1,
						text: "专科"
					},
					{
						value: 2,
						text: "本科"
					},
					{
						value: 3,
						text: "硕士"
					},
				],

				gwType: [{
						value: 1,
						text: "医护"
					},
					{
						value: 2,
						text: "电工"
					},
					{
						value: 3,
						text: "消防"
					},
				],

				isOversea: [{
					text: '国内岗位',
					value: 0
				}, {
					text: '国外岗位',
					value: 1
				}],

				salaryUnit: [{
					text: '元/时',
					value: 0
				}, {
					text: '元/天',
					value: 1
				}, {
					text: '元/月',
					value: 3
				}, {
					text: '面议',
					value: 4
				}],

				jobType: [{
					text: '全职',
					value: 0
				}, {
					text: '兼职',
					value: 1
				}],

				// 自定义表单数据
				customFormData: {
					jobName: '',
					jobDescribe: '',
					internship: '',
					isOversea: '',
					jobType: '',
					minEducation: '',
					needNumber: '',
					salaryMin: '',
					salaryMax: '',
					salaryUnit: '',
					workAddress: '',
					workType: '',
					enterpriseId: ''
				},
				addressList: [],
				addressShow: true,
				token: '',
				disabled: false,
				edit: false,
				// 自定义表单校验规则
				customRules: {
					jobName: {
						rules: [{
							required: true,
							errorMessage: '岗位名称不能为空'
						}]
					},
					jobDescribe: {
						rules: [{
							required: true,
							errorMessage: '岗位描述不能为空'
						}]
					},
					isOversea: {
						rules: [{
							required: true,
							errorMessage: '请选择岗位属性'
						}]
					},
					// jobType: {
					// 	rules: [{
					// 		required: true,
					// 		errorMessage: '请选择工作类型'
					// 	}]
					// },
					minEducation: {
						rules: [{
							required: true,
							errorMessage: '最低学历不能为空'
						}]
					},
					needNumber: {
						rules: [{
							required: true,
							errorMessage: '招聘人数不能为空'
						}]
					},
					salaryUnit: {
						rules: [{
							required: true,
							errorMessage: '薪资类型不能为空'
						}]
					},
					workAddress: {
						rules: [{
							required: true,
							errorMessage: '岗位地址不能为空'
						}]
					},
					workType: {
						rules: [{
							required: true,
							errorMessage: '岗位类型不能为空'
						}]
					},




				},

			}
		},

		onReady() {
			// 设置自定义表单校验规则，必须在节点渲染完毕后执行
			this.$refs.customForm.setRules(this.customRules)
		},
		onLoad(query) {
			console.log(query.id)
			this.token = uni.getStorageSync("token")
			let id = query.id
			if (id) {
				this.getJobDetail(query.id)
				this.disabled = true
				console.log("查询明细")
				uni.setNavigationBarTitle({
					title: query.name
				})
			}

		},
		methods: {

			submit(ref) {
				this.$refs[ref].validate().then(res => {
					console.log('success', res);
					this.customFormData.enterpriseId = uni.getStorageSync("userId")
					uni.request({
						url: this.reqUrl + "/jobNeed/add",
						method: 'POST',
						header: {
							'Authorization': this.token
						},
						data: this.customFormData,
						success: (res) => {
							console.log(res)
							if (res.data.code === 200) {
								uni.showToast({
									title: `发布成功`
								})
								uni.navigateBack()
							} else {
								uni.showToast({
									title: res.data.message,
									icon: 'error'
								})
							}
						}
					})


				}).catch(err => {
					console.log('err', err);
				})
			},

			editJob() {
				this.disabled = false
				this.edit = true
			},

			editJob1() {
				uni.request({
					url: this.reqUrl + "/jobNeed/edit",
					method: 'PUT',
					header: {
						'Authorization': this.token
					},
					data: this.customFormData,
					success: (res) => {
						console.log(res)
						if (res.data.code === 200) {
							uni.navigateBack()
							uni.showToast({
								title: `修改成功`
							})
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'error'
							})
						}
					}
				})
			},

			deleteJob(id, name) {
				uni.showModal({
					title: '提示',
					content: '确认删除' + name + "?",
					// showCancel: false,
					confirmText: '确认',
					success: (res) => {
						console.log(res)
						if (res.confirm) {
							// 用户点击确定，跳转到登录页面
							uni.request({
								url: this.reqUrl + "/jobNeed/" + id,
								method: 'DELETE',
								header: {
									"Authorization": this.token
								},
								success: (res) => {
									uni.navigateBack()
									uni.showToast({
										title: "删除成功！",
										icon: 'success'
									})
								}
							})
						}
					}
				})
				return false; // 阻止跳转
			},

			getJobDetail(id) {
				uni.request({
					url: this.reqUrl + "/jobNeed/" + id,
					method: 'GET',
					header: {
						'Authorization': this.token
					},
					success: (res) => {
						console.log(res)
						this.customFormData = res.data.data
					}
				})
			},
			change() {
				console.log("change。。。。")
				this.addressShow = true
				uni.request({
					url: this.reqUrl + "/dropDown/assistant?keyWords=" + this.customFormData.workAddress,
					method: 'GET',
					header: {
						'Authorization': this.token
					},
					success: (res) => {
						console.log("地址", res)
						this.addressList = res.data.data
					}
				})
			},

			selectAddress(index) {
				this.addressShow = false
				this.customFormData.workAddress = this.addressList[index].district + this.addressList[index].address
			}

		}
	}
</script>
<style>
	.example {
		padding: 15px;
		background-color: #fff;
	}

	.btn-view {
		display: flex;
		flex-direction: row;
	}

	.submit {
		margin-bottom: 10%;
		width: 30%;
		font-size: 16px;
		color: white;
		background-color: #38BDF8;
		border-radius: 10px;
	}

	.btn {
		background-color: #0EA5E9;
		/* 点击后的颜色 */
		color: #E5E5E5;
		/* 点击后的文字颜色 */
	}
</style>