import React, {Dispatch, FC, SetStateAction, useContext, useEffect} from 'react'
import './index.scss'
import { TypeListProductionBasket } from '../TypesData/TypesData'
import { NumberPriceF } from '../PriceFormat/PriceFormat'
import { ICON } from '../ImportIcon/ImportIcon'
import { Context } from '../../App'
import axios from 'axios'
import { Link } from 'react-router-dom'

interface TypeProps{
	data: TypeListProductionBasket
	ListBasket: TypeListProductionBasket[]
	setListBasket: Dispatch<SetStateAction<TypeListProductionBasket[]>>
	onClickDelete: () => void
}

const ItemProduct:FC<TypeProps> = ({data, ListBasket,setListBasket, onClickDelete}) => {
	const DataApp = useContext(Context)
	const idUser = DataApp.idUsers
	const quantityElementPlus = () => {
		const itemsIndex = ListBasket.findIndex(value => value.id === data.id)
			const NewItem = {
				...ListBasket[itemsIndex],
				quantity_item: ListBasket[itemsIndex].quantity_item < ListBasket[itemsIndex].quantity ? ListBasket[itemsIndex].quantity_item + 1 : ListBasket[itemsIndex].quantity
			}
			const newCard = ListBasket.slice();
			newCard.splice(itemsIndex, 1, NewItem)
			setListBasket(newCard)
			UpdateProd(NewItem)
	}
	
	const quantityElementMinus = () => {
		const itemsIndex = ListBasket.findIndex(value => value.id === data.id)
			const NewItem = {
				...ListBasket[itemsIndex],
				quantity_item: ListBasket[itemsIndex].quantity_item !== 1 ? ListBasket[itemsIndex].quantity_item - 1 : 1
			}
			const newCard = ListBasket.slice();
			newCard.splice(itemsIndex, 1, NewItem)
			setListBasket(newCard)
			UpdateProd(NewItem)
	}
	const UpdateProd = (NewItem:TypeListProductionBasket) => {

	}


 return (
					<div className='ContentBasket__prod__item' key={data.id}>
						<Link to={`/Catalog/All/${data.id}`}>
							<img src={`http://localhost:3000/img/Product/${data.img}`} alt="" />
						</Link>
						<div className='ContentBasket__prod__item__info'>
							<Link to={`/Catalog/All/${data.id}`}>
								<h3 className='ContentBasket__prod__item__info__title'>{data.title}</h3>
							</Link>
							<span className='ContentBasket__prod__item__info__article'><p>Артикул: </p><p>{data.article}</p></span>
							<span className='ContentBasket__prod__item__info__price'><p>Цена: </p><p>{NumberPriceF(data.price)}</p></span>
							<div className='ContentBasket__prod__item__info__quantity'>
										<p>Количество: </p>
										<span className='ContentBasket__prod__item__info__quantity__item'>
													<button 
													onClick={quantityElementMinus}
													className='ContentBasket__prod__item__info__quantity__item__minus'>-</button>
													<p>{data.quantity_item}</p>
													<button 
													onClick={quantityElementPlus}
													className='ContentBasket__prod__item__info__quantity__item__plus'>+</button>
										</span>
							</div>
							<span className='ContentBasket__prod__item__info__summa'>
									<p>Сумма: </p><p>{NumberPriceF(data.price * data.quantity_item)}</p>
							</span>
					</div>
							<button onClick={onClickDelete} className='ContentBasket__prod__item__BTNDelete'>{ICON.DeleteIcons}</button>
				</div>
)
}

export default ItemProduct