<template>
	<view class="container br-8">
		<uni-segmented-control :current="current" :values="segments" @clickItem="toggleView" class="mb-16" />
		<uni-card title="条件过滤" extra="使用条件过滤出更为精细的数据" is-full :border="false" spacing="0">
			<uni-forms label-position="top" :model="filter" label-width="150px">
				<uni-forms-item label="选择日期范围">
					<uni-datetime-picker v-model="filter.range" type="datetimerange" />
				</uni-forms-item>
				<uni-forms-item label="查看数据维度">
					<uni-segmented-control :current="filter.current" :values="filter.segments"
						@clickItem="updateDimension" />
				</uni-forms-item>
			</uni-forms>
		</uni-card>
		<StatData v-if="current === 0" :data="stat.dataList" />
		<StatChart v-if="current === 1" :data="stat.chartList" />
	</view>
</template>

<script>
	import {
		useStatAmount,
		useStatCount,
	} from '@/composit/useStat'
	import StatData from '@/components/statdata/index.vue'
	import StatChart from '@/components/statchart/index.vue'
	import {
		foreachDate,
		isSameDate
	} from '../../utils/date'
	import {
		dateFormat
	} from '../../utils/format'

	export default {
		components: {
			StatData,
			StatChart
		},
		data() {
			return {
				filter: {
					segments: ['年度', '月份', '日期'],
					current: 2,
					range: ['', ''],
				},
				segments: ['收支数据', '收支图示'],
				current: 0,
				expenses: [],
				query: getCurrentPages()[getCurrentPages().length - 1].$page.options,
			}
		},
		methods: {
			updateDimension(e) {
				const cur = e.currentIndex
				this.filter.current = cur
			},
			toggleView(e) {
				this.current = e.currentIndex
			},
			fetchExpenses() {
				this.expenses = (uni.getStorageSync(`bill-${this.query.id}-expense-keys`) || [])
					.map(id => uni.getStorageSync(`bill-${this.query.id}-expense-${id}`))
			},
			getMinAndMax() {
				const minDate = this.expenses.length ? Math.min(...this.expenses.map(({
					datetime
				}) => new Date(datetime).valueOf())) : new Date();
				const maxDate = this.expenses.length ? Math.max(...this.expenses.map(({
					datetime
				}) => new Date(datetime).valueOf())) : new Date();
				return {
					minDate,
					maxDate
				}
			}

		},
		computed: {
			dimension() {
				const DateMap = {
					0: 'year',
					1: 'month',
					2: 'date',
				}

				const unit = DateMap[this.filter.current]

				const FullDateMap = {
					0: 'year',
					1: 'year-month',
					2: 'year-month-date',
				}

				const full = FullDateMap[this.filter.current]
				return {
					unit,
					full
				}
			},
			filterExpenses() {
				return this.expenses.filter(({
						datetime
					}) => new Date(this.filter.range[0]) <= new Date(datetime) &&
					new Date(this.filter.range[1]) >= new Date(datetime))
			},
			stat() {
				// 收支数据
				const amount = useStatAmount(this.filterExpenses)
				const count = useStatCount(this.filterExpenses)

				const dataList = [{
					name: '收支合计',
					value: amount.expense.toFixed(2)
				}, {
					name: '总笔数',
					value: count.expense
				}, {
					name: '总收入',
					value: amount.income.toFixed(2)
				}, {
					name: '总支出',
					value: amount.spending.toFixed(2)
				}, {
					name: '收入笔数',
					value: count.income
				}, {
					name: '支出笔数',
					value: count.spending
				}]


				// 收支图示，折线图
				const categories = []
				const incomeValues = []
				const spendingValues = []
				const expenseValues = []

				foreachDate(this.filter.range[0], this.filter.range[1], this.dimension.unit, date => {
					let currentDateString
					if (this.dimension.unit === 'date') {
						currentDateString = dateFormat(date, '/', false)
					}
					if (this.dimension.unit === 'month') {
						currentDateString = date.getFullYear() + '/' + (date.getMonth() + 1)
					}
					if (this.dimension.unit === 'year') {
						currentDateString = date.getFullYear()
					}

					const currentDateExpenses = this.expenses.filter(({
						datetime
					}) => isSameDate(datetime, date, this.dimension.full))
					const amount = useStatAmount(currentDateExpenses)

					incomeValues.push(Number(amount.income.toFixed(2)))
					spendingValues.push(Number(amount.spending.toFixed(2)))
					expenseValues.push(Number(amount.expense.toFixed(2)))
					categories.push(currentDateString)
				})

				// 收支图示，饼图
				const amountValues = [{
					name: '收入',
					value: Number(amount.income.toFixed(2))
				}, {
					name: '支出',
					value: Number(amount.spending.toFixed(2))
				}]
				const countValues = [{
					name: '收入笔数',
					value: count.income
				}, {
					name: '支出笔数',
					value: count.spending
				}]

				return {
					amount,
					count,
					dataList,
					chartList: {
						incomeValues,
						spendingValues,
						expenseValues,
						categories,
						amountValues,
						countValues
					}
				}
			},
		},
		created() {
			this.fetchExpenses()

			const {
				minDate,
				maxDate
			} = this.getMinAndMax()
			this.filter.range = [minDate, maxDate]
		}
	}
</script>

<style>

</style>