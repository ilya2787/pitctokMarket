import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import {ICON} from '../../components/ImportIcon/ImportIcon'
import { ContextCatalog } from '../Catalog/Catalog';
import './index.scss'
import { NumberPriceF } from '../../components/PriceFormat/PriceFormat';
import HeardProduct from '../../components/StatusProduct/HeardProduct';
import { Context } from '../../App';
import { TypeListProduction } from '../../components/TypesData/TypesData';
import axios from 'axios';

const ProductionPage = () => {
	const DataApp = useContext(Context)
	const AddProductBasket = DataApp.AddProductBasket
	const DataCatalog = useContext(ContextCatalog)
	const ListProduct = DataCatalog.ListProduction
	const setListProduct = DataCatalog.setListProduction
	const ListImgProduction = DataCatalog.ListImgProduction
	const ListUserFavorites = DataCatalog.ListUserFavorites
	const setListUserFavorites = DataCatalog.setListUserFavorites
	const {idProduct} = useParams<{idProduct?: string}>();
	const {CatalogName} = useParams<{CatalogName?: string}>();
	const [Img, setImg] = useState<string | undefined>('')
	const [AvailabilityProduct, setAvailabilityProduct] = useState<boolean>(true)
	
useEffect(() => {
	ListProduct.map(d => {
		if(d.id === Number(idProduct)){
			if(d.quantity > 0){
				setAvailabilityProduct(true)
			}else{
				setAvailabilityProduct(false)
			}
		}
	})
},[setListProduct])

useEffect(() => {
	axios.get<TypeListProduction[]>('/ListProduction')
		.then((res)=> {
			setListProduct(res.data)
		} )
		.catch(err => console.log(err))
},[setListProduct])

	
 return (
						<> 
								{ListProduct.map((d,i) => (
									d.id === Number(idProduct) ?
									<div key={i} className='ItemProduct'>
										<div className='ItemProduct_top'>
											<div className='ItemProduct_top__IMGList'>
													<img src={`http://localhost:3000/img/Product/${Img !== '' ? Img : d.img}`} alt="" className='ItemProduct_top__IMGList__Main'/>
													<div className='ItemProduct_top__IMGList__children'>
													{ListImgProduction.map((dIM, i) => (
														dIM.idProduction === d.id ?
														<button key={dIM.id} onClick={() => setImg(dIM.Link)} >
														<img src={`http://localhost:3000/img/Product/${dIM.Link}`} alt="" />
													</button>
													:null
													))}
													</div>
											</div>
											<div className='ItemProduct_top_information'>
														<h3 className='ItemProduct_top_information_price'>{NumberPriceF(d.price)}</h3>
														<div className='ItemProduct_top_information_article'>
															<p>Артикул:</p><p>{d.article}</p>
														</div>
														<div className='ItemProduct_top_information_material'>
															<p>Материал:</p><p>{d.materials}</p>
														</div>
														<div className='ItemProduct_top_information_quantity'>
															<p>Количество:</p><p>{d.quantity}</p>
														</div>
														<div className='ItemProduct_top_information_description'>
															<p>Описание:</p><p>{d.description}</p>
														</div>
											</div>
											<HeardProduct id={d.id} ListUserFavorites={ListUserFavorites} setListUserFavorites={setListUserFavorites}/>
										</div>
										<div className='ItemProduct_bottom'>
													<div className='ItemProduct_bottom__availability'>
															<p>Наличие товара</p>
															{AvailabilityProduct 
															? <span className='ItemProduct_bottom__availability__True'>{ICON.Check}</span>
															:	<span className='ItemProduct_bottom__availability__False'>{ICON.Closed}</span> 
														}
													</div>
													<button 
													onClick={() => AddProductBasket(d)}
													className='ItemProduct_bottom__basket' type='button'>
														В корзину <span className='ItemProduct_bottom__basket__ICON'>{ICON.BasketProduct}</span>
													</button>
										</div>
									</div>
									:null
								))}
						</>
)
}

export default ProductionPage