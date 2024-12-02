import React, { useContext, useEffect, useState } from 'react'
import './index.scss'
import axios from 'axios'
import { TypeListMenu } from '../TypesData/TypesData'
import ItemListNav from './ItemListNav'
import ModalWindow from '../ModalWindow/ModalWindow'
import { TranslationNoWhitespace } from '../FunctionTranslite/FunctionTranslite'
import { Store } from 'react-notifications-component'
import { Context } from '../../App'
import { ContextAccount } from '../../page/Account/Account'

const EditListNavMenu = () => {
	const DataAccount = useContext(ContextAccount)
	const setCatalogListNavMain = DataAccount.setCatalogListNav

	const [CatalogListNav, setCatalogListNav] = useState<TypeListMenu[]>([])
	useEffect(() => {
		axios.get('/ListNavMenu')
		.then((res: any) => {
			setCatalogListNav(res.data)
		})
	},[setCatalogListNav])

	const UpdateListNav = () => {
		axios.get('/ListNavMenu')
		.then((res: any) => {
			setCatalogListNav(res.data)
			setCatalogListNavMain(res.data)
		})
}

	const [OpenModalAddNav, setOpenModalAddNav] = useState<boolean>(false)

	const [ValueNewNavMenu, setValueNewNavMenu] = useState<string>('')

	const AddNavMenu = () => {
		if(ValueNewNavMenu !== ''){
			const TranslationText = TranslationNoWhitespace(ValueNewNavMenu)
			const value = {Name: ValueNewNavMenu, Link: TranslationText}
			axios.post<any>('/AddListNavMenu', value)
			.then(res => {
					if(res.data.Status === "TRUE"){
						UpdateListNav()
						setValueNewNavMenu('')
						Store.addNotification({
							title: 'Выполнено',
							message: 'Запись успешно добавлена',
							type: 'success',
							container: 'top-right',
							dismiss: {
								duration: 2000,
								onScreen: true
							},
						})
					}
			})
			.catch(err => console.log(err));
		}
	}



 return (
					<div className='ListNavContent'>
						<button 
						className='ListNavContent__BTNAddNavMenu'
						onClick={() => {
							setOpenModalAddNav(true)
						}}
						>+</button>
						{CatalogListNav.map((d, i) => (
							d.Name !== "Вся продукция" && d.Name !== 'Новые поступления'?
							<ItemListNav key={d.id} data={d} setCatalogListNav={setCatalogListNav} CatalogListNav={CatalogListNav}/>
						:null
						))}

						<ModalWindow title='Добавление пункта меню' modalIsOpen={OpenModalAddNav} onClose={() => setOpenModalAddNav(false)}>
									<div className='ListNavContent__ContentAddNavMenu'>
											<div className='ListNavContent__ContentAddNavMenu__item'>
											<input type="text" name="" id="ValueNav" placeholder=''  
														onChange={(event) => setValueNewNavMenu(event.target.value)}
														onKeyDown={(e) => {
															if(e.key === "Enter"){
																if(ValueNewNavMenu !== ''){
																	AddNavMenu()	
																}
															}
														}}
														className='ListNavContent__ContentAddNavMenu__item__Input'/>
														<label htmlFor="ValueNav" className='ListNavContent__ContentAddNavMenu__item__Label'>Введите название</label>
											</div>
											<button
											onClick={() => {
												AddNavMenu()
											}}
											className='ListNavContent__ContentAddNavMenu__BTNAdd'
											>Добавить</button>
									</div>
						</ModalWindow>
					</div>
)
}

export default EditListNavMenu