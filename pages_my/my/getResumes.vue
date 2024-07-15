<template>
	<view>
		<view v-for="(item,index) in resumes" :key="index">
			<view class="view-row">
				<image class="img" :src="item.memberHeadPic" @tap="toUserSpace(item.memberId)"></image>
				<view class="view-column" @tap="toUserSpace(item.memberId)">
					<view class="name">{{item.memberName}}</view>
					<view class="job">{{item.jobName}}/{{item.gmtCreate.substring(0,10)}}</view>
				</view>
				<view class="check" @tap="previewFile(item.resume,item.memberName)">查看简历 ></view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				resumes: [],
				query: {
					page: 1,
					size: 10,
					enterpriseId: ''
				},
				token: ''
			}
		},
		onLoad() {
			this.token = uni.getStorageSync("token")
			this.getResumeList()
		},
		methods: {
			getResumeList() {
				this.query.enterpriseId = uni.getStorageSync("userId")
				uni.request({
					url: this.reqUrl + "/memberJob/list/deliveryRecord?page=" + this.query.page + "&size=" + this
						.query.size +
						"&enterpriseId=" + this.query.enterpriseId,
					// method: 'GET',
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("收到的简历：", res)
						this.resumes = res.data.data
					}
				})
			},
			previewFile(fileUrl,name){
				uni.navigateTo({
					url:'/pages_userInfo/userInfo/previewResume?url=' + fileUrl + "&name=" + name
				})
			},
			toUserSpace(userId){
				uni.navigateTo({
					url: '/pages_my/my/mySpace?userId='+userId
				})
			},
		}
	}
</script>

<style>
	.view-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: white;
		margin: 1%;
		border-radius: 10px;

	}

	.view-row1 {
		display: flex;
		flex-direction: row;
	}

	.view-column {
		display: flex;
		flex-direction: column;
		flex: 1;
		margin-left: 2%;
	}

	.img {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		margin: 10px 0;

	}

	.check {
		margin-right: 10px;

	}
	.check:hover{
		color: gray;
	}

	.name {
		font-size: 18px;
	}

	.job {
		margin: 5px 10px 0 0;
		font-size: 12px;
		color: gray;
	}
</style>