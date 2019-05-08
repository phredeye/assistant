import { __ } from '@wordpress/i18n'
import { addQueryArgs } from 'utils/url'

export const search = {
	label: __( 'Media' ),
	priority: 100,
	route: keyword => {
		return addQueryArgs( 'fl-assistant/v1/attachments', {
			s: keyword,
		} )
	},
	format: response => {
		return response.map( result => ( {
			label: result.title,
		} ) )
	},
}
