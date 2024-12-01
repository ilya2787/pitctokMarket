import React, { FC, useRef, useState, useEffect, ChangeEventHandler, useContext } from 'react'
import './index.scss'
import {ICON} from '../ImportIcon/ImportIcon'
import InputMask from 'react-input-mask'
import axios from 'axios';
import { Context } from '../../App';
import { useNavigate } from 'react-router-dom';
import { Store } from 'react-notifications-component';

interface TypeFormA{
	setEnterUser: React.Dispatch<React.SetStateAction<boolean>>
}

interface TypeValueLogin{
	Phone: string,
	Password: string
}

const FormAuthorization:FC<TypeFormA> = ({setEnterUser}) => {
	const DataApp = useContext(Context)
	const setAuth = DataApp.setAuth
	const setLastName = DataApp.setLastName
	const setIdUser = DataApp.setIdUser
	

	const [ValueLogin, setValueLogin] = useState<TypeValueLogin>({
		Phone:'',
		Password: ''
	})
	const InputDataForm:ChangeEventHandler<HTMLInputElement> = (event) => {
		setValueLogin({...ValueLogin, [event?.target.name] : event?.target.value})
	}
	const [PasswordEye, setPasswordEye] = useState<boolean>(false)
	const EyeActive = () => {
		setPasswordEye(!PasswordEye)
	}
	useEffect(() => {
		document.getElementById('PasswordA')?.setAttribute('type', PasswordEye ? 'text' : 'Password')
	},[PasswordEye])


axios.defaults.withCredentials = true;
const handelFormAuthorization = async (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
		event.preventDefault();
		axios.post(`/login`, ValueLogin)
			.then((res: any) => {
				if(res.data.Status === "Success"){
					setEnterUser(false)
					axios.get(`/Home`)
					.then((res : any)=> {
						if(res.data.Status === "Success"){
							setAuth(true)
							setLastName(res.data.LastName)
							setIdUser(res.data.IdUser)
							Store.addNotification({
								title: 'Выполнено',
								message: 'Авторизация прошла успешно',
								type: 'success',
								container: 'top-center',
								dismiss: {
									duration: 2000,
									onScreen: true
								}
							})
						}else{
							setAuth(false)
						}})
					.catch(err => console.log(err));
				}else{
					Store.addNotification({
						title: 'Ошибка',
						message: 'Пользователь не найден',
						type: 'danger',
						container: 'top-center',
						dismiss: {
							duration: 2000,
							onScreen: true
						}
					})
				}
			})
			.catch(err => console.log(err));
		const resetForm = event.target as HTMLFormElement;
		resetForm.reset();
	}


 return (
								 <form className='FormAuthorization' onSubmit={handelFormAuthorization}> 
									<section className='FormAuthorization_SectionA'>
										<div className='FormAuthorization_SectionA__Login'>
										<InputMask className='FormAuthorization_SectionA__Login_InputPhone' mask={'+7(999)999-99-99'} maskChar={' '} onChange={(event) => InputDataForm(event)} name="Phone" id="LoginA" placeholder='' required/>
											<label htmlFor="LoginA">Телефон</label>
										</div>
										<span></span>
										<div className='FormAuthorization_SectionA__Password'>
											<input  type="Password" name="Password" onChange={(event) => InputDataForm(event)} id="PasswordA" className='FormAuthorization_SectionA__Password__input' placeholder='' required/>
											<label htmlFor="PasswordA">Пароль</label>
											<button 
											type='button'
											className='FormAuthorization_SectionA__Password__BTN'
											onClick={EyeActive}>
												{PasswordEye ? ICON.Eye : ICON.Eye_Slash}
											</button>
										</div>
									</section>
									<button type='submit' className='FormAuthorization__BTN_Enter'>{ICON.ArrowDoubleRight}</button>
								</form>
)
}

export default FormAuthorization