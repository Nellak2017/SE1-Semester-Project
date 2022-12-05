import { MessageBarParent, ChatInputStyled, SquareButtonStyled } from './MessageBar.elements'
import { GoChevronUp } from 'react-icons/go'

function MessageBar (props) {
  const { color, buttonListener, icon = <GoChevronUp />, value, defaultValue, name, id, submitType, onSubmitHandler, ...rest } = props
  return (
    <MessageBarParent {...rest}>
      <SquareButtonStyled onClick={buttonListener} color={color} size='m' data-tip='Maximize Chat Form'>{icon}</SquareButtonStyled>
      <ChatInputStyled buttonType={submitType} onSubmitHandler={onSubmitHandler} defaultValue={defaultValue} id={id} name={name} value={value} color={color} variant='default' />
    </MessageBarParent>
  )
}

export default MessageBar
