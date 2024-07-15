<template>
	<view class="page">
		<view @tap="toBaseInfoPage()"
			style="display: flex; flex-direction: row; margin-bottom: 2vh; align-items: center;">
			<view>
				<view style="font-size: 20px; font-weight: 500;">{{resume.name}}<uni-icons style="margin-left: 4px;"
						type="compose" size="20"></uni-icons></view>
				<view v-if="resume.workTime" style="font-size: 12px; color: gray; margin: 1vh 0;">{{resume.wt}}年经验 ·
					{{resume.yt}}岁 · 本科
				</view>
				<view style="font-size: 12px; color: gray; display: flex; flex-direction: row; align-items: center;">
					<view style="margin-right: 6px;">
						<uni-icons type="phone-filled" color="grey"
							size="13"></uni-icons>{{resume.mobile===null ? '未设置': resume.mobile}}
					</view>
					<view>
						<uni-icons type="email-filled" color="grey"
							size="13"></uni-icons>{{resume.email ===null ? '未设置': resume.email}}
					</view>
				</view>
			</view>
			<view style="position: absolute; right: 4%;">
				<image :src="resume.headPic" style="width: 20vw; height: 20vw; border-radius: 50%;"></image>
			</view>
		</view>

		<view style="border-bottom: 0.1px solid #f7f7f7; margin-bottom: 2vh;"></view>

		<view style="display: flex; flex-direction: row; align-items: center; margin-bottom: 2vh;">
			<view style="font-size: 18px; font-weight: 500; margin-bottom: 1vh;">求职状态</view>
			<uni-icons type="compose" size="23" style="position: absolute; right: 5%;"></uni-icons>
		</view>
		<view style="display: flex; flex-direction: row; align-items: center; margin: 2vh 0;">
			<picker @change="bindPickerChange" style="width: 100vw;" :value="resume.status" :range="array">
				<view class="uni-input">{{array[resume.status]}}</view>
			</picker>
			<view style="position: absolute; right: 6%;">
				<uni-icons type="right" size="18"></uni-icons>
			</view>
		</view>

		<view style="border-bottom: 0.1px solid #f7f7f7; margin-bottom: 2vh;"></view>

		<view style="display: flex; flex-direction: row; align-items: center; margin-bottom: 2vh;">
			<view style="font-size: 18px; font-weight: 500; margin-bottom: 1vh;" @click="toggle('bottom')">个人特长</view>
			<uni-icons type="compose" size="23" style="position: absolute; right: 5%;"
				@click="toggle('bottom')"></uni-icons>
		</view>
		<view class="longText" v-if="resume.notes !== null" @click="toggle('bottom')">
			{{resume.notes}}
		</view>

		<view style="border-bottom: 0.1px solid #f7f7f7; margin-bottom: 2vh;"></view>

		<view style="display: flex; flex-direction: row; align-items: center; margin-bottom: 2vh;"
			@tap="addJobNeed(resume.id,0)">
			<view style="font-size: 18px; font-weight: 500;">求职期望</view>
			<uni-icons type="plus" size="25" style="position: absolute; right: 5%;"></uni-icons>
		</view>



		<view style="margin-bottom: 2vh;" v-for="(item2 ,index2) in jobs" :key="index2" @tap="toDetailPage(item2.id,1)">
			<view style="display: flex; flex-direction: row; align-items: baseline;">
				<view style="width: 55vw;">{{'['+item2.cityName+']' + item2.jobName}}</view>
				<view style="position: absolute; right: 4%; color: grey; font-size: 14px;"><uni-icons type="right"
						color="grey"></uni-icons></view>
			</view>
			<view style="color: grey; font-size: 12px; margin-top: 1vh;">
				{{item2.salaryMin +'-'+item2.salaryMax+ 'K'}}
			</view>
		</view>
		<view style="border-bottom: 0.1px solid #f7f7f7; margin-bottom: 2vh;"></view>

		<view style="display: flex; flex-direction: row; align-items: center; margin-bottom: 2vh;"
			@tap="toAddJob(resume.id)">
			<view style="font-size: 18px; font-weight: 500;">工作经历</view>
			<uni-icons type="plus" size="25" style="position: absolute; right: 5%;"></uni-icons>
		</view>

		<view style="margin-bottom: 2vh;" @click="toEditJob(item.id)" v-for="(item,index) in resume.workHistories"
			:key='index'>
			<view style="display: flex; flex-direction: row; align-items: baseline;">
				<view style="width: 55vw;">{{item.companyName}}</view>
				<view style="position: absolute; right: 4%; color: grey; font-size: 14px;">{{item.workTime}}<uni-icons
						type="right" color="grey"></uni-icons></view>
			</view>
			<view style="color: grey; font-size: 12px; margin-top: 1vh;">{{item.job}}</view>
		</view>

		<view style="border-bottom: 0.1px solid #f7f7f7; margin-bottom: 2vh;"></view>

		<view style="display: flex; flex-direction: row; align-items: center; margin-bottom: 2vh;"
			@click="toEditEdu(resume.id)">
			<view style="font-size: 18px; font-weight: 500;">教育经历</view>
			<uni-icons type="compose" size="25" style="position: absolute; right: 5%;"></uni-icons>
		</view>

		<view v-if="resume.schoolCode"
			style="display: flex; flex-direction: row; align-items: center; margin-bottom: 20vh;">
			<!-- <view>
				<image src="../../static/user.png" style="width: 15vw; height: 15vw;"></image>
			</view> -->
			<view @click="toEditEdu(resume.id)">
				<view style="display: flex; flex-direction: row; align-items: baseline;">
					<!-- <view>西安交通大学</view> -->
					<view style="width: 55vw;">{{resume.schoolCode}}</view>
					<view style="position: absolute; right: 4%; color: grey; font-size: 14px;">
						{{resume.graduateTime}}<uni-icons type="right" color="grey"></uni-icons>
					</view>
				</view>
				<view style="color: grey; font-size: 12px; margin-top: 1vh;">{{resume.education}} ·
					{{resume.speciality}}
				</view>
			</view>
		</view>

		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
				<textarea @input='input' :value="resume.notes"
					style="width: 91vw; border: 1px solid lightgray; border-radius: 10px; padding: 2vw;"
					placeholder="个人描述:" />
			</view>
			<view style="display: flex; padding: 0 2%; flex-direction: row;">
				<!-- <button style="flex: 1; margin-right: 20px;" type="default">取消</button> -->
				<button style="flex: 2;" type="primary" @tap="edit()">保存</button>
			</view>
		</uni-popup>



		<!-- <view style="border-bottom: 0.1px solid #f7f7f7; margin-bottom: 2vh;"></view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token: '',
				userId: '',
				resume: {},
				jobs: [],
				array: ['离职-随时到岗', '在职-考虑机会'],
			}
		},

		// onLoad() {
		// 	this.token = uni.getStorageSync('token')
		// 	this.userId = uni.getStorageSync('userId')
		// 	this.getResume()
		// 	this.getNeedWork()
		// },
		onLoad() {
			
		},
		onShow() {
			this.token = uni.getStorageSync('token')
			this.userId = uni.getStorageSync('userId')
			this.getResume()
			this.getNeedWork()
		},
		methods: {
			getResume() {
				uni.request({
					url: this.reqUrl + '/resume/' + this.userId,
					method: 'GET',
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("在线简历", res)
						if (res.data.code === 200) {
							this.resume = res.data.data
							// this.getSchoolName(res.data.data.schoolCode)
							this.getEdu(res.data.data.education + 1)
							this.getSpeciality(res.data.data.specialityCode)
							this.calculateAge()
						}
					}
				})
			},
			calculateAge() {
				const currentYear = new Date().getFullYear();
				const workDate = new Date(this.resume.workTime);
				const birthdayDate = new Date(this.resume.birthday);
				const workYear = workDate.getFullYear();
				const birthYear = birthdayDate.getFullYear();
				this.resume.wt = currentYear - workYear;
				this.resume.yt = currentYear - birthYear;
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
							this.jobs = res.data.data
						}
					}
				})
			},
			toBaseInfoPage(id) {
				uni.navigateTo({
					url: '/pages_userInfo/userInfo/baseResume?id=' + id
				})
			},

			edit() {
				console.log(this.resume)
				uni.request({
					url: this.reqUrl + '/resume/edit/',
					method: 'PUT',
					header: {
						"Authorization": this.token
					},
					data: this.resume,
					success: (res) => {
						console.log("修改在线简历", res)
						this.getResume()
						this.$refs.popup.close()
					}
				})
			},
			bindPickerChange: function(e) {
				this.resume.status = e.detail.value

				// this.index = e.detail.value
				this.edit()
			},
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			input(e) {
				console.log(e.detail.value)
				this.resume.notes = e.detail.value


			},
			toAddJob(id) {
				let type = 0
				uni.navigateTo({
					url: '/pages_userInfo/userInfo/addWorked?id=' + id + "&type=" + type
				})
			},
			toDetailPage(id, type) {
				uni.navigateTo({
					url: '/pages_userInfo/userInfo/addJobNeed?type=' + type + "&id=" + id
				})
			},
			addJobNeed(id, type) {
				uni.navigateTo({
					url: '/pages_userInfo/userInfo/addJobNeed?type=' + type + "&id=" + id
				})
			},
			toEditJob(id) {
				let type = 1
				uni.navigateTo({
					url: '/pages_userInfo/userInfo/addWorked?id=' + id + "&type=" + type
				})
			},

			toEditEdu(id) {
				let type = 1
				uni.navigateTo({
					url: '/pages_userInfo/userInfo/addEdu?id=' + id
				})
			},
			getEdu(code) {
				const type = 'education_type'
				uni.request({
					url: this.reqUrl + '/dropDown/sys_name?type=' + type + "&code=" + code,
					method: 'GET',
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						this.resume.education = res.data.data
					}
				})
			},
			getSchoolName(code) {
				uni.request({
					url: this.reqUrl + '/dropDown/schoolName?schoolCode=' + code,
					method: 'GET',
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						if (res.data.code === 200) {
							this.resume.schoolCode = res.data.data
						}
					}
				})
			},
			getSpeciality(code) {
				uni.request({
					url: this.reqUrl + "/dropDown/speciality?page=" + this.page + "&size=" + this.size +
						"&specialityCode=" + code,
					method: 'GET',
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						if (res.data.code === 200) {
							this.resume.speciality = res.data.data[0].name
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
		padding: 4%;
	}

	.longText {
		font-size: 14px;
		color: grey;
		margin-bottom: 2vh;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.popup-content {
		padding: 2%;
	}
</style>