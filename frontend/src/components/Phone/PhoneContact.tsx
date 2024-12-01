import React, { FC } from 'react'
import {Phone} from './PhoneList'
import './index.scss'

interface StyleContact {
	flex_direction: string
	flex_direction_Kalin: string,
	column_gap?: string
	row_gap?: string
	ShowTitle: boolean
	ShowName: boolean
}

const PhoneContact:FC<StyleContact> = ({flex_direction, flex_direction_Kalin, column_gap, row_gap, ShowTitle, ShowName}) => {

 return (
						<div className='Contact' style={{flexDirection: flex_direction, columnGap: column_gap, rowGap: row_gap} as React.CSSProperties}> 
							<section className='Contact__Phone_SaintPetersburg'>
									{ShowTitle
									?<h3>Санкт-Петербург</h3>
									:null}
									<span>
										{ShowName
									?<p>{Phone.SaintPetersburg.Phone1.Name}</p>
									:null}
										<a href='#'>{Phone.SaintPetersburg.Phone1.Phone}</a>
									</span>
							</section>
							<section className='Contact__Phone_Kaliningrad' style={{flexDirection: flex_direction_Kalin} as React.CSSProperties}>
								{ShowTitle
									?<h3>Калининград</h3>
								:null}
									<span>
									{ShowName
										?<p>{Phone.Kaliningrad.Phone1.Name}</p>
									:null}
										<a href='#'>{Phone.Kaliningrad.Phone1.Phone}</a>
									</span>
									<span>
									{ShowName
										?<p>{Phone.Kaliningrad.Phone2.Name}</p>
									:null}
										<a href='#'>{Phone.Kaliningrad.Phone2.Phone}</a>
									</span>
									<span>
									{ShowName
										?<p>{Phone.Kaliningrad.Phone3.Name}</p>
									:null}
										<a href='#'>{Phone.Kaliningrad.Phone3.Phone}</a>
									</span>
							</section>
						</div>
)
}

export default PhoneContact