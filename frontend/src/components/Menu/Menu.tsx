import React, { FC, useRef, useState, useEffect, useContext, ChangeEventHandler } from 'react'
import './index.scss'
import { ICON } from '../ImportIcon/ImportIcon'
import { Link } from 'react-router-dom'
import { ContextCatalog } from '../../page/Catalog/Catalog'
import { TypeListProduction } from '../TypesData/TypesData'
import axios from 'axios'
import { NumberPriceF } from '../PriceFormat/PriceFormat'
import { LinkServer } from '../../page/Link'

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
	
	</div>
)
}

export default Menu