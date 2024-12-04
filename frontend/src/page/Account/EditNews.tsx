import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ICON } from '../../components/ImportIcon/ImportIcon'
import TitleContentPage from '../../components/TitleContentPage/TitleContentPage'
import './Account.scss'
import { TypeNews } from '../../components/TypesData/TypesData'
import ItemNewsPage from '../../components/EditPage/ItemNewsPage'
import axios from 'axios'
import ModalWindow from '../../components/ModalWindow/ModalWindow'
import { FormNewDate } from '../../components/NewDate/NewDate'
import { Store } from 'react-notifications-component'

const EditNews = () => {

	const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
  }, [pathname]);

	const [ListAllNews, setListAllNews] = useState<TypeNews[]>([])

	useEffect(() => {
		axios.get<TypeNews[]>('/SelectNews')
		.then(res => {
			setListAllNews(res.data)
		})
		.catch(err => console.log(err));
},[setListAllNews])

const UpdateListNews = () => {
	axios.get<TypeNews[]>('/SelectNews')
		.then(res => {
			setListAllNews(res.data)
		})
		.catch(err => console.log(err));
}

const [OpenModalAddNews, setOpenModalAddNews] = useState<boolean>(false)
const [ValueAddNews, setValueAddNews] = useState<Object>({})

useEffect(() => {
	setValueAddNews({...ValueAddNews, date: FormNewDate })
},[setValueAddNews])

const handelAddNews = (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
	event.preventDefault();

	axios.post<any>('/AddNews', ValueAddNews)
	.then(res => {
		if(res.data.Status === 'TRUE'){
			Store.addNotification({
				title: 'Выполнено',
				message: 'Запись успешно добавлена',
				type: 'success',
				container: 'top-right',
				dismiss: {
					duration: 2000,
					onScreen: true
				}
			})
			const resetForm = event.target as HTMLFormElement;
			resetForm.reset();
			UpdateListNews();
		}
	})
}

const DeleteNews = (idNews:number) => {
	const value = {id: idNews}
	axios.post<any>('/DeleteNews', value)
	.then(res => {
		if(res.data.STATUS === 'TRUE'){
			Store.addNotification({
				title: 'Выполнено',
				message: 'Запись успешно удалена',
				type: 'success',
				container: 'top-right',
				dismiss: {
					duration: 2000,
					onScreen: true
				}
			})	
			setListAllNews(ListAllNews.filter(d => d.id !== idNews))
		}
	})
	.catch(err => console.log(err));
}

 return (
						<div className='ContentNewsEdit'> 
								 <div className='LinkContentAccount'> 
								 <Link to={'/'} className='LinkContentAccount__item'>Главная</Link>
										<span>{ICON.ArrowRight}</span>
										<Link to={'/Account/info'} className='LinkContentAccount__item' onClick={() => {
											}}>Аккаунт</Link>
							</div>
								 <TitleContentPage TitlePage="Редактор раздела информации" TitlePageNav=''/>	
								 <div className='ContentNewsEdit__ContentBlock'>
									<button
									onClick={() => setOpenModalAddNews(true)}
									className='ContentNewsEdit__ContentBlock__BtnAddNews'
									>Добавить</button>
											{ListAllNews.map((data, i) => (
												<ItemNewsPage key={i} data={data} setListAllNews={setListAllNews} ListAllNews={ListAllNews} DeleteNews={() => DeleteNews(data.id)}/>
											))
											}
								 </div>
								 <ModalWindow title='Добавление информации' modalIsOpen={OpenModalAddNews} onClose={() => setOpenModalAddNews(false)}>
											<div className='ContentNewsEdit__AddNews'>
												<form onSubmit={handelAddNews} className='ContentNewsEdit__AddNews__form'>
													<div className='ContentNewsEdit__AddNews__form__title'>
																	<input type="text" id={'TitleNews'} 
																	onChange={(event) => setValueAddNews({...ValueAddNews, title: event.target.value})}
																	placeholder='' required/>
																	<label htmlFor="TitleNews">Заголовок</label>
													</div>
													<div className='ContentNewsEdit__AddNews__form__description'>
														<p>Текст статьи</p>
														<textarea 
														onChange={(event) => setValueAddNews({...ValueAddNews, description: event.target.value})}
														name="" id="" spellCheck={true} required></textarea>
													</div>
													<button className='ContentNewsEdit__AddNews__form__BTN' type='submit'>{ICON.Save}</button>
												</form>
											</div>
								 </ModalWindow>
						</div>
)
}

export default EditNews