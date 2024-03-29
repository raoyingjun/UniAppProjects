const isLeapYear = year => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)

const getDays = date => {
	date = new Date(date)
	const month = date.getMonth()
	const months_31 = [1, 3, 5, 7, 8, 10, 12]
	const months_30 = [4, 6, 9, 11]

	const is_31 = months_31.indexOf(month)
	if ((is_31 > -1)) {
		return 31
	}

	const is_30 = months_30.indexOf(month)
	if ((is_30 > -1)) {
		return 30
	}

	return isLeapYear(year) ? 29 : 28

}

export const isSameDate = (date1, date2, typeExp = 'year-month-date', split = '-') => {
	date1 = new Date(date1)
	date2 = new Date(date2)

	const isSameYear = date1.getFullYear() === date2.getFullYear()
	const isSameMonth = date1.getMonth() === date2.getMonth()
	const isSameDate = date1.getDate() === date2.getDate()
	const isSameHour = date1.getHours() === date2.getHours()
	const isSameMinute = date1.getMinutes() === date2.getMinutes()
	const isSameSecond = date1.getSeconds() === date2.getSeconds()

	const TypeMap = {
		year: isSameYear,
		month: isSameMonth,
		date: isSameDate,
		hour: isSameHour,
		minute: isSameMinute,
		second: isSameSecond
	}
	const uTypes = typeExp.split(split)

	return uTypes.every(type => TypeMap[type])
}

export const foreachDate = (from, to, type, callback) => {
	from = new Date(from)
	to = new Date(to)
	const current = new Date(from)

	const TypeMap = {
		year: 'FullYear',
		month: 'Month',
		date: 'Date',
		hour: 'Hours',
		minute: 'Minutes',
		second: 'Seconds'
	}

	const setProp = `set${TypeMap[type]}`
	const getProp = `get${TypeMap[type]}`

	if (from[getProp]() === to[getProp]() && current >= to) {
		current.setTime(to.getTime())
		return callback(current)
	}

	while (current < to) {
		const tmpDate = new Date(2021, 0)
		const start = tmpDate.valueOf()
		tmpDate[setProp](tmpDate[getProp]() + 1)
		const end = tmpDate.valueOf()
		let unitDiff = end - start

		// 判断一下是不是闰年。是闰年的话单位时间差需要加 1 天
		// const isLeapYear_current = isLeapYear(current)
		// const isLeapYear_to = isLeapYear(to)
		// if (isLeapYear_current) {
		// 	unitDiff -= 24 * 60 * 60 * 1000
		// }
		// if (isLeapYear_to) {
		// 	unitDiff += 24 * 60 * 60 * 1000
		// }
		/**
		 * 如果与终点的距离小于 1 个维度的单位差
		 * 比如：
		 * current = 3月4号12点，to = 3月6号18点，callback(current)
		 * current = 3月5号12点，to = 3月6号18点，callback(current)
		 * current = 3月6号12点，to = 3月6号18点，这里应该触发 callback(to)
		 * 或者比如：
		 * current = 3月4号18点，to = 3月6号12点，callback(current)
		 * current = 3月5号18点，to = 3月6号12点，callback(current)
		 * current = 3月6号128点，to = 3月6号12点，这里应该触发 callback(to)
		 */
		if ((to - current) <= unitDiff) {
			// 是同一天，则直接将 current = to
			if ((to[getProp]() - current[getProp]() < 1)) {
				current.setTime(to.getTime())
				// 不是同一天，那就是差一天。则手动 callback前一天，并将 current = to
			} else {
				callback(current)
				current.setTime(to.getTime())
			}
			callback(current)
		} else {
			callback(current)
			current[setProp](current[getProp]() + 1)
		}
	}
}