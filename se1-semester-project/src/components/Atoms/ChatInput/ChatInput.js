import { ChatInputParent, ChatInputChild } from './ChatInput.elements'
import { useRef } from 'react' // used to focus child when parent div pressed (accessibility)
import { IoIosSend } from 'react-icons/io' // testing only
import IconButton from '../IconButton/IconButton' // testing only

// ChatInput is defined here as just a div wrapping a textarea with No Internal State.
// I.E. This is still just a Stateless Functional React Component, that has composibility
// This ChatInput will be controlled by a Formik form that has ChatInput as a Field
// NOTE: Small variant overrides the Button Size to make it fit!!
function ChatInput (props) {
  const { placeholder = 'Write a Message...', name, onSubmitHandler, buttonType = 'submit', onChange, onBlur, variant, color, ...rest } = props
  const ref = useRef(null)

  const handleClick = () => {
    ref.current.focus()
  }

  return (
    <ChatInputParent variant={variant} color={color} onClick={handleClick}>
      <ChatInputChild placeholder={placeholder} name={name} onChange={onChange} onBlur={onBlur} ref={ref} {...rest} />
      <IconButton type={buttonType} onClick={onSubmitHandler} variant='icon' size='xl'><IoIosSend /></IconButton>
    </ChatInputParent>
  )
}

export default ChatInput
