import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import {ICON} from '../ImportIcon/ImportIcon'
import './index.scss'
import { Link } from 'react-router-dom'
import ModalWindowBasket from '../ModalWindowBasket/ModalWindowBasket'

interface PropsDate{
	OpenBlock: () => void
}

const HeaderIcon:FC<PropsDate> = ({OpenBlock}) => {
const [OpenBasketModal, setOpenBasketModal] = useState<boolean>(false)
const [quantityProduct, setQuantityProduct] = useState<number>(0)

 return (
	<>
		<section className='IconUser'>
			<div className='IconUser__basket'>
				<a href='#' onClick={() => setOpenBasketModal(true)} className='IconUser__basket__icon'>{ICON.Basket}</a>
				<span className='IconUser__basket__span'>{quantityProduct}</span>
			</div>
			<Link to={'/Favorites'} className='IconUser__heart'>{ICON.Heart}</Link>
			<button type='button' onClick={OpenBlock} className='IconUser__user'>{ICON.User}</button>
		</section>

	<ModalWindowBasket OpenBasketModal={OpenBasketModal} setOpenBasketModal={setOpenBasketModal} setQuantityProduct={setQuantityProduct}/>
	</>
)
}

export default HeaderIcon