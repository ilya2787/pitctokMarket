import React, {useState} from 'react'
import './index.scss'

interface TypeNews {
	id: number,
	title: string,
	date: string,
	description: string
}

const BlockNewsMain = () => {

	const [ListNews, setListNews] = useState<TypeNews[]>([
		{
			id: 1,
			title: 'Заголовок для последней новости',
			date: '03.10.24 - 12:10',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et tincidunt dolor. Ut sit amet vulputate neque, nec pharetra ex. Praesent sit amet felis velit. Aliquam erat volutpat. Donec vel velit eu eros viverra aliquam. Cras ut faucibus lectus. Ut lectus turpis, dictum in egestas nec, tristique nec arcu. Proin at arcu sed velit blandit ultrices. Proin ultricies mi at metus porta, id lacinia mi imperdiet. Donec nec dignissim neque, interdum dignissim mauris. In aliquet, lorem vitae dignissim elementum, tellus neque semper velit, in vulputate sem augue vitae tortor. In nunc neque, imperdiet pretium consectetur ac, pretium nec magna.'
		},
		{
			id: 2,
			title: 'Заголовок для последней новости',
			date: '03.10.24 - 12:10',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et tincidunt dolor. Ut sit amet vulputate neque, nec pharetra ex. Praesent sit amet felis velit. Aliquam erat volutpat. Donec vel velit eu eros viverra aliquam. Cras ut faucibus lectus. Ut lectus turpis, dictum in egestas nec, tristique nec arcu. Proin at arcu sed velit blandit ultrices. Proin ultricies mi at metus porta, id lacinia mi imperdiet. Donec nec dignissim neque, interdum dignissim mauris. In aliquet, lorem vitae dignissim elementum, tellus neque semper velit, in vulputate sem augue vitae tortor. In nunc neque, imperdiet pretium consectetur ac, pretium nec magna.'
		},
		{
			id: 3,
			title: 'Заголовок для последней новости',
			date: '03.10.24 - 12:10',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et tincidunt dolor. Ut sit amet vulputate neque, nec pharetra ex. Praesent sit amet felis velit. Aliquam erat volutpat. Donec vel velit eu eros viverra aliquam. Cras ut faucibus lectus. Ut lectus turpis, dictum in egestas nec, tristique nec arcu. Proin at arcu sed velit blandit ultrices. Proin ultricies mi at metus porta, id lacinia mi imperdiet. Donec nec dignissim neque, interdum dignissim mauris. In aliquet, lorem vitae dignissim elementum, tellus neque semper velit, in vulputate sem augue vitae tortor. In nunc neque, imperdiet pretium consectetur ac, pretium nec magna.'
		},
	])


 return (
						<div className='ContentBlockNews'> 
								 <div className='ContentBlockNews__title'>
									<span className='ContentBlockNews__title__Line1'></span>
									<h3>Информация</h3>
									<span className='ContentBlockNews__title__Line2'></span>
								 </div>
								 <section className='ContentBlockNews_List'>
									{ListNews.map((d,i) => (
											<div className='ContentBlockNews_List__news' key={d.id}>
													<div className='ContentBlockNews_List__news__title'>
															<h3>{d.title}</h3>
															<p>Опубликовано: {d.date}</p>
													</div>
													<div className='ContentBlockNews_List__news__text'>
															<p>{d.description}</p>
													</div>
											</div>
									))}
								 </section>
								 <button className='ContentBlockNews_BTN'>Перейти ко всем новостям</button>
						</div>
)
}

export default BlockNewsMain