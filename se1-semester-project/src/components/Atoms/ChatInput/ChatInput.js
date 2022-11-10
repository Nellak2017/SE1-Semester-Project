import { ChatInputParent, ChatInputChild } from './ChatInput.elements'

import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai' // for testing purposes only

// ChatInput is an Input and thus is self-closing
function ChatInput (props) {
  const { ...rest } = props
  return (
    <ChatInputParent {...rest}>
      <ChatInputChild role='textbox' contentEditable='true' />
      <AiOutlineCheck />
      <AiOutlineClose />
    </ChatInputParent>
  )
}

export default ChatInput
