import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Icon, VerticalGroup, Separator } from 'components'
import { PanelFrame, PanelChrome } from 'components/panel-parts'
import { TabManager, Tab } from 'components/tabs'
import 'apps/core'
import './style.scss'

/**
 * Main UI Controller
 */
const UI = ({ isShowing, toggleUI, apps }) => {
    const [ activeTabName, setActiveTabName ] = useState('fl-navigate')
    const { label, title } = apps[activeTabName]

    if ( !isShowing ) return null

    return (
        <PanelFrame>
            <div className="fl-asst-panel-wrap">
                <PanelChrome
                    tabs={apps}
                    onTabClick={setActiveTabName}
                    activeTabName={activeTabName}
                    onClose={toggleUI}
                />
                <Separator isSlim={true} />

                <div className="fl-asst-panel-contents">
                    <TabManager activeTabName={activeTabName}>
                        {Object.keys(apps).map( key => {
                            const tab = apps[key]
                            return (
                                <Tab key={key} name={key}>{tab.content}</Tab>
                            )
                        })}
                    </TabManager>
                </div>
            </div>
        </PanelFrame>
    )
}

export default connect(
	state => {
		return {
			apps: state.apps
		}
	}
)( UI )

/**
 * Button To Show/Hide The UI
 */
export const ShowUITrigger = ({ onClick }) => {
    const styles = {
        position: 'fixed',
        right: 0,
        bottom: 0,
        padding: 10
    }
    return (
        <div style={styles}>
            <Button className="fl-asst-outline-button" onClick={onClick}>
                <Icon />
                <span>Assistant</span>
            </Button>
        </div>
    )
}
