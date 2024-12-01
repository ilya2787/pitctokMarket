import React, { Dispatch, FC, SetStateAction, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import './index.scss'
import {ICON} from '../../components/ImportIcon/ImportIcon'
import { ContextCatalog } from '../../page/Catalog/Catalog'

interface typeProps{
	setTitlePageNav: Dispatch<SetStateAction<string>>
}

const LinkContentPage:FC<typeProps> = ({setTitlePageNav}) => {
	const DataCatalog = useContext(ContextCatalog)
	const TitlePageLink =  DataCatalog.TitlePageLink
	const TitlePage = DataCatalog.setTitlePageLink
	const {CatalogName} = useParams<{CatalogName?: string}>();

 return (
						<div className='LinkContent'> 
								 <Link to={'/'} className='LinkContent__item'>Главная</Link>
										<span>{ICON.ArrowRight}</span>
										<Link to={'/Catalog/All'} className='LinkContent__item' onClick={() => {
											TitlePage('Вся продукция')
											setTitlePageNav('')
											}}>Каталог</Link>
										{CatalogName !== 'All'
										?
										<>
										<span>{ICON.ArrowRight}</span>
										<Link to={`/Catalog/${CatalogName}`} className='LinkContent__item' onClick={() => {
											TitlePage(TitlePageLink)
											setTitlePageNav('')
											}}>{TitlePageLink}</Link>
										</>
										:null}
						</div>
)
}

export default LinkContentPage