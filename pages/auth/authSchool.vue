<template>
	<view class="page">
		<uni-forms ref="form" :modelValue="formData" :rules="rules">
			<uni-forms-item label="学校名称" name="name">
				<uni-easyinput type="text" v-model="formData.name" @input="change()" placeholder="请输入学校名称" />
				<view class="select-view" v-for="(item, index) in addressList" :key="index">
					<button v-if="addressShow" @tap="selectAddress(index)" type="default"
						size="mini">{{ item.name }}</button>
				</view>
			</uni-forms-item>

			<uni-forms-item label="信用代码" name="unifiedSocialCreditCode">
				<uni-easyinput type="text" v-model="formData.unifiedSocialCreditCode" maxlength="18" placeholder="请输入信用代码" />
			</uni-forms-item>


			<!-- <view class="section">
				<view class="cityT">所在城市</view>
				<uni-data-picker placeholder="请选择地区" popup-title="请选择所在地区" :localdata="provinces" v-model="classes"
					@change="onchange()">
				</uni-data-picker>
			</view> -->


			<uni-forms-item label="学校地址" name="address">
				<uni-easyinput v-model="formData.address" placeholder="请输入学校地址" />
				<!-- <view v-for="(item, index) in addressList" :key="index">
					<button v-if="addressShow" @tap="selectAddress(index)" type="default"
						size="mini">{{ item.name }}</button>
				</view> -->
			</uni-forms-item>

			<uni-forms-item label="法人姓名" name="legalPerson">
				<uni-easyinput type="text" v-model="formData.legalPerson" placeholder="请输入法人姓名" />
			</uni-forms-item>

			<uni-forms-item label="身份证号" name="idCardNo">
				<uni-easyinput type="text" v-model="formData.idCardNo" placeholder="请输入身份证号" />
			</uni-forms-item>

			<!-- <view class="upload-container" @tap="chooseImage">
				<text class="plus-icon">+</text>
				<text class="upload-text">上传营业执照</text>
			</view> -->
			<view class="pic">
				<view class="cityT1">上传营业执照</view>
				<uni-file-picker class="picker" v-model="formData.url"  @select="select" limit="1"></uni-file-picker>
			</view>
		</uni-forms>
		<button class="submit" hover-class="btn" @click="submit">提交</button>
	</view>
</template>

<script>
	import {
		uploadImage
	} from '../../main';
	export default {
		data() {
			return {
				imageUrl: '',
				// 表单数据
				formData: {
					name: '',
					unifiedSocialCreditCode: '',
					address: '',
					legalPerson: '',
					idCardNo: '',
					type: 3,
					id: '',
					provinceCode: "",
					cityCode: "",
					countyCode: "",
					licensePic: "",
					latitude: "",
					longitude: "",
					token:''


				},
				addressList: [],
				provinces: [],
				classes: '',
				addressShow: true,
				rules: {
					// 对name字段进行必填验证
					name: {
						rules: [{
								required: true,
								errorMessage: '请输入学校名称',
							},
							{
								minLength: 4,
								maxLength: 18,
								errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符',
							}
						]
					},
					// 对email字段进行必填验证
					unifiedSocialCreditCode: {
						rules: [{
							required: true,
							errorMessage: '请输入信用代码',
						}, {
							length: 18,
							errorMessage: '请输入正确信用代码',
						}]
					},
					address: {
						rules: [{
							required: true,
							errorMessage: '请输入学校地址',
						}]
					},
					legalPerson: {
						rules: [{
							required: true,
							errorMessage: '请输入法人姓名',
						}]
					},
					idCardNo: {
						rules: [{
							required: true,
							errorMessage: '请输入身份证号',
						}, {
							length: 18,
							errorMessage: '请输入正确身份证号',
						}]
					},
				}
			}
		},
		onLoad() {
			this.token = uni.getStorageSync("token")
			this.getInfo()
			this.getUserInfo()
			
		},
		methods: {

			onchange(e) {
				this.formData.provinceCode = e.detail.value[0].value
				this.formData.cityCode = e.detail.value[1].value
				this.formData.countyCode = e.detail.value[2].value
				console.log('省:', e.detail.value[0].value);
				console.log('市:', e.detail.value[1].value);
				console.log('区:', e.detail.value[2].value);
			},
			getInfo() {
				uni.request({
					url: this.reqUrl + "/dropDown/dicDistrict",
					method: "GET",
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("省市区", res)
						this.provinces = res.data.data
					}
				})
			},
			// getUserInfo() {
			// 	uni.request({
			// 		url: this.reqUrl + '/userInfo',
			// 		method:'GET',
			// 		header: {
			// 			"Authorization": this.token
			// 		},
			// 		success: (res) => {
			// 			console.log(res)
			// 			this.formData = res.data.data

			// 		}
			// 	})
			// },
			submit() {
				this.$refs.form.validate().then(res => {
					this.toAuth();
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			},
			getPic(url) {

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

						console.log('上传成功2222', JSON.parse(res.data));

						this.formData.licensePic = JSON.parse(res.data).data
					},
					fail: (error) => {
						console.error('上传失败', error);
					},
				})
			},
			toAuth() {
				if (!this.formData.licensePic) {
					uni.showToast({
						title: '请先上传营业执照。',
						icon: 'none'
					});
					return false;
				}
				this.formData.id = uni.getStorageSync("userId")
				console.log("data", this.formData)
				uni.request({
					url: this.reqUrl + "/member/auth",
					method: 'POST',
					data: this.formData,
					header: {
						'Authorization': this.token
					},
					success: (res) => {
						console.log(res)
						if (res.data.code === 200) {
							uni.navigateBack()
							uni.showToast({
								title:'提交成功',
								icon:'success'
							})
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'fail'
							})
						}
					},
					fail: (error) => {
						console.error('认证失败', error);

					},
				})


			},
			getUserInfo() {
				uni.request({
					url: this.reqUrl + "/userInfo",
					method: 'GET',
					header: {
						'Authorization': this.token
					},
					success: (res) => {
						console.log(res)
						if (res.data.data.isExamine === 1) {
							this.formData = res.data.data
						}

					}
				})
			},
			change() {
				console.log("change。。。。")
				this.addressShow = true
				uni.request({
					url: this.reqUrl + "/dropDown/assistant?keyWords=" + this.formData.name,
					method: 'GET',
					header: {
						'Authorization': this.token
					},
					success: (res) => {
						console.log("地址", res)
						this.addressList = res.data.data
					}
				})
			},
			selectAddress(index) {
				this.addressShow = false
				this.formData.address = this.addressList[index].district + this.addressList[index].address
				this.formData.name = this.addressList[index].name
				let arr = this.addressList[index].location.split(",")
				this.formData.longitude = arr[0]
				this.formData.latitude = arr[1]
				this.getCode(arr[0], arr[1])
			},
			getCode(x, y) {
				let longitude = 107.231544;
				let latitude = 34.416447;
				uni.request({
					url: 'https://restapi.amap.com/v3/geocode/regeo',
					data: {
						key: 'f6a860eb2756007014c4c590f1713995',
						location: `${longitude},${latitude}`,
						extensions: 'all',
						batch: 'false',
						roadlevel: '0'
					},
					success: (res) => {
						// res.data 包含了逆地理编码的结果
						if (res.data.status === '1' && res.data.info === 'OK') {
							// 获取省市区编码信息
							let provinceCode = res.data.regeocode.addressComponent.adcode.substring(0, 2) +
								'0000'; // 省份编码
							let cityCode = res.data.regeocode.addressComponent.adcode.substring(0, 4) +
								'00'; // 城市编码
							let districtCode = res.data.regeocode.addressComponent.adcode; // 区域编码

							this.formData.provinceCode = provinceCode
							this.formData.cityCode = cityCode
							this.formData.countyCode = districtCode
							console.log('省份编码：', provinceCode);
							console.log('城市编码：', cityCode);
							console.log('区域编码：', districtCode);
						} else {
							console.error('逆地理编码失败');
						}
					},
					fail: (error) => {
						console.error('请求失败', error);
					}
				});
			}

		}
	}
</script>

<style scoped>
	.submit {
		margin-top: 10%;
		width: 80%;
		color: white;
		background-color: #38BDF8;
		border-radius: 10px;
	}



	.btn {
		background-color: #0EA5E9;
		/* 点击后的颜色 */
		color: #E5E5E5;
		/* 点击后的文字颜色 */
	}

	/* 上传容器样式 */
	.upload-container {
		margin: auto;
		margin-top: 10%;
		width: 200px;
		height: 100px;
		border: 1px dashed #ccc;
		border-radius: 5px;
		text-align: center;
		line-height: 100px;
		font-size: 20px;
		color: #999;
		position: relative;
	}

	/* 加号图标样式 */
	.plus-icon {
		display: block;
	}

	/* 提示文字样式 */
	.upload-text {
		position: absolute;
		bottom: 15px;
		left: 0;
		right: 0;
		font-size: 12px;
		color: #666;
	}

	.page {
		/* margin-top: 5%; */
		padding: 2%;
		background-color: white;
	}

	.section {
		display: flex;
		align-items: center;
		/* background: white; */
		width: 100%;
		margin-bottom: 5%;
	}

	.cityT {
		font-size: 14px;
		margin-right: 4%;
		color: #52525B;
	}

	.cityT1 {
		font-size: 14px;
		margin-left: 4%;
		color: #52525B;
	}

	.pic {
		width: 100%;
		display: flex;
		justify-items: center;
		flex-direction: column;
		margin-left: 35%;

	}
	

	
</style>