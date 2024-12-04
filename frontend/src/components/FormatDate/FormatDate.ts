export const formatDate = (date:string) => {
	let DateFormat = new Date(date)
	const Year = DateFormat.getFullYear()
	const Month = DateFormat.getMonth()
	const Day = DateFormat.getDate()
	const DateForm = `${Day}.${Month + 1}.${Year}`
	return DateForm
}