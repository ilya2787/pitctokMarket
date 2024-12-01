import React, { ChangeEventHandler, Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import { ICON } from '../../components/ImportIcon/ImportIcon';
import './index.scss';
import { Context } from '../../App';
import { ContextCatalog } from '../../page/Catalog/Catalog';

interface TypeProps {
	setCheckedAvailable: Dispatch<SetStateAction<boolean>>
}

interface TypeSorting{
	id: number
	Name: string
}

const FilterProduction:FC<TypeProps> = ({setCheckedAvailable}) => {
	const DataCatalog = useContext(ContextCatalog)
	const ListProduction = DataCatalog.ListProduction

	const [SortingVarian, setSortingVarian] = useState<TypeSorting[]>([
		{
			id: 1,
			Name: 'С начало дорогие'
		},
		{
			id: 2,
			Name: 'С начало дешевые'
		},
		{
			id: 3,
			Name: 'Новинки'
		},
		{
			id: 4,
			Name: 'Скидки'
		},
	])
	const [TitleSorting, setTitleSorting] = useState<string>('С начало дорогие')
	const [ListOpenSorting, setListOpenSorting] = useState<boolean>(false)
	const BlockSorting = useRef<HTMLDivElement>(null)
	const IconSorting = useRef<HTMLSpanElement>(null)


const [CheckedValue, setCheckedValue] = useState<boolean>(false)
const ValueCheck:ChangeEventHandler<HTMLInputElement> = (event) => {
		if(event.target.checked){
			setCheckedValue(true)
		}else{
			setCheckedValue(false)
		}
}

useEffect(() => {
	if(CheckedValue){
		setCheckedAvailable(true)
	}else{
		setCheckedAvailable(false)
	}
},[CheckedValue])

	useEffect(() => {
		if(ListOpenSorting){
			IconSorting.current?.classList.add('Active')
		}else{
			IconSorting.current?.classList.remove('Active')
		}
	},[ListOpenSorting])

 return (
					<section className='Product_filter'>
					<div className='Product_filter__available'>
							<input type="checkbox" onChange={(event) => ValueCheck(event)} name="CheckAvailable" id="Check" />
							<label htmlFor="Check">В наличии</label>
					</div>
					<div className='Product_filter_sorting'>
							<div className='Product_filter_sorting_title' onClick={() => setListOpenSorting(!ListOpenSorting)}>
								<h3>{TitleSorting}</h3>
								<span className='Product_filter_sorting_title_Icon' ref={IconSorting}>{ICON.UpDownArrow}</span>
							</div>
							<div className='Product_filter_sorting_block' ref={BlockSorting} style={ListOpenSorting ? {height:BlockSorting.current?.scrollHeight +
							"px" } : { height: "0px" }}>
								<ul>
										{SortingVarian.map((d,i) => (
											<li key={d.id} onClick={() => setTitleSorting(d.Name)}>{d.Name}</li>									
										))}
								</ul>
							</div>
					</div>
				</section>
)
}

export default FilterProduction