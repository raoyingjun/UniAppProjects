<template>
	<view>
		<Banner />
		<uni-row class="my-16 justify-end">
			<button class="m-0" type="primary" size="mini" @click="goto('/pages/createbill/createbill')">
				+ 创建新账本</button>
		</uni-row>
		<uni-section title="我的账本" type="line" sub-title="创建的账本将会显示在此处">
			<uni-card is-full :border="false" :is-shadow="false" padding="0">
				<uni-list>
					<uni-list-item v-for="bill in bills" :title="bill.title" showArrow clickable
						:note="`创建于 ${dateFormat(bill.datetime)}`" :to="`/pages/detail/detail?${qs(bill)}`" />
				</uni-list>
			</uni-card>
		</uni-section>
	</view>
</template>

<script>
	import Banner from '@/components/banner/index.vue'
	import {
		dateFormat
	} from '@/utils/format.js'
	import {
		qs
	} from '@/utils/qs.js'
	export default {
		components: {
			Banner
		},
		data() {
			return {
				bills: []
			}
		},
		onShow() {
			this.bills = uni.getStorageSync('bills');
		},
		methods: {
			qs,
			dateFormat,
			goto(url) {
				uni.navigateTo({
					url
				});
			}
		}
	}
</script>

<style>

</style>