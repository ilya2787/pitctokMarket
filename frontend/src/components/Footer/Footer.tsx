import React, { FC, useContext } from 'react'
import './index.scss'
import Social from '../Social/Social'
import PhoneContact from '../Phone/PhoneContact'
import CompanyName from '../CompanyName/CompanyName'

interface TypeProps{
	ListMenuPage: TypeListMenu[],
	ListSocialPage: TypeSocial[]
}

interface TypeListMenu {
  id: number,
  Name: string,
  Link: string,
}

interface TypeSocial{
  id: number,
  Icon: JSX.Element,
  title: string,
  LinkA: string,
  LinkP: string
}

const Footer:FC<TypeProps> = ({ListMenuPage, ListSocialPage}) => {

	return (
						<footer className='Footer'> 
								 <section className='Footer_left'>
										<img src="http://localhost:3000/img/LOGO.svg" alt="LOGO" className='Footer_left__Logo_Fon'/>
										<div className='Footer_left__TitleComp'>
											<CompanyName FontSizeH2='90px' FontSizeH3_1='50px' FontSizeH3_2='40px'/>
										</div>
										<div className='Footer_left__TitleCompSmallMobile'>
											<CompanyName FontSizeH2='70px' FontSizeH3_1='32px' FontSizeH3_2='25px'/>
										</div>
									<div className='Footer_left_Address'>
											<h4>Адрес</h4>
											<p>Калининградская область,<br/>
											г. Гурьевск, пер. Байдукова, д.2А</p>
									</div>
								 </section>
								 <section className='Footer_right'>
										<h4 className='Footer_right_MenuTitle'>Меню</h4>
										<div className='Footer_right_Menu'>
												<ul>
												{ListMenuPage.map((d,i) => (
														<li key={d.id}><a href={d.Link}>{d.Name}</a></li>
													))}
												</ul>
										</div>
										<h4 className='Footer_right_ContactTitle'>Контакты</h4>
										<div className='Footer_right_Contact'>
													<div className='Footer_right_Contact__Social'>
														{ListSocialPage.map((d,i) => (
															<Social key={d.id} TitleLink={d.title} IconLink={d.Icon} LinkA={d.LinkA} LinkP={d.LinkP} ShowText={true}/>
														))}
													</div>
													<div className='Footer_right_Contact__SocialSmall'>
														{ListSocialPage.map((d,i) => (
															<Social key={d.id} TitleLink={d.title} IconLink={d.Icon} LinkA={d.LinkA} LinkP={d.LinkP} ShowText={false}/>
														))}
													</div>
													<div className='Footer_right_Contact__Phone'>
															<PhoneContact flex_direction='column-reverse' flex_direction_Kalin='column' row_gap='20px' ShowName={true} ShowTitle={true}/>
													</div>
										</div>
								 </section>
						</footer>
)
}

export default Footer