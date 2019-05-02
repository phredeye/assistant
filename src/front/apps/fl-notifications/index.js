import React from 'react'
import { __ } from '@wordpress/i18n'
import { getSystemActions } from 'store'
import { currentUserCan } from 'utils/wordpress'
import { App, AppIcon } from './app'
import { search } from './search'
import { initialState, actions, reducers, effects } from './state'

const { registerApp } = getSystemActions()

registerApp( 'fl-notifications', {
	label: __( 'Notifications' ),
	content: <App />,
	icon: <AppIcon />,
	shouldShowTitle: false,
	enabled: (
		currentUserCan( 'update_plugins' ) ||
		currentUserCan( 'update_themes' ) ||
		currentUserCan( 'moderate_comments' )
	),
	state: initialState,
	actions,
	reducers,
	effects,
	search,
} )
