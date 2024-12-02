import React, { FC, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import TitleContentPage from '../../components/TitleContentPage/TitleContentPage'
import { ContextAccount } from './Account'
import { Context } from '../../App'
import BlockInfoAccountUser from '../../components/BlockInfoAccountUser/BlockInfoAccountUser'
import BlockInfoAccountAdmin from '../../components/BlockInfoAccountAdmin/BlockInfoAccountAdmin'


const Info:FC = () => {
	const DataApp = useContext(Context)
	const idUser = DataApp.idUsers
	const DataAccount = useContext(ContextAccount)
	const ListUser = DataAccount.ListUser
	const [LastName, setLastName] = useState<string>('')


useEffect(() => {
	ListUser.map(d => {
		if(d.id === idUser){
			setLastName(d.LastName)
		} 
	})
},[ListUser])


 return (
						<div> 
							<TitleContentPage TitlePage="Аккаунт" TitlePageNav=''/>	
							{ListUser.length > 0 ?
									<div className='ContentBlockAccount'>
									{	LastName === 'Администратор' 
										?
											<BlockInfoAccountAdmin/>
										: 
											<BlockInfoAccountUser />
										}						
									</div>
									:null }
									
						</div>
)
}

export default Info