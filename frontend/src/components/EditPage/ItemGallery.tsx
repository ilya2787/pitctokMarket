import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import axios from 'axios'
import { LinkServer } from '../../page/Link'
import { TypeListImgProductItem } from '../TypesData/TypesData'
import { ICON } from '../ImportIcon/ImportIcon'

interface TypeProps{
	dataImg: TypeListImgProductItem
}

const ItemGallery:FC<TypeProps> = ({dataImg}) => {

	const [fileS, setFileS] = useState<string>('')
	const [NameFile, setNameFile] = useState<string>('')

	const [ActiveEdit, setActiveEdit] = useState<boolean>(false)

	const handleChangeSmall1 = (event:any) => {
		if(event){
			const file = event.target.files[0]
			setFileS(file)
			setNameFile(file?.name)
		}
	}

const UpdateImgSmall =() => {
	if(fileS !== ''){
		const formData = new FormData();
		formData.append('file', fileS);
		axios.post<any>('/UploadFile', formData)
		.then(res => {
			const value = {Link: NameFile, id:dataImg.id}
			axios.post<any>('/UpdateImgGallery', value)
			.then(res => {
					if(res.data.Status === 'TRUE'){
						setFileS('')
						setActiveEdit(false)
					}
			})
			.catch(err => console.log(err));
		})
		.catch(err => console.log(err));
	}
}

 return (
				<>
					{ActiveEdit ?
						<div className='ContentEditProduct__ListProductEdit__item__img__DopImg__Input'>
						<input type="file"  name='' id={'UploadImgSmall1'}  onChange={(event) => handleChangeSmall1(event)} />
						<img src={NameFile === '' ? `${LinkServer.Server}Product/${dataImg.Link}` : `${LinkServer.Server}Product/${NameFile}`} alt="" />
						{!fileS ?
						<>
						<label htmlFor="UploadImgSmall1">+</label>
						<button className='ContentEditProduct__ListProductEdit__item__img__DopImg__Input__exit'
						onClick={() => {
							setActiveEdit(false)
						}}
						>	Отмена </button>
						</>
							:
							<>
							<label onClick={() => {
								UpdateImgSmall()
							}}>{ICON.Save}</label>
							<button
							className='ContentEditProduct__ListProductEdit__item__img__DopImg__Input__exit'
						onClick={() => {
							setActiveEdit(false)
							setFileS('')
							setNameFile('')
						}}
						>	Отмена </button>
							</>
						}
					</div>
					:	
					<div className='ContentEditProduct__ListProductEdit__item__img__DopImg__Input'>
						<img src={NameFile === '' ? `${LinkServer.Server}Product/${dataImg.Link}` : `${LinkServer.Server}Product/${NameFile}`} alt="" />
						<button 
						className='ContentEditProduct__ListProductEdit__item__img__DopImg__Input__Edit'
							onClick={() => {
								setActiveEdit(true)
							}}
						>{ICON.Pencil}</button>
					</div>
					}
				</>
)
}

export default ItemGallery