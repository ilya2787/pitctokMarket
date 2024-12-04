import React, { FC, useEffect, useState } from 'react'
import { TypeListUsers } from '../../components/TypesData/TypesData'
import { Link } from 'react-router-dom'


interface TypeProps{
	data: TypeListUsers
	ListUser: TypeListUsers[]
}
const ItemListUser:FC<TypeProps> = ({data, ListUser}) => {

	//Выгрузка даты регистрации
	const [DateRegUser, setDateRegUser] = useState<string>()
	useEffect(() => {
		ListUser.map(d => {
			if(d.id === data.id){
				let DateFormat = new Date(d.DateRegist)
				const Year = DateFormat.getFullYear()
				const Month = DateFormat.getMonth()
				const Day = DateFormat.getDate()
				setDateRegUser(`${Day}.${Month + 1}.${Year} `)
			} 
		})
	},[ListUser])

 return (
						<div className='ContentAllUser__Content__item'>
							<div className='ContentAllUser__Content__item__Name'>
								<h3>{data.FirstName}</h3>
								<h3>{data.LastName}</h3>
							</div>
								<div className='ContentAllUser__Content__item__contact'>
										<p>{data.Phone}</p>
										<p>{data.Email}</p>
								</div>
								<div className='ContentAllUser__Content__item__DateAndOrder'>
									<span>
									<p>Дата регистрации:</p>
									<p>{DateRegUser}</p>
									</span>
									<Link to={`/Account/AllListUser/ListOrderUser/${data.id}`}><p className='ContentAllUser__Content__item__DateAndOrder__Link'>Заказы</p></Link>
								</div>
						</div>
)
}

export default ItemListUser