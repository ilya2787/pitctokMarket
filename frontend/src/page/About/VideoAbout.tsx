import React, { FC, useRef } from 'react'

interface  TypeVideoList {
	id: number,
	videoLink : string,
	text: string
}

interface TypeProps{
	data: TypeVideoList
}

const VideoAbout:FC<TypeProps> = ({data}) => {

	const VideoItem = useRef<any>(null)

const OnMouseLeave = () => {
		VideoItem.current.pause()
}
const OnMouseOver = () => {
		VideoItem.current.play()
}

 return (
					<div 
					className='PageAbout__Content__Block__Video__item' >
						<video id='Video' ref={VideoItem} src={data.videoLink} muted loop />
							<span 
							className='PageAbout__Content__Block__Video__item__text' onMouseOver={OnMouseOver} onMouseOut={OnMouseLeave}>{data.text}</span>
					</div>
)
}

export default VideoAbout