import React, { FC, useContext, useEffect, useState } from 'react'
import './index.scss'
import { ReactNotifications, Store } from 'react-notifications-component'
import HeaderContentPage from '../../components/HeaderContentPage/HeaderContentPage'
import Menu from '../../components/Menu/Menu'
import { Context } from '../../App'
import TitleContentPage from '../../components/TitleContentPage/TitleContentPage'
import Footer from '../../components/Footer/Footer'
import InputMask from 'react-input-mask'
import { NumberPriceF } from '../../components/PriceFormat/PriceFormat'
import { Link, useParams } from 'react-router-dom'
import { TypeListUsers, TypeValueDataOrder } from '../../components/TypesData/TypesData'
import axios from 'axios'
import ModalWindow from '../../components/ModalWindow/ModalWindow'
import { Status } from '../../components/StatusOrder/StatusOrder'


const MakingAnOrder:FC = () => {
	const DataContentAll = useContext(Context)
	const ListMenu = DataContentAll.ListMenu
	const CatalogListNav = DataContentAll.CatalogListNav
	const ListSocial = DataContentAll.ListSocial
	const ListBasket = DataContentAll.ListBasket
	const setListBasket = DataContentAll.setListBasket

	const [OpenModal, setOpenModal] = useState<boolean>(false)

	const {idUser} = useParams<{idUser?: string}>();
	
	const [Pickup, setPickup] = useState<boolean>(false)
	const [Delivery, setDelivery] = useState<boolean>(false)
	const [Address, setAddress] = useState<string>('')
	const [idPostal, setIdPostal] = useState<string>('')

	const functionFullPrice = ListBasket.reduce((d, i) => d + i.quantity_item * i.price, 0);

	const [FirstUser, setFirstUser] = useState<string>('')
	const [PhoneUser, setPhoneUser] = useState<string>('')
	const [EmailUser, setEmailUser] = useState<string>('')

	const [ListUser, setListUser] = useState<TypeListUsers[]>([])


	useEffect(() => {
		const ListUserF = async () => {
			axios.get('/UsersAll')
			.then((res: any) => {
				setListUser(res.data)
			})
		}
		ListUserF()
	},[setListUser])

	useEffect(() => {
		ListUser.map(d => {
			if(d.id === Number(idUser)){
				setFirstUser(d.FirstName)
				setPhoneUser(d.Phone)
				setEmailUser(d.Email)
			}
		})
	},[idUser, ListUser])

	const [current, setCurrent] = useState(new Date())
	const SendOrder = () => {
		const FormDate = `${current.getFullYear()}.${current.getMonth()+1}.${current.getDate()}`;
		let DeliveryStatus = 0
		if(Delivery){
			DeliveryStatus = 1
		}else{
			DeliveryStatus = 0
		}
		let PickupStatus = 0
		if(Pickup){
			PickupStatus = 1
		}else{
			PickupStatus = 0
		}

			ListBasket.map(d => {
				const value:TypeValueDataOrder = {
					img: d.img,
					title: d.title,
					article: d.article,
					quantity: d.quantity_item,
					price: d.price,
					Delivery: DeliveryStatus,
					Pickup: PickupStatus,
					Address: Address,
					idPostal: idPostal,
					Status: Status.Manager,
					PaymentStatus: 0,
					idUser: Number(idUser),
					DateOrder: FormDate
				}
				axios.post('/AddOrder', value)
				.then(res => {
					Store.addNotification({
						title:'Выполнено',
						message: 'Заказ успешно отправлен, ожидается звонка менеджера',
						type: 'success',
						container: 'top-right',
						dismiss: {
							duration: 3000,
							onScreen: true
						}
					})
					setListBasket([])
				})
				.catch(err => console.log(err));
			})
	}

 return (
						<> 
						<ReactNotifications/>
						<HeaderContentPage />
						<Menu ListMenuPage={ListMenu} CatalogListNavPage={CatalogListNav}/>
						<TitleContentPage TitlePage="Оформление заказа" TitlePageNav='' marginTop={-150}/>	
						{ListBasket.length > 0 
						?
							<div className='ContentMakingAnOrder'>
								<div className='ContentMakingAnOrder__Block'>
									<section className='ContentMakingAnOrder__Block__shippingMethod'>
											<h3>Выберите способ доставки</h3>
											<div className='ContentMakingAnOrder__Block__shippingMethod__pickup'>
													<input type="radio" name="shippingMethod" id="Pickup" onClick={() => {
														setPickup(true)
														setDelivery(false)}}/>
													<label htmlFor="Pickup">Самовывоз</label>
											</div>
											<div className='ContentMakingAnOrder__Block__shippingMethod__Delivery'>
													<input type="radio" name="shippingMethod" id="Delivery" onClick={() => {
														setPickup(false)
														setDelivery(true)}}/>
													<label htmlFor="Delivery">Доставка</label>
											</div>
									</section>

									<section className='ContentMakingAnOrder__Block__inform'>
											{Delivery	?
												<div className='ContentMakingAnOrder__Block__inform__Delivery'>
													<div className='ContentMakingAnOrder__Block__inform__Delivery__address'>
															<input type="text" name="" id="Address" onChange={(event) => setAddress(event.target.value)}className='ContentMakingAnOrder__Block__inform__Delivery__address__inputAddress' placeholder=''/>
															<label htmlFor="Address">Адрес доставки</label>
													</div>
													<div className='ContentMakingAnOrder__Block__inform__Delivery__idPostal'>
															<InputMask className='ContentMakingAnOrder__Block__inform__Delivery__idPostal__inputIdPostal' mask={'999999'} maskChar={' '} name="idPostal" id="idPostal" placeholder=''
															onChange={(event) => setIdPostal(event.target.value)}
															/>
															<label htmlFor="idPostal">Почтовый индекс</label>
													</div>
												</div>
											:null}
										<p className='ContentMakingAnOrder__Block__inform__text'>
										После отправки заявки, с вами свяжется менеджер для согласования условии доставки, так же у него вы можете уточнить дополнительные данные по выбранной продукции или любой друг 
										</p>

									</section>

									<section className='ContentMakingAnOrder__Block__ListBasket'>
									{ListBasket.map((data, i) => (
										<div className='ContentMakingAnOrder__Block__ListBasket__content'>
											<img src={`http://localhost:3000/img/Product/${data.img}`} alt="" />
											<div className='ContentMakingAnOrder__Block__ListBasket__content__info'>
													<h3 className='ContentMakingAnOrder__Block__ListBasket__content__info__title'>{data.title}</h3>
												<span className='ContentMakingAnOrder__Block__ListBasket__content__info__article'><p>Артикул: </p><p>{data.article}</p></span>
												<span className='ContentMakingAnOrder__Block__ListBasket__content__info__price'><p>Цена: </p><p>{NumberPriceF(data.price)}</p></span>
												<div className='ContentMakingAnOrder__Block__ListBasket__content__info__quantity'>
															<p>Количество: </p>
															<p>{data.quantity_item}</p>
												</div>
												<span className='ContentMakingAnOrder__Block__ListBasket__content__info__summa'>
														<p>Сумма: </p><p>{NumberPriceF(data.price * data.quantity_item)}</p>
												</span>
										</div>
										</div>
										
									))}
									</section>

									<section className='ContentMakingAnOrder__Block__FullPriceAndBTN'>
										<span className='ContentMakingAnOrder__Block__FullPriceAndBTN__fullPrice'>
											<h3>Общая сумма:</h3>
											<p>{NumberPriceF(functionFullPrice)}</p>
										</span>
												<button 
												onClick={() => setOpenModal(true)}
												className='ContentMakingAnOrder__Block__FullPriceAndBTN__Send'>Отправить</button>
									</section>

								</div>
							</div>
						: <h2 className='NotData'>Нет данных для оформления</h2>
						}
								<Footer ListMenuPage={ListMenu} ListSocialPage={ListSocial}/>

								<ModalWindow
								title='Отправка заказа' modalIsOpen={OpenModal} onClose={() => setOpenModal(false)}>
									<div className='ContentMakingAnOrder__OrderModal'>
										{Delivery ?
											<h2>
											Обратите внимание!<br/> Сумма заказа указана без учета стоимости доставки, итоговая сумма будет известна только после согласования условии доставки с менеджером, который свяжется с вами после получения заказа 
											</h2>
											:
											<h2>
												После отправки с вами свяжется менеджер для уточнения и согласования заказа 
											</h2>
											}
										<p>Отправляем заказ ?</p>
										<div className='ContentMakingAnOrder__OrderModal__BTNOrderModal'>
											<Link to={'/Catalog/All'} 
											onClick={() => {
												setOpenModal(false)
												SendOrder()
												}}
											>
												<button type='button' >
													Да
												</button>
											</Link>
												<button type='button' onClick={() => setOpenModal(false)}> 
													Нет
												</button>
										</div>
									</div>
								</ModalWindow>
						</>
)
}

export default MakingAnOrder