import React, {FC, useContext, useState} from 'react'
import './index.scss'
import Social from '../Social/Social'
import PhoneContact from '../Phone/PhoneContact'
import CompanyName from '../CompanyName/CompanyName'
import HeaderIcon from '../HeaderIcon/HeaderIcon'
import HeaderBlockUser from '../HeaderBlockUser/HeaderBlockUser'
import { Context } from '../../App'

const HeaderContentPage:FC = () => {
	const DataCatalog = useContext(Context)
	const ListSocial = DataCatalog.ListSocial

	const [OpenBlock, setOpenBlock] = useState<boolean>(false)

 return (
						<header className='HeaderContentPage'> 
								 <section className='HeaderContentPage_Contact'>
									<div className='HeaderContentPage_Contact_Social'>
									{ListSocial.map((d,i) => (
												<Social key={d.id} IconLink={d.Icon} TitleLink={d.title} LinkA={d.LinkA} LinkP={d.LinkP} ShowText={false}/>
											))}
									</div>
										<div className='HeaderContentPage_Contact_Phone'>
											<PhoneContact flex_direction="column-reverse" flex_direction_Kalin='column'  ShowName={false} ShowTitle={true} row_gap='10px'/>
										</div>	
								 </section>
								 <section className='HeaderContentPage_Title'>
									<img src="http://localhost:3000/img/LOGO.svg" alt="logo" />
											<CompanyName FontSizeH2='90px' FontSizeH3_1='50px' FontSizeH3_2='40px'/>
									<img src="http://localhost:3000/img/LOGO.svg" alt="logo" />
								 </section>
								 <section className='HeaderContentPage_User'>
								 <HeaderIcon OpenBlock={() => setOpenBlock(!OpenBlock)}/>
								 <HeaderBlockUser OpenBlock={OpenBlock} />
								 </section>
						</header>
)
}

export default HeaderContentPage