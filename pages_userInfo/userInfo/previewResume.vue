<template>
	<view>
		<web-view :src="fileUrl"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileUrl: ''
			}
		},
		onLoad(query) {
			this.fileUrl = query.url
			let name = query.name
			let index = name.indexOf('.')
			let result = name.substring(0, index)

			uni.setNavigationBarTitle({
				title: result
			});
		},
	}
</script>

<style>

</style>