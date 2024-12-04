import React, { createContext, FC, useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import './style/App.scss';
import { createBrowserRouter, RouterProvider, useLocation} from 'react-router-dom';
import Home from './page/Home';
import Error404 from './page/Error404';
import Catalog from './page/Catalog/Catalog';
import CatalogName from './page/CatalogName/CatalogName';
import ProductionPage from './page/ProductionPage/ProductionPage';
import { ICON } from './components/ImportIcon/ImportIcon';
import Account from './page/Account/Account';
import axios from 'axios';
import Favorites from './page/Favorites/Favorites';
import {TypeListMenu, TypeSocial, TypeListUsers, TypeListProductionBasket, TypeListProduction, TypeListUserFavorites} from './components/TypesData/TypesData'
import 'react-notifications-component/dist/scss/notification.scss'
import { Store } from 'react-notifications-component';
import MakingAnOrder from './page/MakingAnOrder/MakingAnOrder';
import OrdersUser from './page/OrdersUser/OrdersUser';
import Info from './page/Account/Info';
import EditCatalog from './page/Account/EditCatalog/EditCatalog';
import EditNews from './page/Account/EditNews';
import AllNewsPage from './components/BlockNewsMain/AllNewsPage';
import ListAllUserAdmin from './page/Account/ListAllUserAdmin';
import ListOrderUserAll from './page/Account/ListOrderUserAll';
import ActiveOrder from './page/Account/ActiveOrder';

const rout = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error404 />,
  },
  {
    path: '/Catalog',
    element: <Catalog />,
    errorElement: <Error404 />,
    children: [
      {
        path: '/Catalog/:CatalogName',
        element: <CatalogName />
      },
      {
        path: '/Catalog/:CatalogName/:idProduct',
        element: <ProductionPage />
      }
    ]
  },
	{
		path: '/Account',
		element: <Account/>,
		errorElement: <Error404/>,
		children: [
			{
        path: '/Account/Info',
        element: <Info />
      },
      {
        path: '/Account/Order',
        element: <OrdersUser/>
      },
			{
        path: '/Account/EditCatalog',
        element: <EditCatalog/>
      },
			{
        path: '/Account/EditNews',
        element: <EditNews/>
      },
			{
        path: '/Account/AllListUser',
        element: <ListAllUserAdmin/>
      },
			{
        path: '/Account/AllListUser/ListOrderUser/:idU',
        element: <ListOrderUserAll />
      },
			{
        path: '/Account/ActiveOrder',
        element: <ActiveOrder/>
      },
		]
	},
	{
		path: '/Favorites',
		element: <Favorites/>,
		errorElement: <Error404/>
	},
	{
		path: '/MakingAnOrder/:idUser',
		element: <MakingAnOrder />,
		errorElement: <Error404/>
	},
	{
		path: '/Home/AllNews',
		element: <AllNewsPage/>,
		errorElement: <Error404/>
	},

])


type TypeContext = {
  ListMenu: Array<TypeListMenu>
  CatalogListNav: Array<TypeListMenu>
	setCatalogListNav: Dispatch<SetStateAction<TypeListMenu[]>>
  ListSocial: Array<TypeSocial>
	idUsers: number
	setIdUser: Dispatch<SetStateAction<number>>
	LastName: string
	setLastName: Dispatch<SetStateAction<string>>
	Auth: boolean
	setAuth: Dispatch<SetStateAction<boolean>>
	ListUsers: Array<TypeListUsers>
	setListUsers: Dispatch<SetStateAction<TypeListUsers[]>>
	ListBasket: Array<TypeListProductionBasket>
	setListBasket: Dispatch<SetStateAction<TypeListProductionBasket[]>>
	AddProductBasket: (el:TypeListProduction, quantity_item?:number, idProd?:number) => void
}
export const Context = createContext<TypeContext>({
  ListMenu: [],
  CatalogListNav: [],
	setCatalogListNav: () => {},
  ListSocial: [],
	idUsers: 0,
	setIdUser: () => {},
	LastName: '',
	setLastName: () => {},
	Auth: false,
	setAuth: () => {},
	ListUsers: [],
	setListUsers: () => {},
	ListBasket: [],
	setListBasket: () => {},
	AddProductBasket: () => {}
})

const App:FC = () => {

	
	const [LastName, setLastName] = useState<string>('')
	const [idUser, setIdUser] = useState<number>(0)
	const [Auth, setAuth] = useState<boolean>(false);
	const [ListBasket, setListBasket] = useState<TypeListProductionBasket[]>([])

	const [ListMenu, setListMenu] = useState<TypeListMenu[]>([
		{
			id:1,
			Name: 'Главная',
			Link: "/"
		},
		{
			id:2,
			Name: 'Реставрация',
			Link: "#"
		},
		{
			id:3,
			Name: 'Каталог',
			Link: "#"
		},
		{
			id:4,
			Name: 'О компании',
			Link: "#"
		},
		{
			id:5,
			Name: 'Доставка',
			Link: "#"
		},
	])
	const [CatalogListNav, setCatalogListNav] = useState<TypeListMenu[]>([])
	const [ListSocial, setListSocial] = useState<TypeSocial[]>([
		{
			id: 1,
			Icon: ICON.Vk,
			title: 'Мы вконтакте',
			LinkA: '#',
			LinkP: 'vk.com/pitctok'
		},
		{
			id: 2,
			Icon: ICON.Telegram,
			title: 'Мы телеграм',
			LinkA: '#',
			LinkP: 't.me/pitctok'
		},
		{
			id: 3,
			Icon: ICON.Instagram,
			title: 'Мы инстаграм',
			LinkA: '#',
			LinkP: 'pit_ctok39'
		}
	])
	const [ListUsers, setListUsers] = useState<TypeListUsers[]>([])


const AddProductBasket = (el:TypeListProduction, quantity_item = 1, idProd?:number) => {
let Id = 0
	if(idProd){
		Id = Number(idProd)
	}else{
		Id = el.id
	}
	const itemsIndex = ListBasket.findIndex(value => value.id === Id)
	if(itemsIndex < 0 ){
		const NewItem = {
			id: Id,
			title: el.title,
			article: el.article,
			price: el.price,
			img: el.img,
			quantity: el.quantity,
			idUser: idUser,
			quantity_item: quantity_item
		};
		setListBasket([...ListBasket, NewItem])	
		Store.addNotification({
			title: 'Выполнено',
			message: 'Продукция успешно добавлена',
			type: 'success',
			container: 'top-right',
			dismiss: {
				duration: 2000,
				onScreen: true
			}
		})
	}else{
		const NewItem = {
			...ListBasket[itemsIndex],
			quantity_item: ListBasket[itemsIndex].quantity_item < ListBasket[itemsIndex].quantity ? ListBasket[itemsIndex].quantity_item + quantity_item : ListBasket[itemsIndex].quantity
		}
		const newCard = ListBasket.slice();
		newCard.splice(itemsIndex, 1, NewItem)
		setListBasket(newCard)
		if(newCard[itemsIndex].quantity === newCard[itemsIndex].quantity_item){
			Store.addNotification({
				title: 'Внимание!',
				message: 'Вы добавили максимальное количество',
				type: 'warning',
				container: 'top-right',
				dismiss: {
					duration: 2000,
					onScreen: true
				}
			})
		}else{
			Store.addNotification({
				title: 'Выполнено',
				message: 'Количество в данной позиции обновлено',
				type: 'success',
				container: 'top-right',
				dismiss: {
					duration: 2000,
					onScreen: true
				}
			})
		}
	}
}

useEffect(() => {
	axios.get('/ListNavMenu')
	.then((res: any) => {
		setCatalogListNav(res.data)
	})
},[setCatalogListNav])


  return (
		<Context.Provider value={
			{
				ListMenu: ListMenu,
				CatalogListNav: CatalogListNav,
				setCatalogListNav: setCatalogListNav,
				ListSocial: ListSocial,
				idUsers: idUser,
				setIdUser: setIdUser,
				Auth: Auth,
				setAuth: setAuth,
				LastName:LastName,
				setLastName: setLastName,
				ListUsers: ListUsers,
				setListUsers: setListUsers,
				ListBasket: ListBasket,
				setListBasket: setListBasket,
				AddProductBasket: AddProductBasket
			}
		}>
			<RouterProvider router={rout} />
			</Context.Provider>
  );
}

export default App;


