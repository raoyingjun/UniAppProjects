import {isString} from 'lodash'

export const dateFormat = (d, dateSplit = '/', timeSplit = ':', divider = ' ') => {
	d = new Date(d)
	const year = d.getFullYear()
	const month = d.getMonth() + 1
	const date = d.getDate()

	const hour = d.getHours()
	const minute = d.getMinutes()
	const second = d.getSeconds()

	let dateString = ''
	if (isString(dateSplit)) {
		dateString += [year, month, date].join(dateSplit)
	}
	if (isString(timeSplit)) {
		dateString += isString(divider) ? divider : ''
		dateString += [hour, minute, second].map(v => v < 10 ? `0${v}` : v).join(timeSplit)
	}
	return dateString
}