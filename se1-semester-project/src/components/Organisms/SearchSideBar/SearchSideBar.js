import React, { useState, useEffect } from 'react'
import CardContainer from '../../Organisms/CardContainer/CardContainer'
import SearchInput from '../../Atoms/SearchInput/SearchInput'
import { ParentContainer, CreateChatFormStyled } from './SearchSideBar.elements'
import ChatRoomCard from '../../Molecules/ChatRoomCard/ChatRoomCard'

function SearchSideBar (props) {
  /*
  Shape of the input data:
  [
    chatroomID[n]:{
        chatOwner: <String>: name,
        chatName: <String> : name,
        lastText: <String> : text, // added by me on front-end, using query
        onClick: () => tell MessageContainer context api the messages to load (which then queries db)
    }
    ]
  @TODO:
  - [ ] context api for this component and the MessageContainer
        so MessageContainer knows what messages to query
  */
  const { cardInfo, listeners, initialValue = '', userName, ...rest } = props

  const [createChatVisible, setCreateChatVisible] = useState(false)
  const [searchState, setSearchState] = useState(initialValue || '') // OnChange, update this
  const [strippedCardInfo, setStrippedCardInfo] = useState(cardInfo) // Takes your userName out of the chat participants like: user1, user2, ..., userName

  useEffect(() => {
    const newInfo = cardInfo.map((obj, i) => { return { ...obj, chatName: obj.chatName.replace(', ' + userName, '') } })
    setStrippedCardInfo(newInfo)
  }, [])

  const filtered = strippedCardInfo.filter(
    person => {
      return (
        person.chatName.toLowerCase().trim().includes(searchState.toLowerCase().trim())
      )
    }
  )

  const handleNewChat = () => {
    setCreateChatVisible(true)
  }

  const handleExit = () => {
    setCreateChatVisible(false)
  }

  const handleUpdateSearchValue = (e) => {
    setSearchState(e.currentTarget.value)
  }

  return (
    <ParentContainer {...rest}>
      <SearchInput onChange={handleUpdateSearchValue} />
      <CardContainer listeners={listeners && listeners} btnListener={handleNewChat}>
        {filtered && Array.isArray(filtered) &&
          filtered.map((card, index) =>
            <ChatRoomCard key={`card${index}`} variant='read' name={card?.chatName} descriptionText={card?.lastText} alt='alt img' color='darkNeutral' />
          )}
      </CardContainer>
      <CreateChatFormStyled exitButtonListener={handleExit} style={{ display: createChatVisible ? '' : 'none' }} />
    </ParentContainer>
  )
}

export default SearchSideBar
