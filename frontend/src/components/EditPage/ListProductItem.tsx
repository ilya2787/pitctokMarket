import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { TypeListImgProductItem, TypeListProduction } from '../TypesData/TypesData'
import { ICON } from '../ImportIcon/ImportIcon'
import { NumberPriceF } from '../PriceFormat/PriceFormat'
import { LinkServer } from '../../page/Link'
import { Store } from 'react-notifications-component'
import ItemGallery from './ItemGallery'


interface TypeProps{
	dataProd: TypeListProduction
	ListProduction: TypeListProduction[]
	setListProduction: Dispatch<SetStateAction<TypeListProduction[]>>
	idNavMenu: number
	UpdateListProduct: () => void
}

const ListProductItem:FC<TypeProps> = ({dataProd, ListProduction, setListProduction, idNavMenu, UpdateListProduct}) => {
	const [ListImgProduction, setListImgProduction] = useState<TypeListImgProductItem[]>([])


	useEffect(() => {
		axios.get<TypeListImgProductItem[]>('/ListImgGallery')
		.then((res)=> {
			setListImgProduction(res.data)
		} )
		.catch(err => console.log(err))
	},[setListImgProduction])

const [EditActive, setEditActive] = useState<boolean>(false)

const [ValueOldTitle, setValueOldTitle] = useState<string>('')
const [ValueNewTitle, setValueNewTitle] = useState<string>('')

const [ValueOldArticle, setValueOldArticle] = useState<string>('')
const [ValueNewArticle, setValueNewArticle] = useState<string>('')

const [ValueOldQuantity, setValueOldQuantity] = useState<number>(0)
const [ValueNewQuantity, setValueNewQuantity] = useState<number>(0)

const [ValueOldMaterials, setValueOldMaterials] = useState<string>('')
const [ValueNewMaterials, setValueNewMaterials] = useState<string>('')

const [ValueOldPrice, setValueOldPrice] = useState<number>(0)
const [ValueNewPrice, setValueNewPrice] = useState<number>(0)

const [ValueOldDescription, setValueOldDescription] = useState<string>('')
const [ValueNewDescription, setValueNewDescription] = useState<string>('')

const [ValueOldNewStatus, setValueOldNewStatus] = useState<number>(0)
const [ValueNewNewStatus, setValueNewNewStatus] = useState<boolean>(false)

useEffect(() => {
	if(ValueOldNewStatus === 0){
		setValueNewNewStatus(false)
	}else{
		setValueNewNewStatus(true)
	}
},[ValueOldNewStatus])

useEffect(() => {
	ListProduction.map(d => {
		if(d.id === dataProd.id){
			setValueOldTitle(d.title)
			setValueOldArticle(d.article)
			setValueOldQuantity(d.quantity)
			setValueOldMaterials(d.materials)
			setValueOldPrice(d.price)
			setValueOldDescription(d.description)
			setValueOldNewStatus(d.newStatus)
		}
	})
},[ListProduction])

//главное изображение
const [file, setFile] = useState<string>('')
const [NameMainFile, setNameMainFile] = useState<string>('')
const [ActiveEditMainImg, setActiveEditMainImg] = useState<boolean>(false)

const handleChangeMain = (event:any) => {
	if(event){
		const file = event.target.files[0]
		setFile(file)
		setNameMainFile(file?.name)
	}
}

const Uploading = () => {
	if(file){
		const formData = new FormData();
		formData.append('file', file);
		axios.post<any>('/UploadFile', formData)
		.then(res => {
			const value = {img: NameMainFile, id: dataProd.id}
			axios.post<any>('/UpdateImgMain', value)
			.then(res => {
					if(res.data.Status === "TRUE"){
						setFile('')
						setActiveEditMainImg(false)
					}
			})
		})
		.catch(err => console.log(err));
	}
}


//Отправка текстовой части
const handleUpdateData = () => {
		const value = {
			title: ValueNewTitle !== '' ? ValueNewTitle : ValueOldTitle,
			article: ValueNewArticle !== '' ? ValueNewArticle : ValueOldArticle,
			materials: ValueNewMaterials !== '' ? ValueNewMaterials : ValueOldMaterials,
			quantity: ValueNewQuantity !== 0 ? ValueNewQuantity : ValueOldQuantity,
			description: ValueNewDescription !== '' ? ValueNewDescription : ValueOldDescription,
			price: ValueNewPrice !== 0 ? ValueNewPrice : ValueOldPrice,
			newStatus: ValueNewNewStatus ? 1 : 0,
			idNavMenu: idNavMenu,
			id: dataProd.id
		}
		axios.post<any>('/UpdateProduction', value)
		.then(res => {
			if(res.data.Status === "TRUE"){		
				UpdateListProduct()
			}
		})
		.catch(err => console.log(err));
	}


 return (
						<div className='ContentEditProduct__ListProductEdit__item'> 
								<section className='ContentEditProduct__ListProductEdit__item__img'>
										{ActiveEditMainImg ?
										<div className='ContentEditProduct__ListProductEdit__item__img__Input'>
											<input type="file"  name='' id={'UploadImg'}  onChange={handleChangeMain} />								
											<img src={`${LinkServer.Server}Product/${dataProd.img}`}  alt="" className='ContentEditProduct__ListProductEdit__item__img__MainImg'/>
											{!file?
											<>
												<label htmlFor="UploadImg">Заменить файл</label>							
												<button onClick={() => {
													setActiveEditMainImg(false)
												}}>Отмена</button>
											</>
											:
											<>
											<label onClick={() => {
												Uploading()
											}}>{ICON.Save}</label>
											<button onClick={() => {
												setActiveEditMainImg(false)
												setFile('')
												setNameMainFile('')
											}}>Отмена</button>
											</>	}
										</div>
										:
										<div className='ContentEditProduct__ListProductEdit__item__img__MainImg'>
											<img src={NameMainFile !== '' ? `${LinkServer.Server}Product/${NameMainFile}` : `${LinkServer.Server}Product/${dataProd.img}`} alt="" />
											<button 
											onClick={() => {
												setActiveEditMainImg(true)
											}}
											>	{ICON.Pencil}	</button>
										</div>
										}
											<div className='ContentEditProduct__ListProductEdit__item__img__DopImg'>																		
													{ListImgProduction.map((d ,i) => (
														dataProd.id === d.idProduction ?
															<ItemGallery  dataImg={d} key={i}/>
														:null
													))}
											</div>
								</section>
								<section className='ContentEditProduct__ListProductEdit__item__inform'>
									<span 
									className='ContentEditProduct__ListProductEdit__item__inform__title'
									>
											{EditActive ? 
												<input type="text" onChange={(event) => {
													setValueNewTitle(event.target.value)
												}} defaultValue={ValueNewTitle ? ValueNewTitle : ValueOldTitle}/>
											:
											<h3>{ValueNewTitle ? ValueNewTitle : ValueOldTitle}</h3>
											}
									</span>
											<span
											className='ContentEditProduct__ListProductEdit__item__inform__article'
											>
												<p>Артикул:</p>
												{EditActive ?
													<input type="text" onChange={(event) => {
														setValueNewArticle(event.target.value)
													}} defaultValue={ValueNewArticle ? ValueNewArticle : ValueOldArticle}/>
												:
												<p>{ValueNewArticle ? ValueNewArticle : ValueOldArticle}</p>
												}
											</span>
											<span
											className='ContentEditProduct__ListProductEdit__item__inform__quantity'
											>
												<p>Количество:</p>
												{EditActive ?
													<input type="number" onChange={(event) => {
														setValueNewQuantity(Number(event.target.value))
													}} defaultValue={ValueNewQuantity !== 0 ? ValueNewQuantity :ValueOldQuantity}/>
												:
												<p>{ValueNewQuantity !== 0 ? ValueNewQuantity :ValueOldQuantity}</p>
												}
											</span>
											<span
											className='ContentEditProduct__ListProductEdit__item__inform__materials'
											>
												<p>Материал:</p>
												{EditActive ?
													<input type="text" onChange={(event) => {
														setValueNewMaterials(event.target.value)
													}} defaultValue={ValueNewMaterials ? ValueNewMaterials :ValueOldMaterials}/>
												:
												<p>{ValueNewMaterials ? ValueNewMaterials :ValueOldMaterials}</p>
												}
											</span>
											<span
											className='ContentEditProduct__ListProductEdit__item__inform__price'
											>
												<p>Цена:</p>
												{EditActive ?
													<input type="number" onChange={(event) => {
														setValueNewPrice(Number(event.target.value))
													}} defaultValue={ValueNewPrice ? ValueNewPrice : ValueOldPrice}/>
												:
												<p>{NumberPriceF(ValueNewPrice ? ValueNewPrice : ValueOldPrice)}</p>
												}
											</span>
											<span className='ContentEditProduct__ListProductEdit__item__inform__description'>
												<p>Описание:</p>
												{EditActive ?
													<textarea name="" id="" 
													onChange={(event) => {
														setValueNewDescription(event.target.value)
													}}
													defaultValue={ValueNewDescription ? ValueNewDescription : ValueOldDescription}
													></textarea>
												:
												<p>{ValueNewDescription ? ValueNewDescription : ValueOldDescription}</p>
												}
											</span>
											<span
											className='ContentEditProduct__ListProductEdit__item__inform__newStatus'
											>
												<p>Статус новой продукции:</p>
												{EditActive ?
												<>
													<div className='ContentEditProduct__ListProductEdit__item__inform__newStatus__Active' >
															<input type="radio" name="NewStatus" id="ActiveStatusNew" onClick={() => {
																setValueNewNewStatus(true)
															}}/>
															<label htmlFor="ActiveStatusNew">Активировать</label>
													</div>
													<div className='ContentEditProduct__ListProductEdit__item__inform__newStatus__DeActive' >
															<input type="radio" name="NewStatus" id="DeActiveStatusNew" 
															onClick={() => {
																setValueNewNewStatus(false)
															}}
															/>
															<label htmlFor="DeActiveStatusNew">Деактивировать</label>
													</div>
												</>
												:
												ValueNewNewStatus ?
													<p>Активно</p>								
												:
													<p>Не активна</p>		
												}
												
											</span>
								</section>
								{EditActive ?
								<button
								onClick={() => {
									setEditActive(false)
									handleUpdateData()
								}}
								className='ContentEditProduct__ListProductEdit__item__BTN__Save'
								>{ICON.Save}</button>	
								:
								<button
								onClick={() => {
									setEditActive(true)
								}}
								className='ContentEditProduct__ListProductEdit__item__BTN'
								>{ICON.Pencil}</button>	
							}
						</div>
)
}

export default ListProductItem