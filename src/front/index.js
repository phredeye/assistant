import React, { StrictMode, useState } from 'react'
import { render } from 'react-dom'
import { UI, ShowUITrigger } from './ui'
import { CurrentPageViewContext } from 'components'

/**
 * Setup the primary UI
 */
const initialIsShowingUI = true

/**
 * The Root Component
 */
const App = props => {
    const [ isShowingUI, setIsShowingUI ] = useState(initialIsShowingUI)

    // Create a toggle function to show/hide the panel
    const toggleUI = () => isShowingUI ? setIsShowingUI(false) : setIsShowingUI(true)

    return (
        <StrictMode>
            {/* This is the button that toggles the UI panel */}
            <ShowUITrigger onClick={toggleUI} />

            {/* This is the panel itself */}
            <UI isShowing={isShowingUI} toggleUI={toggleUI} />
        </StrictMode>
    )
}

// Render App into the document
const root = document.createElement('div')
root.classList.add('fl-asst')
document.body.appendChild(root)

render(<App />, root)