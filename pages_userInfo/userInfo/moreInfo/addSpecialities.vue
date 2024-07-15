<template>
	<view>
		<uni-search-bar @input="" @confirm="confirm" @blur="blur" v-model="specialityName"></uni-search-bar>

		<view class="title1" v-for="(item,index) in list" :key="index" @tap="add(item)">{{item.name}}</view>
		<view style="display: flex; flex-direction: row; flex-wrap: wrap;">
			<view class="title" v-for="(item,index1) in arr0" :key="index1">{{item.speciality}}</view>
		</view>
		<view class="saveBtn"><button @tap="save()">保存</button></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arr0: [],
				specialityName: '',
				token: '',
				userId: '',
				list: []
			}
		},
		onLoad() {
			this.token = uni.getStorageSync('token')
			this.userId = uni.getStorageSync('userId')
			this.getInfo()
		},
		methods: {
			getInfo() {
				uni.request({
					url: this.reqUrl + "/member/userInfo/" + this.userId,
					method: "GET",
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("用户信息", res)
						this.arr = res.data.data.specialities
					}
				})
			},
			input() {
				this.getSpecialities()
			},
			confirm() {
				this.getSpecialities()
			},
			blur() {
				this.list = []
				this.specialityName = null
			},
			add(item) {
				this.list = []
				this.specialityName = ''
				var myObject = {
					speciality: item.name,
					specialityCode: item.id
				};

				this.arr0.push(myObject);
				console.log(this.arr0)

			},
			getSpecialities() {
				uni.request({
					url: this.reqUrl + "/dropDown/speciality?specialityName=" + this.specialityName,
					method: "GET",
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("zy", res)
						this.list = res.data.data
					}
				})
			},
			save(){
				uni.request({
					url: this.reqUrl + "/member/edit",
					method: 'PUT',
					header: {
						"Authorization": this.token
					},
					data: {
						id:this.userId,
						specialities: this.arr0
					},
					success: (res) => {
						console.log("修改用户信息", res)
						uni.navigateBack()
					}
				})
			}

		}
	}
</script>

<style>
	.title1 {
		border: #39BDF7 1px solid;
		border-radius: 3px;
		margin: 1vh 1vw;
		font-size: 16px;
		color: #39BDF7;
		padding: 6px;
	}

	.title {
		border: #39BDF7 1px solid;
		border-radius: 3px;
		margin: 1vh 1vw;
		font-size: 10px;
		color: #39BDF7;
		padding: 1px;
		word-wrap: break-word;
	}

	button {
		background-color: #38bdf8;
		color: white;
	}

	.saveBtn {
		position: absolute;
		bottom: 0;
		width: 96vw;
		background-color: white;
		padding: 3vw 2vw 8vw 2vw;
	}
</style>