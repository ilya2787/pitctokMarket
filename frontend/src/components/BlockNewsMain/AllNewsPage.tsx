import React, { useContext, useEffect, useState } from 'react'
import { ReactNotifications } from 'react-notifications-component'
import HeaderContentPage from '../HeaderContentPage/HeaderContentPage'
import Menu from '../Menu/Menu'
import { Context } from '../../App'
import Footer from '../Footer/Footer'
import LinkContentPage from '../LinkContentTop/LinkContentPage'
import TitleContentPage from '../TitleContentPage/TitleContentPage'
import { Link, useLocation } from 'react-router-dom'
import { ICON } from '../ImportIcon/ImportIcon'
import { TypeNews } from '../TypesData/TypesData'
import axios from 'axios'
import { formatDate } from '../FormatDate/FormatDate'

const AllNewsPage = () => {
	const DataAdd = useContext(Context)
	const ListMenu = DataAdd.ListMenu
	const CatalogListNav = DataAdd.CatalogListNav
	const ListSocial = DataAdd.ListSocial

const [ListAllNews, setListAllNews] = useState<TypeNews[]>([])

const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
			top: 0,
			left: 0,
			// behavior: 'smooth'
		});
  }, [pathname]);

useEffect(() => {
		axios.get<TypeNews[]>('/SelectNews')
		.then(res => {
			setListAllNews(res.data)
		})
		.catch(err => console.log(err));
},[setListAllNews])


	

 return (
						<div className='PageAllNews'>  
							<ReactNotifications />
							<HeaderContentPage />
							<Menu ListMenuPage={ListMenu} CatalogListNavPage={CatalogListNav}/>
							<TitleContentPage TitlePage={'Информационная лента'} TitlePageNav={''}/>
							<div className='PageAllNews__Content'>
								<div className='PageAllNews__Content__Lent'>
									{ListAllNews.map((data, i) => (
										<div key={i} className='ContentBlockNews_List__news'>
											<div className='ContentBlockNews_List__news__title'>
													<h3>{data.title}</h3>
													<p>Опубликовано: {formatDate(data.date)}</p>
											</div>
											<div className='ContentBlockNews_List__news__text'>
													<p>{data.description}</p>
											</div>
										</div>
									))
									}

								</div>
							</div>
								 

							<Footer ListMenuPage={ListMenu} ListSocialPage={ListSocial}/>		 
						</div>
)
}

export default AllNewsPage