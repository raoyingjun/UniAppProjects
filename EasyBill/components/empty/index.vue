<template>
	<view class="flex-center flex-col" :style="`height: ${height}`" style="width: 100%">
		<image src="/static/empty.png" style="width: 200rpx; object-fit: cover;" mode="widthFix" />
		<view class="txt-tip mt-16"> {{text || '很抱歉，这里什么都没有'}}</view>
	</view>
</template>

<script>
	export default {
		name: "empty",
		props: ['height', 'text'],
		data() {
			return {

			};
		}
	}
</script>

<style>

</style>