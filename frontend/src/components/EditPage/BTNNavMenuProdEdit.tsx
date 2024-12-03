import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react'
import { TypeListMenu } from '../TypesData/TypesData'

interface TypeProps{
	data: TypeListMenu
	setIdNavMenu: Dispatch<SetStateAction<number>>
	setLinkNavMenu: Dispatch<SetStateAction<string>>
}

const BTNNavMenuProdEdit:FC<TypeProps> = ({setLinkNavMenu, setIdNavMenu, data}) => {


 return (
					<button 
					onClick={() => {
						setLinkNavMenu(data.Name)
						setIdNavMenu(data.id)
					}}>{data.Name}</button>
)
}

export default BTNNavMenuProdEdit