import React from 'react'

import {
  StyledMessageContainer,
  UserName,
  UserNameContainer
} from './MessageContainer.elements'

function MessageContainer (props) {
  const { userName, messages, ...rest } = props
  return (
    <StyledMessageContainer {...rest}>
      <UserNameContainer>
        <UserName>{userName}</UserName>
      </UserNameContainer>
      {messages && messages.map(el => el)}
    </StyledMessageContainer>
  )
}

export default MessageContainer
