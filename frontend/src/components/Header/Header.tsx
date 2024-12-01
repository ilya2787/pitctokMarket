import React, { FC, useRef, useEffect, useState, useContext } from 'react'
import {ICON} from './../ImportIcon/ImportIcon'
import './Header.scss'
import HeaderIcon from '../HeaderIcon/HeaderIcon'
import Social from '../Social/Social'
import PhoneContact from '../Phone/PhoneContact'
import { Context } from '../../App'
import HeaderBlockUser from '../HeaderBlockUser/HeaderBlockUser'
import CompanyName from '../CompanyName/CompanyName'

const Header:FC = () => {
const DataApp = useContext(Context)
const ListSocial = DataApp.ListSocial


const [OpenBlock, setOpenBlock] = useState<boolean>(false)

 return (
						<header className='Header'> 
							<img src="./img/LOGO.svg" alt="LOGO" className='Header__Logo_Fon'/>
							<div className='Header_top'>
								<section className='Header_top__BrandName'>
										<h3>Наша торговая марка</h3>
										<div className='Header_top__BrandName__img'>
												<img src="./img/LOGO.svg" alt="LogoBrand" />
												<img src="./img/GrandAntiques.png" alt="GrandAntiques" />
										</div>
									</section>
									<CompanyName FontSizeH2='clamp(50px, 10vw, 190px)' FontSizeH3_1='clamp(52px, 6vw, 102px)' FontSizeH3_2='clamp(30px, 4.8vw, 80px)'/>
									<HeaderIcon OpenBlock={() => setOpenBlock(!OpenBlock)} />
									<HeaderBlockUser OpenBlock={OpenBlock}/>
							</div>
							<div className='Header_Contact'>
								<section className='Header_Contact__social'>
									{ListSocial.map((d,i) => (
										<Social key={d.id} IconLink={d.Icon} TitleLink={d.title} LinkA={d.LinkA} LinkP={d.LinkP} ShowText={true}/>
									))}
								</section>
								<section className='Header_Contact__Phone'>
										<PhoneContact flex_direction="row" flex_direction_Kalin='column' column_gap='80px' ShowName={true} ShowTitle={true}/>
								</section>
							</div>

							
						
						</header>
)
}

export default Header