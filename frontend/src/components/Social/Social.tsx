import React, { FC, ReactNode } from 'react'
import './index.scss'

interface SocialIcon {
	IconLink: JSX.Element,
	TitleLink: string,
	LinkA: string,
	LinkP: string,
	ShowText: boolean
}

const Social:FC<SocialIcon> = ({IconLink, TitleLink, LinkA, LinkP, ShowText}) => {
 return (
							<div className='Social'>
								 <a href={LinkA} className='Social_Icon'>{IconLink}</a>
								{ShowText 
								?
								<span>
									<a href={LinkA} className='Social_LintTitle'>{TitleLink}</a>
									<p>{LinkP}</p>
								 </span>
								:null}		 
							</div>
)
}

export default Social