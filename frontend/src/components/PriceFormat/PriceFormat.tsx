export const NumberPriceF = (num:number) => {
	const Fprice =	new Intl.NumberFormat("ru").format(num);
	return Fprice + " RUB"
 }