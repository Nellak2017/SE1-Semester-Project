import { MessageBarParent, ChatInputStyled, SquareButtonStyled } from './MessageBar.elements'
import { GoChevronUp } from 'react-icons/go'

function MessageBar (props) {
  const { color, buttonListener, icon = <GoChevronUp />, ...rest } = props
  return (
    <MessageBarParent {...rest}>
      <SquareButtonStyled onClick={buttonListener} color={color} size='m'>{icon}</SquareButtonStyled>
      <ChatInputStyled color={color} variant='default' />
    </MessageBarParent>
  )
}

export default MessageBar
