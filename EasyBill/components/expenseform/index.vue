<template>
	<uni-forms ref="formRef" :model="tform" label-position="top" :rules="rules">
		<uni-notice-bar single :text="`本次收支最后编辑于 ${dateFormat(tform.lastModifiedTime)}`" v-if="tform.lastModifiedTime"/>
		<uni-forms-item label="收支金额" required name="amount">
			<uni-easyinput v-model="tform.amount" placeholder="填入收支金额" />
		</uni-forms-item>
		<uni-forms-item label="收支类型" required name="type">
			<uni-segmented-control :values="['支出', '收入']" @clickItem="changeType" :current="current" />
		</uni-forms-item>
		<uni-forms-item label="收支名称" required name="name">
			<uni-easyinput v-model="tform.name" placeholder="填入收支名称" />
		</uni-forms-item>
		<uni-forms-item label="收支标签">
			<TagEditor v-model="tform.tags" editable @create="createTag" @delete="deleteTag" @change="changeTag" />
		</uni-forms-item>
		<uni-forms-item label="记录时间">
			<uni-datetime-picker type="datetime" :clear-icon="false" v-model="tform.datetime" />
		</uni-forms-item>
		<uni-forms-item label="备注">
			<uni-easyinput v-model="tform.description" placeholder="是否需要在该账本写些备注..." type="textarea" />
		</uni-forms-item>
		<button type="primary" size="middle" @tap="createExpense">记录该收支</button>
	</uni-forms>
</template>

<script setup>
	import {
		cloneDeep
	} from 'lodash';
	import {
		reactive,
		computed,
		ref
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		useRoute
	} from 'vue-router'
	import {
		v4 as uuidv4
	} from 'uuid'
	import TagEditor from '@/components/tageditor/index.vue'
	import {dateFormat} from '@/utils/format.js'
	
	const query = getCurrentPages()[getCurrentPages().length - 1].$page.options
	const props = defineProps({
		form: {
			default: () => ({}),
			type: Object
		},
	})
	const emits = defineEmits(['create'])
	// 避免修改原始数据
	const tform = reactive(cloneDeep(props.form))
	const current = ref(tform.type ? tform.type === 'income' ? 1 : 0 : '');

	const changeType = e => {
		current.value = e.currentIndex
		tform.type = e.currentIndex === 0 ? 'spending' : 'income'
	}
	const formRef = ref()
	const rules = reactive({
		name: {
			rules: [{
				required: true,
				errorMessage: '收支名称不能为空'
			}]
		},
		amount: {
			rules: [{
				required: true,
				errorMessage: '收支金额不能为空'
			},{
				format: 'number',
				errorMessage: '输入必须为数字'
			}]
		},
		type: {
			rules: [{
				required: true,
				errorMessage: '请选择收支类型'
			}]
		},
	})
	const createExpense = () => {
		formRef.value.validate().then(() => {
			tform.lastModifiedTime = new Date()
			emits('create', tform)
		})
	}
	const createTag = text => {
		const idsKey = `bill-${query.id}-tag-keys`
		const ids = uni.getStorageSync(idsKey) || []
		const id = uuidv4()
		const tag = {
			text,
			id,
			datetime: new Date()
		}

		ids.push(id)
		uni.setStorageSync(idsKey, ids)

		uni.setStorageSync(`bill-${query.id}-tag-${id}`, tag)

	}
	const changeTag = tagId => {
		const foundIndex = tform.tags.indexOf(tagId)
		if (foundIndex > -1) {
			tform.tags.splice(foundIndex, 1)
		} else {
			tform.tags.push(tagId)
		}
	}

	const deleteTag = tagId => {
		// 删除当前 form 中的该 tag
		const selected = tform.tags.indexOf(tagId)
		if (selected > -1) {
			tform.tags.splice(selected, 1)
		}

		// 如果其他收支内也包括了该 tag 则一并删除
		(uni.getStorageSync(`bill-${query.id}-expense-keys`) || [])
		.map(id => uni.getStorageSync(`bill-${query.id}-expense-${id}`))
			.forEach(v => {
				const selected = v.tags.indexOf(tagId)
				if (selected > -1) {
					v.tags.splice(selected, 1)
					uni.setStorageSync(`bill-${query.id}-expense-${v.id}`, v)
				}
			})

		// 删除与该 tag 相关的所有数据
		const idsKey = `bill-${query.id}-tag-keys`
		const ids = uni.getStorageSync(idsKey) || []

		ids.splice(ids.indexOf(tagId), 1)
		uni.setStorageSync(`bill-${query.id}-tag-keys`, ids)
		uni.removeStorageSync(`bill-${query.id}-tag-${tagId}`)
	}
</script>

<style>
</style>