import React from 'react'
import { RightBarControlPanelParent } from './RightBarControlPanel.elements'
import Button from '../../Atoms/Button/Button'

// Note: the variant should give default component lists, so you can use it as a shorthand
// If you need to have a custom Control Panel, do not specify a variant. Variants give certain preset looks and Component lists
function RightBarControlPanel (props) {
  const { name, variant, components, listeners, color = 'darkNeutral', ...rest } = props
  const messageControlNames = {
    Play: listeners && listeners[0],
    Edit: listeners && listeners[1],
    Download: listeners && listeners[2],
    Compose: listeners && listeners[3]
  }
  const chatRoomOptionsNames = {
    'Chat Color': listeners && listeners[0],
    'Rename Chat': listeners && listeners[1],
    'Add Person': listeners && listeners[2],
    'Remove Person': listeners && listeners[3],
    'Delete Chat': listeners && listeners[4]
  }

  return (
    <>
      {variant === 'messageControl' &&
        <RightBarControlPanelParent variant={variant} components={components} color={color} size='l' {...rest}>
          <h3>Message Controls</h3>
          {Object.keys(messageControlNames).map((name, index) =>
            <Button key={`msgControlBtn${index}`} variant='messageControl' size='xs' onClick={messageControlNames[name]}>{name}</Button>
          )}
        </RightBarControlPanelParent>}
      {variant === 'chatroomOptions' &&
        <RightBarControlPanelParent variant={variant} components={components} color={color} size='l' {...rest}>
          <h3>Chatroom Options</h3>
          {Object.keys(chatRoomOptionsNames).map((name, index) =>
            <Button key={`chatOptionBtn${index}`} variant='messageControl' size='xs' onClick={chatRoomOptionsNames[name]}>{name}</Button>
          )}
        </RightBarControlPanelParent>}
      {!['messageControl', 'chatroomOptions'].includes(variant) &&
        <RightBarControlPanelParent name={name} variant={variant} components={components} color={color} size='m' {...rest}>
          <h3>{name}</h3>
          {components.map((component, index) => React.cloneElement(component, { onClick: listeners && listeners[index], key: `controlPanelBtn${index}` }))}
        </RightBarControlPanelParent>}
    </>
  )
}

export default RightBarControlPanel
