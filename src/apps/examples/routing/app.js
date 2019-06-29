import React from 'fl-react'
import { Switch, Route, Link } from 'fl-react-router-dom'
import { Page, List } from 'assistant/lib'

export const App = ( { match } ) => {
	const { url } = match
	return (
		<Switch>
			<Route exact path={`${url}/`} component={Main} />
			<Route path={`${url}/second`} component={SecondaryScreen} />
		</Switch>
	)
}

const Main = () => {
	return (
		<Page>
			<List>
				<h1>Heading 1</h1>
				<h2>Heading Two</h2>
				<h3>Heading 3</h3>
				<h4>Heading Quatre</h4>
				<h5>Heading 5</h5>
				<h6>Why would anyone use a Heading 6?</h6>
				<p>Paragraph - Nullam id dolor id nibh ultricies vehicula ut id elit. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>
				<blockquote>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras mattis consectetur purus sit amet fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam id dolor id nibh ultricies vehicula ut id elit.</blockquote>
				<hr />
				<Link to="/fl-example-routing/second">Go To Second Screen</Link>
			</List>
		</Page>
	)
}

const SecondaryScreen = () => {
	return (
		<Page>
			<h1>Second Screen</h1>
			<p>Paragraph - Nullam id dolor id nibh ultricies vehicula ut id elit. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>
		</Page>
	)
}

export const AppIcon = () => {
	return (
		<svg width="28px" height="26px" viewBox="0 0 28 26" version="1.1" xmlns="http://www.w3.org/2000/svg">
			<g transform="translate(0.000000, -1.000000)" fill="currentColor" fillRule="nonzero">
				<path d="M14,22.2337212 L8.08947087,26.349482 C6.53280507,27.4334567 4.48257016,25.9438738 5.03245518,24.12843 L7.12032234,17.2353428 L1.37954729,12.8859356 C-0.132410107,11.740425 0.650709942,9.33022932 2.54722338,9.29219808 L9.74812538,9.14779664 L12.1106604,2.34395437 C12.7328851,0.55201521 15.2671149,0.55201521 15.8893396,2.34395437 L18.2518746,9.14779664 L25.4527766,9.29219808 C27.3492901,9.33022932 28.1324101,11.740425 26.6204527,12.8859356 L20.8796777,17.2353428 L22.9675448,24.12843 C23.5174298,25.9438738 21.4671949,27.4334567 19.9105291,26.349482 L14,22.2337212 Z M14,19.8764735 L19.0510868,23.2665828 C19.5096614,23.5743617 20.1309135,23.4521177 20.4386924,22.9935431 C20.6078958,22.7414389 20.6533977,22.426115 20.5623715,22.1364591 L18.796596,16.5175563 L23.6034367,13.0074167 C24.0494593,12.6817139 24.1469977,12.0561069 23.8212949,11.6100843 C23.6370313,11.3577508 23.3454162,11.2060461 23.0330242,11.2000081 L16.9644593,11.0827142 L14.9408087,5.46555626 C14.7536184,4.94596195 14.1806563,4.67649524 13.661062,4.86368552 C13.3808078,4.96465056 13.1601563,5.18530207 13.0591913,5.46555626 L11.0355407,11.0827142 L4.96697585,11.2000081 C4.41479423,11.2106808 3.97581446,11.6669643 3.9864871,12.2191459 C3.99252505,12.531538 4.14422979,12.8231531 4.39656328,13.0074167 L9.20340402,16.5175563 L7.43762848,22.1364591 C7.27205294,22.6633397 7.56494857,23.2246864 8.09182918,23.3902619 C8.38148506,23.4812881 8.696809,23.4357862 8.94891319,23.2665828 L14,19.8764735 Z"></path>
			</g>
		</svg>
	)
}