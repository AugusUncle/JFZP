<template>
	<view>
		<view class="page">
			<view class="info">
				<view>
					<view style="font-size: 30px;">{{data.name}}</view>
					<view style="font-size: 12px; color: grey; margin: 0.2vh 0; display: flex; flex-direction: row;" >{{wt}}年工作经验 {{yt}}岁 {{xueli}}
					<view v-if="data.isTrain===1" style="margin-left: 1vw;">参与人才定制计划</view>
					</view>
					<view style="font-size: 12px; color: grey;"> {{data.mobile}} {{data.email}}</view>
				</view>
				<view>
					<image :src="data.headPic"
						style="width: 20vw; height: 20vw; position: absolute; right: 4vw; border-radius: 50%;">
					</image>
				</view>
			</view>
			<view style="margin-top: 5vh;">
				<view style="color: grey;">求职期望</view>
				<view v-for="(item,index) in data.jobExpectations" :key="index">
					<view style="display: flex; flex-direction: row; margin: 1vh 0;">
						<view style="font-size: 20px;">{{item.jobName}}</view>
						<view style="font-size: 20px; position: absolute; right: 4vw;">
							{{item.salaryMin}}-{{item.salaryMax}}k
						</view>
					</view>
					<view style="color: grey; font-size: 14px;">{{item.cityName}}</view>
				</view>

			</view>

			<view style="margin-top: 5vh;">
				<view style="color: grey;">工作经历</view>
				<view v-for="(item1,index1) in data.workHistories" :key="index1">
					<view style="font-size: 18px; margin: 1.5vh 0;">{{item1.companyName}}</view>
					<view style="display: flex; flex-direction: row; font-size: 12px; color: grey; margin: 1vh 0;">
						<view>{{item1.job}}</view>
						<view style=" position: absolute; right: 4vw;">{{item1.workTime}}</view>
					</view>
				</view>


			</view>

			<view style="margin-top: 5vh;">
				<view style="color: grey;">个人优势</view>
				<view style="color: grey; font-size: 14px; margin-top: 1.5vh;">
					{{data.notes}}
				</view>
			</view>


			<view style="margin: 5vh 0;">
				<view style="color: grey;">最高学历</view>
				<view style="display: flex; flex-direction: row; margin: 1vh 0; ">
					<view style="font-size: 20px;">{{data.schoolCode}}</view>
					<view style="font-size: 12px; color: grey; position: absolute; right: 4vw;">{{data.graduateTime}}</view>
				</view>
				<view style="font-size: 12px; color: grey;">{{xueli}}</view>
				<view style="height: 10vh;"></view>
			</view>

		</view>

		<view class="btn-footer">
			<button @tap="toChat(data.memberId,data.headPic,data.name,sessionType)">立即沟通</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [],
				wt: '',
				yt: '',
				xueli: '',
				sessionType: 2,
			}
		},
		onLoad(query) {
			this.getJobNeed(query.id)
		},
		methods: {
			getJobNeed(id) {
				console.log(id)
				uni.request({
					url: this.reqUrl + '/resume/' + id,
					method: 'GET',
					header: {
						"Authorization": uni.getStorageSync('token')
					},
					success: (res) => {
						console.log("用户简历", res)
						const currentYear = new Date().getFullYear();
						if (res.data.code === 200) {
							this.data = res.data.data
							const workDate = new Date(this.data.workTime);
							const birthdayDate = new Date(this.data.birthday);
							const workYear = workDate.getFullYear();
							const birthYear = birthdayDate.getFullYear();
							this.wt = currentYear - workYear;
							this.yt = currentYear - birthYear;
							this.getDistName(this.data.education, 'education_type')
						}
					}
				})
			},
			getDistName(code, type) {
				uni.request({
					url: this.reqUrl + '/dropDown/sys_name?code=' + code + "&type=" + type,
					method: 'GET',
					header: {
						"Authorization": uni.getStorageSync('token')
					},
					success: (res) => {
						console.log("字典名称", res)
						this.xueli = res.data.data
					}
				})
			},
			toChat(memberId, headPic, name,type) {
				uni.navigateTo({
					url: '/pages/message/chat?id=' + memberId + "&img=" + headPic + "&name=" + name+ "&type=" + type
				})
			}

		}
	}
</script>

<style>
	.page {
		padding: 0 4vw 12vw 4vw;
		background-color: #FFFFFF;
	}

	.info {
		display: flex;
		flex-direction: row;
	}

	.btn-footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 10px 0 40px 0;
		box-shadow: 0px -4px 6px 1px rgba(0, 0, 0, 0.09);
		background-color: #FFFFFF;
	}

	button {
		background-color: #38BDF8;
		color: #FFFFFF;
		width: 90%;
	}
</style>