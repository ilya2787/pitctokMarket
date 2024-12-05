import React, { useContext, useEffect } from 'react'
import './Restoration.scss'
import { ReactNotifications } from 'react-notifications-component'
import HeaderContentPage from '../../components/HeaderContentPage/HeaderContentPage'
import Menu from '../../components/Menu/Menu'
import { Context } from '../../App'
import Footer from '../../components/Footer/Footer'
import TitleContentPage from '../../components/TitleContentPage/TitleContentPage'
import { useLocation } from 'react-router-dom'

const Restoration = () => {
	const DataApp = useContext(Context)
	const ListMenu = DataApp.ListMenu
	const CatalogListNav = DataApp.CatalogListNav
	const ListSocial = DataApp.ListSocial
	const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
  }, [pathname]);
 return (
						<div className='PageRestoration'> 
								 <ReactNotifications />
								<HeaderContentPage />
								<Menu ListMenuPage={ListMenu} CatalogListNavPage={CatalogListNav}/>	
								<TitleContentPage TitlePage="Реставрация" TitlePageNav=''/>	

								<div className='PageRestoration__Content'>
									<div className='PageRestoration__Content__Block'>
										<div className='PageRestoration__Content__Block__title'>
											<img src={`${process.env.PUBLIC_URL}/img/LOGO.svg`} alt="" />
											<h3>Реставрация в магазине «Pit Ctok»</h3>
										</div>
										<p>Реставрация в магазине «Pit Ctok» — это процесс восстановления и обновления старинных предметов мебели, интерьера и других антикварных вещей. </p>
										<p>Магазин специализируется на продаже и реставрации различных предметов старины, таких как часы, мебель, светильники и другие элементы декора.</p>
										<p style={{width: '100%'}}>В нашем коллективе 15 опытных мастеров своего дела </p>
										<p>В процессе реставрации мастера «Pit Ctok» тщательно изучают каждый предмет, определяют степень его износа и повреждения, а затем выбирают оптимальный метод восстановления. </p>
										<div className='PageRestoration__Content__Block__titleRest'>
												<span></span>
												<h3>Реставрация может включать в себя</h3>
												<span></span>			
										</div>
										<div className='PageRestoration__Content__Block__titleRest__Element'>
													<span className='PageRestoration__Content__Block__titleRest__Element__text'>
															Чистку
													</span>
													<span className='PageRestoration__Content__Block__titleRest__Element__text'>
															Полировку
													</span>
													<span className='PageRestoration__Content__Block__titleRest__Element__text'>
															Замену деталей
													</span>
													<span className='PageRestoration__Content__Block__titleRest__Element__text'>
															Покраску
													</span>
										</div>
										<p>и другие виды работ, направленные на возвращение предмету его первоначального вида или улучшение его состояния.</p>
										<p>После завершения реставрационных работ мастера «Pit Ctok» проводят контроль качества и передают восстановленные предметы клиентам. </p>
										<p>Таким образом, клиенты получают уникальные и качественные изделия, которые становятся настоящим украшением их дома или офиса.</p>

									</div>

								</div>

								<Footer ListMenuPage={ListMenu} ListSocialPage={ListSocial}/>
						</div>
)
}

export default Restoration