import React from 'react'
import { CardContainerParent, CardNavArea } from './CardContainer.elements'
import Button from '../../Atoms/Button/Button'

function CardContainer (props) {
  const { children, btnListener, listeners, ...rest } = props
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
      {children?.map((card, index) => React.cloneElement(card, { onClick: listeners && listeners[index], key: `cardContainerCard${index}` }))}
    </CardContainerParent>
  )
}

export default CardContainer
