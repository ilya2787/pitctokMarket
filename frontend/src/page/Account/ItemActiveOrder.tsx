import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { TypeValueDataOrder } from '../../components/TypesData/TypesData'
import { ContextAccount } from './Account'
import { LinkServer } from '../Link'
import { NumberPriceF } from '../../components/PriceFormat/PriceFormat'
import { FormNewDate } from '../../components/NewDate/NewDate'
import { formatDate } from '../../components/FormatDate/FormatDate'
import { Status } from '../../components/StatusOrder/StatusOrder'
interface TypeProps {
	data: TypeValueDataOrder
}

const ItemActiveOrder:FC<TypeProps> = ({data}) => {
	const DataAccount = useContext(ContextAccount)
	const ListUser = DataAccount.ListUser

	const [EmailUser, setEmailUser] = useState<string>('')
	const [PhoneUser, setPhoneUser] = useState<string>('')
	const [NameUser, setNameUser] = useState<string>('')

	useEffect(() => {
		ListUser.map(d => {
			if(d.id === data.idUser){
				setEmailUser(d.Email)
				setPhoneUser(d.Phone)
				setNameUser(`${d.LastName} ${d.FirstName}`)
			}
		})
	},[ListUser])
	
	const [ActiveAgreed, setActiveAgreed] = useState<boolean>(false)
	const SpanAgreed = useRef<HTMLHtmlElement>(null)
	const [ActivePaidFor, setActivePaidFor] = useState<boolean>(false)
	const SpanPaidFor = useRef<HTMLHtmlElement>(null)

useEffect(() => {
	if(ActiveAgreed){
		SpanAgreed.current?.classList.add('Active')
	}else{
		SpanAgreed.current?.classList.remove('Active')
	}
},[ActiveAgreed])

useEffect(() => {
	if(ActivePaidFor){
		SpanPaidFor.current?.classList.add('Active')
	}else{
		SpanPaidFor.current?.classList.remove('Active')
	}
},[ActivePaidFor])


 return (
					<div className='PageActiveOrderUsers__content__item'>
						<div className='PageActiveOrderUsers__content__item__BlockInform'>
							<div className='PageActiveOrderUsers__content__item__BlockInform__informUser'>
									<h3>{NameUser}</h3>
									<p>{EmailUser}</p>
									<p>{PhoneUser}</p>
							</div>
							<div className='PageActiveOrderUsers__content__item__BlockInform__informProduct'>
										<img src={`${LinkServer.Server}/Product/${data.img}`} alt="" />
										<div className='PageActiveOrderUsers__content__item__BlockInform__informProduct__text'>
													<h3>{data.title}</h3>
													<span className='PageActiveOrderUsers__content__item__BlockInform__informProduct__text__article'>
														<p>Артикул:</p>
														<p>{data.article}</p>
													</span>
													<span className='PageActiveOrderUsers__content__item__BlockInform__informProduct__text__quantity'>
														<p>Количество:</p>
														<p>{data.quantity}</p>
													</span>
													<span className='PageActiveOrderUsers__content__item__BlockInform__informProduct__text__delivery'>
															<p>Способ доставки:</p>
															{data.Delivery !== 1 ?
															<p>Самовывоз</p>
															:
															<p>Доставка</p>
														}
													</span>
													{data.Delivery === 1 ?
													<>
														<span className='PageActiveOrderUsers__content__item__BlockInform__informProduct__text__Address'>
																<p>Адрес доставки:</p>
																<p>{data.Address}</p>
														</span>
														<span className='PageActiveOrderUsers__content__item__BlockInform__informProduct__text__idPostal'>
																<p>Почтовый индекс:</p>
																<p>{data.idPostal}</p>
														</span>
													</>
													:null}
													<span className='PageActiveOrderUsers__content__item__BlockInform__informProduct__text__Amount'>
															<p>Сумма:</p>
															<p>{NumberPriceF(data.quantity * data.price)}</p>
													</span>
										</div>
							</div>
							<div className='PageActiveOrderUsers__content__item__BlockInform__AmountFull'>
										<p>Итоговая сумма к оплате:</p>
										<div className='PageActiveOrderUsers__content__item__BlockInform__AmountFull__input'>
											<input type="number" name="" id="" />
											<p>RUB</p>
										</div>
							</div>
						</div>
						<div className='PageActiveOrderUsers__content__item__BlockBtnAndStatus'>
								<div className='PageActiveOrderUsers__content__item__BlockBtnAndStatus__Status'> 
									<span className='PageActiveOrderUsers__content__item__BlockBtnAndStatus__Status__Date'>
											<p>Дата заказа:</p>
											<p>{formatDate(data.DateOrder)}</p>
									</span>
									<div className='PageActiveOrderUsers__content__item__BlockBtnAndStatus__Status__BlockStatus'>
														<span 
														ref={SpanAgreed}
														className='PageActiveOrderUsers__content__item__BlockBtnAndStatus__Status__BlockStatus__Agreed'>
															<p>{Status.Agreed}</p>
														</span>
														<span 
														ref={SpanPaidFor}
														className='PageActiveOrderUsers__content__item__BlockBtnAndStatus__Status__BlockStatus__PaidFor'>
															<p>{Status.PaidFor}</p>
														</span>
									</div>

								</div>

								<div className='PageActiveOrderUsers__content__item__BlockBtnAndStatus__Btn'>
													{!ActiveAgreed?
														<button 
														className='PageActiveOrderUsers__content__item__BlockBtnAndStatus__Btn__Agreed'
														onClick={()=>{
															setActiveAgreed(true)
														}}>Согласовано</button>
													:
														<button 
														className='PageActiveOrderUsers__content__item__BlockBtnAndStatus__Btn__PaidFor'
														onClick={()=>{
															setActivePaidFor(true)
														}}>Оплачено</button>
													}
														<button
														className='PageActiveOrderUsers__content__item__BlockBtnAndStatus__Btn__Cancel'
														onClick={()=>{
															setActiveAgreed(false)
															setActivePaidFor(false)
														}}>Отмена</button>
								</div>
						</div>
					</div>
)
}

export default ItemActiveOrder