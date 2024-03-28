<template>
	<uni-card title="账本信息" is-full :border="false" :is-shadow="false" padding="0" spacing="5px" extra="修改账本信息 >"
		@click="toEdit" class="br-8 shadow">
		<uni-list>
			<uni-list-item title="账本 ID" :note="field('id')" />
			<uni-list-item title="账本名称" :note="field('title')" />
			<uni-list-item title="创建于" :note="field('datetime', dateFormat)" />
			<uni-list-item title="最后编辑于" :note="field('lastModifiedTime', dateFormat)" />
			<uni-list-item title="描述" :note="field('description')" />
		</uni-list>
	</uni-card>
	<button type="warn" @click="del" class="mt-16">删除该账本</button>
</template>

<script>
	import {
		dateFormat
	} from '@/utils/format.js'
	import {
		qs
	} from '@/utils/qs.js'
	export default {
		data() {
			return {
				bill: {},
				query: getCurrentPages()[getCurrentPages().length - 1].$page.options,
			}
		},
		methods: {
			toEdit(type) {
				if (type === 'extra') {
					uni.navigateTo({
						url: `/pages/createbill/createbill?${qs(this.query)}`,
					});
				}
			},
			dateFormat,
			del() {
				uni.showModal({
					title: '操作提醒',
					content: '确认删除该账本吗？该操作无法撤回',
					mask: true,
					success: res => {
						if (res.confirm) {
							// 删除该账本
							const bills = uni.getStorageSync('bills') || []
							const targetIndex = bills.findIndex(({
								id
							}) => id === this.query.id)

							bills.splice(targetIndex, 1)
							uni.setStorageSync('bills', bills)

							// 删除该账本下的所有收支
							;
							(uni.getStorageSync(`bill-${this.query.id}-expense-keys`) || [])
							.forEach(id => uni.removeStorageSync(`bill-${this.query.id}-expense-${id}`))
							uni.removeStorageSync(`bill-${this.query.id}-expense-keys`)

							// 删除该账本下的所有标签
							;
							(uni.getStorageSync(`bill-${this.query.id}-tag-keys`) || [])
							.forEach(id => uni.removeStorageSync(`bill-${this.query.id}-tag-${id}`))
							uni.removeStorageSync(`bill-${this.query.id}-tag-keys`)

							// 操作成功提示
							uni.showToast({
								title: '此账本已删除',
								mask: true,
							})
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/index/index'
								});
							}, 1500)
						}
					}
				})
			},
			field(field, format) {
				field = this.bill[field]
				if (format) {
					field = format(field)
				}
				field = field || '无'
				return field
			},
			fetchBill() {
				let bills = uni.getStorageSync('bills') || []
				this.bill = bills.find(({
					id
				}) => id === this.query.id)
			}
		},
		onShow() {
			this.fetchBill()
		}
	}
</script>

<style>

</style>