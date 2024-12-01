import React, { FC } from 'react'
import './index.scss'

interface TypeSettingProps{
	FontSizeH2: string,
	FontSizeH3_1: string,
	FontSizeH3_2: string,
}


const CompanyName:FC<TypeSettingProps> = ({FontSizeH2, FontSizeH3_1, FontSizeH3_2}) => {
 return (
				<div className='Title'>
					<h2 style={{fontSize: FontSizeH2}}>Антикварная</h2>
					<div className='Title__h3'>
						<h3 style={{fontSize: FontSizeH3_1}}>Мебель</h3>
						<h3 style={{fontSize: FontSizeH3_2}}>Интерьер</h3>
					</div>
				</div>
)
}

export default CompanyName