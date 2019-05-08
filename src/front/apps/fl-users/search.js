import { __ } from '@wordpress/i18n'
import { addQueryArgs } from 'utils/url'

export const search = {
	label: __( 'People' ),
	priority: 200,
	route: keyword => {
		return addQueryArgs( 'fl-assistant/v1/users', {
			search: `*${ keyword }*`,
		} )
	},
	format: response => {
		return response.map( result => ( {
			label: result.displayName,
		} ) )
	},
}
