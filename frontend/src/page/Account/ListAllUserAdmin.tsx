import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ICON } from '../../components/ImportIcon/ImportIcon'
import TitleContentPage from '../../components/TitleContentPage/TitleContentPage'
import { Context } from '../../App'
import axios from 'axios'
import { FormNewDate } from '../../components/NewDate/NewDate'
import ItemListUser from './ItemListUser'

const ListAllUserAdmin = () => {
const DataAdd = useContext(Context)
const ListUser = DataAdd.ListUsers
const setListUsers = DataAdd.setListUsers

useEffect(() => {
	const ListUserF = async () => {
		axios.get('/UsersAll')
		.then((res: any) => {
			setListUsers(res.data)
		})
	}
	ListUserF()
},[setListUsers])

 return (
						<div className='ContentAllUser'> 
								 <div className='LinkContentAccount'> 
								 <Link to={'/'} className='LinkContentAccount__item'>Главная</Link>
										<span>{ICON.ArrowRight}</span>
										<Link to={'/Account/info'} className='LinkContentAccount__item' onClick={() => {
											}}>Аккаунт</Link>
								</div>
								 <TitleContentPage TitlePage="Пользователи" TitlePageNav=''/>	
								 <div className='ContentAllUser__Content'>
									{ListUser.map((data, i) => (
										data.LastName !== 'Администратор' ?
											<ItemListUser key={i} data={data} ListUser={ListUser}/>
											:null
									))}
								 </div>
						</div>
)
}

export default ListAllUserAdmin