import React, { Fragment, useContext } from 'react'
import { useSystemState, getSystemActions } from 'store'
import { Heading, Icon, UIContext, Button } from 'components'
import './style.scss'

const AppsMenu = () => {
	const { apps, order } = useSystemState()
	const { setActiveApp } = useContext( UIContext )
	const excludedApps = [ 'fl-notifications' ]

	const clickItem = key => {
		setActiveApp( key )
	}

	return (
		<Fragment>
			<Heading className="fl-asst-manage-apps-title">Apps</Heading>
			<div className="fl-asst-app-list">
				{ order.map( ( key ) => {

					if ( excludedApps.includes( key ) ) {
						return null
					}

					const app = apps[key]

					if ( 'undefined' === typeof app || false === app.enabled ) {
						return null
					}

					if ( 'function' !== typeof app.icon ) {
						app.icon = props => <Icon name="default-app" {...props} />
					}

					return (
						<Button className="fl-asst-app-list-item" key={key} appearance="transparent" onClick={ () => clickItem( key ) }>
							{ app.icon() }
							<div className="fl-asst-app-list-item-title">
								{app.label}
							</div>
						</Button>
					)
				} )}
			</div>
		</Fragment>
	)
}

export const useAppsMenu = () => {
	const { isShowingAppsMenu } = useSystemState()
	const { setIsShowingAppsMenu } = getSystemActions()
	const { presentModal, dismissModal } = useContext( UIContext )
	const modalID = 'fl-apps'

	const showAppsMenu = () => {
		presentModal( <AppsMenu />, {
			id: modalID,
			appearance: 'menu',
			onDismiss: () => {
				setIsShowingAppsMenu( false )
			}
		} )
		setIsShowingAppsMenu( true )
	}

	const hideAppsMenu = () => {
		dismissModal( modalID )
		setIsShowingAppsMenu( false )
	}

	const toggleIsShowingAppsMenu = () => {
		if ( ! isShowingAppsMenu ) {
			showAppsMenu()
		} else {
			hideAppsMenu()
		}
	}

	return {
		isShowingAppsMenu,
		showAppsMenu,
		hideAppsMenu,
		toggleIsShowingAppsMenu,
	}
}
