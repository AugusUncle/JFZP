<template>
	<view style="background-color: #FFFFFF; padding: 4vw; height: 100vh;">

		<view>
			<view style="font-size: 14px; color: gray;">学校名称</view>
			<view style="display: flex; flex-direction: row;align-items: center; margin: 2vh 0;">
				<!-- <view>{{resume.name}}</view> -->
				<input v-model="school_val" @focus="focus" @blur="blur" @input="input" style="width: 90vw;"
					placeholder="请输入学校名称">
				<!-- <uni-icons type="right" size="16" color="grey" style="position: absolute; right: 5%; "></uni-icons> -->
			</view>
			<view v-if="showSelector" class="search-combox__selector">
				<view class="uni-popper__arrow"></view>
				<view v-for="(item,idx) in schoolList" :key="idx">
					<view class="view-scl" @tap="selectSchool(item)">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view style="border-bottom: 0.1px solid #f7f7f7; margin-bottom: 2vh;"></view>

		<view>
			<view style="font-size: 14px; color: gray;">专业名称</view>
			<view style="display: flex; flex-direction: row;align-items: center; margin: 2vh 0;">
				<!-- <view>{{resume.name}}</view> -->
				<input v-model="specialityName"  @focus="focus1" @blur="blur1" @input="input1"  style="width: 90vw;" placeholder="请输入专业名称">
				<!-- <uni-icons type="right" size="16" color="grey" style="position: absolute; right: 5%; "></uni-icons> -->
			</view>
			<view v-if="showSelector1" class="search-combox__selector">
				<view class="uni-popper__arrow"></view>
				<view v-for="(item,idx) in specialityList" :key="idx">
					<view class="view-scl" @tap="selectSpeciality(item)">{{item.name}}</view>
				</view>
			</view>
		</view>

		<view>
			<view style="font-size: 14px; color: gray;">学历</view>
			<view style="display: flex; flex-direction: row; z-index: 99;align-items: center; margin: 2vh 0;">
				<view style="display: flex; flex-direction: row; align-items: center; margin: 2vh 0;">
					<picker @change="bindPickerChange" range-key="name" style="width: 100vw;" :value="resume.education" :range="array">
						<view class="uni-input">{{array[resume.education].name}}</view>
					</picker>
				</view>
				
				<!-- <input v-model="data.specialityName" style="width: 90vw;" placeholder="请选择专业名称"> -->
				<uni-icons type="right" size="16" color="grey" style="position: absolute; right: 5%; "></uni-icons>
			</view>
		</view>

		<view>
			<view style="font-size: 14px; color: gray;">毕业时间</view>
			<view style="display: flex; flex-direction: row;align-items: center; margin: 2vh 0;">
				<uni-datetime-picker type="date" :clear-icon="false" v-model="resume.graduateTime"
					@change="dataChange()" @maskClick="maskClick" />
				<uni-icons type="right" size="16" color="grey" style="position: absolute; right: 5%; "></uni-icons>
			</view>
		</view>

		<view style="border-bottom: 0.1px solid #f7f7f7;  margin-bottom: 2vh;"></view>

		<button @tap="edit()">保存</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				resume: '',
				id: '',
				type: '',
				userId: '',
				array: ['专科', '一本', '二本'],
				showSelector: false,
				showSelector1: false,
				school_val: '',
				schoolList: [],
				index:1,
				specialityList:[],
				specialityName:'',
				page:1,
				size:10
			}
		},
		onLoad(query) {
			console.log(query)
			this.id = query.id
			this.token = uni.getStorageSync('token')
			this.userId = uni.getStorageSync('userId')
			
			this.getDistData()
			this.getSpeciality()
			this.getResume()
			
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
							this.getSchoolName(res.data.data.schoolCode)
						
						}
					}
				})
			},
			getSchoolName(code){
				uni.request({
					url: this.reqUrl + '/dropDown/schoolName?schoolCode=' + code,
					method: 'GET',
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("学校", res)
						if (res.data.code === 200) {
							this.school_val = res.data.data
						}
					}
				})
			},

			edit() {
				console.log(this.resume)
				uni.request({
					url: this.reqUrl + '/resume/edit',
					method: 'PUT',
					header: {
						"Authorization": this.token
					},
					data: this.resume,
					success: (res) => {
						console.log("修改工作经历", res)
						uni.navigateBack()
					}
				})
			},
			selectSchool(school) {
				this.showSelector = false
				this.resume.schoolCode= school.id
				this.school_val= school.name
			},
			bindPickerChange: function(e) {
				console.log("11111",e)
				this.resume.education = e.detail.value
				// this.edit()
			},
			getSchoolList() {
				uni.request({
					url: this.reqUrl + "/dropDown/school?page=" + this.page + "&size=" + this.size + "&name=" +
						this.school_val,
					method: 'GET',
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						if (res.data.code === 200) {
							this.schoolList = res.data.data
							console.log("查询", res.data.data)
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'fail'
							})
						}
					}
				})
			},
			selectSpeciality(obj){
				this.showSelector1 = false
				this.resume.specialityCode= obj.id
				this.specialityName= obj.name
			},
			getSpeciality(){
				uni.request({
					url: this.reqUrl + "/dropDown/speciality?page=" + this.page + "&size=" + this.size + "&specialityName=" +
						this.specialityName,
					method: 'GET',
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						if (res.data.code === 200) {
							this.specialityList = res.data.data
							// this.specialityName = res.data.data.find(item => item.id === this.resume.specialityCode).name
							console.log(this.specialityName.name)
							console.log("查询", res.data.data)
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'fail'
							})
						}
					}
				})
			},
			getDistData(){
				uni.request({
					url: this.reqUrl + "/dropDown/education_type",
					method: 'GET',
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						if (res.data.code === 200) {
							this.array = res.data.data
							console.log("xueli ", res.data.data)
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'fail'
							})
						}
					}
				})
			},
			focus() {
				this.showSelector = true
				this.getSchoolList()
			},
			blur() {
				this.showSelector = false
			},
			input() {
				this.getSchoolList()
			},
			focus1() {
				this.showSelector1 = true
				this.getSpeciality()
			},
			blur1() {
				this.showSelector1 = false
			},
			input1() {
				this.getSpeciality()
			},
		}
	}
</script>

<style>
	button {
		background-color: #38bdf8;
	}
</style>