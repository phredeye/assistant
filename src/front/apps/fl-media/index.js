import React, { Fragment } from 'react'
import { useAppState, getSystemDispatch } from 'store'
import { ScreenHeader, MediaList } from 'components'
import { MediaListFilter } from './filter'

const { registerApp } = getSystemDispatch()

export const MediaTab = () => {
	const [ query ] = useAppState( 'query' )
	return (
		<Fragment>
			<ScreenHeader>
				<MediaListFilter />
			</ScreenHeader>
			<MediaList
				query={ query }
				pagination={ true }
			/>
		</Fragment>
	)
}

export const MediaIcon = () => {
	return (
		<svg width="29px" height="24px" viewBox="0 0 29 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
			<g transform="translate(-187.000000, -145.000000)" fillRule="nonzero" fill="transparent" strokeWidth="2" stroke="currentColor">
				<path d="M214.014075,161 L214.014075,148 C214.014075,146.895431 213.118644,146 212.014075,146 L190,146 C188.895431,146 188,146.895431 188,148 L188,165.010842 C188,166.115411 188.895431,167.010842 190,167.010842 L214.014075,167.010842 L205,158 L201.5,161 L195,154.5 L191.5,157.5" strokeLinecap="round" strokeLinejoin="round"></path>
				<circle cx="207" cy="152" r="3"></circle>
			</g>
		</svg>
	)
}

registerApp( 'fl-media', {
	label: 'Media',
	content: props => <MediaTab {...props} />,
	icon: props => <MediaIcon {...props} />,
	state: {
		query: null,
		filter: {
			type: 'image',
		},
	},
} )
