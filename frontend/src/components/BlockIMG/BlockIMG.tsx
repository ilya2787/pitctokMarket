import React from 'react'
import './index.scss'

const BlockIMG = () => {
 return (
						<div className='ContentBlock'> 
								 <div className='ContentBlock_VintageFurniture'>
										<img src="./img/IMG_1.png" alt="IMG_1" />
										<p>Старинная винтажная мебель</p>
								 </div>

								 <div className='ContentBlock_OakAndWalnut'>
										<img src="./img/IMG_2.png" alt="IMG_2" />
										<p>Мебель из массива дуба и ореха</p>
								 </div>

								 <div className='ContentBlock_Watch'>
										<img src="./img/IMG_3.png" alt="IMG_3" />
										<p>Часы каминные, напольные, настенные</p>
								 </div>
						</div>
)
}

export default BlockIMG