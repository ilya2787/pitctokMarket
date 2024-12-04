import React, { FC, useEffect, useState } from 'react'
import { TypeNews } from '../TypesData/TypesData'
import { formatDate } from '../FormatDate/FormatDate'

interface TypeProps{
		data: TypeNews
}

const ItemNews:FC<TypeProps> = ({data}) => {



 return (
				<div className='ContentBlockNews_List__news'>
					<div className='ContentBlockNews_List__news__title'>
							<h3>{data.title}</h3>
							<p>Опубликовано: {formatDate(data.date)}</p>
					</div>
					<div className='ContentBlockNews_List__news__text'>
							<p>{data.description}</p>
					</div>
				</div>
)
}

export default ItemNews