import React from 'react'
import { CardContainerParent, CardNavArea } from './CardContainer.elements'
import Button from '../../Atoms/Button/Button'

function CardContainer (props) {
  const { components, btnListener, listeners, children, ...rest } = props
  const handleClickBubbling = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  return (
    <CardContainerParent color='lightNeutral' size='m' onClick={handleClickBubbling} {...rest}>
      <CardNavArea>
        <h1>All Messages</h1>
        <Button variant='newChat' size='s' onClick={btnListener}>New Chat</Button>
      </CardNavArea>
      {typeof components === 'undefined' && children}
      {components && components?.map((card, index) =>
        <React.Fragment key={`cardContainerCard${index}`}>
          {React.cloneElement(card, { ...props, key: `cardContainerCard${index}`, onClick: listeners && listeners[index] })}
        </React.Fragment>
      )}

    </CardContainerParent>
  )
}

export default CardContainer
