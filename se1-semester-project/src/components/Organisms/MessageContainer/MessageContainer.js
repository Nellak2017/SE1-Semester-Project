import React from 'react'
import Message from '../../Atoms/Message/Message'

import {
  StyledMessageContainer,
  UserName,
  UserNameContainer,
  MessageOverflowContainer,
  ChatFormContainer
} from './MessageContainer.elements'

// @TODO: Add media queries for Small/tablets
// @TODO: Context API with SearchSideBar so that we know what messages to load
// @TODO: Load only top 100 messages until scrolled to that final message
// @TODO: Render loading spinner if waiting on messages
// @TODO: Refactor to accept data not components
function MessageContainer (props) {
  const { userName, messages, chatForm, ...rest } = props
  const messagesClone = messages.slice() // makes a shallow copy of the messages so that it renders correctly always
  return (
    <StyledMessageContainer {...rest}>
      <UserNameContainer>
        <UserName>{userName}</UserName>
      </UserNameContainer>
      <MessageOverflowContainer>
        {messages && messagesClone.reverse().map((el, index) => <Message key={`msg${index}`} variant={el.variant}>{el.message}</Message>)}
        {/* messages are reversed so that column-reverse property displays them normally, but starting at bottom not top */}
      </MessageOverflowContainer>
      <ChatFormContainer>{chatForm && chatForm}</ChatFormContainer>
    </StyledMessageContainer>
  )
}

export default MessageContainer
