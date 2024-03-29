<template>
	<uni-card is-full :border="false" padding="0" spacing="0" class="br-8 shadow">
		<uni-forms :rules="rules" ref="form" :model="form" label-position="top" class="container">
			<uni-forms-item label="账本名称" name="title" required>
				<uni-easyinput v-model="form.title" placeholder="为账本起一个名吧" />
			</uni-forms-item>
			<uni-forms-item label="备注">
				<uni-easyinput v-model="form.description" placeholder="是否需要在该账本写些备注..." type="textarea" />
			</uni-forms-item>
			<button type="primary" size="middle" @tap="submit" class="my-20">{{query.id ? '更新账本': '创建账本'}}</button>
		</uni-forms>
	</uni-card>
</template>

<script>
	import {
		assign
	} from 'lodash';
	import {
		v4 as uuidv4
	} from 'uuid';
	import {
		qs
	} from '/utils/qs.js'

	const defaultTags = () => [{
			text: '日常用品',
			checked: false
		},
		{
			text: '电子产品',
			checked: false
		}, {
			text: '饮品零食',
			checked: false
		}, {
			text: '早午晚餐',
			checked: false
		}, {
			text: '人情往来',
			checked: false
		}, {
			text: '休闲玩乐',
			checked: false
		}, {
			text: '医疗费用',
			checked: false
		}, {
			text: '行车交通',
			checked: false
		}
	]

	export default {
		data() {
			return {
				form: {
					title: '',
					description: '',
					id: uuidv4(),
					datetime: '',
					lastModifiedTime: ''
				},
				query: getCurrentPages()[getCurrentPages().length - 1].$page.options,
				rules: {
					title: {
						rules: [{
							required: true,
							errorMessage: '账本名称不能为空'
						}]
					}
				},
			}
		},
		methods: {
			submit() {
				this.$refs.form.validate().then(() => {
					if (this.query.id) {
						this.updateBill()
					} else {
						this.createBill()
					}
				})
			},
			createBill() {
				let bills = uni.getStorageSync('bills') || []
				this.form.datetime = new Date()
				this.form.lastModifiedTime = new Date()
				bills.unshift(this.form)
				uni.setStorageSync('bills', bills)

				uni.showToast({
					title: '创建成功',
					mask: true,
				})
				setTimeout(() => {
					uni.redirectTo({
						url: `/pages/detail/detail?${qs(this.form)}`
					})
				}, 1500)
			},
			updateBill(billId) {
				let bills = uni.getStorageSync('bills') || []

				const bill = bills.find(({
					id
				}) => id === this.query.id)

				this.form.lastModifiedTime = new Date()
				assign(bill, this.form)
				uni.setStorageSync('bills', bills)

				uni.showToast({
					title: '更新成功',
					mask: true,
				})
				setTimeout(() => {
					uni.navigateBack();
				}, 1500)
			},
			fetchBill() {
				let bills = uni.getStorageSync('bills') || []
				const bill = bills.find(({
					id
				}) => id === this.query.id)
				assign(this.form, bill)
			}
		},
		onLoad() {
			if (this.query.id) {
				this.fetchBill()
				uni.setNavigationBarTitle({
					title: '编辑账本'
				})
			}
		}
	}
</script>

<style>

</style>