import React from 'react'

import {
  StyledMessageContainer,
  UserName,
  UserNameContainer,
  MessageOverflowContainer,
  ChatFormContainer
} from './MessageContainer.elements'

// @TODO: Add media queries for Small/tablets
function MessageContainer (props) {
  const { userName, messages, chatForm, ...rest } = props
  return (
    <StyledMessageContainer {...rest}>
      <UserNameContainer>
        <UserName>{userName}</UserName>
      </UserNameContainer>
      <MessageOverflowContainer>
        {messages && messages.map(el => el)}
      </MessageOverflowContainer>
      <ChatFormContainer>{chatForm && chatForm}</ChatFormContainer>
    </StyledMessageContainer>
  )
}

export default MessageContainer
