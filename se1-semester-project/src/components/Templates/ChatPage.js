import React from 'react'

import RightBarContainer from '../Organisms/RightBarContainer/RightBarContainer'
import SearchSideBar from '../Organisms/SearchSideBar/SearchSideBar'
import MessageContainer from '../Organisms/MessageContainer/MessageContainer'

// @TODO: Define data props to control the page content easily
// @TODO: event listeners for each chatroom card. So that you can query for Messages and display based on whichever
// @TODO: Convert messsages from a list of components to a list of data objects
// @TODO: Figure out what to do better with chatForm
// @TODO: Make mobile design (Optional)
// NOTE: Rightbar container removed for brevity
function ChatPage (props) {
  const { userName, messages, chatForm, cardInfo, cardListeners, ...rest } = props
  return (
    <div style={{ display: 'flex' }}>
      <SearchSideBar cardInfo={cardInfo} listeners={cardListeners} userName={userName} />
      <MessageContainer userName={userName} messages={messages} chatForm={chatForm} />
    </div>
  )
}

export default ChatPage
