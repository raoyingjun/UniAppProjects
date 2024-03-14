import {
	reactive
} from 'vue'

export const useStatAmount = expenses => {
	let income = 0,
		spending = 0
	for (const {
			amount,
			type
		}
		of expenses) {
		if (type === 'income') {
			income += Number(amount)
		} else if (type === 'spending') {
			spending += Number(amount)
		}
	}
	return reactive({
		expense: income - spending,
		income,
		spending
	})
}
export const useStatCount = expenses => {
	let income = 0,
		spending = 0
	for (const {
			amount,
			type
		}
		of expenses) {
		if (type === 'income') {
			income++
		} else if (type === 'spending') {
			spending++
		}
	}
	return reactive({
		expense: income + spending,
		income,
		spending
	})
}
