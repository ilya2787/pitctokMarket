import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { ICON } from '../ImportIcon/ImportIcon'
import { TypeListMenu } from '../TypesData/TypesData'
import { Store } from 'react-notifications-component'
import CatalogName from '../../page/CatalogName/CatalogName'
import { TranslationNoWhitespace } from '../FunctionTranslite/FunctionTranslite'
import { ContextAccount } from '../../page/Account/Account'

interface TypeProps{
	data: TypeListMenu
	CatalogListNav: TypeListMenu[]
	setCatalogListNav: Dispatch<SetStateAction<TypeListMenu[]>>
}

const ItemListNav:FC<TypeProps> = ({data, CatalogListNav, setCatalogListNav}) => {
	const DataAccount = useContext(ContextAccount)
	const setCatalogListNavMain = DataAccount.setCatalogListNav
	const [EditListActive, setEditListActive] = useState<boolean>(false)
	const [ValueOldListNav, setValueOldListNav] = useState<string>('')
	const [ValueNewListNav, setValueNewListNav] = useState<string>('')
	const [ActiveUpdate, setActiveUpdate] = useState<boolean>(false)
	const InputText = useRef<HTMLDivElement>(null)
	useEffect(() => {
		if(ActiveUpdate){
			InputText.current?.classList.add('ActiveUpdate')
		}else{
			InputText.current?.classList.remove('ActiveUpdate')
		}
	},[ActiveUpdate])

	useEffect(() => {
		CatalogListNav.map(d => {
			if(d.id === data.id){
				setValueOldListNav(d.Name)
			} 
		})
	},[CatalogListNav])

	const UpdateListNav = () => {
		axios.get('/ListNavMenu')
		.then((res: any) => {
			setCatalogListNav(res.data)
			setCatalogListNavMain(res.data)
		})
}

	const UpdateList = (id:number) => {
		if(ValueOldListNav !== ValueNewListNav && ValueNewListNav !== ''){
			const TranslationValueNewNav = TranslationNoWhitespace(ValueNewListNav)
			const value = {Name: ValueNewListNav, Link: TranslationValueNewNav, id: data.id}
			axios.post<any>('/UpdateListNavMenu', value)
			.then(res => {
				if(res.data.Status === 'TRUE'){
					UpdateListNav()
					Store.addNotification({
						title: 'Выполнено',
						message: 'Обновление прошло успешно',
						type: 'success',
						container: 'top-right',
						dismiss: {
							duration: 2000,
							onScreen: true
						},
					})
				}
			})
		}
	}

	const DeleteNav = (id:number) => {
		const value = {id: id}
		axios.post<any>('/DeleteNavMenu', value)
		.then(res => {
			if(res.data.STATUS === 'TRUE'){
					UpdateListNav()
					Store.addNotification({
						title: 'Выполнено',
						message: 'Запись успешно удалена',
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

 return (
	<>
							<div className='ListNavContent__item' ref={InputText}>
							{!EditListActive ?
							<>
								<h3
								className='ListNavContent__item__text'
								>{data.Name}</h3>
								<button 
								className='ListNavContent__item__BTN'
								onClick={() => {
									setEditListActive(true)
									setActiveUpdate(true)
								}}>{ICON.Pencil}</button>
							</>
								:
								<>
									<input type="text" 
									className='ListNavContent__item__input'
									onKeyDown={(e) => {
										if(e.key === "Enter"){
											if(ValueNewListNav !== ''){
												setEditListActive(false)
												UpdateList(data.id)
												setActiveUpdate(false)
											}
										}
									}}
									onChange={(event) => setValueNewListNav(event.target.value)} defaultValue={ValueOldListNav}/>
									<button
									className='ListNavContent__item__BTNDelete'
									onClick={() => {
										if(window.confirm(`Вы действительно хотите удалить пункт "${data.Name}"`)){
											DeleteNav(data.id)	
										}
									}}
									>{ICON.DeleteIcons}</button>
									<button 
									className='ListNavContent__item__BTN'
									onClick={() => {
										setEditListActive(false)
										UpdateList(data.id)
										setActiveUpdate(false)
									}}>{ICON.Save}</button>
									
								</>
							}
							</div>
	</>
)
}

export default ItemListNav