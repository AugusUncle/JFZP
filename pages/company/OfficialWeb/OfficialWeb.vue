<template>
	<view>
		<web-view :src="url"></web-view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:''
			}
		},
		onLoad(query) {
			this.url = query.url
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
