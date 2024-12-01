import React, {useRef, useEffect, FC, useState, useContext, Dispatch, SetStateAction} from 'react'
import './index.scss'
import ModalWindow from '../ModalWindow/ModalWindow'
import FormAuthorization from '../FormAuthorization/FormAuthorization'
import FormRegistration from '../FormRegistration/FormRegistration'
import { Context } from '../../App'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Console } from 'console'

interface TypeProps{
	OpenBlock: boolean,
}

const HeaderBlockUser:FC<TypeProps> = ({OpenBlock}) => {
	const DataApp = useContext(Context)
	const Auth = DataApp.Auth
	const setAuth = DataApp.setAuth
	const LastName = DataApp.LastName
	const setLastName = DataApp.setLastName
	const idUser = DataApp.idUsers
	const setIdUser = DataApp.setIdUser


	axios.defaults.withCredentials = true;
	useEffect(() => {
    async function Autoriz () {
      axios.get(`/Home`)
      .then((res : any)=> {
        if(res.data.Status === "Success"){
          setAuth(true)
					setLastName(res.data.LastName)
          setIdUser(res.data.IdUser)
        }else{
          setAuth(false)
        }
      })
      .catch(err => console.log(err));
    }
    Autoriz();
  },[setAuth]);

	
	const BlockUser = useRef<HTMLDivElement>(null)	

	const [TitleModalWindow, setTitleModalWindow] = useState<string>('Авторизация')
	const [EnterUser, setEnterUser] = useState<boolean>(false)
	const [ActiveBtnAuthorization, setActiveBtnAuthorization] = useState<boolean>(true)

	useEffect(() => {
		if(OpenBlock){
			if(BlockUser.current?.classList.contains("ActiveBlockUser")){
				BlockUser.current?.classList.remove("ActiveBlockUser")
				BlockUser.current?.classList.add("CloseBlockUser")
			}else{
				BlockUser.current?.classList.add("ActiveBlockUser")
				BlockUser.current?.classList.remove("CloseBlockUser")
			}
		}	else{
			BlockUser.current?.classList.remove("ActiveBlockUser")
			BlockUser.current?.classList.add("CloseBlockUser")
		}	
	},[OpenBlock])

	const CloseBlock = () => {
		BlockUser.current?.classList.remove("ActiveBlockUser")
		BlockUser.current?.classList.add("CloseBlockUser")
	}

	useEffect(() => {
		BlockUser.current?.addEventListener("mouseleave", CloseBlock)
	},[BlockUser])


// Обработка кнопки выход
const handelDelete = () =>{
	axios.get(`/logout`)
	.then(res => {
		setAuth(false)
	})
	.catch(err => console.log(err));
}

const navigation = useNavigate()
 return (

	<>
			<div className='BlockUser' ref={BlockUser}>
				{Auth
				?
				<>
				<h2>{LastName}</h2>
				<Link to={`/Account/Info`} className='BlockUser__AccountLink'>Аккаунт</Link>
				<button onClick={() => {
					handelDelete()
					navigation('/')
					}}>Выйти</button>
				</>
				:
				<>
					<h2>Гость</h2>
					<button onClick={() => setEnterUser(true)}>Войти</button>
				</>
				}
			</div>

			<ModalWindow  modalIsOpen={EnterUser} 
							title={TitleModalWindow} 
							onClose={() => setEnterUser(false)}
							>
								<div className='ModalWindowAuthorization'>
									<div className='ModalWindowAuthorization_Btn'>
										<button 
										className={ActiveBtnAuthorization ? 'ModalWindowAuthorization_Btn__authorization Active' : 
											'ModalWindowAuthorization_Btn__authorization'}
											onClick={() => {
												setTitleModalWindow('Авторизация')
												setActiveBtnAuthorization(true)}}
											>	
											Войти
										</button>
										<button 
										className={!ActiveBtnAuthorization ? 'ModalWindowAuthorization_Btn__registration Active' : 
											'ModalWindowAuthorization_Btn__registration'}
										onClick={() => {
											setTitleModalWindow('Регистрация')
											setActiveBtnAuthorization(false)}}>
											Регистрация
										</button>
									</div>
									{ActiveBtnAuthorization 
									? <FormAuthorization setEnterUser={setEnterUser}/>	
									: <FormRegistration setActiveBtnAuthorization={setActiveBtnAuthorization}/>
									}
															
								</div>
			</ModalWindow>
	</>

)
}

export default HeaderBlockUser