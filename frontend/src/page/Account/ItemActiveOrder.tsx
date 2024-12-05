import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { TypeValueDataOrder } from '../../components/TypesData/TypesData'
import { ContextAccount } from './Account'
import { LinkServer } from '../Link'
import { NumberPriceF } from '../../components/PriceFormat/PriceFormat'
import { formatDate } from '../../components/FormatDate/FormatDate'
import { Status } from '../../components/StatusOrder/StatusOrder'
import { Store } from 'react-notifications-component'
interface TypeProps {
	data: TypeValueDataOrder
	setListUserOrder: Dispatch<SetStateAction<TypeValueDataOrder[]>>
}

const ItemActiveOrder:FC<TypeProps> = ({data, setListUserOrder}) => {
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
	
	const SpanAgreed = useRef<HTMLHtmlElement>(null)
	const [ActivePaidFor, setActivePaidFor] = useState<boolean>(false)
	const SpanPaidFor = useRef<HTMLHtmlElement>(null)

useEffect(() => {
	if(data.Status === Status.Agreed){
		SpanAgreed.current?.classList.add('Active')
	}else{
		SpanAgreed.current?.classList.remove('Active')
	}
},[data.Status])

useEffect(() => {
	if(ActivePaidFor){
		SpanPaidFor.current?.classList.add('Active')
	}else{
		SpanPaidFor.current?.classList.remove('Active')
	}
},[ActivePaidFor])

const [ValueTotalAmount, setValueTotalAmount] = useState<number>(0)

const UpdateStatusOrder = (idOrder: number) => {
	if(ValueTotalAmount !== 0){
		const value = {Status: Status.Agreed, totalAmount: ValueTotalAmount, id: idOrder}
		axios.post<any>('/UpdateStatusOrder', value)
		.then(res => {
			if(res.data.Status === 'TRUE'){
				setValueTotalAmount(0)
				Store.addNotification({
					title: 'Выполнено',
					message: `Статус заказа обновлен на "${Status.Agreed}"` ,
					type: 'success',
					container: 'top-right',
					dismiss: {
						duration: 2000,
						onScreen: true
					}
				})	
				axios.get<TypeValueDataOrder[]>('/SelectOrderAll')
				.then(res => {
						setListUserOrder(res.data)
				})
				.catch(err => console.log(err));
					}
		})		
	}else{
		Store.addNotification({
			title: 'Ошибка',
			message: `Вы не заполнили итоговую сумму` ,
			type: 'danger',
			container: 'top-right',
			dismiss: {
				duration: 2000,
				onScreen: true
			}
		})
	}
}

const UpdatePayStatus = (idOrder:number) => {
	const value = {Status: Status.PaidFor, PaymentStatus: 1, id: idOrder}
	axios.post<any>('/UpdatePaymentStatusOrder', value)
	.then(res => {
		if(res.data.Status === 'TRUE'){
			setActivePaidFor(true)
			Store.addNotification({
				title: 'Выполнено',
				message: `Заказ переведен в статус "Оплачен"` ,
				type: 'success',
				container: 'top-right',
				dismiss: {
					duration: 2000,
					onScreen: true
				},
				onRemoval:() => {
					axios.get<TypeValueDataOrder[]>('/SelectOrderAll')
					.then(res => {
							setListUserOrder(res.data)
					})
					.catch(err => console.log(err));
				}
			})	
		}
	})
}

const CancelOrder = (idOrder:number) => {
	const value = {Cancel: 1 ,id:idOrder}
	console.log(value)
	axios.post<any>('/CancelOrder', value)
	.then(res => {
			if(res.data.Status === 'TRUE'){
				Store.addNotification({
					title: 'Выполнено',
					message: `Заказ успешно отменен` ,
					type: 'success',
					container: 'top-right',
					dismiss: {
						duration: 2000,
						onScreen: true
					}
				})
				axios.get<TypeValueDataOrder[]>('/SelectOrderAll')
				.then(res => {
						setListUserOrder(res.data)
				})
				.catch(err => console.log(err));	
			}
	})
	
}

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
											{data.Status !== Status.Agreed ?
											<>
												<input type="number" name="" id="" onChange={(event) => setValueTotalAmount(Number(event.target.value))} />
												<p>RUB</p>			
											</>
										:
												<span>
													<p>{data.totalAmount} RUB</p>
												</span>
										}										
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
													{data.Status !== Status.Agreed ?
														<button 
														className='PageActiveOrderUsers__content__item__BlockBtnAndStatus__Btn__Agreed'
														onClick={()=>{
															UpdateStatusOrder(Number(data.id))
														}}>Согласовано</button>
													:
														<button 
														className='PageActiveOrderUsers__content__item__BlockBtnAndStatus__Btn__PaidFor'
														onClick={()=>{
															UpdatePayStatus(Number(data.id))
														}}>Оплачено</button>
													}
														<button
														className='PageActiveOrderUsers__content__item__BlockBtnAndStatus__Btn__Cancel'
														onClick={()=>{
															if(window.confirm(`Вы действительно хотите отменить заказ "${data.title}"`)){
																CancelOrder(Number(data.id))
															}											
														}}>Отменить</button>
								</div>
						</div>
					</div>
)
}

export default ItemActiveOrder