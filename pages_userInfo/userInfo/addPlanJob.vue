<template>
	<view class="page">
		<view v-if="btnshow0" style="font-size: 28px; font-weight: 400;margin-top: 1vh;">发布人才定制</view>
		<view v-if="btnshow1" style="font-size: 28px; font-weight: 400;margin-top: 1vh;">修改人才定制</view>
		<view style="font-size: 14px; color: grey; margin-top: 6px;">详细介绍贵司的需求，稍后客服会与您取得联系。</view>
		
		<view style="border-bottom: 0.1px solid #f7f7f7; margin-bottom: 2vh;"></view>
		
		<view>
			<view style="font-size: 14px; color: gray;">定制标题</view>
			<view style="display: flex; flex-direction: row;align-items: center; margin: 2vh 0;">
				<view style="display: flex; flex-direction: row; align-items: center; margin: 2vh 0;">
					<input  v-model="data.title" placeholder="请输入招聘标题"/>
				</view>
				<uni-icons type="right" size="16" color="grey" style=" position: absolute; right: 5%; "></uni-icons>
			</view>
		</view>

		<view style="border-bottom: 0.1px solid #f7f7f7; margin-bottom: 2vh;"></view>
		<view style="margin-bottom: 14vh;">
			<view style="font-size: 14px; color: gray;">需求说明</view>
			<view style="display: flex; flex-direction: row;align-items: center; margin: 2vh 0;">
				<textarea type="number" v-model="data.content" placeholder="请详细描述岗位"/>
			</view>
		</view>

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
				btnshow1: false,
				btnshow0: false,
				type: '',
				token: '',
				userId: '',
				data: {
					title: "", 
					content: ""
				},
				show: false,
			}
		},
		onLoad(query) {
			this.token = uni.getStorageSync('token')
			this.data.enterpriseId = uni.getStorageSync('userId')
			this.data.memberId = uni.getStorageSync('userId')
			this.type = query.type
			if (query.type === '0') {
				this.btnshow0 = true
			} else if (query.type === '1') {
				this.btnshow1 = true
				this.getPlanJob(query.id)
			}
		},
		methods: {
			showView() {
				this.show === 'false' ? 'true' : 'false'
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
			
			edit() {
				uni.request({
					url: this.reqUrl + '/talentCustom',
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
					url: this.reqUrl + '/talentCustom',
					method: 'POST',
					header: {
						"Authorization": this.token
					},
					data: this.data,
					success: (res) => {
						console.log("发布定制计划", res)
						uni.navigateBack()
					}
				})
			},
			
			getPlanJob(id) {
				uni.request({
					url: this.reqUrl + "/talentCustom/"+id,
					method: "GET",
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("市", res.data.data)
						this.data = res.data.data
					}
				})
			},
			
			del() {
				uni.request({
					url: this.reqUrl + '/talentCustom/' + this.data.id,
					method: 'DELETE',
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("删除工作计划", res)
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
		z-index: 999;
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