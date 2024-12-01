import React, { Dispatch, FC, SetStateAction, createContext, useContext, useEffect, useRef, useState } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import HeaderContentPage from '../../components/HeaderContentPage/HeaderContentPage'
import { ICON } from '../../components/ImportIcon/ImportIcon';
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';
import LinkContentPage from '../../components/LinkContentTop/LinkContentPage';
import './index.scss'
import { Context } from '../../App';
import axios from 'axios';
import { TypeListImgProductItem, TypeListProduction, TypeListProductionBasket, TypeListUserFavorites } from '../../components/TypesData/TypesData';
import TitleContentPage from '../../components/TitleContentPage/TitleContentPage';
import { ReactNotifications, Store } from 'react-notifications-component'


type TypeContext = {
	TitlePageLink: string,
	setTitlePageLink: React.Dispatch<React.SetStateAction<string>>,
	ListProduction: Array<TypeListProduction>,
	ListImgProduction: Array<TypeListImgProductItem>,
	setListProduction: Dispatch<SetStateAction<TypeListProduction[]>>
	setTitlePageNav: Dispatch<SetStateAction<string>>
	ListUserFavorites: Array<TypeListUserFavorites>,
	setListUserFavorites: Dispatch<SetStateAction<TypeListUserFavorites[]>>
}
export const ContextCatalog = createContext<TypeContext>({
	TitlePageLink: 'Вся продукция',
	setTitlePageLink: () => {},
	ListProduction: [],
	ListImgProduction: [],
	setListProduction: () => {},
	setTitlePageNav: () => {},
	ListUserFavorites: [],
	setListUserFavorites: () => {},
})

const Catalog:FC = () => {
	const DataContentAll = useContext(Context)
	const ListMenu = DataContentAll.ListMenu
	const CatalogListNav = DataContentAll.CatalogListNav
	const ListSocial = DataContentAll.ListSocial
	const IdUser = DataContentAll.idUsers
	const setIdUser = DataContentAll.setIdUser
	const setAuth = DataContentAll.setAuth

	const {CatalogName} = useParams<{CatalogName?: string}>();
	const [TitlePageNav, setTitlePageNav] = useState<string>('')
	const [TitlePage, setTitlePage] = useState<string>('Вся продукция')
	const BlockNavCategories = useRef<HTMLDivElement>(null);
	const IconNavArrow = useRef<HTMLDivElement>(null);

	const [ListOpen, setListOpen] = useState<boolean>(true);
	const [ListProduction, setListProduction] = useState<TypeListProduction[]>([])
	const [ListImgProduction, setListImgProduction] = useState<TypeListImgProductItem[]>([])
	const [ListUserFavorites, setListUserFavorites] = useState<TypeListUserFavorites[]>([])
	

	useEffect(() => {
		if(ListOpen){
			IconNavArrow.current?.classList.add('Active')
		}else{
			IconNavArrow.current?.classList.remove('Active')
		}
	},[ListOpen])

useEffect(() => {
	axios.get<TypeListProduction[]>('/ListProduction')
		.then((res)=> {
			setListProduction(res.data)
		} )
		.catch(err => console.log(err))
},[setListProduction])

useEffect(() => {
	axios.get<TypeListImgProductItem[]>('/ListImgGallery')
	.then((res)=> {
		setListImgProduction(res.data)
	} )
	.catch(err => console.log(err))
},[setListImgProduction])

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

useEffect(() => {
	CatalogListNav.map(d => {
		if(d.Link === CatalogName){
			setTitlePage(d.Name)
		} 
	})
},[CatalogName])

const UpdateFavorites = (): void => {
	axios.post<TypeListUserFavorites[]>('/ListFavoritesProduct', {idUser: IdUser})
	.then((res) => {
		setListUserFavorites(res.data)
	})
	.catch(err => console.log(err));
}


 return (
	<ContextCatalog.Provider value={
		{
			TitlePageLink: TitlePage,
			setTitlePageLink: setTitlePage,
			ListProduction: ListProduction,
			ListImgProduction: ListImgProduction,
			setListProduction: setListProduction,
			setTitlePageNav: setTitlePageNav,
			ListUserFavorites: ListUserFavorites,
			setListUserFavorites: setListUserFavorites,
		}
	}>
			<ReactNotifications/>
			<HeaderContentPage />
			<Menu ListMenuPage={ListMenu} CatalogListNavPage={CatalogListNav}/>
			<div className='CatalogContent'> 
					<section className='CatalogContent_Link'>
								<LinkContentPage  setTitlePageNav={setTitlePageNav}/>
					</section>
						<TitleContentPage TitlePage={TitlePage} TitlePageNav={TitlePageNav}/>
					<section className='CatalogContent__content'>
							<div className='CatalogContent__content__nav'>
									<div className='CatalogContent__content__nav__title' onClick={() => setListOpen(!ListOpen)}>
										<h3>Категории</h3><div className='CatalogContent__content__nav__title_icon' ref={IconNavArrow}>{ICON.ArrowDown}</div>
									</div>
									<div className='CatalogContent__content__nav__link'			
									ref={BlockNavCategories} style={ListOpen ? {height:BlockNavCategories.current?.scrollHeight +
										"px" } : { height: "0px" }}>
											{CatalogListNav.map((d,i) => (
												<Link to={d.Link} onClick={() => {
													setTitlePage(`${d.Name}`)
													setTitlePageNav('')
													UpdateFavorites()
												}} key={d.id} className='CatalogContent__content__nav__link__item'>{d.Name}</Link>
											))}
									</div>
							</div>
							<div className='CatalogContent__content_Product'>
								
								<div className='CatalogContent__content_Product_page'>
										<Outlet />
								</div>
							</div>
					</section>
		
			</div>
			<Footer ListMenuPage={ListMenu} ListSocialPage={ListSocial}/>
	</ContextCatalog.Provider>
						
)
}

export default Catalog