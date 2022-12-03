import React from 'react'

import {
  StyledMessageContainer,
  UserName,
  UserNameContainer,
  MessageOverflowContainer,
  ChatFormContainer
} from './MessageContainer.elements'

// @TODO: Add media queries for Small/tablets
// @TODO: Context API with SearchSideBar so that we know what messages to load
// @TODO: Load most recent message by default
// @TODO: Load only top 100 messages until scrolled to that final message
// @TODO: Render loading spinner if waiting on messages
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
