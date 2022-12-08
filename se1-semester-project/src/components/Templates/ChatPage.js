import React from 'react'

import RightBarContainer from '../Organisms/RightBarContainer/RightBarContainer'
import SearchSideBar from '../Organisms/SearchSideBar/SearchSideBar'
import MessageContainer from '../Organisms/MessageContainer/MessageContainer'

// @TODO: Define data props to control the page content easily
// @TODO: event listeners for each chatroom card. So that you can query for Messages and display based on whichever
// @TODO: Convert messsages from a list of components to a list of data objects
// @TODO: Figure out what to do better with chatForm
// @TODO: Make mobile design (Optional)
// @TODO: Messages should start from the BOTTOM not from the top!
function ChatPage (props) {
  const { userName, messages, chatForm, cardInfo, cardListeners, ...rest } = props
  return (
    <RightBarContainer {...rest}>
      <SearchSideBar cardInfo={cardInfo} listeners={cardListeners} userName={userName} />
      <MessageContainer userName={userName} messages={messages} chatForm={chatForm} />
    </RightBarContainer>
  )
}

export default ChatPage
