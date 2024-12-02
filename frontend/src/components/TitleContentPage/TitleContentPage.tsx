import React, { FC } from 'react'
import './index.scss'

interface TypeProps{
	TitlePageNav: string
	TitlePage: string

}

const TitleContentPage:FC<TypeProps> = ({TitlePageNav, TitlePage}) => {
 return (
						<div className='TitlePageContent' >
						<span className='TitlePageContent__Line1'></span>
							<h3>{TitlePageNav !== '' ? TitlePageNav : TitlePage}</h3>
							<span className='TitlePageContent__Line2'></span>
						</div>
)
}

export default TitleContentPage