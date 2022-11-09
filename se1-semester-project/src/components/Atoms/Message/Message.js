import { MessageStyled } from './Message.elements'

function Message (props) {
  const { children, ...rest } = props
  return (
    <MessageStyled {...rest}>
      <pre>{children}</pre>
    </MessageStyled>
  )
}

export default Message
