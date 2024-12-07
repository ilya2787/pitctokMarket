import React, { FC, useRef, useState, useEffect, useContext, ChangeEventHandler } from 'react'
import './index.scss'
import { ICON } from '../ImportIcon/ImportIcon'
import { Link } from 'react-router-dom'
import { TypeListProduction } from '../TypesData/TypesData'
import axios from 'axios'
import { NumberPriceF } from '../PriceFormat/PriceFormat'
import { LinkServer } from '../../page/Link'
import ModalWindowBasket from '../ModalWindowBasket/ModalWindowBasket'
import HeaderBlockUser from '../HeaderBlockUser/HeaderBlockUser'

interface TypeProps {
  ListMenuPage: TypeListMenu[],
	CatalogListNavPage: TypeListMenu[]
}

interface TypeListMenu {
  id: number,
  Name: string,
  Link: string,
}

const Menu:FC<TypeProps> = ({ListMenuPage, CatalogListNavPage}) => {
	const ArrowBtn = useRef<HTMLElement>(null)
	const BtnCatalog = useRef<HTMLButtonElement>(null)
	const SectionCatalog = useRef<HTMLElement>(null)
	const BlockSearch = useRef<HTMLDivElement>(null)

	const [ListProduction, setListProduction] = useState<TypeListProduction[]>([])

const [textSearch, setTextSearch] = useState<string>('')
const [ListProductionSearch, setListProductionSearch] = useState<TypeListProduction[]>(ListProduction)
const SearchFunction = (TextInput:string, Data:TypeListProduction[]) =>{
	if(!TextInput){
		return [];
	}else{
		return Data.filter(d => d.title.toLowerCase().includes(TextInput.toLowerCase()))
	}
}

useEffect(() => {
	if(textSearch){
		BlockSearch.current?.classList.add('ActiveSearch')
		BlockSearch.current?.classList.remove('ClosedSearch')
	}else{
		BlockSearch.current?.classList.remove('ActiveSearch')
		BlockSearch.current?.classList.add('ClosedSearch')
	}
},[textSearch])

useEffect(() => {
			const filterListProd = SearchFunction(textSearch, ListProduction)
			setListProductionSearch(filterListProd)
},[textSearch])
	
	useEffect(() => {
		axios.get<TypeListProduction[]>('/ListProduction')
			.then((res)=> {
				setListProduction(res.data)
			} )
			.catch(err => console.log(err))
	},[setListProduction])

	const ActiveBTN_K = () => {
		if(ArrowBtn.current?.classList.contains('Nav__BTNArrow__ActiveIcon')){
			ArrowBtn.current?.classList.add('Nav__BTNArrow__ClosedIcon')
			ArrowBtn.current?.classList.remove('Nav__BTNArrow__ActiveIcon')
			BtnCatalog.current?.classList.remove('Nav__BTNArrow__Active')	
			SectionCatalog.current?.classList.remove('Active')
			SectionCatalog.current?.classList.add('Closed')
		}else{
			ArrowBtn.current?.classList.add('Nav__BTNArrow__ActiveIcon')
			ArrowBtn.current?.classList.remove('Nav__BTNArrow__ClosedIcon')
			BtnCatalog.current?.classList.add('Nav__BTNArrow__Active')
			SectionCatalog.current?.classList.add('Active')
			SectionCatalog.current?.classList.remove('Closed')
		}
	}

	const CloseSectionCatalog = () => {
		ArrowBtn.current?.classList.add('Nav__BTNArrow__ClosedIcon')
			ArrowBtn.current?.classList.remove('Nav__BTNArrow__ActiveIcon')
			BtnCatalog.current?.classList.remove('Nav__BTNArrow__Active')	
			SectionCatalog.current?.classList.remove('Active')
			SectionCatalog.current?.classList.add('Closed')
	} 

	useEffect(() => {
		SectionCatalog.current?.addEventListener("mouseleave", CloseSectionCatalog)
	},[SectionCatalog])
 

	//Для планшета и телефона
	const [OpenBasketModal, setOpenBasketModal] = useState<boolean>(false)
	const [quantityProduct, setQuantityProduct] = useState<number>(0)

	const Burger = useRef<HTMLDivElement>(null)
	const [BurgerActive, setBurgerActive] = useState<boolean>(false)
	const MenuMobile = useRef<HTMLDivElement>(null)
useEffect(() => {
	if(BurgerActive){
		Burger.current?.classList.add('Active')
		Burger.current?.classList.remove('Exit')
		MenuMobile.current?.classList.add('Active')
		MenuMobile.current?.classList.remove('Closed')
		document.body.style.overflow='hidden'
	}else{
		Burger.current?.classList.remove('Active')
		Burger.current?.classList.add('Exit')
		MenuMobile.current?.classList.remove('Active')
		MenuMobile.current?.classList.add('Closed')
		document.body.style.overflow='scroll'
	}

},[BurgerActive])


const BtnCatalogMobile = useRef<HTMLButtonElement>(null)
const ArrowBtnMobile = useRef<HTMLElement>(null)
const ActiveBTN_CatalogMobile = () => {
	if(BtnCatalogMobile.current?.classList.contains('Active')){
		BtnCatalogMobile.current?.classList.remove('Active')
		ArrowBtnMobile.current?.classList.add('ClosedIcon')
		ArrowBtnMobile.current?.classList.remove('ActiveIcon')
		SectionCatalog.current?.classList.remove('Active')
			SectionCatalog.current?.classList.add('Closed')
	}else{
		BtnCatalogMobile.current?.classList.add('Active')
		ArrowBtnMobile.current?.classList.add('ActiveIcon')
		ArrowBtnMobile.current?.classList.remove('ClosedIcon')
		SectionCatalog.current?.classList.add('Active')
			SectionCatalog.current?.classList.remove('Closed')
	}
}

const [textSearchMobile, setTextSearchMobile] = useState<string>('')
const BlockSearchMobile = useRef<HTMLDivElement>(null)
useEffect(() => {
	if(textSearchMobile){
		BlockSearchMobile.current?.classList.add('ActiveSearch')
		BlockSearchMobile.current?.classList.remove('ClosedSearch')
	}else{
		BlockSearchMobile.current?.classList.remove('ActiveSearch')
		BlockSearchMobile.current?.classList.add('ClosedSearch')
	}
},[textSearchMobile])

useEffect(() => {
			const filterListProd = SearchFunction(textSearchMobile, ListProduction)
			setListProductionSearch(filterListProd)
},[textSearchMobile])

const BlockSearchInput = useRef<HTMLDivElement>(null)
const ActiveBlockSearch = () => {
	if(BlockSearchInput.current?.classList.contains('Active')){
		BlockSearchInput.current?.classList.remove('Active')
		BlockSearchInput.current?.classList.add('Closed')
	}else{
		BlockSearchInput.current?.classList.add('Active')
		BlockSearchInput.current?.classList.remove('Closed')
	}
}

const [OpenBlock, setOpenBlock] = useState<boolean>(false)

 return (
	<div className='MainBlockMenu'>
						<div className='Nav_BorderTop'></div>
						<div className='Nav_BorderTop2'></div>
						<nav className='Nav'> 
								<ul>
									{ListMenuPage.map((d,i) => (
										<li key={i}>{d.Name === "Каталог" ?
											<button ref={BtnCatalog} onClick={ActiveBTN_K} className='Nav__BTNArrow'>{d.Name}<span ref={ArrowBtn}>{ICON.ArrowDown}</span></button>
											: <Link to={d.Link}>{d.Name}</Link>
										}</li>
									))}
								</ul>
								<section className='Nav__search'>
										<input type="text" name='search' onChange={(event)=> setTextSearch(event.target.value)}/>
										<button>{ICON.Search}</button>
								</section>
						</nav>
						<section className='CatalogNav' ref={SectionCatalog}>
											<ul>
												{CatalogListNavPage.map((d,i) => (
													<li key={d.id}><Link to={`/Catalog/${d.Link}`}>{d.Name}</Link></li>
												))}
											</ul>
						</section>

						<div className='BlockSearch' ref={BlockSearch}>
							{
							ListProductionSearch.length > 0 ?
								ListProductionSearch.map((d,i) => (
									<div className='BlockSearch__item' key={d.id}>
										<Link to={`/Catalog/All/${d.id}`}
										onClick={() => setTextSearch('')}
										>
										<img src={`${LinkServer.Server}Product/${d.img}`} alt="" />
										</Link>
										<Link className='BlockSearch__item__link' to={`/Catalog/All/${d.id}`}
										onClick={() => setTextSearch('')}
										>{d.title}</Link>
										<p className='BlockSearch__item__price'>{NumberPriceF(d.price)}</p>
									</div>
								))
							: <h3 className='BlockSearch__h3'>К сожалению ничего не найдено</h3>
						}
						</div>
						
						<div className='MainBlockMenu_TabletAndMobile'>
								<div className='MainBlockMenu_TabletAndMobile__icon'>
									<button
									onClick={() => setOpenBlock(!OpenBlock)}
									className='MainBlockMenu_TabletAndMobile__icon__User'>{ICON.User}</button>
									<Link to={'/Favorites'}>
										<button 
										className='MainBlockMenu_TabletAndMobile__icon__Heard'>{ICON.Heart}</button>
									</Link>
									<div className='MainBlockMenu_TabletAndMobile__icon__Basket' onClick={() => setOpenBasketModal(true)}>
											<a href='#' className='MainBlockMenu_TabletAndMobile__icon__Basket__icon'>{ICON.Basket}</a>
											<span className='MainBlockMenu_TabletAndMobile__icon__Basket__span'>{quantityProduct}</span>
									</div>
									<button 
									onClick={ActiveBlockSearch}
									className='MainBlockMenu_TabletAndMobile__icon__Search'>{ICON.Search}</button>
									<div ref={Burger} className='MainBlockMenu_TabletAndMobile__icon__burger' onClick={() => {
										setBurgerActive(!BurgerActive)
									}}>
										<span className='MainBlockMenu_TabletAndMobile__icon__burger__span'></span>
									</div>
								</div>
						</div>

						<div className='MainBlockMenu__MenuMobile' ref={MenuMobile}>
										<ul>
											{ListMenuPage.map((d,i) => (
												<li key={i}>{d.Name === "Каталог" ?
													<button ref={BtnCatalogMobile} onClick={ActiveBTN_CatalogMobile} className='Nav__BTNArrowMobile'>{d.Name}<span ref={ArrowBtnMobile} >{ICON.ArrowDown}</span></button>
													: <Link to={d.Link}>{d.Name}</Link>
												}</li>
											))}
										</ul>
						</div>
						
						<div className='MainBlockMenu__SearchMobile' ref={BlockSearchInput}>
								<div className='MainBlockMenu__SearchMobile__SearchProductMobile' ref={BlockSearchMobile}>
							{
								ListProductionSearch.length > 0 ?
									ListProductionSearch.map((d,i) => (
										<div className='MainBlockMenu__SearchMobile__SearchProductMobile__item' key={d.id}>
											<Link to={`/Catalog/All/${d.id}`}
											onClick={() => setTextSearchMobile('')}
											>
											<img src={`${LinkServer.Server}Product/${d.img}`} alt="" />
											</Link>
											<Link className='MainBlockMenu__SearchMobile__SearchProductMobile__item__link' to={`/Catalog/All/${d.id}`}
											onClick={() => setTextSearchMobile('')}
											>{d.title}</Link>
											<p className='MainBlockMenu__SearchMobile__SearchProductMobile__item__price'>{NumberPriceF(d.price)}</p>
										</div>
									))
								: <h3 className='MainBlockMenu__SearchMobile__SearchProductMobile__h3'>К сожалению ничего не найдено</h3>
							}
								</div>
								<div className='MainBlockMenu__SearchMobile__search'>
										<input type="text" name='search' onChange={(event)=> setTextSearchMobile(event.target.value)}/>
										<button>{ICON.Search}</button>
								</div>
								
						</div>
						
						<HeaderBlockUser OpenBlock={OpenBlock}/>

						<ModalWindowBasket OpenBasketModal={OpenBasketModal} setOpenBasketModal={setOpenBasketModal} setQuantityProduct={setQuantityProduct}/>
						
	</div>
)
}

export default Menu