<template>
	<uni-card is-full :border="false" :is-shadow="false" class="br-8 shadow">
		<view class="flex-between">
			<view class="align-col-center justify-center" style="height: 250rpx; width: 50%" v-for="item in data">
				<text class="txt-primary amount mb-4">{{item.value}}</text>
				<text style="font-size: 24rpx;">{{item.name}}</text>
			</view>
		</view>
	</uni-card>
</template>

<script setup>
	const props = defineProps({
		data: Array
	})
</script>

<style>
	.amount {
		font-style: italic;
		font-size: 48rpx;
	}
</style>