import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { ContextAccount } from '../../page/Account/Account'
import ListProductItem from './ListProductItem'
import { TypeListProduction } from '../TypesData/TypesData'
import BTNNavMenuProdEdit from './BTNNavMenuProdEdit'
import ModalWindow from '../ModalWindow/ModalWindow'
import { ICON } from '../ImportIcon/ImportIcon'
import { LinkServer } from '../../page/Link'
import { Store } from 'react-notifications-component'

const EditProduction = () => {
	const DataAccount = useContext(ContextAccount)
	const CatalogListNav = DataAccount.CatalogListNav

	const [LinkNavMenu, setLinkNavMenu] = useState<string>('')
	const [IdNavMenu, setIdNavMenu] = useState<number>(0)

	const [ListProduction, setListProduction] = useState<TypeListProduction[]>([])

	useEffect(() => {
		axios.get<TypeListProduction[]>('/ListProduction')
			.then((res)=> {
				setListProduction(res.data)
			} )
			.catch(err => console.log(err))
	},[setListProduction])

// вычисляем номер id
const [ColumListProd, setColumListProd] = useState(0)
useEffect(() => {
	async function resAut () {
		axios.get<any>(`/ListProduction`)
			.then(res => {
				const idFirst = res.data.length -1;
				const idList = res.data[idFirst].id;
				setColumListProd(idList + 1)
				const lengthList = {value: res.data.length}
				axios.post<any>(`/AutoIncrProduction`, lengthList)
				.then()
				.catch(err => console.log(err));		
			})
			.catch(err => console.log(err));
	}
	resAut();
},[setListProduction])


	const UpdateListProduct = () => {
		axios.get<TypeListProduction[]>('/ListProduction')
				.then((res)=> {
					setListProduction(res.data)
				} )
				.catch(err => console.log(err));
	}

	const [OpenModalAddProduct, setOpenModalAddProduct] = useState<boolean>(false)
	
	const [fileMain, setFileMain] = useState<string>('')
	const [NameFileMain, setNameFileMain] = useState<string>('')
	const [LoadingImgMain, setLoadingImgMain] = useState<boolean>(false)

	const handleChangeMain = (event:any) => {
		if(event){
			const file = event.target.files[0]
			setFileMain(file)
			setNameFileMain(file?.name)
		}
	}

	const [fileSmall, setFileSmall] = useState<string>('')
	const [NameFileSmall, setNameFileSmall] = useState<string>('')
	const [LoadingImgSmall, setLoadingImgSmall] = useState<boolean>(false)

	const handleChangeSmall = (event:any) => {
		if(event){
			const file = event.target.files[0]
			setFileSmall(file)
			setNameFileSmall(file?.name)
		}
	}
	const [fileSmall2, setFileSmall2] = useState<string>('')
	const [NameFileSmall2, setNameFileSmall2] = useState<string>('')
	const [LoadingImgSmall2, setLoadingImgSmall2] = useState<boolean>(false)

	const handleChangeSmall2 = (event:any) => {
		if(event){
			const file = event.target.files[0]
			setFileSmall2(file)
			setNameFileSmall2(file?.name)
		}
	}
	const [fileSmall3, setFileSmall3] = useState<string>('')
	const [NameFileSmall3, setNameFileSmall3] = useState<string>('')
	const [LoadingImgSmall3, setLoadingImgSmall3] = useState<boolean>(false)

	const handleChangeSmall3 = (event:any) => {
		if(event){
			const file = event.target.files[0]
			setFileSmall3(file)
			setNameFileSmall3(file?.name)
		}
	}

	useEffect(() => {
		if(NameFileMain === undefined){
			setLoadingImgMain(false)
		}
		if(NameFileSmall === undefined){
			setLoadingImgSmall(false)
		}
		if(NameFileSmall2 === undefined ){
			setLoadingImgSmall2(false)
		}
		if(NameFileSmall3 === undefined){
			setLoadingImgSmall3(false)
		}
	},[fileMain, fileSmall, fileSmall2, fileSmall3])

	const Uploading = (file:string) => {
		if(file){
			const formData = new FormData();
			formData.append('file', file);
			axios.post<any>('/UploadFile', formData)
			.then(res => {
				if(fileMain){
					setFileMain('')
					setLoadingImgMain(true)
				}
				if(fileSmall){
					setFileSmall('')
					setLoadingImgSmall(true)
				}
				if(fileSmall2){
					setFileSmall2('')
					setLoadingImgSmall2(true)
				}
				if(fileSmall3){
					setFileSmall3('')
					setLoadingImgSmall3(true)
				}
			})
			.catch(err => console.log(err));
		}
	}

	const [ValueDAtaNewProduct, setValueDAtaNewProduct] = useState<Object>({})
	const [ValueNewNewStatus, setValueNewNewStatus] = useState<boolean>(false)

useEffect(() => {
	if(NameFileMain !== undefined && NameFileMain !== ''){
		setValueDAtaNewProduct({
			...ValueDAtaNewProduct, 
			idNavMenu: IdNavMenu,
			newStatus: ValueNewNewStatus ? 1 : 0,
			img: NameFileMain
		})
	}
},[IdNavMenu, ValueNewNewStatus, NameFileMain])

	const handelAddProduct = (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
		event.preventDefault();
		if(NameFileMain !== undefined && NameFileMain !== ''){
			axios.post<any>('/AddProduct', ValueDAtaNewProduct)
			.then(res => {
				if(res.data.Status === 'TRUE'){
					if(NameFileSmall){
						AddGalleryProd(NameFileSmall)
					}
					if(NameFileSmall2){
						AddGalleryProd(NameFileSmall2)
					}
					if(NameFileSmall3){
						AddGalleryProd(NameFileSmall3)
					}
					const resetForm = event.target as HTMLFormElement;
					resetForm.reset();
					setOpenModalAddProduct(false)
					UpdateListProduct()
					Store.addNotification({
						title: 'Выполнено',
						message: 'Продукция успешно добавлена',
						type: 'success',
						container: 'top-right',
						dismiss: {
							duration: 2000,
							onScreen: true
						},
						onRemoval: () => {
							ClearFormAddProd()
						}
					})
				}
			})
			.catch(err => console.log(err));
		}else{
			console.log('нет основной фото')
		}
	}

const ClearFormAddProd = () => {
		setFileMain('')
		setLoadingImgMain(false)
		setFileSmall('')
		setLoadingImgSmall(false)
		setFileSmall2('')
		setLoadingImgSmall2(false)
		setFileSmall3('')
		setLoadingImgSmall3(false)
}

	const AddGalleryProd = (NameFile:string) => {
		const value = {Link : NameFile, idProduction: ColumListProd}
		axios.post('/AddImgGallery', value)
		.then(res => console.log(res))
		.catch(err => console.log(err));
	}
 return (
						<div className='ContentEditProduct'> 
								 <section className='ContentEditProduct__ListNavMenu'>
										{CatalogListNav.map((d, i) => (
											d.Name !== "Вся продукция" && d.Name !== 'Новые поступления' ? 
											<BTNNavMenuProdEdit key={i} setLinkNavMenu={setLinkNavMenu} setIdNavMenu={setIdNavMenu} data={d}/>
										:null))}
								 </section>
									<section className='ContentEditProduct__ListProductEdit'>
										{LinkNavMenu ?
										<button 
										onClick={() => {
											setOpenModalAddProduct(true)
										}}
										className='ContentEditProduct__ListProductEdit__BTNAdd'>Добавить</button>
									:null}
											{ListProduction.map((d, i) => (
													d.idNavMenu === IdNavMenu ?
																<ListProductItem key={i} dataProd={d}
																idNavMenu={IdNavMenu}
																ListProduction={ListProduction} setListProduction={setListProduction}
																UpdateListProduct={UpdateListProduct}
																/>
													:null
											))}

									</section>
									<ModalWindow title='Добавление продукции' modalIsOpen={OpenModalAddProduct} onClose={() => setOpenModalAddProduct(false)}>
												<div className='ContentEditProduct__AddProductionForm'>
													<form className='ContentEditProduct__AddProductionForm__Form' onSubmit={handelAddProduct}>
														<section className='ContentEditProduct__AddProductionForm__Form__img'>
																	<div className='ContentEditProduct__AddProductionForm__Form__img__Main'>
																	<input type="file"  name='' id={'UploadImg'}  onChange={handleChangeMain} />								
																	<img src={LoadingImgMain ? `${LinkServer.Server}Product/${NameFileMain}` : `.././img/noImg.png`} alt="" />
																	{!fileMain?
																	<>
																		<label htmlFor="UploadImg" >Загрузить файл</label>							
																	</>:
																	<>
																	<label onClick={() => {
																		Uploading(fileMain)
																	}}>{ICON.Save}</label>
																	<button 
																	className='ContentEditProduct__AddProductionForm__Form__img__Main__exit'
																	onClick={() => {
																		setFileMain('')
																		setNameFileMain('')
																		setLoadingImgMain(false)
																	}}>Отмена</button>
																	</>	
																}
																	</div>
																	<div className='ContentEditProduct__AddProductionForm__Form__img__Dop'>
																		<div className='ContentEditProduct__AddProductionForm__Form__img__Dop__item'>
																			<input type="file"  name='' id={'UploadImgSmall'}  onChange={handleChangeSmall} />								
																			<img src={LoadingImgSmall ? `${LinkServer.Server}Product/${NameFileSmall}` : `.././img/noImg.png`} alt="" />
																			{!fileSmall?
																			<>
																				<label htmlFor="UploadImgSmall" >+</label>							
																			</>:
																			<>
																			<label onClick={() => {
																				Uploading(fileSmall)
																			}}>{ICON.Save}</label>
																			<button 
																			className='ContentEditProduct__AddProductionForm__Form__img__Dop__item__exit'
																			onClick={() => {
																				setFileSmall('')
																				setNameFileSmall('')
																				setLoadingImgSmall(false)
																			}}>Отмена</button>
																			</>	
																		}
																	</div>
																	<div className='ContentEditProduct__AddProductionForm__Form__img__Dop__item2'>
																		<input type="file"  name='' id={'UploadImgSmall2'}  onChange={handleChangeSmall2} />								
																		<img src={LoadingImgSmall2 ? `${LinkServer.Server}Product/${NameFileSmall2}` : `.././img/noImg.png`} alt="" />
																		{!fileSmall2?
																		<>
																			<label htmlFor="UploadImgSmall2" >+</label>							
																		</>:
																		<>
																		<label onClick={() => {
																			Uploading(fileSmall2)
																		}}>{ICON.Save}</label>
																		<button 
																		className='ContentEditProduct__AddProductionForm__Form__img__Dop__item__exit'
																		onClick={() => {
																			setFileSmall2('')
																			setNameFileSmall2('')
																			setLoadingImgSmall2(false)
																		}}>Отмена</button>
																		</>	
																	}
																	</div>
																	<div className='ContentEditProduct__AddProductionForm__Form__img__Dop__item3'>
																			<input type="file"  name='' id={'UploadImgSmall3'}  onChange={handleChangeSmall3} />								
																			<img src={LoadingImgSmall3 ? `${LinkServer.Server}Product/${NameFileSmall3}` : `.././img/noImg.png`} alt="" />
																			{!fileSmall3?
																			<>
																				<label htmlFor="UploadImgSmall3" >+</label>							
																			</>:
																			<>
																			<label onClick={() => {
																				Uploading(fileSmall3)
																			}}>{ICON.Save}</label>
																			<button 
																			className='ContentEditProduct__AddProductionForm__Form__img__Dop__item__exit'
																			onClick={() => {
																				setFileSmall3('')
																				setNameFileSmall3('')
																				setLoadingImgSmall3(false)
																			}}>Отмена</button>
																			</>	
																		}
																	</div>
																	</div>
														</section>
														<section className='ContentEditProduct__AddProductionForm__Form__inform'>
															<div className='ContentEditProduct__AddProductionForm__Form__inform__title'>
																	<input type="text" 
																	className='ContentEditProduct__AddProductionForm__Form__inform__title__input'
																	onChange={(event) => {
																		setValueDAtaNewProduct({...ValueDAtaNewProduct, title: event.target.value})
																	}}
																	id='TitleNewProd' placeholder='' required/>
																	<label 
																	className='ContentEditProduct__AddProductionForm__Form__inform__title__label'
																	htmlFor="TitleNewProd">Название продукта</label>
															</div>
															<div className='ContentEditProduct__AddProductionForm__Form__inform__Block1'>
																<div className='ContentEditProduct__AddProductionForm__Form__inform__Block1__article'>
																		<input type="text" 
																		onChange={(event) => {
																			setValueDAtaNewProduct({...ValueDAtaNewProduct, article: event.target.value})
																		}}
																		className='ContentEditProduct__AddProductionForm__Form__inform__Block1__article__input'
																		id='ArticleNewProd' placeholder='' required/>
																		<label 
																		className='ContentEditProduct__AddProductionForm__Form__inform__Block1__article__label'
																		htmlFor="ArticleNewProd">Артикул</label>
																</div>	
																<div className='ContentEditProduct__AddProductionForm__Form__inform__Block1__materials'>
																		<input type="text" 
																		onChange={(event) => {
																			setValueDAtaNewProduct({...ValueDAtaNewProduct, materials: event.target.value})
																		}}
																		className='ContentEditProduct__AddProductionForm__Form__inform__Block1__materials__input'
																		id='materialsNewProd' placeholder='' required/>
																		<label 
																		className='ContentEditProduct__AddProductionForm__Form__inform__Block1__materials__label'
																		htmlFor="materialsNewProd">Материал</label>
																</div>	
															</div>	
															<div 
															className='ContentEditProduct__AddProductionForm__Form__inform__Block2'
															>
																<div className='ContentEditProduct__AddProductionForm__Form__inform__Block2__quantity'>
																		<input type="number" 
																		onChange={(event) => {
																			setValueDAtaNewProduct({...ValueDAtaNewProduct, quantity: Number(event.target.value)})
																		}}
																		className='ContentEditProduct__AddProductionForm__Form__inform__Block2__quantity__input'
																		id='ArticleNewProd' placeholder='' required/>
																		<label 
																		className='ContentEditProduct__AddProductionForm__Form__inform__Block2__quantity__label'
																		htmlFor="ArticleNewProd">Количество</label>
																</div>
																<div className='ContentEditProduct__AddProductionForm__Form__inform__Block2__price'>
																		<input type="number" 
																		onChange={(event) => {
																			setValueDAtaNewProduct({...ValueDAtaNewProduct, price: Number(event.target.value)})
																		}}
																		className='ContentEditProduct__AddProductionForm__Form__inform__Block2__price__input'
																		id='ArticleNewProd' placeholder='' required/>
																		<label 
																		className='ContentEditProduct__AddProductionForm__Form__inform__Block2__price__label'
																		htmlFor="ArticleNewProd">Цена</label>
																</div>
															</div>
															<div 
															className='ContentEditProduct__AddProductionForm__Form__inform__description'
															>
																<p>Описание</p>
																<textarea
																onChange={(event) => {
																	setValueDAtaNewProduct({...ValueDAtaNewProduct, description: event.target.value})
																}}
																className='ContentEditProduct__AddProductionForm__Form__inform__description__textarea'
																name="" id="" spellCheck={true} required></textarea>
															</div>
															<div
															className='ContentEditProduct__AddProductionForm__Form__inform__NewStatus'
															>
																<p>Статус новой продукции</p>
																<div
																className='ContentEditProduct__AddProductionForm__Form__inform__NewStatus__BlockRadio'
																>
																	<div className='ContentEditProduct__AddProductionForm__Form__inform__NewStatus__BlockRadio__Active' >
																		<input type="radio" name="NewStatus" id="ActiveStatusNew" onClick={() => {
																			setValueNewNewStatus(true)
																		}}/>
																		<label htmlFor="ActiveStatusNew">Активировать</label>
																	</div>
																	<div className='ContentEditProduct__AddProductionForm__Form__inform__NewStatus__BlockRadio__DeActive' >
																			<input type="radio" name="NewStatus" id="DeActiveStatusNew" 
																			onClick={() => {
																				setValueNewNewStatus(false)
																			}}
																			/>
																			<label htmlFor="DeActiveStatusNew">Деактивировать</label>
																	</div>

																</div>
															</div>
														</section>
														<button 	
														type='submit'									
														className='BTNAddProduct'>{ICON.Save}</button>
													</form>
												</div>
									</ModalWindow>
						</div>
)
}

export default EditProduction