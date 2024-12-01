import React, { FC, useEffect, useState } from 'react'
import { ICON } from '../ImportIcon/ImportIcon'
import './index.scss'

interface TypePropr{
	newStatus: number
}

const NewProduct:FC<TypePropr> = ({newStatus}) => {
	
	const [NewStatus, setNewStatus] = useState<boolean>(true)

	useEffect(() => {
		if(newStatus === 1){
			setNewStatus(true)
		}else{
			setNewStatus(false)
		}
	},[newStatus])

 return (
				<div className='Production__status'>
				{NewStatus ?
					<div className='Production__status__NEW'>
						<span>{ICON.Fire}</span> <p>New</p>
					</div>
				:null}
			</div>
)
}

export default NewProduct