import React, { useContext, useEffect, useState } from 'react'
import { ContextAccount } from '../../page/Account/Account'
import { Context } from '../../App'
import { Link } from 'react-router-dom'

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



 return (
						<div className='ContentBlockAccount__Admin'> 
								 <section className='ContentBlockAccount__Admin__left'>
											<h3>{LastName}</h3>
											<Link to={''} className='ContentBlockAccount__Admin__left__charter'>
											Редактировать раздел информации 
											</Link>
											<Link to={'/Account/EditCatalog'}
											className='ContentBlockAccount__Admin__left__charter'>
											Редактировать каталог
											</Link>
											<Link to={''}
											className='ContentBlockAccount__Admin__left__charter'>
											Редактировать контактные данные
											</Link>
								 </section>
								 <section className='ContentBlockAccount__Admin__right'>
											<span>
												<p>Количество пользователей</p>
												<p>{QuantityUsersAll}</p>
											</span>
											<Link to={''}
											className='ContentBlockAccount__Admin__right__charterUser'>
												Показать всех
											</Link>
								 </section> 
						</div>
)
}

export default BlockInfoAccountAdmin