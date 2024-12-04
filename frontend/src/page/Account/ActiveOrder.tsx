import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ICON } from '../../components/ImportIcon/ImportIcon'
import TitleContentPage from '../../components/TitleContentPage/TitleContentPage'
import ItemActiveOrder from './ItemActiveOrder'
import { TypeValueDataOrder } from '../../components/TypesData/TypesData'
import axios from 'axios'


const ActiveOrder = () => {

	const [ListUserOrder, setListUserOrder] = useState<TypeValueDataOrder[]>([])
	useEffect(() => {
		axios.get<TypeValueDataOrder[]>('/SelectOrderAll')
		.then(res => {
				setListUserOrder(res.data)
		})
		.catch(err => console.log(err));
	},[setListUserOrder])

 return (
						<div className='PageActiveOrderUsers'>
							<div className='LinkContentAccount'> 
								 <Link to={'/'} className='LinkContentAccount__item'>Главная</Link>
										<span>{ICON.ArrowRight}</span>
										<Link to={'/Account/info'} className='LinkContentAccount__item' onClick={() => {
											}}>Аккаунт</Link>
								</div>
								<TitleContentPage TitlePage="Активные заказы" TitlePageNav=''/>	 
								 <div className='PageActiveOrderUsers__content'>
											{ListUserOrder.map((data, i) => (
												data.PaymentStatus !== 1 && data.Cancel !== 1 ?						
												<ItemActiveOrder key={i} data={data} />
												:null
											))}
								 </div>
						</div>
)
}

export default ActiveOrder