import React, {useEffect, useState} from 'react'
import './index.scss'
import axios from 'axios'
import { TypeNews } from '../TypesData/TypesData'
import ItemNews from './ItemNews'
import { Link } from 'react-router-dom'


const BlockNewsMain = () => {
	const [ListNews, setListNews] = useState<TypeNews[]>([])
useEffect(() => {
	axios.get<TypeNews[]>('/SelectNewsLimit')
	.then(res => {
		setListNews(res.data)
	})
	.catch(err => console.log(err));
},[setListNews])

 return (
						<div className='ContentBlockNews'> 
								 <div className='ContentBlockNews__title'>
									<span className='ContentBlockNews__title__Line1'></span>
									<h3>Информация</h3>
									<span className='ContentBlockNews__title__Line2'></span>
								 </div>
								 <section className='ContentBlockNews_List'>
									{ListNews.map((d,i) => (
											<ItemNews data={d} key={i} />
									))}
								 </section>
								 <Link to={'/Home/AllNews'}>
									<button className='ContentBlockNews_BTN'>Перейти ко всем новостям</button>
								 </Link>
						</div>
)
}

export default BlockNewsMain