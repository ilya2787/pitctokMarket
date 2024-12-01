import React, { FC, useState, useEffect, ChangeEventHandler } from 'react'
import './index.scss'
import {ICON} from '../ImportIcon/ImportIcon'
import InputMask from 'react-input-mask'
import axios from 'axios';
import { Store } from 'react-notifications-component';

interface DateProps {
	setActiveBtnAuthorization: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DateRegistration{
	FirstName: string,
	LastName: string,
	Phone: string,
	Email: string,
	Password: string,
	DateRegist : string
}

const FormRegistration:FC<DateProps> = ({setActiveBtnAuthorization}) => {
	
	const [PasswordEyeReplay, setPasswordEyeReplay] = useState<boolean>(false)
	const [ValuePassword, setValuePassword] = useState<string>('')
	const [ValuePasswordReplay, setValuePasswordReplay] = useState<string>('')
	const [ValidPassword, setValidPassword] = useState<boolean>(false)
	const [ValidPasswordReplay, setValidPasswordReplay] = useState<boolean>(false)
	const [PwdFocus, setPwdFocus] = useState<boolean>(false)
	const [FirstName, setFirstName] = useState<string>('')
	const [LastName, setLastName] = useState<string>('')
	const [Email, setEmail] = useState<string>('')
	const [Phone, setPhone] = useState<string>('')

	useEffect(() => {
		const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{7,20}$/;
    const result = PASS_REGEX.test(ValuePassword);
    setValidPassword(result);
		const match = ValuePassword === ValuePasswordReplay;
		setValidPasswordReplay(match);
  },[ValuePassword, ValuePasswordReplay]);

	const EyeActiveReplay = () => {
		setPasswordEyeReplay(!PasswordEyeReplay)
	}
	useEffect(() => {
		document.getElementById('PasswordReplay')?.setAttribute('type', PasswordEyeReplay ? 'text' : 'Password')
		document.getElementById('Password')?.setAttribute('type', PasswordEyeReplay ? 'text' : 'Password')
	},[PasswordEyeReplay])

	const [current, setCurrent] = useState(new Date())
	const handelFormRegistration =  async (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
		event.preventDefault();
		if(LastName !== '' && Phone !== '' && FirstName !== '' && Email !== ''){
			const FormDate = `${current.getFullYear()}.${current.getMonth()+1}.${current.getDate()}`;
				if(FirstName !== 'Администратор' && FirstName !== 'Admin' && FirstName !== 'Administrator'){
						const value:DateRegistration = {
							LastName: LastName,
							FirstName: FirstName,
							Phone: Phone,
							Email: Email,
							Password: ValuePasswordReplay,
							DateRegist: FormDate
						}
						axios.post(`/signup`, value)
						.then(res=> {
							Store.addNotification({
								title: 'Выполнено',
								message: 'Регистрация прошла успешно',
								type: 'success',
								container: 'top-right',
								dismiss: {
									duration: 2000,
									onScreen: true
								}
							})
							setActiveBtnAuthorization(true)
							const resetForm = event.target as HTMLFormElement;
							ClearPhone()
							resetForm.reset();
						})
						.catch(err => console.log(err));
			
				} else{
					Store.addNotification({
						title: 'Ошибка',
						message: 'Нельзя использовать данное имя',
						type: 'danger',
						container: 'top-right',
						dismiss: {
							duration: 2000,
							onScreen: true
						}
					})
				}
			
		}

	}
	const ClearPhone = () => {
		let Phone = document.getElementById('PhoneId') as HTMLInputElement;
		if(Phone.value !== '') {
			Phone.value = '';
		}
	}

 return (
				<form className='FormRegistration' id='FormRegistrationId' onSubmit={handelFormRegistration}> 
				<section className='FormRegistration_section'>

					<div className='FormRegistration_FirsName'>
							<input type="text" id='FirstName' name='FirstName' 
							onChange={(event) => setFirstName(event.target.value)}
							placeholder='' />
							<label htmlFor="FirstName">Имя</label>
					</div>
					<span></span>
					<div className='FormRegistration_LastName'>
							<input type="text" id='LastName' name='LastName'
							onChange={(event) => setLastName(event.target.value)}
							placeholder='' />
							<label htmlFor="LastName">Фамилия</label>
					</div>
					<span></span>
					<div className='FormRegistration_Phone'>
						<InputMask className='FormRegistration_Phone_InputPhone' mask={'+7(999)999-99-99'} maskChar={' '} id="PhoneId"  name='Phone'
						onChange={(event) => setPhone(event.target.value)} placeholder='' required/>
						<label htmlFor="Phone">Телефон</label>
					</div>
					<span></span>
					<div className='FormRegistration_Email'>
							<input type="Email" id='Email' name='Email' 
							onChange={(event) => setEmail(event.target.value)}
							placeholder='' />
							<label htmlFor="Email">Email</label>
					</div>
					<span></span>
					<div className='FormRegistration_Password'>
							<input type="password" id='Password' 
							onChange={(e) => {
								setValuePassword(e.target.value)
							}}
							aria-invalid={ValidPassword ? "false" : "true"}
							aria-describedby='pwdnote'
							onFocus={() => setPwdFocus(true)}
							onBlur={() => setPwdFocus(false)}
							required
							className='FormRegistration_Password_pass' placeholder='' />
							<label htmlFor="Password">Пароль</label>
							<p id="pwdnote" className={PwdFocus && !ValidPassword ? 'instruction_pwd' : 'offscreen'}>от 7 до 20 символов, минимум одна буква заглавная и строчная, обязательно использовать спец знак и минимум одну цифру, на латинском языке</p>
					</div>
					<span className={ValidPassword && ValidPasswordReplay ? "ValidPass" : "NotValidPass"}></span>
					<div className='FormRegistration_PasswordReplay'>
							<input type="password" id='PasswordReplay'
							name='Password'
							className='FormRegistration_PasswordReplay_passReplay' 
							onChange={(event) => {
									setValuePasswordReplay(event.target.value)
								}
							}
							required
							placeholder='' />
							<label htmlFor="PasswordReplay">Подтвердить</label>
							<button 
											type='button'
											className='FormAuthorization_SectionA__Password__BTN'
											onClick={EyeActiveReplay}>
												{PasswordEyeReplay ? ICON.Eye : ICON.Eye_Slash}
											</button>
					</div>
				</section>
				<button type='submit' 
				className='FormRegistration__BTN_Enter'>{ICON.Save}</button>
			</form>
)
}

export default FormRegistration