import { __ } from '@wordpress/i18n'
import { addQueryArgs } from 'utils/url'

export const search = {
	label: __( 'Comments' ),
	priority: 300,
	route: keyword => {
		return addQueryArgs( 'fl-assistant/v1/comments', {
			search: keyword,
		} )
	},
	format: response => {
		return response.map( result => ( {
			label: result.meta,
		} ) )
	},
}
