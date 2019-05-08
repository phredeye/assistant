import React, { Fragment, useEffect, useRef, useState } from 'react'
import classname from 'classnames'
import { __ } from '@wordpress/i18n'
import { useComponentUpdate } from 'utils/hooks'
import { addLeadingSlash } from 'utils/url'
import { getSearchResults } from 'utils/wordpress'
import { useSystemState } from 'store'
import { Form, Icon } from 'components'
import './style.scss'

export const App = () => {
	const { apps } = useSystemState()
	const [ keyword, setKeyword ] = useState( '' )
	const [ loading, setLoading ] = useState( false )
	const [ results, setResults ] = useState( null )
	const timeout = useRef( null )
	const request = useRef( null )
	const classes = classname( {
		'fl-asst-search': true,
		'fl-asst-search-is-loading': loading,
	} )

	useComponentUpdate( () => {
		const { config, routes } = getRequestConfig()

		cancelRequest()

		if ( '' === keyword ) {
			setResults( null )
			return
		}

		timeout.current = setTimeout( () => {
			setLoading( true )

			request.current = getSearchResults( routes, response => {
				const newResults = {}

				response.map( ( result, key ) => {
					const { label, priority, format } = config[ key ]

					if ( ! result.length ) {
						return
					}
					if ( ! newResults[ priority ] ) {
						newResults[ priority ] = []
					}

					newResults[ priority ].push( {
						label,
						items: format( result ),
					} )
				} )

				setResults( newResults )
				setLoading( false )
			} )
		}, 1000 )

		return cancelRequest
	}, [ keyword ] )

	const getRequestConfig = () => {
		const config = []
		const routes = []

		const defaults = {
			priority: 1000,
			format: response => response,
		}

		const addRequestConfig = search => {
			config.push( Object.assign( {}, defaults, search ) )
			routes.push( addLeadingSlash( search.route( keyword ) ) )
		}

		Object.entries( apps ).map( ( [ key, app ] ) => {
			if ( ! app.search || ! app.search.route ) {
				return
			} else if ( Array.isArray( app.search ) ) {
				app.search.map( search => addRequestConfig( search ) )
			} else {
				addRequestConfig( app.search )
			}
		} )

		return { config, routes }
	}

	const cancelRequest = () => {
		if ( timeout.current ) {
			clearTimeout( timeout.current )
			timeout.current = null
		}
		if ( request.current ) {
			request.current.cancel()
			request.current = null
		}
	}

	return (
		<Fragment>
			<form className={ classes }>
				<Form.Item className='fl-asst-search-keyword'>
					<div className='fl-asst-search-spinner'>
						<Icon name='small-spinner' />
					</div>
					<input
						type='text'
						name='keyword'
						placeholder={ __( 'Start typing...' ) }
						value={ keyword }
						onChange={ e => setKeyword( e.target.value ) }
					/>
				</Form.Item>

				{ results && Object.entries( results ).map( ( [ key, groups ] ) => {
					return groups.map( ( group, key ) => {
						return (
							<Form.Section key={ key } isInset={ true } label={ group.label }>
								{ group.items.map( ( item, key ) =>
									<Form.Item key={ key }>{ item.label }</Form.Item>
								) }
							</Form.Section>
						)
					} )
				} ) }

				{ results && ! Object.entries( results ).length &&
					<Form.Section isInset={ true } label={ __( 'No Results Found' ) }>
						<Form.Item>
							{ __( 'Please try a different search.' ) }
						</Form.Item>
					</Form.Section>
				}
			</form>
		</Fragment>
	)
}

export const AppIcon = () => {
	return (
		<svg width="29px" height="24px" viewBox="0 0 29 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
			<g fill="transparent" transform="translate(-145.000000, -145.000000)" fillRule="nonzero" strokeWidth="2" stroke="currentColor">
				<circle cx="158.5" cy="155.5" r="5.5"></circle>
				<path d="M172.014075,163 L172.014075,148 C172.014075,146.895431 171.118644,146 170.014075,146 L148,146 C146.895431,146 146,146.895431 146,148 L146,165.010842 C146,166.115411 146.895431,167.010842 148,167.010842 L170.014075,167.010842 L162.5,159.5" strokeLinecap="round" strokeLinejoin="round"></path>
			</g>
		</svg>
	)
}
