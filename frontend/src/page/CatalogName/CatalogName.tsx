import React, { FC, useContext, useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import './index.scss'
import {ICON} from '../../components/ImportIcon/ImportIcon'
import { ContextCatalog } from '../Catalog/Catalog'
import FilterProduction from '../../components/FilterProduction/FilterProduction'
import { NumberPriceF } from '../../components/PriceFormat/PriceFormat'
import HeardProduct from '../../components/StatusProduct/HeardProduct'
import NewProduct from '../../components/StatusProduct/NewProduct'
import { Context } from '../../App'
import { TypeListUserFavorites } from '../../components/TypesData/TypesData'
import axios from 'axios'
import { Store } from 'react-notifications-component'
import { LinkServer } from '../Link'


const CatalogName:FC = () => {
	const DataApp = useContext(Context)
	const IdUser = DataApp.idUsers
	const CatalogListNav = DataApp.CatalogListNav
	const AddProductBasket = DataApp.AddProductBasket
	const DataCatalog = useContext(ContextCatalog)
	const ListProduction = DataCatalog.ListProduction
	const setListProduction = DataCatalog.setListProduction
	const ListUserFavorites = DataCatalog.ListUserFavorites
	const setListUserFavorites = DataCatalog.setListUserFavorites
	const setTitlePageNav = DataCatalog.setTitlePageNav
	const {CatalogName} = useParams<{CatalogName?: string}>();
	const [CheckedAvailable, setCheckedAvailable] = useState<boolean>(false)
	const [TitleSorting, setTitleSorting] = useState<string>('С начало дорогие')

useEffect(() => {
	axios.post<TypeListUserFavorites[]>('/ListFavoritesProduct', {idUser: IdUser})
	.then((res) => {
		setListUserFavorites(res.data)
	})
	.catch(err => console.log(err))
},[CheckedAvailable])

useEffect(() => {
	if(TitleSorting === 'С начало дорогие'){
		setListProduction((data) => {
			const dataItem = [...data];
			dataItem.sort((a, b) => Number(b.price) - Number(a.price));
			return dataItem;
		})
	}
	if(TitleSorting === 'С начало дешевые'){
		setListProduction((data) => {
			const dataItem = [...data];
			dataItem.sort((a, b) => Number(a.price) - Number(b.price));
			return dataItem;
		})
	}
	if(TitleSorting === 'Новинки'){
		setListProduction((data) => {
			const dataItem = [...data];
			dataItem.sort((a, b) => b.newStatus - a.newStatus);
			return dataItem;
		})
	}
},[TitleSorting])

	return (
						<div className='Content_categories'> 
						<FilterProduction setCheckedAvailable={setCheckedAvailable} setTitleSorting={setTitleSorting} TitleSorting={TitleSorting}/>
						{ListProduction.map((d,i) => (
							CatalogListNav.map((dNav, i) => (
								CatalogName === dNav.Link || CatalogName === 'All'?
									CatalogName === 'NovyePostupleniya' ?
										d.newStatus === 1 ?
											<div key={i} className='Content_categories_Production'>
											<div className='Content_categories_Production__status'>

												<HeardProduct id={d.id} ListUserFavorites={ListUserFavorites} setListUserFavorites={setListUserFavorites}/>
												<NewProduct newStatus={d.newStatus}/>
											</div>
											<Link 
											to={`/Catalog/${CatalogName}/${d.id}`} 
											onClick={() => setTitlePageNav(d.title)}>
											<img src={`${LinkServer.Server}Product/${d.img}`} alt="" />
											</Link>
											<Link 
											to={`/Catalog/${CatalogName}/${d.id}`} 
											onClick={() => setTitlePageNav(d.title)}className='Content_categories_Production__title'>{d.title}</Link>
											<span className='Content_categories_Production__article'><p>Артикул:</p><p>{d.article}</p></span>
											<div className='Content_categories_Production__price'>
													<span>
														<h3>{NumberPriceF(d.price)}</h3>
													</span>
													<button className='Content_categories_Production__price_BTNBasket'>{ICON.BasketProduct}</button>
											</div>
										</div>		
										:null
									:
									d.idNavMenu === dNav.id ?
									CheckedAvailable ? 
										d.quantity > 0 ?
									<div key={i} className='Content_categories_Production'>
										<div className='Content_categories_Production__status'>

											<HeardProduct id={d.id} ListUserFavorites={ListUserFavorites} setListUserFavorites={setListUserFavorites}/>
											<NewProduct newStatus={d.newStatus}/>
										</div>
										<Link 
										to={`/Catalog/${CatalogName}/${d.id}`} 
										onClick={() => setTitlePageNav(d.title)}>
										<img src={`${LinkServer.Server}Product/${d.img}`} alt="" />
										</Link>
										<Link 
										to={`/Catalog/${CatalogName}/${d.id}`} 
										onClick={() => setTitlePageNav(d.title)}className='Content_categories_Production__title'>{d.title}</Link>
										<span className='Content_categories_Production__article'><p>Артикул:</p><p>{d.article}</p></span>
										<div className='Content_categories_Production__price'>
												<span>
													<h3>{NumberPriceF(d.price)}</h3>
												</span>
												<button className='Content_categories_Production__price_BTNBasket'>{ICON.BasketProduct}</button>
										</div>
									</div>
									:null
									:
									<div key={d.id} className='Content_categories_Production'>
										<div className='Content_categories_Production__status'>
											<HeardProduct id={d.id} ListUserFavorites={ListUserFavorites} setListUserFavorites={setListUserFavorites}/>
											<NewProduct newStatus={d.newStatus}/>
										</div>
										<Link 
										to={`/Catalog/${CatalogName}/${d.id}`} 
										onClick={() => setTitlePageNav(d.title)}>
										<img src={`${LinkServer.Server}Product/${d.img}`} alt="" />
										</Link>
										<Link 
										to={`/Catalog/${CatalogName}/${d.id}`} 
										onClick={() => setTitlePageNav(d.title)}className='Content_categories_Production__title'>{d.title}</Link>
										<span className='Content_categories_Production__article'><p>Артикул:</p><p>{d.article}</p></span>
										<div className='Content_categories_Production__price'>
												<span>
													<h3>{NumberPriceF(d.price)}</h3>
												</span>
												{d.quantity === 0 ?
												<button 
												onClick={() => {
													Store.addNotification({
														title: 'Ошибка',
														message: 'Данный товар отсутствует',
														type: 'danger',
														container: 'top-right',
														dismiss: {
															duration: 2000,
															onScreen: true
														}
													})
												}}
												className='Content_categories_Production__price_BTNBasket'>{ICON.BasketProduct}</button>
											:
												<button 
												onClick={() => AddProductBasket(d)}
												className='Content_categories_Production__price_BTNBasket'>{ICON.BasketProduct}</button>
											}

										</div>
									</div>
									:null
								:null
							))
						))}
						</div>
)
}

export default CatalogName