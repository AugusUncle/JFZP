<template>
	<view >
		<view>
			<video class="video" :src="video.videoUrl" object-fit='fill' autoplay="true" controls></video>
		</view>

		<!-- 菜单 -->
		<view class="tabs-view">
			<u-sticky class="tabs" bgColor="#fff">
				<u-tabs :list="list1" @change="change()"></u-tabs>
			</u-sticky>

			<view v-if="tabNum ===0" style="padding: 2%;">
				<view style="display: flex; flex-direction: row; align-items: center;">
					<image :src="video.memberHeadPic" style="width: 35px; height: 35px; border-radius: 50%;"></image>
					<view style="margin-left: 3%; font-size: 13px; color: gray;">{{video.memberName}}</view>
				</view>
				<view style="margin: 5% 0 3% 0;">{{video.title}}</view>
				<view style="font-size: 10px; color: gray;">
					<!-- <image style="width: 10px; height: 10px;"></image>20<image style="width: 10px; height: 10px;">
					</image> -->{{video.gmtCreate}}
				</view>

				<view style="border-bottom: 1rpx solid #f0f0f0; margin: 4% 0;"></view>

				
			</view>

			<view v-if="tabNum ===1" style="margin-top: 2%; height: 100vh;" v-for="item in comments" :key="item.id">
				<view style="display: flex; padding: 0 2%; flex-direction: row;">
					<image :src="item.headPic" style="width: 35px; height: 35px; border-radius: 50%;"></image>
					<view style="margin-left: 2%;">
						<view style="font-size: 13px; color: grey;">{{item.name}}</view>
						<view style="font-size: 10px; color: grey; margin-top: 1%;">{{item.gmtCreate}}</view>
						<view style="margin-top: 15%; font-size: 14px; color: dimgray;">{{item.remarkContent}}</view>
					</view>
				</view>
				<view style="border-bottom: 1rpx solid #e9e9eb; margin: 4% 0;"></view>
				<view class="comment-inp">
					<input class="inp" v-model="comment.remarkContent" @confirm="submit()" placeholder="文明发表个人意见" />
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoUrl: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni-app-video-courses.mp4",
				video: {},
				id: '',
				list1: [{
					name: '简介',
				}
				// , {
				// 	name: '评论'
				// },
				],
				tabNum: 0,
				token: '',
				cardId: '',
				parentId: 0,
				comments: [],
				page: 1,
				size: 10,
				comment: {
					"cardId": 0,
					"memberId": 0,
					"parentId": 0,
					"remarkContent": "",
					"targetId": 0
				}
			}
		},
		onLoad(query) {
			this.id = query.id
			this.comment.cardId = query.id
			this.token = uni.getStorageSync("token")
			this.getDetail()
			this.getcomment()
		},
		methods: {
			change(item) {
				this.tabNum = item.index
			},
			getDetail() {
				uni.request({
					url: this.reqUrl + "/workPlan/" + this.id,
					method: "GET",
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log(res)
						this.video = res.data.data
						uni.setNavigationBarTitle({
							title:this.video.title
						})
					}
				})
			},
			submit() {
				console.log(this.comment.remarkContent)
				uni.request({
					url: this.reqUrl + "/common/text_detection",
					method: 'POST',
					data: {
						content: this.comment.remarkContent
					},
					success: (req) => {
						console.log('文本检测', req)
						if (req.data.code === 200) {
							this.addComment()
						} else {
							uni.showToast({
								title: req.data.message,
								icon: 'error'
							})
						}
					}
				})
			},
			addComment() {
				this.comment.memberId = uni.getStorageSync("userId")
				uni.request({
					url: this.reqUrl + "/remark/add",
					method: 'POST',
					data: this.comment,
					header: {
						'Authorization': this.token
					},
					success: (req) => {
						console.log('添加评论', req)
						if (req.data.code === 200) {
							this.comment.remarkContent = ''
							this.getcomment()
						} else {
							uni.showToast({
								title: req.data.message,
								icon: 'none'
							})
						}
					}
				})
			},
			getcomment() {
				uni.request({
					url: this.reqUrl + "/remark/list?page=" + this.page + "&size=" + this.size + "&cardId=" + this
						.id + "&parentId=" + this.parentId,
					method: 'GET',
					header: {
						'Authorization': this.token
					},
					success: (req) => {
						console.log('评论', req)
						this.comments = req.data.data
					}
				})
			},

		}
	}
</script>

<style>
	.video {
		width: 100%;
	}

	.tabs-view {
		/* padding: 5px 0 5px 20px; */
		height: 80vh;
		background-color: white;
	}

	.comment-inp {
		position: absolute;
		bottom: 0;
		width: 100%;
		background-color: white;
		padding: 6px 0 40px 0;
	}

	.inp {

		border-radius: 20px;
		border: 1px solid lightgray;
		height: 30px;
		padding-left: 5px;
		margin-bottom: 6px;
	}
</style>