import React, { useContext, useEffect, useState } from 'react'
import HeaderContentPage from '../../components/HeaderContentPage/HeaderContentPage'
import './Favorites.scss'
import Menu from '../../components/Menu/Menu'
import { Context } from '../../App'
import HeardProduct from '../../components/StatusProduct/HeardProduct'
import NewProduct from '../../components/StatusProduct/NewProduct'
import { Link } from 'react-router-dom'
import { ContextCatalog } from '../Catalog/Catalog'
import { NumberPriceF } from '../../components/PriceFormat/PriceFormat'
import { ICON } from '../../components/ImportIcon/ImportIcon'
import axios from 'axios'
import { TypeListProduction, TypeListUserFavorites } from '../../components/TypesData/TypesData'
import Footer from '../../components/Footer/Footer'
import TitleContentPage from '../../components/TitleContentPage/TitleContentPage'
import { ReactNotifications, Store } from 'react-notifications-component'



const Favorites = () => {
	const DataContentAll = useContext(Context)
	const ListMenu = DataContentAll.ListMenu
	const CatalogListNav = DataContentAll.CatalogListNav
	const ListSocial = DataContentAll.ListSocial
	const AddProductBasket = DataContentAll.AddProductBasket
	const setAuth = DataContentAll.setAuth

	const DataCatalog = useContext(ContextCatalog)
	const setTitlePageNav = DataCatalog.setTitlePageNav
	
	const [ListUserFavorites, setListUserFavorites] = useState<TypeListUserFavorites[]>([])
	const [IdUser, setIdUser] = useState<number>(0)

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
		axios.post<TypeListUserFavorites[]>('/ListFavoritesProduct', {idUser: IdUser})
		.then((res) => {
			setListUserFavorites(res.data)
		})
		.catch(err => console.log(err))
	},[setListUserFavorites, IdUser])
	
	const InsertDelete = (id:number) => {
		axios.post('/ListDeleteFavoritesProd', {idProd: id, idUser: IdUser})
			.then((res: any) => {
				if(res.data.STATUS === 'TRUE'){
					axios.post<TypeListUserFavorites[]>('/ListFavoritesProduct', {idUser: IdUser})
					.then((res) => {
						setListUserFavorites(res.data)
					})
					.catch(err => console.log(err))
				}
			})
			.catch(err => console.log(err))
	}


 return (
						<> 
								<ReactNotifications/>
								 <HeaderContentPage />
								 <Menu ListMenuPage={ListMenu} CatalogListNavPage={CatalogListNav}/>
										<TitleContentPage TitlePage="Избранные" TitlePageNav=''/>						
									<div className='ContentProdFavorites'>
										{ ListUserFavorites.length > 0 ?
										ListUserFavorites.map((d,i) => (
										<div key={d.id} className='Content_categories_Production'>
											<div className='Content_categories_Production__status'>
											<button onClick={() => {
												InsertDelete(d.idProd)
											 }} className='Production__status__Heard' style={{color: 'red'}}>{ICON.Heart}</button>
												<NewProduct newStatus={d.newStatus}/>
											</div>
											<Link 
											to={`/Catalog/All/${d.idProd}`} 
											onClick={() => setTitlePageNav(d.title)}>
											<img src={`${process.env.PUBLIC_URL}/img/Product/${d.img}`} alt="" />
											</Link>
											<Link 
											to={`/Catalog/All/${d.idProd}`} 
											onClick={() => setTitlePageNav(d.title)}className='Content_categories_Production__title'>{d.title}</Link>
											<span className='Content_categories_Production__article'><p>Артикул:</p><p>{d.article}</p></span>
											<div className='Content_categories_Production__price'>
													<span>
														<h3>{NumberPriceF(d.price)}</h3>
													</span>
													<button 
													onClick={() => AddProductBasket(d, 1 ,d.idProd)}
													className='Content_categories_Production__price_BTNBasket'>{ICON.BasketProduct}</button>
											</div>
										</div>
										))
									: <h2 className='ContentProdFavorites__empty'>Список пуст</h2>
									}
									</div>
								 <Footer ListMenuPage={ListMenu} ListSocialPage={ListSocial}/>
						</>
)
}

export default Favorites