import React, { useState } from 'react'
import TitleContentPage from '../../../components/TitleContentPage/TitleContentPage'

const EditCatalog = () => {
	const [EditNavMenu, setEditNavMenu] = useState<boolean>(false)
	const [EditProduct, setEditProduct] = useState<boolean>(false)
 return (
						<div className='ContentEditCatalog'> 
								 <TitleContentPage TitlePage="Редактор каталога" TitlePageNav='' marginTop={-150}/>	
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
													<h3>Список меню для каталога</h3>
												</section>
										:null}
								 </div>

									


						</div>
)
}

export default EditCatalog