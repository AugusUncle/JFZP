<template>
	<view style="background-color: #FFFFFF; padding: 4vw; height: 100vh;">

		<view>
			<view style="font-size: 14px; color: gray;">公司名称</view>
			<view style="display: flex; flex-direction: row;align-items: center; margin: 2vh 0;">
				<!-- <view>{{resume.name}}</view> -->
				<input v-model="data.companyName" style="width: 90vw;" placeholder="请输入公司名称">
				<!-- <uni-icons type="right" size="16" color="grey" style="position: absolute; right: 5%; "></uni-icons> -->
			</view>
		</view>
		<view style="border-bottom: 0.1px solid #f7f7f7; margin-bottom: 2vh;"></view>

		<view>
			<view style="font-size: 14px; color: gray;">职位名称</view>
			<view style="display: flex; flex-direction: row;align-items: center; margin: 2vh 0;">
				<!-- <view>{{resume.name}}</view> -->
				<input v-model="data.job" style="width: 90vw;" placeholder="请输入职位名称">
				<!-- <uni-icons type="right" size="16" color="grey" style="position: absolute; right: 5%; "></uni-icons> -->
			</view>
		</view>
		<view style="border-bottom: 0.1px solid #f7f7f7;  margin-bottom: 2vh;"></view>

		<view>
			<view style="font-size: 14px; color: gray;">在职时间</view>
			<view style="display: flex; flex-direction: row;align-items: center; margin: 2vh 0;">
				<!-- <view>{{resume.name}}</view> -->
				<input v-model="data.workTime" style="width: 90vw;" placeholder="请输入在职时间(例:2000.1~2020.5)">
				<!-- <uni-icons type="right" size="16" color="grey" style="position: absolute; right: 5%; "></uni-icons> -->
			</view>
		</view>
		<view style="border-bottom: 0.1px solid #f7f7f7; margin-bottom: 2vh;"></view>

		<button  @tap="add()">保存</button>

		<p @click="del()" v-if="type==='1'" style="position: absolute; right: 4%; font-size: 12px; color: grey; margin: 10px 0;">删除</p>



		<!-- <view>
			<view style="font-size: 14px; color: gray;">性别</view>
			<view style="display: flex; flex-direction: row;align-items: center; margin: 2vh 0;">
				<view  style="display: flex; flex-direction: row; align-items: center; margin: 2vh 0;">
					<picker @change="bindPickerChange" :value="resume.sex" :range="array">
						<view class="uni-input">{{array[resume.sex]}}</view>
					</picker>
				</view>
				<uni-icons type="right" size="16" color="grey" style="position: absolute; right: 5%; "></uni-icons>
			</view>
		</view>

		<view style="border-bottom: 0.1px solid #f7f7f7; margin-bottom: 2vh;"></view> -->

		<!-- <view>
			<view style="font-size: 14px; color: gray;">参加工作时间</view>
			<view style="display: flex; flex-direction: row;align-items: center; margin: 2vh 0;">

				<uni-datetime-picker type="date" :clear-icon="false" v-model="resume.workTime" @change="dataChange()"
					@maskClick="maskClick" />
				<uni-icons type="right" size="16" color="grey" style="position: absolute; right: 5%; "></uni-icons>
			</view>
		</view>

		



		<view style="border-bottom: 0.1px solid #f7f7f7; margin-bottom: 2vh;"></view> -->





	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: {
					companyName: "",
					job: "",
					onlineResumeId: 0,
					workTime: ""
				},
				id: '',
				type: ''
			}
		},
		onLoad(query) {
			this.data.onlineResumeId = query.id
			this.id = query.id
			this.type = query.type
			this.token = uni.getStorageSync('token')
			if (query.type === '1') {
				this.getWorked()
			}
		},
		methods: {

			getWorked() {
				uni.request({
					url: this.reqUrl + '/workHistory/' + this.id,
					method: 'GET',
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("工作经历", res)
						if (res.data.code === 200) {
							this.data = res.data.data
						}
					}
				})
			},

			add() {
				if(this.type === '0'){
					uni.request({
						url: this.reqUrl + '/workHistory/save',
						method: 'POST',
						header: {
							"Authorization": this.token
						},
						data: this.data,
						success: (res) => {
							console.log("添加工作经历", res)
							uni.navigateBack()
						}
					})
				}else{
					this.edit()
				}
				
			},

			edit() {
				uni.request({
					url: this.reqUrl + '/workHistory/edit',
					method: 'PUT',
					header: {
						"Authorization": this.token
					},
					data: this.data,
					success: (res) => {
						console.log("修改工作经历", res)
						uni.navigateBack()
					}
				})
			},
			del() {
				uni.request({
					url: this.reqUrl + '/workHistory/' + this.data.id,
					method: 'DELETE',
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("删除工作经历", res)
						uni.navigateBack()
					}
				})
			}
		}
	}
</script>

<style>
	button {
		background-color: #38bdf8;
	}
</style>