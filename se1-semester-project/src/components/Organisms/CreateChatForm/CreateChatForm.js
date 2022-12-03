import React, { useState, useReducer } from 'react'
import ExitButton from '../../Atoms/ExitButton/ExitButton'
import IconButton from '../../Atoms/IconButton/IconButton'
import SearchInput from '../../Atoms/SearchInput/SearchInput'
import Button from '../../Atoms/Button/Button'
import {
  CreateChatFormParent,
  ExitContainer,
  SearchContainer,
  CreateChatFormStyled,
  AvailableUsersContainer,
  SelectedUsersGrid,
  UserGridItem,
  GridExit
} from './CreateChatForm.elements'
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'

function CreateChatForm (props) {
  const { initialValue, maxUsers, exitButtonListener, title = 'Who would you like to add to this new chat?', ...rest } = props

  let maxSelectedUsers
  if (!maxUsers) { maxSelectedUsers = 10 } // max chatroom size if not defined

  const [searchInputState, setSearchInputState] = useState(initialValue || '') // OnChange, update this
  const [selectedUsers, setSelectedUsers] = useState([]) // Will be a list of selected users. pattern: [{user: String, display: Boolean}]
  const [availableUsers, setAvailableUsers] = useState([]) // Will be a list of strings. Holds users available str from query
  const [, forceUpdate] = useReducer(x => x + 1, 0) // Used to make react re-render in the case of adding 2 of the same names

  // @TODO: Make a GET request for the Available Users
  const handleUserSearch = () => {
    // 1. Make a Query for Available Users with searchInputState
    // Query =
    // SELECT * FROM Chatroom JOIN User
    // WHERE Name LIKE $searchInputState

    // 2. Store the available users in availableUsers
    // setAvailableUsers(Query)
  }

  // @TODO: Make a POST request for making a new Chatroom with users
  const handleCreateChat = () => {
    console.log('create chat function called')
    // 1. Make a Query to add a new Chatroom with the users
    // 2. Close the component or refresh the page to get rid of it. Do something so that you can't see the form anymore
  }

  // @TODO: Add input validation for add selected user function Whenever you get the API done
  const handleAddSelectedUser = () => {
    // 1. If the value in the search input state matches a valid user (stripped and toLowerCase), then..
    // if (availableUsers.includes(searchInputState)) {
    // 2. Add the search input into the selectedUsers array -> selectedUsers.push({user:`${searchInputState}`, display: true})
    if (typeof maxSelectedUsers !== 'undefined' && selectedUsers.length + 1 <= maxSelectedUsers && searchInputState !== '') {
      selectedUsers.push(`${searchInputState}`)
      setSearchInputState('') // does not clear the input, but prevents spamming names
      forceUpdate() // in the rare case that this is needed, just always do it
    } else if (typeof maxUsers !== 'undefined' && selectedUsers.length + 1 <= maxUsers && searchInputState !== '') {
      selectedUsers.push(`${searchInputState}`)
      setSearchInputState('')
      forceUpdate() // in the rare case that this is needed, just always do it
    }
    // }
  }

  const handleRemoveSelectedUser = (index) => {
    const shallowCopy = [...selectedUsers]
    shallowCopy.splice(index, 1) // remove that element from the array
    setSelectedUsers(shallowCopy)
  }

  const handleFormChange = (e) => {
    setSearchInputState(e.currentTarget.value)
  }

  // @TODO: When you get the GET API written for Create Chat form, add OnClick to Get matching users
  return (
    <CreateChatFormParent variant='outline' color='lightNeutral' {...rest}>
      <ExitContainer>
        <p>{title}</p>
        <ExitButton onClick={exitButtonListener} size='s' />
      </ExitContainer>
      <CreateChatFormStyled onSubmit={e => e.preventDefault()}>
        <SearchContainer>
          {availableUsers && Array.isArray(availableUsers) && availableUsers.length > 0 &&
            <AvailableUsersContainer>
              {availableUsers.map((el, index) => <p key={`user${index}`}>{el}</p>)}
            </AvailableUsersContainer>}
          <SearchInput color='darkNeutral' onClick={() => console.log('this works')} onChange={(e) => handleFormChange(e)} placeholder='Type to search name to add to this chat' />
          <IconButton variant='icon' color='primaryLight'>
            <AiOutlinePlus onClick={handleAddSelectedUser} />
          </IconButton>
        </SearchContainer>
        <SelectedUsersGrid>
          {selectedUsers && Array.isArray(selectedUsers) && selectedUsers.length > 0 &&
        selectedUsers.map((str, index) => (
          <React.Fragment key={`selectedUser${index}`}>
            {str &&
              <UserGridItem key={`selectedUser${index}`}>
                <GridExit variant='declineOutline' size='s'><AiOutlineClose onClick={() => handleRemoveSelectedUser(index)} /></GridExit>
                <p>{str}</p>
              </UserGridItem>}
          </React.Fragment>
        )
        )}
        </SelectedUsersGrid>
        <Button type='submit' variant='save' onClick={handleCreateChat}>Submit</Button>
      </CreateChatFormStyled>
    </CreateChatFormParent>
  )
}

export default CreateChatForm
