import React, { FC } from 'react'
import './index.scss'

interface TypeProps{
	TitlePageNav: string
	TitlePage: string
	marginTop?: number
}

const TitleContentPage:FC<TypeProps> = ({TitlePageNav, TitlePage, marginTop}) => {
 return (
						<div className='TitlePageContent' style={{marginTop: `${marginTop}px`}}>
						<span className='TitlePageContent__Line1'></span>
							<h3>{TitlePageNav !== '' ? TitlePageNav : TitlePage}</h3>
							<span className='TitlePageContent__Line2'></span>
						</div>
)
}

export default TitleContentPage