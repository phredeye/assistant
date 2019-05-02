import React from 'react'
import { __ } from '@wordpress/i18n'
import { getSystemActions } from 'store'
import { App, AppIcon } from './app'
import { search } from './search'
import { initialState, actions, reducers, effects } from './state'

const { registerApp } = getSystemActions()

registerApp( 'fl-media', {
	label: __( 'Media' ),
	content: <App />,
	icon: <AppIcon />,
	shouldShowTitle: false,
	state: initialState,
	actions,
	reducers,
	effects,
	search,
} )
