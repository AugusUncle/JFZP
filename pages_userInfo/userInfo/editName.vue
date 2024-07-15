<template>
	<view>
		<!-- 昵称 -->
		<view v-if="key==='name'">
			<input class="input" focus v-model="value" placeholder="请输入" />
		</view>

		<view v-if="key==='mobile'">
			<input class="input" focus v-model="value" placeholder="请输入" />
		</view>

		<view v-if="key==='education'">
			<!-- <uni-data-select v-model="value1" :localdata="range" @change="change"></uni-data-select> -->
			<uni-data-select class="select" v-model="value1" :localdata="range" @change="change"></uni-data-select>
		</view>

		<view class="view-select" v-if="key==='graduatedSchoolId'">
			<input class="input" @focus="focus" @blur="blur" @input="input" placeholder="请选择" v-model="school_val"></input>
			<view v-if="showSelector" class="search-combox__selector">
				<view class="uni-popper__arrow"></view>
				<view v-for="(item,idx) in schoolList" :key="idx" >
					<view class="view-scl" @tap="selectSchool(item)">{{item.name}}</view>
				</view>
			</view>
		</view>



		<view v-if="key!=='education'"><button class="button" @tap="editInfo()">确定</button></view>





	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: "",
				code: "",
				key: "",
				value: 0,
				school_val:'',
				page: 1,
				size: 10,
				userInfo: {
					id: ""
				},
				value1: 0,
				token: '',
				showSelector: false,
				range: [{
						value: 0,
						text: "高中"
					},
					{
						value: 1,
						text: "专科"
					},
					{
						value: 2,
						text: "本科"
					},
					{
						value: 3,
						text: "硕士"
					}
				],
				schoolList: [],
			}
		},
		onLoad(options) {
			console.log("opt", options)
			this.key = options.key
			this.value = options.value
			this.school_val = options.value
			this.value1 = parseInt(options.value)
			this.index = options.value
			this.token = uni.getStorageSync("token")
			this.userInfo.id = uni.getStorageSync("userId")
			this.setTitle()
		},
		methods: {

			change(e) {
				this.value1 = e
				this.$set(this.userInfo, this.key, e)
				uni.request({
					url: this.reqUrl + "/member/edit",
					method: 'PUT',
					data: this.userInfo,
					header: {
						'Authorization': this.token
					},
					success: (req) => {
						this.getUserInfo()
						console.log("修改姓名", req)
					}
				})
			},
			editInfo() {
				this.$set(this.userInfo, this.key, this.value)
				uni.request({
					url: this.reqUrl + "/member/edit",
					method: 'PUT',
					data: this.userInfo,
					header: {
						'Authorization': this.token
					},
					success: (req) => {
						if (req.data.code === 200) {
							this.getUserInfo()
							console.log("修改" + this.key, req)
						} else {
							uni.showToast({
								title: req.data.message,
								icon: 'error'
							})
						}

					}
				})
			},
			getUserInfo() {
				uni.request({
					url: this.reqUrl + "/userInfo",
					method: 'GET',
					header: {
						'Authorization': this.token
					},
					success: (req) => {
						console.log(req)
						// uni.setStorageSync('user', req.data.data)
						uni.navigateBack()
					}
				})
			},
			setTitle() {
				uni.setNavigationBarTitle({
					title: "信息修改"
				})
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
			selectSchool(school) {
				this.showSelector = false
				this.value= school.id
				this.school_val= school.name
			}
		}
	}
</script>

<style>
	.input {
		background: white;
		width: 100%;
		height: 50px;
		padding: 0 10px;
	}

	.button {
		position: absolute;
		margin-top: 3%;
		left: 20%;
		width: 60%;
		height: 6%;
		/* background-color: #38BDF8; */
		background: #38BDF8;
		text-align: center;
		color: white;
	}

	.select {
		height: 50px;
	}

	.button:active {
		background: #7DD3FC;
	}

	.btn-mobile {
		display: flex;
	}

	/* .view-select{
		display: flex;
		justify-content: center;
	} */

	.search-combox__selector {

		box-sizing: border-box;
		position: absolute;
		top: 8%;
		width: 100%;
		background-color: #FFFFFF;
		border: 1px solid #EBEEF5;
		border-radius: 6px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		padding: 10px 10px;
		/* height: 190px; */
		z-index: 999;

	}

	.uni-popper__arrow,
	.uni-popper__arrow::after {
		position: absolute;
		display: block;
		width: 0;
		height: 0;
		border-color: transparent;
		border-style: solid;
		border-width: 6px;
	}
	.view-scl{
		padding: 5px;
		 transition: box-shadow 0.3s ease; /* 添加过渡效果 */
	}
	.view-scl:hover{
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* 添加阴影 */
	}
</style>