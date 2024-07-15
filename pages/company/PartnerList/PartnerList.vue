<template>
	<view style="background-color: white;">

		<uni-search-bar class="uni-mt-10" radius="100" v-model="searchValue" placeholder="名称搜索" clearButton="auto"
			cancelButton="none" @confirm="search" @input="search" @clear="search" />

		<view class="select">
			<view class="select-item" >
				<view @tap="change(1)" style="display: flex; flex-direction: row; align-items: center; margin: auto;">
					<view>{{partner}}</view>
					<image style="width: 15px; height: 15px;" src="../../../static/icon_cb/down.png"></image>
				</view>
				<view>
					<scroll-view v-if="show === 1" scroll-y="true" class="box1">
						<view v-for="(item,index) in types" :key="index">
							<view style="display: flex; justify-content: center; align-items: center; height: 30px;"
								hover-class="list" @tap="select1(item)">{{item.name}}</view>
							<view v-if="index !== types.length-1" style="border-bottom: 0.6px solid lightgray;"></view>
						</view>
					</scroll-view>
				</view>
				
			</view>
			<view class="select-item" >
				<view @tap="change(2)" style="display: flex; flex-direction: row; align-items: center; margin: auto;">
					<view>{{province}}</view>
					<image style="width: 15px; height: 15px;" src="../../../static/icon_cb/down.png"></image>
				</view>
				<view>
					<scroll-view v-if="show === 2" scroll-y="true" class="box2">
						<view v-for="(item,index) in provinceList" :key="index">
							<view style="display: flex; justify-content: center; align-items: center; height: 30px;"
								hover-class="list" @tap="select2(item)">{{item.name}}</view>
							<view v-if="index !== types.length-1" style="border-bottom: 0.6px solid lightgray;"></view>
						</view>
					</scroll-view>
					
				</view>
				

			</view>
			<view class="select-item" >
				<view @tap="change(3)" style="display: flex; flex-direction: row; align-items: center; margin: auto;">
					<view>{{city}}</view>
					<image style="width: 15px; height: 15px;" src="../../../static/icon_cb/down.png"></image>
				</view>
				<view>
					<scroll-view v-if="show === 3" scroll-y="true" class="box3">
						<view v-for="(item,index) in cityList" :key="index">
							<view style="display: flex; justify-content: center; align-items: center; height: 30px;"
								hover-class="list" @tap="select3(item)">{{item.name}}</view>
							<view v-if="index !== types.length-1" style="border-bottom: 0.6px solid lightgray;"></view>
						</view>
					</scroll-view>
				</view>
				
			</view>
			
			<view class="select-item"  @tap="reset()">
				<view style="display: flex; flex-direction: row; align-items: center; margin: auto;">重置</view>
			</view>
		</view>

	
		
		

		<view v-if="current === 0">
			<uni-list v-for="(item,index) in schoolList" :key="index">
				<uni-list-item @tap="toPartnersPage(item.id)" :title="item.name" showArrow :thumb="item.headPic" />
			</uni-list>
			
			<view class="empty" v-show="schoolList.length<=0">
				<image src="../../../static/icon_cb/kk.png"></image>
				<view>查询结果为空~</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				token: '',
				page: '',
				size: 20,
				types: [{
					name: "全部",
					value: 0
				}, {
					name: "学校",
					value: 3
				}, {
					name: "企业",
					value: 2
				}],
				type: 0,
				cityId: '',
				cityId1: '',
				schoolList: {},
				companyList: {},
				partner: "全部",
				province: "省份",
				city: "市区",
				provinceList: [],
				cityList: [],
				show: 0,
				searchValue: ''
			}
		},
		onLoad() {
			this.token = uni.getStorageSync('token')
			this.getList()
		},
		methods: {
			toPartnersPage(id) {
				uni.navigateTo({
					url: "/pages/company/Partners/Partners?id=" + id
				})
			},
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			changeItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
				if (e.currentIndex === 1) {
					this.getCompanyList()
				}
			},
			getList() {
				uni.request({
					url: this.reqUrl + "/member/getEnterpriseOrSchool?page=" + this.page + "&size=" + this.size +
						"&type=" + this.type + "&provinceCode=" + this.cityId + "&cityCode=" + this.cityId1,
					method: "GET",
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log(res)
						this.schoolList = res.data.data.list
						if(this.schoolList.length === 0 ){
							this.show = 4
							
						}
						console.log(this.show)
					}
				})
			},
			search() {
				uni.request({
					url: this.reqUrl + "/member/getEnterpriseOrSchool?page=" + this.page + "&size=" + this.size +
						"&name=" + this.searchValue + "&type=" + "0",
					method: "GET",
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log(res)
						this.schoolList = res.data.data.list
					}
				})
			},
			getProvinceList() {
				uni.request({
					url: this.reqUrl + "/dropDown/districtByParent?parentCode=" + "100000",
					method: "GET",
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("123", res)
						this.provinceList = res.data.data
					}
				})
			},
			getCityList() {
				uni.request({
					url: this.reqUrl + "/dropDown/districtByParent?parentCode=" + this.cityId,
					method: "GET",
					header: {
						"Authorization": this.token
					},
					success: (res) => {
						console.log("123", res)
						this.cityList = res.data.data
					}
				})
			},
			change(id) {
				if (id === this.show) {
					this.show = 0
				} else {
					this.show = id
					if (id === 2) {
						this.getProvinceList()
					} else if (this.cityId !== '' && id === 3) {
						this.getCityList()
					}
				}
			},
			// change2() {
			// 	this.show2 = this.show2 === true ? false : true

			// },
			// change3() {
			// 	this.show3 = this.show3 === true ? false : true

			// 	if (this.cityId !== '' && this.show3) {
			// 		this.getCityList()
			// 	} else {
			// 		this.cityList = [{
			// 			id: "",
			// 			name: "空"
			// 		}]

			// 	}
			// },
			select1(item) {
				this.show = 0
				this.partner = item.name
				this.type = item.value
				this.getList()
			},
			select2(item) {
				this.show = 0
				this.province = item.name
				this.city = "市区"
				this.cityId = item.id
				this.cityId1 = ''
				this.getList()
			},
			select3(item) {
				this.city = item.name
				this.cityId1 = item.id
				this.show = 0
				this.getList()
			},
			reset(){
				this.type = 0
				this.cityId = ''
				this.cityId1 = ''
				this.partner = "全部",
				this.province = "省份",
				this.city = "市区",
				this.show = 0,
				this.getList()
			}
		}
	}
</script>

<style>
	.select {
		display: flex;
		flex-direction: row;
		margin: 0 0 2% 0;
		position: sticky;
		top: 0;
		z-index:99;
		background-color: white;
	}

	.select-item {
		width: auto;
		height: 24px;
		background-color: #F7F7F7;
		margin: 1% auto;
		font-size: 12px;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 4px;
	}

	.select image {
		/* position: relative;
		right: 20%; */
		
	}

	.box1 {
		width: 20%;
		position: absolute;
		z-index: 999;
		backdrop-filter: blur(10px);
		left: 3%;
		min-height: 100px;
		max-height: 300px;
		border-radius: 10px;
	}

	.box2 {
		width: 30%;
		position: absolute;
		z-index: 999;
		backdrop-filter: blur(10px);
		left: 24%;
		min-height: 100px;
		max-height: 300px;
		border-radius: 10px;
	}

	.box3 {
		width: 30%;
		position: absolute;
		z-index: 9;
		backdrop-filter: blur(10px);
		left: 50%;
		min-height: 28px;
		max-height: 300px;
		border-radius: 10px;
	}

	.list {
		background-color: #F7F7F7;
	}
	
	.empty{
		display: flex;
		color: grey;
		align-items: center;
		flex-direction: column;
		font-size: 14px;
		padding-bottom: 80%;
	}
	.empty image{
		width: 60px;
		height: 60px;
		margin-top: 50%;
		margin-bottom: 10px;
	}
</style>