import React, { FC, ReactElement, PropsWithChildren, useEffect } from 'react';
import { Transition } from 'react-transition-group';
import {ICON} from './../ImportIcon/ImportIcon'
import './index.scss';
import TitleContentPage from '../TitleContentPage/TitleContentPage';

interface ModalContentType extends PropsWithChildren {
	modalIsOpen: boolean,
	onClose: () => void,
	title: string,
}

const ModalWindow:FC<ModalContentType> = ({modalIsOpen, onClose, title, children}) =>{

  useEffect(() => {
    if(modalIsOpen){
      document.body.style.overflow = "hidden"
    }else{
      document.body.style.overflowY = "scroll"
      document.body.style.overflowX = "hidden"
    }
  },[modalIsOpen])

 return (
	<>
	<Transition in={modalIsOpen} timeout={350} unmountOnExit={true}>
		{(state) => (
			<div className={`Modal_background ${state}`}  id="ContentModal" onClick={() => onClose()}>
			<div className='Modal_container' onClick={(e) => e.stopPropagation()}>
				<button onClick={() => onClose()} className='btnClosed'>{ICON.Exit}</button>
				<TitleContentPage TitlePage={title} TitlePageNav=''/>
					<div className='Modal_content'>
						{children}
					</div>
			</div>
		</div>
		)
		}				
	</Transition>
	</>
 )
}

export default ModalWindow