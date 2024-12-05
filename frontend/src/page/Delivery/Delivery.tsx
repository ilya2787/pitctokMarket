import React, { useContext, useEffect } from 'react'
import { ReactNotifications } from 'react-notifications-component'
import HeaderContentPage from '../../components/HeaderContentPage/HeaderContentPage'
import Menu from '../../components/Menu/Menu'
import TitleContentPage from '../../components/TitleContentPage/TitleContentPage'
import Footer from '../../components/Footer/Footer'
import { Context } from '../../App'
import { Link, useLocation } from 'react-router-dom'
import './Delivery.scss'

const Delivery = () => {
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
						<div className='PageDelivery'> 
								<ReactNotifications />
								<HeaderContentPage />
								<Menu ListMenuPage={ListMenu} CatalogListNavPage={CatalogListNav}/>	
								<TitleContentPage TitlePage="Доставка" TitlePageNav=''/>	
								<div className='PageDelivery__Content'>
									<div className='PageDelivery__Content__Block'>
										<div className='PageDelivery__Content__Block__title'>
											<img src={`${process.env.PUBLIC_URL}/img/LOGO.svg`} alt="" />
											<h3>Доставка и самовывоз в антикварном магазине Pit сток</h3>
										</div>
										<p style={{width: '100%'}}>Мы ценим ваше время и комфорт, поэтому предлагаем удобные способы получения заказов.<br/> Вы можете выбрать наиболее подходящий для вас вариант:</p>
										<div className='PageDelivery__Content__Block__Pickup'>
											<h3>Самовывоз</h3>
											<p >Забрать заказ самостоятельно можно из нашего магазина по адресу: </p>
											<p className='PageDelivery__Content__Block__Pickup__Address'><span></span>Калининградская область, г. Гурьевск, переулок Байдукова, 2а </p>
											<div className='PageDelivery__Content__Block__Pickup__Maps'>
											<a href="https://yandex.ru/maps/?um=constructor%3Aff2552a79970d8f9dd54c9492fcb782901ac9c0fa909bc4a90e2adbd35a8db50&amp;source=constructorStatic" target="_blank"><img src="https://api-maps.yandex.ru/services/constructor/1.0/static/?um=constructor%3Aff2552a79970d8f9dd54c9492fcb782901ac9c0fa909bc4a90e2adbd35a8db50&amp;width=500&amp;height=400&amp;lang=ru_RU" alt="" /></a>
											</div>
											<p>или со склада </p>
											<p className='PageDelivery__Content__Block__Pickup__Address'><span></span>город Санкт-Петербург Лиговский проспект 73.</p>
											<div className='PageDelivery__Content__Block__Pickup__Maps'>
											<a href="https://yandex.ru/maps/?um=constructor%3A69860251be63cac2656d65969fa679005641e8f2f0a0fba8ca6f33e40288011f&amp;source=constructorStatic" target="_blank"><img src="https://api-maps.yandex.ru/services/constructor/1.0/static/?um=constructor%3A69860251be63cac2656d65969fa679005641e8f2f0a0fba8ca6f33e40288011f&amp;width=500&amp;height=400&amp;lang=ru_RU" alt="" /></a>
											</div>

										</div>
										<div className='PageDelivery__Content__Block__Delivery'>
											<h3>Доставка</h3>
											<p className='PageDelivery__Content__Block__Delivery__text'>Мы осуществляем доставку заказов по России. Стоимость доставки рассчитывается индивидуально в зависимости от адреса и веса заказа.</p>
										</div>
										<p> Для оформления доставки или самовывоза, пожалуйста, свяжитесь с нами по телефону </p>
										<div className='PageDelivery__Content__Block__Phone'>
												<span>
													<p>Наталья</p>
													<p> +7(909)775-59-89</p>
												</span>
												<span>
													<p>Дмитрий</p>
													<p> +7(909)792-82-42</p>
												</span>
												<span>
													<p>Мелани</p>
													<p> +7(911)450-14-30</p>
												</span>
										</div>
										<p>или оставьте <Link to={'/Catalog/All'} className='PageDelivery__Content__Block__CatalogLick'>заявку на нашем сайте</Link></p>
									</div>
								</div>

								<Footer ListMenuPage={ListMenu} ListSocialPage={ListSocial}/>
						</div>
)
}

export default Delivery