import React, { useContext, useRef, useState, FC, useEffect, Dispatch, SetStateAction } from 'react'
import './index.scss'
import { ContextCatalog } from '../../page/Catalog/Catalog'
import { ICON } from '../ImportIcon/ImportIcon'
import { Context } from '../../App'
import axios from 'axios'
import { TypeListProduction, TypeListUserFavorites } from '../TypesData/TypesData'
import { Store } from 'react-notifications-component'

interface TypeProps{
	id: number
	ListUserFavorites: TypeListUserFavorites[]
	setListUserFavorites: Dispatch<SetStateAction<TypeListUserFavorites[]>>
}


const HeardProduct:FC<TypeProps> = ({id, ListUserFavorites, setListUserFavorites}) => {
	const DataContentAll = useContext(Context)
	const DataContent = useContext(ContextCatalog)
	const ListProduction = DataContent.ListProduction

	const [idUsers, setIdUsers] = useState<number>(0)

	axios.defaults.withCredentials = true;
	const setAuth = DataContentAll.setAuth

	useEffect(() => {
    async function Autoriz () {
      axios.get(`/Home`)
      .then((res : any)=> {
        if(res.data.Status === "Success"){
          setAuth(true)
          setIdUsers(res.data.IdUser)
        }else{
          setAuth(false)
        }
      })
      .catch(err => console.log(err));
    }
    Autoriz();
  },[setAuth]);


	const [HeardStatus, setHeardStatus] = useState<boolean>(false)
	const StatusHeardBtn = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		ListUserFavorites.map(data => {
			if(Number(data.idProd) === id){
				setHeardStatus(true)
			}
		})
	},[ListUserFavorites])

	useEffect(() => {
		if(HeardStatus){
				StatusHeardBtn.current?.classList.add('Active')
		}else{
			StatusHeardBtn.current?.classList.remove('Active')
		}
	},[HeardStatus])

	//Добавить\удалить 
const InsertDelete = () => {
		if(!HeardStatus){
			if(idUsers !== 0){
			ListProduction.map(d => {
				if(d.id === id){
						if(ListUserFavorites.length > 0){
							ListUserFavorites.map( dataF => {
								if(id === dataF.idProd){
									StatusHeardBtn.current?.classList.add('Active')
									setHeardStatus(true)
								}else{
									const value = {
										id: d.id,
										img: d.img,
										materials: d.materials,
										quantity: d.quantity,
										description: d.description,
										title: d.title,
										article: d.article,
										price: d.price,
										newStatus: d.newStatus,
										idNavMenu: d.idNavMenu,
										idUser: idUsers,
										idProd: id
									}
									setListUserFavorites([...ListUserFavorites, value])
									const valueBD = {
										img: d.img,
										materials: d.materials,
										quantity: d.quantity,
										description: d.description,
										title: d.title,
										article: d.article,
										price: d.price,
										newStatus: d.newStatus,
										idNavMenu: d.idNavMenu,
										idUser: idUsers,
										idProd: id
									}
									axios.post('/ListInsertFavoritesProd', valueBD)
									.then()
									.catch(err => console.log(err))
								}
							})
						}else{
							const value = {
								id: d.id,
								img: d.img,
								materials: d.materials,
								quantity: d.quantity,
								description: d.description,
								title: d.title,
								article: d.article,
								price: d.price,
								newStatus: d.newStatus,
								idNavMenu: d.idNavMenu,
								idUser: idUsers,
								idProd: id
							}
							setListUserFavorites([...ListUserFavorites, value])
							const valueBD = {
								img: d.img,
								materials: d.materials,
								quantity: d.quantity,
								description: d.description,
								title: d.title,
								article: d.article,
								price: d.price,
								newStatus: d.newStatus,
								idNavMenu: d.idNavMenu,
								idUser: idUsers,
								idProd: id
							}
							axios.post('/ListInsertFavoritesProd', valueBD)
							.then()
							.catch(err => console.log(err))
						}					
				}
			})
		}else{
			Store.addNotification({
				title: 'Ошибка',
				message: 'Необходимо сначала авторизоваться',
				type: 'danger',
				container: 'top-right',
				dismiss: {
					duration: 2000,
					onScreen: true
				}
			})
		}
		}else{
			setListUserFavorites(ListUserFavorites.filter(d => d.id !== id))
			delProd(id)
		}
	}

const delProd = (id:number) => {
		axios.post('/ListDeleteFavoritesProd', {idProd: id, idUser: idUsers})
			.then((res: any) => {
				if(res.data.STATUS === 'TRUE'){
					setHeardStatus(false)
				}
			})
			.catch(err => console.log(err))
	}
	useEffect(() => {
		axios.post('/ListFavoritesProduct', {idUser: idUsers})
		.then((res:any) => {
			setListUserFavorites(res.data)
		})
		.catch(err => console.log(err))
	},[setListUserFavorites])

	return (
				<div className='Production__status'>
					<button onClick={() => {
						InsertDelete()
						setHeardStatus(!HeardStatus)}} ref={StatusHeardBtn} className='Production__status__Heard'>{ICON.Heart}</button>
				</div>
)
}

export default HeardProduct