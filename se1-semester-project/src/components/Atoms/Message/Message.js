import { MessageStyled } from './Message.elements'

function Message (props) {
  const { children, ...rest } = props
  return (
    <MessageStyled {...rest}>
      <div>{children}</div>
    </MessageStyled>
  )
}

export default Message
