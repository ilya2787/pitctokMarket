import React, { useContext, useState } from 'react'
import TitleContentPage from '../../../components/TitleContentPage/TitleContentPage'
import { Link } from 'react-router-dom'
import { ICON } from '../../../components/ImportIcon/ImportIcon'
import EditListNavMenu from '../../../components/EditPage/EditListNavMenu'

const EditCatalog = () => {
	const [EditNavMenu, setEditNavMenu] = useState<boolean>(false)
	const [EditProduct, setEditProduct] = useState<boolean>(false)


 return (
						<div className='ContentEditCatalog'> 
						<div className='LinkContentAccount'> 
								 <Link to={'/'} className='LinkContentAccount__item'>Главная</Link>
										<span>{ICON.ArrowRight}</span>
										<Link to={'/Account/info'} className='LinkContentAccount__item' onClick={() => {
											}}>Аккаунт</Link>
							</div>
								 <TitleContentPage TitlePage="Редактор каталога" TitlePageNav=''/>	
								 <div className='ContentEditCatalog_content'>
										<section className='ContentEditCatalog_content_nav'>
												<button
												onClick={() => {
													setEditNavMenu(true)
													setEditProduct(false)
												}}
												>Редактировать список меню</button>
												<button
												onClick={() => {
													setEditNavMenu(false)
													setEditProduct(true)
												}}
												>Редактировать список продукции</button>
										</section>
										{EditNavMenu ?
												<section className='ContentEditCatalog_content__EditNavMenu'>
													<EditListNavMenu/>
												</section>
										:null}
								 </div>

									


						</div>
)
}

export default EditCatalog