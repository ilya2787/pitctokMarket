export interface TypeListMenu {
  id: number,
  Name: string,
  Link: string,
}
export interface TypeSocial{
  id: number,
  Icon: JSX.Element,
  title: string,
  LinkA: string,
  LinkP: string
}
export interface TypeListUsers{
	id: number
	FirstName: string
	LastName: string
	Phone: string
	Email: string
	DateRegist: Date
}

export interface TypeListProduction {
	id: number
	img: string
	materials: string
	quantity: number
	description: string
	title: string
	article: string
	price: number
	newStatus: number
	idNavMenu: number
}

export interface TypeListProductionBasket {
	id: number
	img: string
	quantity: number
	title: string
	article: string
	price: number
	idUser: number
	quantity_item: number
}

export interface TypeListImgProductItem{
	id: number
	Link: string
	idProduction: number
}

export interface TypeListUserFavorites {
	id: number
	img: string
	materials: string
	quantity: number
	description: string
	title: string
	article: string
	price: number
	newStatus: number
	idNavMenu: number
	idUser: number
	idProd: number
}

export interface TypeValueDataOrder{
	img: string,
	title: string,
	article: string,
	quantity: number,
	price: number,
	Delivery: number,
	Pickup: number,
	Address: string,
	idPostal: string,
	Status: string,
	PaymentStatus: number,
	idUser: number
	totalAmount?: number,
	DateOrder: string,
	Cancel? : number
}

export interface TypeNews {
	id: number,
	title: string,
	date: string,
	description: string,
}
