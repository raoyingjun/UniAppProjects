<template>
	<view :class="expenseId ? '' : 'container br-8'">
		<ExpenseForm :form="form" @create="createExpense" />
	</view>
</template>

<script>
	import {
		assign
	} from 'lodash';
	import {
		v4 as uuidv4
	} from 'uuid'
	import ExpenseForm from '@/components/expenseform/index.vue'
	import {
		computed
	} from 'vue'
	export default {
		components: {
			ExpenseForm
		},
		props: {
			expenseId: String,
		},
		emits: ['updated'],
		data() {
			return {
				form: {
					name: '',
					description: '',
					datetime: new Date(),
					lastModifiedTime: '',
					amount: '',
					type: '', // income or spending
					tags: [],
				},
				query: getCurrentPages()[getCurrentPages().length - 1].$page.options,
			}
		},
		methods: {
			createExpense(form) {
				if (this.expenseId) {
					this.updateExpense(form)
				} else {
					this.newExpense(form)
				}
			},
			newExpense(form) {
				const idsKey = `bill-${this.query.id}-expense-keys`
				const ids = uni.getStorageSync(idsKey) || []
				const id = uuidv4()

				ids.unshift(id)
				uni.setStorageSync(idsKey, ids)
				uni.setStorageSync(`bill-${this.query.id}-expense-${id}`, {
					id,
					...form,
				})

				uni.showToast({
					title: '收支已记录',
					mask: true,
				})
				setTimeout(() => {
					uni.navigateBack();
				}, 1500)
			},
			updateExpense(form) {
				uni.setStorageSync(`bill-${this.query.id}-expense-${this.expenseId}`, form)
				uni.showToast({
					title: '收支记录已更新',
					mask: true,
				})
				setTimeout(() => {
					this.$emit('updated')
				}, 1500)
			},
			fetchExpense() {
				assign(this.form, uni.getStorageSync(`bill-${this.query.id}-expense-${this.expenseId}`))
			},

		},
		created() {
			if (this.expenseId) {
				this.fetchExpense()
			}
		}
	}
</script>

<style>

</style>