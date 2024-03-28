<template>
	<view>
		<Banner class="mb-16" />
		<!-- 		<uni-section title="我的账本" type="line" sub-title="创建的账本将会显示在此处" class="mt-16">
			<uni-card is-full :border="false" :is-shadow="false" padding="0">
				<uni-list>
					<uni-list-item v-for="bill in bills" :title="bill.title" showArrow clickable
						:note="`创建于 ${dateFormat(bill.datetime)}`" :to="`/pages/detail/detail?${qs(bill)}`" />
				</uni-list>
			</uni-card>

		</uni-section> -->
		<view class="card br-8 mb-12 shadow flex-between align-center" v-for="bill in bills"
			@click="goto(`/pages/detail/detail?${qs(bill)}`)">
			<view>
				<view class="mb-20">{{bill.title}}</view>
				<view class="txt-tip">创建于 {{dateFormat(bill.datetime)}}</view>
			</view>
			<uni-icons type="right" size="18"/>
		</view>
		<Empty class="container br-8" height="56vh" v-if="!bills.length" text="没有任何账本, 请先去创建一个账本吧!" />
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
	import Empty from '@/components/empty/index.vue'

	export default {
		components: {
			Banner,
			Empty
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

<style lang="scss" scoped>
	.card {
		background: white;
		padding: 28px 0;
		transition: background .2s;
		&:active {
			background: #f8f8f8;
		}
	}
</style>