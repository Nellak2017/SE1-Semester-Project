import { ChatInputStyled } from './ChatInput.elements'

// ChatInput is an Input and thus is self-closing
function ChatInput (props) {
  const { ...rest } = props
  return (
    <ChatInputStyled {...rest} />
  )
}

export default ChatInput
