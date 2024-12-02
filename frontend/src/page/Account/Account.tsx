import React, {createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import HeaderContentPage from '../../components/HeaderContentPage/HeaderContentPage'
import Menu from '../../components/Menu/Menu'
import Footer from '../../components/Footer/Footer'
import './Account.scss'
import { Context } from '../../App'
import { ReactNotifications} from 'react-notifications-component'
import { TypeListMenu, TypeListUsers, TypeValueDataOrder } from '../../components/TypesData/TypesData'
import { Outlet } from 'react-router-dom'



type TypeContext = {
	ListUser: TypeListUsers[]
	setListUser: Dispatch<SetStateAction<TypeListUsers[]>>
	ListOrder: TypeValueDataOrder[]
	setCatalogListNav: Dispatch<SetStateAction<TypeListMenu[]>>
}
export const ContextAccount = createContext<TypeContext>({
	ListUser: [],
	setListUser: () => {},
	ListOrder: [],
	setCatalogListNav: () => {}
})

const Account:FC = () => {
	const DataAll = useContext(Context)
	const ListMenu = DataAll.ListMenu
	const CatalogListNav = DataAll.CatalogListNav
	const setCatalogListNav = DataAll.setCatalogListNav
	const ListSocial = DataAll.ListSocial
	const setAuth = DataAll.setAuth
	const idUser = DataAll.idUsers
	const setIdUser = DataAll.setIdUser

	const [ListUser, setListUser] = useState<TypeListUsers[]>([])

	axios.defaults.withCredentials = true;
	useEffect(() => {
    async function Autoriz () {
      axios.get(`/Home`)
      .then((res : any)=> {
        if(res.data.Status === "Success"){
          setAuth(true)
					setIdUser(res.data.IdUser)
        }else{
          setAuth(false)
        }
      })
      .catch(err => console.log(err));
    }
    Autoriz();
  },[setAuth]);

	useEffect(() => {
	const ListUserF = async () => {
		axios.get('/UsersAll')
		.then((res: any) => {
			setListUser(res.data)
		})
	}
	ListUserF()
},[setListUser])

//Выгрузка заказов
const [ListOrder, setListOrder] = useState<TypeValueDataOrder[]>([])

useEffect(() => {
	const value = {idUser: idUser}
	axios.post<TypeValueDataOrder[]>('/SelectOrder', value)
	.then(res => {
		setListOrder(res.data)
	})
	.catch(err => console.log(err));
},[setListOrder, idUser])


 return (
						<ContextAccount.Provider value={
							{
							ListUser: ListUser,
							setListUser: setListUser,
							ListOrder: ListOrder,
							setCatalogListNav: setCatalogListNav
						}
						}>
							<ReactNotifications />
							<HeaderContentPage />
							<Menu ListMenuPage={ListMenu} CatalogListNavPage={CatalogListNav}/>
							<div className='BlockAccountMain'>
								<Outlet/>
							</div>
							<Footer ListMenuPage={ListMenu} ListSocialPage={ListSocial}/>
						</ContextAccount.Provider>
							
)
}

export default Account