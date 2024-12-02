import React, { useContext, useEffect, useState } from 'react'
import TitleContentPage from '../../components/TitleContentPage/TitleContentPage'
import { Link } from 'react-router-dom'
import { ICON } from '../../components/ImportIcon/ImportIcon'
import { Status } from '../../components/StatusOrder/StatusOrder'
import { ContextAccount } from '../Account/Account'
import { NumberPriceF } from '../../components/PriceFormat/PriceFormat'

const OrdersUser = () => {
	const DataAccount = useContext(ContextAccount)
	const ListOrder = DataAccount.ListOrder 


	//Выгрузка даты регистрации
const [DateOrder, setDateOrder] = useState<string>('')
useEffect(() => {
	ListOrder.map(d => {
			let DateFormat = new Date(d.DateOrder)
			const Year = DateFormat.getFullYear()
			const Month = DateFormat.getMonth()
			const Day = DateFormat.getDate()
			setDateOrder(`${Day}.${Month + 1}.${Year} `)
	})
},[ListOrder])
 return (
						<div className='BlockOrderUserList'> 
							<div className='LinkContentAccount'> 
								 <Link to={'/'} className='LinkContentAccount__item'>Главная</Link>
										<span>{ICON.ArrowRight}</span>
										<Link to={'/Account/info'} className='LinkContentAccount__item' onClick={() => {
											}}>Аккаунт</Link>
							</div>
								 <TitleContentPage TitlePage="Заказы" TitlePageNav='' />	

								 <div className='BlockOrderUserList__Content'>
										{ListOrder.length > 0 ?
											ListOrder.map((d, i) => (
												<div key={i} className='BlockOrderUserList__Content__item'>
													<section className='BlockOrderUserList__Content__item__status'>
															<span>{Status.Manager}</span>
															<span
															style={d.Status === Status.Agreed ? {} : {backgroundColor: '#505050', color: '#ce5555'}}
															>
																{Status.Agreed}</span>
															<span 
															style={d.Status === Status.PaidFor ? {} : {backgroundColor: '#2c2c2c', color: '#ce5555'}}
															>{Status.PaidFor}</span>
													</section>
													<section className='BlockOrderUserList__Content__item__content'>
															<div className='BlockOrderUserList__Content__item__content__info'>
																<img src={`.././img/Product/${d.img}`} alt="" />
																<div className='BlockOrderUserList__Content__item__content__info__text'>
																		<h3>{d.title}</h3>
																		<span className='BlockOrderUserList__Content__item__content__info__text__article'><p>Артикул: </p><p>{d.article}</p></span>
																		<span className='BlockOrderUserList__Content__item__content__info__text__quantity'><p>Количество: </p><p>{d.quantity}</p></span>
																		{d.Delivery === 1 ?
																		<>
																		<span className='BlockOrderUserList__Content__item__content__info__text__Delivery'><p>Способ доставки: </p>	<p>Доставка</p></span>
																		<span className='BlockOrderUserList__Content__item__content__info__text__Address'><p>Адрес доставки:</p><p>{d.Address}</p></span>
																		<span className='BlockOrderUserList__Content__item__content__info__text__idPostal'><p>Почтовый индекс:</p><p>{d.idPostal}</p></span>
																		</>
																		:null}
																		{d.Pickup === 1 ?
																			<span className='BlockOrderUserList__Content__item__content__info__text__Delivery'><p>Способ доставки: </p>	<p>Самовывоз</p></span>
																		:null}
																		<span className='BlockOrderUserList__Content__item__content__info__text__Price'><p>Сумма: </p><p>{NumberPriceF(d.price * d.quantity)}</p></span>
																		
																		<span className='BlockOrderUserList__Content__item__content__info__text__totalAmount'><p>Итоговая сумма: </p>
																		{d.totalAmount ?
																			<p>{NumberPriceF(d.totalAmount)}</p>
																			: <p>На согласовании</p>
																		}
																		</span>
																</div>
															</div>
													</section>
													<span className='BlockOrderUserList__Content__item__DateOrder'><p>Дата заказа:</p><p>{DateOrder} года</p></span>
												</div>
											))			
										:
										<h3>У вас нет заказов</h3>
										}
								 </div>
						</div>
)
}

export default OrdersUser