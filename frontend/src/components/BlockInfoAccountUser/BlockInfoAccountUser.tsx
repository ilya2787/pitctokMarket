import React, { ChangeEventHandler, FC, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import ModalWindow from '../ModalWindow/ModalWindow'
import { Store } from 'react-notifications-component'
import { TypeListUserFavorites } from '../TypesData/TypesData'
import {Link ,useNavigate } from 'react-router-dom'
import { Context } from '../../App'
import { ContextAccount } from '../../page/Account/Account'
import InputMask from 'react-input-mask'
import { ICON } from '../../components/ImportIcon/ImportIcon'


const BlockInfoAccountUser:FC = () => {
	const DataApp = useContext(Context)
	const idUser = DataApp.idUsers
	const setIdUser = DataApp.setIdUser
	const setAuth = DataApp.setAuth
	const DataAccount = useContext(ContextAccount)
	const ListUser = DataAccount.ListUser
	const setListUser = DataAccount.setListUser
	const ListOrder = DataAccount.ListOrder
		//Выгрузка избранных 
	const [ListUserFavorites, setListUserFavorites] = useState<TypeListUserFavorites[]>([])
	useEffect(() => {
		axios.post<TypeListUserFavorites[]>('/ListFavoritesProduct', {idUser: idUser})
		.then((res) => {
			setListUserFavorites(res.data)
		})
		.catch(err => console.log(err))
	},[setListUserFavorites, idUser])

	const navigation = useNavigate()
	const [LastName, setLastName] = useState<string>('')
	const [FirstName, setFirstName] = useState<string>('')
	
	//Выгрузка даты регистрации
	const [DateRegUser, setDateRegUser] = useState<string>()
	useEffect(() => {
		ListUser.map(d => {
			if(d.id === idUser){
				let DateFormat = new Date(d.DateRegist)
				const Year = DateFormat.getFullYear()
				const Month = DateFormat.getMonth()
				const Day = DateFormat.getDate()
				setDateRegUser(`${Day}.${Month + 1}.${Year} `)
				setLastName(d.LastName)
				setFirstName(d.FirstName)
				setPhone(d.Phone)
				setEmail(d.Email)
			} 
		})
	},[ListUser])
	const UpdateListUser = () => {
		axios.get('/UsersAll')
			.then((res: any) => {
				setListUser(res.data)
			})
			.catch(err => console.log(err))
	}
	//Обработка телефона
	const [Phone, setPhone] = useState<string>('')
	const [PhoneUpdate, setPhoneUpdate] = useState<string>('')
	const [ActiveUpdatePhone, setActiveUpdatePhone] = useState<boolean>(false)
	const ValuePhone:ChangeEventHandler<HTMLInputElement> = (event) => {
		setPhoneUpdate(event.target.value)
		}
	const UpdatePhoneBD = () =>{
			if(PhoneUpdate !== '' && Phone !== PhoneUpdate){
				const value = {Phone: PhoneUpdate, id: idUser}
				axios.post<any>('/UsersUpdatePhone', value)
				.then(res => {
					if(res.data.STATUS === 'TRUE'){
						UpdateListUser()
						Store.addNotification({
							title: 'Обновление',
							message: 'Телефон успешно обновлен',
							type: 'success',
							container: 'top-right',
							dismiss: {
								duration: 2000,
								onScreen: true
							}
						})
					}
				})
				.catch(err => console.log(err));
			}
	}
	//Обработка Email
	const [Email, setEmail] = useState<string>('')
	const [UpdateEmail, setUpdateEmail] = useState<string>('')
	const [ActiveUpdateEmail, setActiveUpdateEmail] = useState<boolean>(false)
	const ValueEmail:ChangeEventHandler<HTMLInputElement> = (event) => {
		setUpdateEmail(event.target.value)
	}
	const UpdateEmailBD = () =>{
		if(UpdateEmail !== '' && Email !== UpdateEmail){
			const value = {Email: UpdateEmail, id: idUser}
			axios.post<any>('/UsersUpdateEmail', value)
			.then(res => {
				if(res.data.STATUS === 'TRUE'){
					UpdateListUser()
					Store.addNotification({
						title: 'Обновление',
						message: 'Email успешно обновлен',
						type: 'success',
						container: 'top-right',
						dismiss: {
							duration: 2000,
							onScreen: true
						}
					})
				}
			})
			.catch(err => console.log(err));
		}
	}
	
	const [QuantityOrder, setQuantityOrder] = useState<number>(0)
	useEffect(() => {
		setQuantityOrder(ListOrder.length)
	},[ListOrder])
	
	const InsertDelete = (id:number) => {
		axios.post('/ListDeleteFavoritesProd', {idProd: id, idUser: idUser})
			.then((res: any) => {
				if(res.data.STATUS === 'TRUE'){
					axios.post<TypeListUserFavorites[]>('/ListFavoritesProduct', {idUser: idUser})
					.then((res) => {
						setListUserFavorites(res.data)
					})
					.catch(err => console.log(err))
				}
			})
			.catch(err => console.log(err))
	}
	
	const [OpenModalPassword, setOpenModalPassword] = useState<boolean>(false)
	const [ValueOldPassword, setValueOldPassword] = useState<string>('')
	const [ValuePassword, setValuePassword] = useState<string>('')
	const [ValuePasswordReplay, setValuePasswordReplay] = useState<string>('')
	const [ValidPassword, setValidPassword] = useState<boolean>(false)
	const [ValidPasswordReplay, setValidPasswordReplay] = useState<boolean>(false)
	const [PwdFocus, setPwdFocus] = useState<boolean>(false)
	useEffect(() => {
		const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{7,20}$/;
		const result = PASS_REGEX.test(ValuePassword);
		setValidPassword(result);
		const match = ValuePassword === ValuePasswordReplay;
		setValidPasswordReplay(match);
	},[ValuePassword, ValuePasswordReplay]);
	
	const InputDataPassword = () => {
		if(ValueOldPassword !== ''){
			const value = {id: idUser, Password: ValueOldPassword}
			axios.post<any>('/ValidPass', value)
			.then(res => {
				if(res.data.Status === "Success"){
					if(ValuePasswordReplay !== ''){
						if(ValidPassword === ValidPasswordReplay){
							const value = {Password: ValuePasswordReplay, id:idUser}
							axios.post<any>('/UpdatePass', value)
							.then(res => {
								if(res.data.Status === 'Success'){
									Store.addNotification({
										title:'Выполнено',
										message: 'Пароль обновлен',
										type: 'success',
										container: 'top-right',
										dismiss:{
											duration: 1000,
											onScreen: true
										},
										onRemoval: () => {
											setOpenModalPassword(false)
										}
									})
								}
							})
							.catch(err => console.log(err));
						}else{
							Store.addNotification({
								title:'Ошибка',
								message: 'Пароль не совпадает',
								type: 'danger',
								container: 'top-right',
								insert: 'top',
								dismiss:{
									duration: 2000,
									onScreen: true
								}
							})
						}
					}else{
						Store.addNotification({
							title:'Ошибка',
							message: 'Вы не ввели новый пароль',
							type: 'danger',
							container: 'top-right',
							insert: 'top',
							dismiss:{
								duration: 2000,
								onScreen: true
							}
						})
					}
				}else{
					Store.addNotification({
						title:'Ошибка',
						message: 'Старый пароль не верный',
						type: 'danger',
						container: 'top-right',
						insert: 'top',
						dismiss:{
							duration: 2000,
							onScreen: true
						}
					})
				}		
			})
			.catch(err => console.log(err));
		}
	}
	
	const DeleteAccount = (id:number) => {
		const value = {id:idUser}
		axios.post<any>('/DeleteUser', value)
		.then(res => {
			if(res.data.STATUS === 'TRUE'){
				Store.addNotification({
					title:'Выполнено',
					message: 'Пользователь успешно удален',
					type: 'success',
					container: 'top-right',
					dismiss:{
						duration: 1000,
						onScreen: true
					},
					onRemoval: () => {
						axios.get(`/logout`)
						.then(res => {
							setAuth(false)
							setIdUser(0)
							setLastName('')
							setFirstName('')
							setPhone('')
							setEmail('')
							navigation('/')
						})
						.catch(err => console.log(err));
					}
				})
			}
		})
	}
 return (
					<div className='ContentBlockAccount_NotAdmin'>
					<section className='ContentBlockAccount_NotAdmin_top'>
							<div className='ContentBlockAccount_NotAdmin_top__User'>
							<h2>{LastName} {FirstName}</h2>
							<div className='ContentBlockAccount_NotAdmin_top__User_Phone'>
								{!ActiveUpdatePhone?
								<>
									<p>{ICON.Phone}</p>
									<p>{Phone}</p>
									<button onClick={() => setActiveUpdatePhone(true)}>{ICON.Pencil}</button>
								</>
							:
								<>
									<p>{ICON.Phone}</p>
									<InputMask className='ContentBlockAccount_NotAdmin_top__User_Phone__UpdatePhone' mask={'+7(999)999-99-99'} maskChar={' '} onChange={(event) => ValuePhone(event)} defaultValue={Phone} name="Phone" id="UpdatePhone"
									onKeyDown={(e) => {
										if(e.key === "Enter"){
											if(PhoneUpdate !== ''){
												UpdatePhoneBD()
												setActiveUpdatePhone(false)		
											}
										}
									}}
									/>
									<button onClick={() => {
										UpdatePhoneBD()
										setActiveUpdatePhone(false)}}>{ICON.Save}</button>
								</>
							}
									
							</div>
							<div className='ContentBlockAccount_NotAdmin_top__User_Email'>
								{!ActiveUpdateEmail ?
								<>
									<p>{ICON.Email}</p>
									<p>{Email}</p>
									<button onClick={() => {
										setActiveUpdateEmail(true)}}>{ICON.Pencil}</button>
								</>
								:
								<>
									<p>{ICON.Email}</p>
									<input type="text" onChange={(event) => ValueEmail(event)} defaultValue={Email}
									onKeyDown={(e) => {
										if(e.key === "Enter"){
											if(PhoneUpdate !== ''){
												UpdateEmailBD()
												setActiveUpdateEmail(false)		
											}
										}
									}}
									/>
									<button onClick={() => {
										UpdateEmailBD()
										setActiveUpdateEmail(false)}}>{ICON.Save}</button>
								</>
								}
							</div>
							<div className='ContentBlockAccount_NotAdmin_top__User_Order'>
									<p>{ICON.BasketProduct}</p>
									<Link to={'/Account/Order'} className='ContentBlockAccount_NotAdmin_top__User_Order__Link'>Заказы</Link>
							</div>
							</div>
							<div className='ContentBlockAccount_NotAdmin_top__DateAndQuantityOrder'>
									<span className='ContentBlockAccount_NotAdmin_top__DateAndQuantityOrder__RegDate'>
										<p>Дата регистрации:</p>
										<p>{DateRegUser}</p>
									</span>
									<span className='ContentBlockAccount_NotAdmin_top__DateAndQuantityOrder__QuantityOrder'>
											<p>Всего покупок:</p>
											<p>{QuantityOrder}</p>
									</span>
									<span></span>
							</div>
					</section>
					<section className='ContentBlockAccount_NotAdmin_center'>
								<div className='ContentBlockAccount_NotAdmin_center__Title'>
									<span></span>
									<h3>Избранные</h3>
									<span></span>
								</div>
									<div className='ContentBlockAccount_NotAdmin_center__Product'>
											{ListUserFavorites.length > 0 ?
											ListUserFavorites.map(data => (
												<div 
												key={data.id}
												className='ContentBlockAccount_NotAdmin_center__Product__item'>
												<button onClick={() => {
													InsertDelete(data.idProd)
												}} className='ContentBlockAccount_NotAdmin_center__Product__item__Heard' style={{color: 'red'}}>{ICON.Heart}</button>
														<Link to={`/Catalog/All/${data.idProd}`}>
														<img src={`.././img/Product/${data.img}`} alt="" />
														</Link> 
												</div>
												
											))
											:
											<h3 className='ContentBlockAccount_NotAdmin_center__Product__NoFavorites'>Список избранных пуст</h3>
											}
									</div>
					</section>
					<section className='ContentBlockAccount_NotAdmin_button'>
								<button 
								className='ContentBlockAccount_NotAdmin_button__BTNPassword'
								onClick={() => setOpenModalPassword(true)}
								>Сменить пароль</button>
								<button
								onClick={() => {
									if(window.confirm(`Вы действительно хотите удалить аккаунт`)){
										DeleteAccount(idUser)	
									}
								}}
								className='ContentBlockAccount_NotAdmin_button__BTNDeleteAccount'
								>{ICON.DeleteIcons}</button>
					</section>							
					<ModalWindow 	title='Смена пароля' modalIsOpen={OpenModalPassword} onClose={() => setOpenModalPassword(false)}>
										<div className='PasswordUpdate'>
											<section className='PasswordUpdate__left'>
												<div className='PasswordUpdate__left__old'>
														<input type="password" name="" id="PasswordOld" placeholder=''  
														onChange={(event) => setValueOldPassword(event.target.value)}
														className='PasswordUpdate__left__old__Input'/>
														<label htmlFor="PasswordOld" className='PasswordUpdate__left__old__Label'>Старый пароль</label>
												</div>
												<span></span>
												<div className='PasswordUpdate__left__New'>
														<input type="password" name="" id="PasswordNew" placeholder='' className='PasswordUpdate__left__New__Input'
														onChange={(e) => {
															setValuePassword(e.target.value)
														}}
														aria-invalid={ValidPassword ? "false" : "true"}
														aria-describedby='pwdnote'
														onFocus={() => setPwdFocus(true)}
														onBlur={() => setPwdFocus(false)}
														/>
														<label htmlFor="PasswordNew" className='PasswordUpdate__left__New__Label'>Новый пароль</label>
														<p id="pwdnote" className={PwdFocus && !ValidPassword ? 'instruction_pwd' : 'offscreen'}>от 7 до 20 символов, минимум одна буква заглавная и строчная, обязательно использовать спец знак и минимум одну цифру, на латинском языке</p>
												</div>
												<span className={ValidPassword && ValidPasswordReplay ? "ValidPass" : "NotValidPass"}></span>
												<div className='PasswordUpdate__left__NewReplay'>
														<input type="password" name="" id="PasswordNewReplay" placeholder='' className='PasswordUpdate__left__NewReplay__Input'
														onChange={(event) => {
															setValuePasswordReplay(event.target.value)
														}
													}
														/>
														<label htmlFor="PasswordNewReplay" className='PasswordUpdate__left__NewReplay__Label'>Подтвердить</label>
												</div>
											</section>
											<button type='button' 
											onClick={() => InputDataPassword()}
											className='PasswordUpdate__BTN_Enter'>{ICON.Save}</button>
										</div>

							</ModalWindow>
				</div>
)
}

export default BlockInfoAccountUser