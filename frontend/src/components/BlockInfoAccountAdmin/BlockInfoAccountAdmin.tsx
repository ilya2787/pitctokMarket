import React, { useContext, useEffect, useState } from 'react'
import { ContextAccount } from '../../page/Account/Account'
import { Context } from '../../App'
import { Link } from 'react-router-dom'
import { TypeValueDataOrder } from '../TypesData/TypesData'
import axios from 'axios'

const BlockInfoAccountAdmin = () => {
const DataAccount = useContext(ContextAccount)
const ListUser = DataAccount.ListUser
const DataApp = useContext(Context)
const idUser = DataApp.idUsers

const [LastName, setLastName] = useState<string>('')

const [QuantityUsersAll, setQuantityUsersAll] = useState<number>(0)
//Выгрузка  имени и количества пользователей
useEffect(() => {
	setQuantityUsersAll(ListUser.length - 1)
	ListUser.map(d => {
		if(d.id === idUser){
			setLastName(d.LastName)
		} 
	})
},[ListUser])

const [ListUserOrder, setListUserOrder] = useState<TypeValueDataOrder[]>([])
	useEffect(() => {
		axios.get<TypeValueDataOrder[]>('/SelectOrderAll')
		.then(res => {
				setListUserOrder(res.data)
		})
		.catch(err => console.log(err));
	},[setListUserOrder])

	const [QuantityOrder, setQuantityOrder] = useState<number>(0)
	useEffect(() => {
		let quantity = 0
		ListUserOrder.map(d => {
			if(d.PaymentStatus === 0 && d.Cancel !== 1){
				quantity = quantity + 1
			}
		})
		setQuantityOrder(quantity)
	},[ListUserOrder])

 return (
						<div className='ContentBlockAccount__Admin'> 
								 <section className='ContentBlockAccount__Admin__left'>
											<h3>{LastName}</h3>
											<Link to={'/Account/EditNews'} className='ContentBlockAccount__Admin__left__charter'>
											Редактировать раздел информации 
											</Link>
											<Link to={'/Account/EditCatalog'}
											className='ContentBlockAccount__Admin__left__charter'>
											Редактировать каталог
											</Link>
								 </section>
								 <section className='ContentBlockAccount__Admin__right'>
											<span>
												<p>Количество пользователей</p>
												<p>{QuantityUsersAll}</p>
											</span>
											<Link to={'/Account/AllListUser'}
											className='ContentBlockAccount__Admin__right__charterUser'>
												Показать всех
											</Link>
								 </section> 
								 <div className='ContentBlockAccount__Admin__BtnActiveOrder'>
									<Link className='ContentBlockAccount__Admin__BtnActiveOrder__Btn' to={'/Account/ActiveOrder'}>
										Активные заказы
									</Link>
									<span>{QuantityOrder}</span>
								 </div>
						</div>
)
}

export default BlockInfoAccountAdmin