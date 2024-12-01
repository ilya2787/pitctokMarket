import React, {useState} from 'react'
import './index.scss'
import { Player } from 'video-react'

interface TypeVideoData {
	Poster: string,
	SRCVideo: string
}


const BlockVideo = () => {
	const [DataVideo, setDataVideo] = useState<TypeVideoData>({
		Poster: './video/Poster1.png',
		SRCVideo: './video/Video1.MP4'
	})
 return (
						<div className='ContentVideo'> 
							<section className='ContentVideo_Video'>
								<video src={DataVideo.SRCVideo}  poster={DataVideo.Poster} controls preload='metadata'/>
							</section>
								 <section className='ContentVideo__nav'>
											<button onClick={() => {
												setDataVideo({
													Poster: './video/Poster1.png', 
													SRCVideo: './video/Video1.MP4'})
											}}><img src="./video/Poster1.png" alt="" /></button>
											<button onClick={() => {
												setDataVideo({
													Poster: './video/Poster2.png', 
													SRCVideo: './video/Video2.MP4'})
											}}><img src="./video/Poster2.png" alt="" /></button>
											<button onClick={() => {
												setDataVideo({
													Poster: './video/Poster3.png', 
													SRCVideo: './video/Video3.MOV'})
											}}><img src="./video/Poster3.png" alt="" /></button>
								 </section>
						</div>
)
}

export default BlockVideo