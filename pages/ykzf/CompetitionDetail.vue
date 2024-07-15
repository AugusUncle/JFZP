<template>
	<view class="page">
		<view v-if="!article.playBanner" class="title">
			<image src="https://jfzp.ykfly.com/jfht/app/game-title.png"></image>
			<view class="title-text">{{article.playTitle}}</view>
		</view>
		<image v-else-if="article.playBanner" style="border-radius: 10px; width: 100%;margin-bottom: 10px;"
			:src="article.playBanner"></image>
		<scroll-view class="content">
			<!-- {{article.gameType}}: "青年组-男生组" -->
			<!-- 赛事简要 -->
			<view class="content-title1">
				<image src="../../static/user.png"></image>
				<view style="margin: 0 2%;">赛事简要</view>
				<view class="line"></view>
			</view>
			<view class="info1">
				<view>赛事名称：{{article.playTitle}}</view>
				<view>赛事时间：{{article.startTime}}</view>
				<view>报名时间：{{article.endTime}}</view>
				<view>截止时间：{{article.endTime}}</view>
				<view>报名人数：{{article.enrollCounts}}/{{article.needNumbers}}</view>
				<view>举办单位：{{article.organizers}}</view>
				<view>举办地点：{{article.playAddress}}</view>
			</view>

			<!-- 赛事明细 -->
			<view class="content-title2">
				<image src="../../static/user.png"></image>
				<view style="margin: 0 2%;">赛事简要</view>
				<view class="line"></view>
			</view>
			<view class="info2">
				<view>赛事简介：{{article.playIntro}}</view>
				<view>赛事规则：{{article.playRules}}</view>
				<view>评审标准：{{article.assessStandard}}</view>
				<view>奖品：{{article.playAwards}}</view>
			</view>


		</scroll-view>
		<view v-if="article.isEnroll" style=" margin: 5% 0 20% -5px;display: flex;width: 100%;justify-content: center;">
			您已报名成功，请按时参加比赛哦~</view>
		<view class="form" v-if="!article.isEnroll && show ">
			<!-- 基础表单校验 -->
			<uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
				<uni-forms-item required name="name">
					<uni-easyinput v-model="valiFormData.name" placeholder="姓名" />
				</uni-forms-item>
				<uni-forms-item required name="age">
					<uni-easyinput type="number" v-model="valiFormData.age" placeholder="年龄" />
				</uni-forms-item>
				<uni-forms-item required name="mobile">
					<uni-easyinput type="number" maxlength="11" v-model="valiFormData.mobile" placeholder="手机号" />
				</uni-forms-item>
			</uni-forms>
			<button type="primary" @click="submit('valiForm')">提交</button>

		</view>
		<page-back></page-back>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token: '',
				article: {},
				show: true,
				valiFormData: {
					name: '',
					age: '',
					introduction: '',
					playId: '',
					memberId: ''
				},
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					age: {
						rules: [{
							required: true,
							errorMessage: '年龄不能为空'
						}, {
							format: 'number',
							errorMessage: '年龄只能输入数字'
						}]
					},
					mobile: {
						rules: [{
							required: true,
							errorMessage: '手机号不能为空'
						}, {
							format: 'number',
							errorMessage: '手机号只能输入数字'
						}]
					},
				},
			}
		},
		onLoad(query) {
			this.token = uni.getStorageSync('token')
			this.getInfo(query.id)
		},
		onShow() {
			this.getInfo(query.id)
		},
		methods: {
			getInfo(id) {
				uni.request({
					url: this.reqUrl + "/play/" + id,
					method: 'GET',
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log(res)
						this.article = res.data.data
					}
				})
			},
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					console.log('success', res);
					this.valiFormData.playId = this.article.id
					this.valiFormData.memberId = uni.getStorageSync('userId')
					uni.request({
						url: this.reqUrl + "/play_enroll/save",
						method: 'POST',
						data: this.valiFormData,
						header: {
							"Authorization": this.token
						},
						success: (res) => {
							uni.showToast({
								title: '报名成功',
							})
							this.show = false
						}
					})
				}).catch(err => {
					console.log('err', err);
				})
			},
		}
	}
</script>

<style>
	.page {
		display: flex;
		flex-direction: column;
		/* height: 100vh; */
		padding: 24% 2% 0 2%;
		background-image: url('https://jfzp.ykfly.com/jfht/app/bg-t.png');
		background-size: cover;
		background-repeat: no-repeat;
		background-attachment: fixed;
	}

	.title image {
		border-radius: 10px;
		width: 100%;
		height: 20vh;
	}

	.title-text {
		position: absolute;
		top: 19%;
		left: 10%;
		width: 80%;
		color: #4f6dee;
		text-align: center;
		font-size: 25px;
	}

	.content {
		/* display: flex; */
		width: 96%;
		padding: 2%;
		border-radius: 10px;
		background-color: rgba(255, 255, 255, 0.5);
		margin-bottom: 10px;
	}

	.content-title1 {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.content-title2 {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 10px;
	}

	.info1 {
		margin: 10px 30px;
		color: gray;
		font-size: 14px;
	}

	.info1 view {
		margin: 10px 0;
	}

	.info2 {
		margin: 10px 30px;
		color: gray;
		font-size: 14px;
	}

	.info2 view {
		margin: 10px 0;
	}

	.content-title1 image {
		width: 23px;
		height: 23px;
	}

	.content-title2 image {
		width: 23px;
		height: 23px;
	}

	.line {
		border-bottom: 1px solid gray;
		width: 70%;
	}

	.form {
		padding: 2%;
		border-radius: 10px;
		background-color: rgba(255, 255, 255, 0.5);
		padding: 8%;
		margin-bottom: 10%;
	}
</style>