<template>
	<view class="container">
		<view class="text">新闻标题</view>
		<view>
			<textarea class="title" v-model="data.title" placeholder="请输入标题"></textarea>
		</view>
		<view class="pic">
			<view class="">封面图片</view>
			<uni-file-picker class="picker" @select="select()" limit="1"></uni-file-picker>
		</view>

		<view v-for="(item, index) in data.content" :key="index">
			<textarea class="content top" v-if="item.type===1" v-model="item.value" placeholder="请输入内容"
				auto-height></textarea>
			<uni-file-picker class="picker" v-if="item.type===2" @select="selectImg($event,index)"
				limit="1"></uni-file-picker>
		</view>

		<view class="submit">
			
		</view>
		<view class="btn">
			<button @click="addTextarea()" size="mini">+文章</button>
			<button @click="addImg()" size="mini">+图片</button>
			<button @click="" size="mini">+附件</button>
			<button class="submit" type="primary" @tap="submit()" size="mini">发布</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: {
					memberId: "",
					title: "",
					banner: "",
					file: "",
					content: [{
						value: "",
						img: "",
						type: 1
					}]
				}
			};
		},
		onLoad() {
			this.token = uni.getStorageSync("token")
		},
		methods: {
			addTextarea() {
				this.data.content.push({
					type: 1,
					value: '',
					img: ''
				});
			},
			addImg() {
				this.data.content.push({
					type: 2,
					value: '',
					img: ''
				});
			},
			select(e) {
				console.log('banner：', e.tempFilePaths[0])
				this.data.banner = e.tempFilePaths[0]
			},



			selectImg(e, index) {

				console.log("e...", e)
				console.log("index...", index)

				this.$set(this.data.content, index, {
					type: 2,
					value: '',
					img: e.tempFilePaths[0],

				});
			},



			submit() {
				this.data.memberId = this.user.id
				uni.request({
					url:this.reqUrl +"/articles/add",
					data:this.data,
					method:'POST',
					header:{
						"Authorization": this.token
					},
					success: (res) => {
						console.log(res)
					}
				})
			}
		}
	};
</script>

<style>
	.container {
		display: flex;
		/* align-items: center; */
		flex-direction: column;
		padding: 20px;
		/* height: auto; */
	}

	.title {
		background: #fff;
		width: 100%;
		border-radius: 5px;
		height: 45px;
	}

	.content {
		background: #fff;
		width: 100%;
		border-radius: 5px;
	}

	.top {
		margin-top: 10px;
	}


	.btn {
		display: flex;
		flex-direction: row;
		width: 90%;
		/* align-items: center; */
		bottom: 20px;
		border-radius: 5px;
		cursor: pointer;
		justify-content: center;
		position: fixed;

	}

	.picker {
		margin-top: 10%;
	}
</style>