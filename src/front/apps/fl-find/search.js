import { __ } from '@wordpress/i18n'
import { addQueryArgs } from 'utils/url'

export const search = {
	label: __( 'Content' ),
	priority: 1,
	route: keyword => {
		return addQueryArgs( 'fl-assistant/v1/posts', {
			post_type: 'any',
			s: keyword,
		} )
	},
	format: response => {
		return response.map( result => ( {
			label: result.title,
		} ) )
	},
}
