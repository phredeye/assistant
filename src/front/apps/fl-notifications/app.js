import React, { Fragment } from 'react'
import { useAppState } from 'store'
import { CommentList, UpdateList, Title, Padding } from 'components'
import { NotificationsFilter } from './filter'

export const App = () => {
	const { query, filter } = useAppState()
	const { type } = filter

	let title = 'Comments'
	if ( 'updates' === type ) {
		title = 'Updates'
	}

	return (
		<Fragment>
			<Title>{title}</Title>

			<Padding bottom={ 'updates' === type }>
				<NotificationsFilter />
			</Padding>

			{ 'comments' === type && <CommentList query={ query } pagination={ true } /> }
			{ 'updates' === type && <UpdateList query={ query } /> }
		</Fragment>
	)
}

export const AppIcon = ( { count = 0 } ) => {
	return (
		<svg width="20px" height="19px" viewBox="0 0 20 19" version="1.1">
			<g fill="currentColor" transform="translate(-319.000000, -53.000000)">
				<path d="M327,72 C328.04,72 328.882353,71.1945 328.882353,70.2 L325.117647,70.2 C325.117647,71.1945 325.96,72 327,72 Z M332.976668,66.0590357 L332.976668,61.65 C332.976668,58.8825 331.108235,56.574 328.411765,55.962 L328.411765,55.0911483 C328.411765,54.3441483 327.781176,54 327,54 C326.218824,54 325.588235,54.3441483 325.588235,55.0911483 L325.588235,55.962 C322.891765,56.574 320.98235,58.8825 320.98235,61.65 L320.98235,66.0590357 L319,67.0215302 L319,68.9750312 L335,68.9750312 L335,67.0215302 L332.976668,66.0590357 Z M331.056143,67.0382342 L322.940315,67.0382342 L322.940315,61.65 C322.940315,59.4135 324.661176,57.6 327,57.6 C329.338824,57.6 331.056143,59.4135 331.056143,61.65 L331.056143,67.0382342 Z"></path>
				{ count && <circle fill="#E10000" cx="336.5" cy="55.5" r="2.5"></circle> }
			</g>
		</svg>
	)
}
