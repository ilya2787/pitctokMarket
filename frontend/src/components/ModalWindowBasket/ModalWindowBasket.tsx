import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react'
import './index.scss'
import ModalWindow from '../ModalWindow/ModalWindow'
import { NumberPriceF } from '../PriceFormat/PriceFormat'
import { ICON } from '../ImportIcon/ImportIcon'
import ItemProduct from './ItemProduct'
import { TypeListProductionBasket } from '../TypesData/TypesData'
import { Context } from '../../App'
import axios from 'axios'
import { Link } from 'react-router-dom'

interface TypeProps{
	OpenBasketModal: boolean
	setOpenBasketModal: Dispatch<SetStateAction<boolean>>
	setQuantityProduct: Dispatch<SetStateAction<number>>
}

const ModalWindowBasket:FC<TypeProps> = ({OpenBasketModal, setOpenBasketModal, setQuantityProduct}) => {
	const DataContentAll = useContext(Context)
	const ListBasket = DataContentAll.ListBasket
	const IdUser = DataContentAll.idUsers
	const setListBasket = DataContentAll.setListBasket

const DeleteItemProduct = (id:number, idUser:number) =>{
	setListBasket(ListBasket.filter(d => d.id !== id))
	const value = {id: id, idUser: idUser}
	axios.post('/DeleteProdBasket', value)
	.then()
	.catch(err => console.log(err))
}

useEffect(() => {
	setQuantityProduct(ListBasket.length)
},[ListBasket])

const functionFullPrice = ListBasket.reduce((d, i) => d + i.quantity_item * i.price, 0);

 return (
				<ModalWindow
				title='Ваша корзина' modalIsOpen={OpenBasketModal} onClose={() => setOpenBasketModal(false)}>
					<div className='ContentBasket'>
					{ListBasket.length > 0 ? 
					<>
					<div className='ContentBasket__prod'>
						{ListBasket.map((data, i) => (
							<ItemProduct key={data.id} data={data} ListBasket={ListBasket} setListBasket={setListBasket} onClickDelete={() => {
								if(window.confirm(`Вы действительно хотите удалить"${data.title}"из вашей корзины`)){
									DeleteItemProduct(data.id, data.idUser)	
								}
							}}/>
						))}
					</div>
						<div className='ContentBasket__FullPriceAndBTN'>
							<span className='ContentBasket__FullPriceAndBTN__fullPrice'>
								<h3>Общая сумма:</h3>
								<p>{NumberPriceF(functionFullPrice)}</p>
							</span>
							<Link to={`/MakingAnOrder/${IdUser}`}>
									<button className='ContentBasket__FullPriceAndBTN__Arrange'>Оформить</button>
							</Link>
						</div>
					</>
				: <h3 className='ContentBasket__Basket__empty'>Корзина пуста</h3>
				}
					</div>
				</ModalWindow>
)
}

export default ModalWindowBasket