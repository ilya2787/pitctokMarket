import React, {FC, useContext, useEffect, useState} from 'react'
import '.././style/Home.scss';
import Header from '.././components/Header/Header';
import Menu from '.././components/Menu/Menu';
import BlockVideo from '.././components/BlockVideo/BlockVideo';
import BlockIconMain from '.././components/BlockIconMain/BlockIconMain';
import BlockIMG from '.././components/BlockIMG/BlockIMG';
import BlockNewsMain from '.././components/BlockNewsMain/BlockNewsMain';
import Footer from '.././components/Footer/Footer';
import axios from 'axios';
import { Context } from '../App';
import { ReactNotifications } from 'react-notifications-component';

const Home = () => {
	const DataContentAll = useContext(Context)
	const setListUsers = DataContentAll.setListUsers
	const ListMenu = DataContentAll.ListMenu
	const setLastName = DataContentAll.setLastName
	const CatalogListNav = DataContentAll.CatalogListNav
	const ListSocial = DataContentAll.ListSocial
	const setAuth = DataContentAll.setAuth

	const [IdUser, setIdUser] = useState<number>(0)
	axios.defaults.withCredentials = true;
	useEffect(() => {
    async function Autoriz () {
      axios.get(`/Home`)
      .then((res : any)=> {
        if(res.data.Status === "Success"){
          setAuth(true)
					setLastName(res.data.LastName)
          setIdUser(res.data.IdUser)
        }else{
          setAuth(false)
        }
      })
      .catch(err => console.log(err));
    }
    Autoriz();
  },[setAuth]);

	useEffect(() => {
		const ListUserF = async () => {
			axios.get('/UsersAll')
			.then((res: any) => {
				setListUsers(res.data)
			})
		}
		ListUserF()
	},[setListUsers])
	
 return (
					<>
					<ReactNotifications/>
						<Header />
						<Menu ListMenuPage={ListMenu} CatalogListNavPage={CatalogListNav}/>
						<BlockVideo />
						<BlockIconMain />
						<BlockIMG />
						<BlockNewsMain />
						<Footer ListMenuPage={ListMenu} ListSocialPage={ListSocial}/>				
					</>
						
)
}

export default Home