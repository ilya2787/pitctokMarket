import React, { FC, useContext, useEffect, useState } from 'react'
import {TypeValueDataOrder } from '../../components/TypesData/TypesData'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { ICON } from '../../components/ImportIcon/ImportIcon';
import TitleContentPage from '../../components/TitleContentPage/TitleContentPage';
import { Context } from '../../App';
import { LinkServer } from '../Link';
import { NumberPriceF } from '../../components/PriceFormat/PriceFormat';


const ListOrderUserAll = () => {
	const DataAdd = useContext(Context)
	const ListUser = DataAdd.ListUsers

const {idU} = useParams<{idU?: string}>();
const [ListUserOrder, setListUserOrder] = useState<TypeValueDataOrder[]>([])
	useEffect(() => {
		axios.get<TypeValueDataOrder[]>('/SelectOrderAll')
		.then(res => {
				setListUserOrder(res.data)
		})
		.catch(err => console.log(err));
	},[setListUserOrder])
	
	const [NameUser, setNameUser] = useState<string>('')
	const [DateRegUser, setDateRegUser] = useState<string>()
	useEffect(() => {
		ListUser.map(d => {
			if(d.id === Number(idU)){
				setNameUser(`${d.LastName} ${d.FirstName}`)
				let DateFormat = new Date(d.DateRegist)
				const Year = DateFormat.getFullYear()
				const Month = DateFormat.getMonth()
				const Day = DateFormat.getDate()
				setDateRegUser(`${Day}.${Month + 1}.${Year} `)
			}
		})
	},[idU])

 return (
						<div className='ContentOrderUser'>
							<div className='LinkContentAccount'> 
								 <Link to={'/'} className='LinkContentAccount__item'>Главная</Link>
										<span>{ICON.ArrowRight}</span>
										<Link to={'/Account/info'} className='LinkContentAccount__item' onClick={() => {
											}}>Аккаунт</Link>
											<span>{ICON.ArrowRight}</span>
										<Link to={'/Account/AllListUser'} className='LinkContentAccount__item' onClick={() => {
											}}>Пользователи</Link>
								</div>
								<TitleContentPage TitlePage={`Заказы  "${NameUser}"`} TitlePageNav=''/>	
								 <div className='ContentOrderUser__Content'>
										{ListUserOrder.map((dO, i) => (
											dO.idUser === Number(idU) ?
													<div className='ContentOrderUser__Content__item'>
																<img src={`${LinkServer.Server}/Product/${dO.img}`} alt="" />
																<div className='ContentOrderUser__Content__item__TitleAndArticle'>
																		<h3>{dO.title}</h3>
																		<span>
																			<p>Артикул:</p>
																			<p>{dO.article}</p>
																		</span>
																</div>
																<div className='ContentOrderUser__Content__item__PriceAndQuantity'>
																		<span className='ContentOrderUser__Content__item__PriceAndQuantity__quantity'>
																				<p>Количество:</p>
																				<p>{dO.quantity}</p>
																		</span>
																		<span className='ContentOrderUser__Content__item__PriceAndQuantity__price'>
																				<p>Цена:</p>
																				<p>{NumberPriceF(dO.price)}</p>
																		</span>
																</div>
																<div className='ContentOrderUser__Content__item__Delivery'>
																	{dO.Delivery === 1 ?
																	<span className='ContentOrderUser__Content__item__Delivery__deliveryItem'>
																		<p className='ContentOrderUser__Content__item__Delivery__deliveryItem__titleDelivery'>Доставка</p>
																		<span>
																		<p>Адрес:</p>
																		<p>{dO.Address}</p>
																		</span>	
																		<span>
																		<p>Почтовый индекс:</p>
																		<p>{dO.idPostal}</p>
																		</span>	
																	</span>
																:
																	<p className='ContentOrderUser__Content__item__Delivery__deliveryItem__titleDelivery'>Самовывоз</p>
																}
																</div>
																<div className='ContentOrderUser__Content__item__Date'>
																	<span>
																		<p>Дата заказа:</p>
																		<p>{DateRegUser}</p>
																	</span>
																</div>

													</div>
											:null
										))} 


								 </div>	 
						</div>
)
}

export default ListOrderUserAll