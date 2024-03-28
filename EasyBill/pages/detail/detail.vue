<template>
	<view>
		<uni-section title="收支简报" type="line" sub-title="对收入和支出进行统计" class="br-8 over-hide shadow">
			<uni-card is-full :is-shadow="false">
				<uni-row class="flex">
					<uni-title type="h1" :title="`总收支：${stat.expense}`" />
					<view>
						<uni-title type="h4" :title="`总收入：${stat.income}`" />
						<uni-title type="h4" :title="`总支出：${stat.spending}`" />
					</view>
				</uni-row>
			</uni-card>
		</uni-section>

		<uni-list class="my-16 br-8 over-hide shadow">
			<uni-list-item title="收支报表" showArrow clickable :extraIcon="{color: '#000000',size: '24',type: 'color'}"
				showExtraIcon :to="`/pages/expensegui/expensegui?${qs(query)}`" />
			<uni-list-item title="账本详情及设置" showArrow clickable :extraIcon="{color: '#000000',size: '24',type: 'gear'}"
				showExtraIcon :to="`/pages/billsetting/billsetting?id=${query.id}`" />
		</uni-list>

		<uni-notice-bar text="长摁收支记录可进行删除操作" showClose />
		<uni-section title="收支记录" subTitle="收入及支出收支的详细信息" type="line" class="mt-16 br-8 shadow over-hide">
			<uni-list>
				<uni-list-item v-for="expense in expenses" :title="expense.name" :note="noteFormat(expense)" clickable showArrow @click="openDialog(expense.id)" direction="column" @longpress="delExpense(expense.id)" class="p-4">
					<template v-slot:footer>
						<TagEditor v-model="expense.tags" class="mt-4"/>
					</template>
				</uni-list-item>
				<uni-list-item v-if="!expenses.length">
					<template #body>
						<Empty text="无任何流水记录, 先去记录一下流水吧!"/>
					</template>
				</uni-list-item>
			</uni-list>
		</uni-section>
		<uni-fab ref="fab" :pattern="pattern" :content="content" horizontal="right"
			@fabClick="goto(`/pages/createexpense/createexpense?${qs(query)}`)" />
		<!-- 普通弹窗 -->
		<uni-popup ref="popup" type="bottom">
			<uni-card is-full title="修改收支记录" extra="轻触灰色背景区域关闭" @click="close" style="height: 80vh; overflow: auto;"
				class="br-8">
				<CreateExpense :expenseId="expenseId" @updated="updated" />
			</uni-card>
		</uni-popup>
	</view>
</template>

<script>
	import {
		qs
	} from '@/utils/qs.js'
	import CreateExpense from '@/pages/createexpense/createexpense.vue'
	import TagEditor from '@/components/tageditor/index.vue'
	import {
		dateFormat
	} from '@/utils/format.js'
	import {
		useStatAmount
	} from '@/composit/useStat'
	import {
		indexOf
	} from 'lodash'
	import Empty from '@/components/empty/index.vue'
	const TypeMap = {
		income: '收入',
		spending: '支出'
	}

	export default {
		components: {
			CreateExpense,
			TagEditor,
			Empty
		},
		data() {
			return {
				expenses: [],
				expenseId: '',
				query: getCurrentPages()[getCurrentPages().length - 1].$page.options,
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.query.title
			})
		},
		onShow() {
			this.fetchExpenses()
		},
		computed: {
			stat() {
				return useStatAmount(this.expenses)
			}
		},
		methods: {
			qs,
			delExpense(id) {
				uni.showModal({
					title: '操作提醒',
					content: '确认删除该收支记录吗？该操作无法撤回',
					success: res => {
						if (res.confirm) {
							const idsKey = `bill-${this.query.id}-expense-keys`
							const ids = uni.getStorageSync(idsKey) || []

							ids.splice(ids.indexOf(id), 1)
							uni.setStorageSync(idsKey, ids)
							uni.removeStorageSync(`bill-${this.query.id}-expense-${id}`)

							uni.showToast({
								title: '收支记录已删除',
								mask: true,
							})
							this.fetchExpenses()
						}
					},
				});
			},
			setDialog(visible) {
				this.$refs.popup[visible ? 'open' : 'close']()
			},
			close(target) {
				if (target === 'extra') {
					this.setDialog(false)
				}
			},
			updated() {
				this.setDialog(false)
				this.fetchExpenses()
			},
			openDialog(id) {
				this.expenseId = id
				this.setDialog(true)
			},
			noteFormat(expense) {
				const {
					amount,
					type,
					datetime
				} = expense
				return `${TypeMap[type]} ${amount} 元，记录于 ${dateFormat(datetime)}`
			},
			fetchExpenses() {
				this.expenses = []
				this.$nextTick(() => {
					this.expenses = (
							uni.getStorageSync(`bill-${this.query.id}-expense-keys`) || [])
						.map(id => uni.getStorageSync(`bill-${this.query.id}-expense-${id}`))
				})

			},
			goto(url) {
				uni.navigateTo({
					url,
				});
			},
		}
	}
</script>

<style scoped lang="scss">
:deep(.uni-list-item__content-title) {
	margin-bottom: 8px;
	font-size: 32rpx;
}
</style>