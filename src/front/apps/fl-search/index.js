import React from 'react'
import { __ } from '@wordpress/i18n'
import { getSystemActions } from 'store'
import { App, AppIcon } from './app'

const { registerApp } = getSystemActions()

registerApp( 'fl-search', {
	label: __( 'Search' ),
	content: <App />,
	icon: <AppIcon />,
	appearance: 'form',
} )
