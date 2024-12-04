import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { TypeNews } from '../TypesData/TypesData'
import { formatDate } from '../FormatDate/FormatDate'
import { ICON } from '../ImportIcon/ImportIcon'
import { Store } from 'react-notifications-component'
import axios from 'axios'
import { FormNewDate } from '../NewDate/NewDate'

interface TypeProps {
	data: TypeNews
	ListAllNews: TypeNews[]
	setListAllNews: Dispatch<SetStateAction<TypeNews[]>>
	DeleteNews: () => void
}

const ItemNewsPage:FC<TypeProps> = ({data, ListAllNews, setListAllNews, DeleteNews}) => {

	const [ActiveEdit, setActiveEdit] = useState<boolean>(false)

	const [TitleNew, setTitleNew] = useState<string>('')
	const [TextNew, setTextNew] = useState<string>('')

	

const UpdateListNews = () => {
	axios.get<TypeNews[]>('/SelectNews')
		.then(res => {
			setListAllNews(res.data)
		})
		.catch(err => console.log(err));
}

const UpdateNews = () => {
	if(TitleNew !== '' || TextNew !== ''){
		const value = {
			title: TitleNew ? TitleNew : data.title,
			description: TextNew ? TextNew : data.description,
			date: FormNewDate,
			id: data.id
		}
		axios.post<any>('/UpdateNews', value)
		.then(res => {
			if(res.data.Status === 'TRUE'){
				Store.addNotification({
					title: 'Выполнено',
					message: 'Обновление успешно выполнено',
					type: 'success',
					container: 'top-right',
					dismiss: {
						duration: 2000,
						onScreen: true
					},
					onRemoval: () => {
						setTextNew('')
						setTitleNew('')
					}
				})
				UpdateListNews()
				
			}
		})
		.catch(err => console.log(err));
	}
	setActiveEdit(false)
}


 return (
					<div className='ContentBlockNews_List__news'>
						<div className='ContentBlockNews_List__news__title'>
							{!ActiveEdit ?
							<>
								<h3>{data.title}</h3>
								<p>Опубликовано: {formatDate(data.date)}</p>					
							</>
							:
							<>
								<input type="text" defaultValue={data.title} className='ContentBlockNews_List__news__title__input'
								onChange={(event) => setTitleNew(event.target.value)}
								/>
								<p>Опубликовано: {formatDate(data.date)}</p>					
							</>
							}
						</div>
						<div className='ContentBlockNews_List__news__text'>
							{!ActiveEdit ?
							<p>{data.description}</p>
							:
								<textarea 
								className='ContentBlockNews_List__news__text__textarea' 
								onChange={(event) => setTextNew(event.target.value)}
								name="" id="" defaultValue={data.description}></textarea>
							}
						</div>
						<div className='ContentBlockNews_List__news__BlockBTN'>
							{!ActiveEdit ? 
							<button
							onClick={() => {
								setActiveEdit(true)
							}}
							className='ContentBlockNews_List__news__BlockBTN__BTNEdit'
							>Редактировать</button>
							:
							<button
							onClick={() => {
								UpdateNews()
							}}
							className='ContentBlockNews_List__news__BlockBTN__BTNEdit'
							>{ICON.Save}</button>
							}
							<button 
							onClick={() => {
								if(window.confirm(`Вы действительно хотите удалить запись "${data.title}"`)){
									DeleteNews()	
								}
							}}
							className='ContentBlockNews_List__news__BlockBTN__BTNDelete'
							>{ICON.DeleteIcons}</button>
						</div>
					</div>
)
}

export default ItemNewsPage