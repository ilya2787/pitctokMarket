import React from 'react'
import './index.scss'

const BlockIconMain = () => {
 return (
						<div className='ContentBlockIcon'> 
								 <div className='ContentBlockIcon__CardAndCash'>
											<img src="./img/icon/CardAndCash.svg" alt="CardAndCash" />
											<p>Наличный и безналичный расчет</p>
								 </div>

								 <div className='ContentBlockIcon__exclusive'>
											<img src="./img/icon/exclusive.svg" alt="exclusive" />
											<p>Эксклюзивная	мебель</p>
								 </div>

								 <div className='ContentBlockIcon__saw'>
											<img src="./img/icon/saw.svg" alt="saw" />
											<p>Ручная работа краснодеревщиков</p>
								 </div>

								 <div className='ContentBlockIcon__tree'>
											<img src="./img/icon/tree.svg" alt="tree" />
											<p>Натурально дерево</p>
								 </div>
						</div>
)
}

export default BlockIconMain