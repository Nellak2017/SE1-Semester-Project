import { MessageBarParent, ChatInputStyled, SquareButtonStyled } from './MessageBar.elements'
import { GoChevronUp } from 'react-icons/go'

function MessageBar (props) {
  const { color, icon = <GoChevronUp />, ...rest } = props
  return (
    <MessageBarParent color={color} {...rest}>
      <SquareButtonStyled size='m'>{icon}</SquareButtonStyled>
      <ChatInputStyled variant='default' />
    </MessageBarParent>
  )
}

export default MessageBar
