import React, { useContext, useEffect, useRef, useState } from 'react'
import './About.scss'
import { ReactNotifications } from 'react-notifications-component'
import HeaderContentPage from '../../components/HeaderContentPage/HeaderContentPage'
import Menu from '../../components/Menu/Menu'
import TitleContentPage from '../../components/TitleContentPage/TitleContentPage'
import { Context } from '../../App'
import Footer from '../../components/Footer/Footer'
import VideoAbout from './VideoAbout'
import { useLocation } from 'react-router-dom'

interface  TypeVideoList {
	id: number,
	videoLink : string,
	text: string
}

const About = () => {
	const DataApp = useContext(Context)
	const ListMenu = DataApp.ListMenu
	const CatalogListNav = DataApp.CatalogListNav
	const ListSocial = DataApp.ListSocial
let BackgroundH3 = {"backgroundImage": `url(${process.env.PUBLIC_URL}/img/LOGO4.png)`};
const { pathname } = useLocation();

useEffect(() => {
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: 'smooth'
	});
}, [pathname]);

const [ListVideo, setListVideo] = useState<TypeVideoList[]>([
	{
		id: 1,
		videoLink: `${process.env.PUBLIC_URL}/video/About/IMG_8289.MOV`,
		text: 'Антикварные буфеты из массива ореха и дуба, ручной работы '
	},
	{
		id: 2,
		videoLink: `${process.env.PUBLIC_URL}/video/About/IMG_5782.MOV`,
		text: 'Старинные, настенные, каминные и напольные часы из Европы'
	}
	,
	{
		id: 3,
		videoLink: `${process.env.PUBLIC_URL}/video/About/IMG_9176.MOV`,
		text: 'Столовые группы, столы и стулья, обеденные зоны из драгоценных пород деревьев '
	}
	,
	{
		id: 4,
		videoLink: `${process.env.PUBLIC_URL}/video/About/IMG_5443.MOV`,
		text: 'Старинные люстры из бронзы, латуни , горного хрусталя '
	}
	,
	{
		id: 5,
		videoLink: `${process.env.PUBLIC_URL}/video/About/IMG_5084.MOV`,
		text: 'Античные предметы интерьера '
	}
	,
	{
		id: 6,
		videoLink: `${process.env.PUBLIC_URL}/video/About/IMG_4842.MP4`,
		text: 'Антикварные витрины, комоды, консоли разных стилей и эпох '
	}
	])

 return (
						<div className='PageAbout'>
							 <ReactNotifications />
								<HeaderContentPage />
								<Menu ListMenuPage={ListMenu} CatalogListNavPage={CatalogListNav}/>	
								<TitleContentPage TitlePage="О компании" TitlePageNav=''/>	 
								 <div className='PageAbout__Content'>
									<div className='PageAbout__Content__Block'>
										<div className='PageAbout__Content__Block__title'>
											<img src={`${process.env.PUBLIC_URL}/img/LOGO.svg`} alt="" />
											<h3>Антикварный магазин Pit сток</h3>
										</div>
										<h3 className='PageAbout__Content__Block__h3'>Добро пожаловать в антикварный магазин Pit сток,<br/> 
										где каждый предмет рассказывает свою уникальную историю. </h3>
										<p className='PageAbout__Content__Block__p'>Наш магазин расположен в Калининградской области, городе Гурьевск, переулок Байдукова, 2а</p>
										<div className='PageAbout__Content__Block__MapsInfo'>
											<div className='PageAbout__Content__Block__MapsInfo__Kaliningrad'>
											<div className='PageAbout__Content__Block__MapsInfo__Kaliningrad__maps'>
												<a href="https://yandex.ru/maps/?um=constructor%3Aff2552a79970d8f9dd54c9492fcb782901ac9c0fa909bc4a90e2adbd35a8db50&amp;source=constructorStatic" target="_blank"><img src="https://api-maps.yandex.ru/services/constructor/1.0/static/?um=constructor%3Aff2552a79970d8f9dd54c9492fcb782901ac9c0fa909bc4a90e2adbd35a8db50&amp;width=500&amp;height=400&amp;lang=ru_RU" alt="" /></a>
											</div>
											<div className='PageAbout__Content__Block__MapsInfo__Kaliningrad__text'>
													<h3>Открыт для посетителей</h3>
													<span><p>с понедельника по пятницу</p><p>с 10:00 до 19:00</p></span>
													<span><p>в субботу и воскресенье</p><p>с 10:00 до 17:00</p></span>
											</div>

											</div>
											<p className='PageAbout__Content__Block__MapsInfo__textSPB'>Так же у нас есть склад в городе Санкт-Петербург по адресу  Лиговский проспект, д. 73</p>
											<div className='PageAbout__Content__Block__MapsInfo__SPB'>
												<a href="https://yandex.ru/maps/?um=constructor%3A69860251be63cac2656d65969fa679005641e8f2f0a0fba8ca6f33e40288011f&amp;source=constructorStatic" target="_blank"><img src="https://api-maps.yandex.ru/services/constructor/1.0/static/?um=constructor%3A69860251be63cac2656d65969fa679005641e8f2f0a0fba8ca6f33e40288011f&amp;width=500&amp;height=400&amp;lang=ru_RU" alt="" /></a>
											</div>

										</div>
										<div className='PageAbout__Content__Block__10years'>
												<p>На рынке уже 10 лет! <br/>
												Наши предметы интерьера украшают дома любимых клиентов<br/> уже не первый год</p>
												<div className='PageAbout__Content__Block__10years__Icon'>
													<div className='PageAbout__Content__Block__10years__Icon__Fon'>
														<div className='PageAbout__Content__Block__10years__Icon__Fon__content'>
															<div className='PageAbout__Content__Block__10years__Icon__Fon__content__CircleBlock'>
																	<div className='PageAbout__Content__Block__10years__Icon__Fon__content__CircleBlock__circle1'>
																		<span className='PageAbout__Content__Block__10years__Icon__Fon__content__CircleBlock__circle1__small'></span>
																		<span className='PageAbout__Content__Block__10years__Icon__Fon__content__CircleBlock__circle1__small2'></span>
																		<span className='PageAbout__Content__Block__10years__Icon__Fon__content__CircleBlock__circle1__small3'></span>
																		<div className='PageAbout__Content__Block__10years__Icon__Fon__content__CircleBlock__circle1__circle2'>
																			<span className='PageAbout__Content__Block__10years__Icon__Fon__content__CircleBlock__circle1__circle2__small'></span>
																			<span className='PageAbout__Content__Block__10years__Icon__Fon__content__CircleBlock__circle1__circle2__small2'></span>
																			<span className='PageAbout__Content__Block__10years__Icon__Fon__content__CircleBlock__circle1__circle2__small3'></span>
																			
																		</div>
																	</div>
																	< div className='PageAbout__Content__Block__10years__Icon__Fon__content__CircleBlock__Text10' style={BackgroundH3}><h3>10</h3></div>
																	<h1>Лет</h1>
															</div>
														</div>
																	
													</div>
												</div>
										</div>
										<p className='PageAbout__Content__Block__p'>Мы предлагаем широкий ассортимент антикварных часов, мебели и освещения, которые станут прекрасным дополнением к вашему интерьеру. </p>
										<div className='PageAbout__Content__Block__TitleMarket'>
												<span></span>
												<h3>В нашем магазине вы найдёте</h3>
												<span></span>			
										</div>

										<div className='PageAbout__Content__Block__Video'>
													{ListVideo.map((d, i) => (
														<VideoAbout key={i} data={d}/>
													))}
										</div>
										<p className='PageAbout__Content__Block__p'>
												Наши опытные сотрудники всегда рады помочь вам с выбором и ответить на все ваши вопросы. Если желаемого товара нет в наличии, мы можем оформить заказ или порекомендовать дождаться следующей партии
										</p>
											<p className='PageAbout__Content__Block__p'>Для получения дополнительной информации или консультации, пожалуйста, свяжитесь с нами по телефону
											</p>
											<div className='PageAbout__Content__Block__Phone'>
													<span className='PageAbout__Content__Block__Phone__item'>
														<p>Игорь</p>
														<p>8(921)475-32-80</p>
													</span>
													<span className='PageAbout__Content__Block__Phone__item'>
														<p>Мелани</p>
														<p>8(921)450-14-30</p>
													</span>
													<span className='PageAbout__Content__Block__Phone__item'>
														<p>Наталья</p>
														<p>8(909)775-59-89</p>
													</span>
											</div>

									</div>
								 </div>


								<Footer ListMenuPage={ListMenu} ListSocialPage={ListSocial}/>
						</div>
)
}

export default About