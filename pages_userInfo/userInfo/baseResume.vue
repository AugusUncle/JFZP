<template>
	<view style="background-color: #FFFFFF; padding: 4vw;">
		<view style="display: flex; flex-direction: row; align-items: center; margin: 4vw 0 10vw 0;">
			<view>头像</view>
			<image v-if="resume.headPic" :src="resume.headPic"
				style="width: 20vw; height: 20vw; border-radius: 50%; position: absolute;right: 4%;"></image>
			<uni-file-picker v-if="!resume.headPic" style="position: absolute;right: 4%;" :value="resume.headPic"
				return-type="object" :imageStyles="imageStyles" file-mediatype="image" @select="select()">
			</uni-file-picker>
		</view>
		<view style="border-bottom: 0.1px solid #f7f7f7; margin-bottom: 2vh;"></view>

		<view @click="inputDialog()">
			<view style="font-size: 14px; color: gray;">姓名</view>
			<view style="display: flex; flex-direction: row;align-items: center; margin: 2vh 0;">
				<view>{{resume.name}}</view>
				<uni-icons type="right" size="16" color="grey" style="position: absolute; right: 5%; "></uni-icons>
			</view>
		</view>
		<view style="border-bottom: 0.1px solid #f7f7f7; margin-bottom: 2vh;"></view>

		<view>
			<view style="font-size: 14px; color: gray;">性别</view>
			<view style="display: flex; flex-direction: row;align-items: center; margin: 2vh 0;">
				<view style="display: flex; flex-direction: row; align-items: center; margin: 2vh 0;">
					<picker @change="bindPickerChange" style="width: 100vw;" :value="resume.sex" :range="array">
						<view class="uni-input">{{array[resume.sex]}}</view>
					</picker>
				</view>
				<uni-icons type="right" size="16" color="grey" style="position: absolute; right: 5%; "></uni-icons>
			</view>
		</view>

		<view style="border-bottom: 0.1px solid #f7f7f7; margin-bottom: 2vh;"></view>


		<view>
			<view style="font-size: 14px; color: gray;">是否参加人才定制计划？<text @tap="toTrainPage()" style="color: #38BDF8;">(人才定制计划)</text></view>
			<view style="display: flex; flex-direction: row;align-items: center; margin: 2vh 0;">
				<u-radio-group v-model="resume.isTrain" placement="row">
					<u-radio :customStyle="{marginRight: '30px'}" v-for="(item, index) in radiolist" :key="index"
						:label="item.name" :name="item.id" @change="radioChange">
					</u-radio>
				</u-radio-group>
			</view>
		</view>
		
		<view style="border-bottom: 0.1px solid #f7f7f7; margin-bottom: 2vh;"></view>

		<view>
			<view style="font-size: 14px; color: gray;">参加工作时间</view>
			<view style="display: flex; flex-direction: row;align-items: center; margin: 2vh 0;">

				<uni-datetime-picker type="date" :clear-icon="false" v-model="resume.workTime" @change="dataChange()"
					@maskClick="maskClick" />

				<uni-icons type="right" size="16" color="grey" style="position: absolute; right: 5%; "></uni-icons>
			</view>
		</view>

		<!-- <view style="border-bottom: 0.1px solid #f7f7f7; margin-bottom: 2vh;"></view> -->

		<view>
			<view style="font-size: 14px; color: gray;">毕业时间</view>
			<view style="display: flex; flex-direction: row;align-items: center; margin: 2vh 0;">
				<uni-datetime-picker type="date" :clear-icon="false" v-model="resume.graduateTime"
					@change="dataChange()" @maskClick="maskClick" />
				<uni-icons type="right" size="16" color="grey" style="position: absolute; right: 5%; "></uni-icons>
			</view>
		</view>

		<!-- <view style="border-bottom: 0.1px solid #f7f7f7; margin-bottom: 2vh;"></view> -->

		<view>
			<view style="font-size: 14px; color: gray;">出生日期</view>
			<view style="display: flex; flex-direction: row;align-items: center; margin: 2vh 0;">
				<uni-datetime-picker type="date" :clear-icon="false" v-model="resume.birthday" @change="dataChange()"
					@maskClick="maskClick" />
				<uni-icons type="right" size="16" color="grey" style="position: absolute; right: 5%; "></uni-icons>
			</view>
		</view>

		<!-- <view style="border-bottom: 0.1px solid #f7f7f7; margin-bottom: 2vh;"></view> -->

		<view @click="inputDialog1()">
			<view style="font-size: 14px; color: gray;">手机号码</view>
			<view style="display: flex; flex-direction: row;align-items: center; margin: 2vh 0;">
				<view v-if="resume.mobile!== null">{{resume.mobile}}</view>
				<uni-icons type="right" size="16" color="grey" style="position: absolute; right: 5%; "></uni-icons>
			</view>
		</view>

		<view style="border-bottom: 0.1px solid #f7f7f7; margin-bottom: 2vh;"></view>

		<view @click="inputDialog2()" style="margin-bottom: 20vh;">
			<view style="font-size: 14px; color: gray;">邮箱</view>
			<view style="display: flex; flex-direction: row;align-items: center; margin: 2vh 0;">
				<view v-if="resume.email!== null">{{resume.email}}</view>
				<uni-icons type="right" size="16" color="grey" style="position: absolute; right: 5%; "></uni-icons>
			</view>
		</view>


		<view>
			<!-- 输入框示例 -->
			<uni-popup ref="inputDialog" type="dialog">
				<uni-popup-dialog ref="inputClose" mode="input" title="修改姓名" :value="resume.name" placeholder="请输入内容"
					@confirm="inputConfirm"></uni-popup-dialog>
			</uni-popup>

			<uni-popup ref="inputDialog1" type="dialog">
				<uni-popup-dialog ref="inputClose" mode="input" title="修改手机号" :value="resume.mobile" placeholder="请输入内容"
					@confirm="inputConfirm1"></uni-popup-dialog>
			</uni-popup>

			<uni-popup ref="inputDialog2" type="dialog">
				<uni-popup-dialog ref="inputClose" mode="input" title="修改邮箱" :value="resume.email" placeholder="请输入内容"
					@confirm="inputConfirm2"></uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				resume: {},
				array: ['男', '女', '保密'],
				imageStyles: {
					width: 70,
					height: 70,
					border: {
						radius: '50%'
					}
				},
				radiolist: [{
					name: "不参加",
					id: 0
				}, {
					name: "参加",
					id: 1
				}, ]
			}
		},
		onLoad() {
			this.token = uni.getStorageSync('token')
			this.userId = uni.getStorageSync('userId')
			this.getResume()
		},
		methods: {
			inputDialog() {
				this.$refs.inputDialog.open()
			},
			inputDialog1() {
				this.$refs.inputDialog1.open()
			},
			inputDialog2() {
				this.$refs.inputDialog2.open()
			},
			dataChange() {
				this.edit()
			},
			toTrainPage(){
				uni.navigateTo({
					url:'/pages_userInfo/plan'
				})
			},
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
						}
					}
				})
			},

			radioChange(e) {
				this.resume.isTrain = e
				this.edit()
			},
			select(e) {
				console.log('上传进度：', e.tempFilePaths[0])
				const imageUrl = e.tempFilePaths[0]
				uni.uploadFile({
					url: this.reqUrl + "/file/upload",
					filePath: imageUrl,
					name: 'file', // 服务端接收的字段名
					header: {
						'Authorization': this.token
					},
					success: (res) => {

						console.log('上传成功2222', JSON.parse(res.data).data);

						this.resume.headPic = JSON.parse(res.data).data
						this.edit()
					},
					fail: (error) => {
						console.error('上传失败', error);
					},
				})
			},
			edit() {
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
					}
				})
			},
			inputConfirm(e) {
				this.resume.name = e
				this.edit()
			},
			bindPickerChange: function(e) {
				console.log(e)
				this.resume.sex = e.detail.value
				this.edit()
			},
			inputConfirm1(e) {
				this.resume.mobile = e
				this.edit()
			},
			inputConfirm2(e) {
				this.resume.email = e
				this.edit()
			},
		}
	}
</script>

<style>
	.uni-file-picker {
		box-sizing: border-box;
		overflow: hidden;
		width: auto !important;
		flex: 1;
		position: absolute !important;
		right: 4% !important;
	}
</style>