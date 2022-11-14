import { ComposeMessageBarContainer } from './ComposeMessageBar.elements'
import { ChatInputParent, ChatInputChild } from '../../Atoms/ChatInput/ChatInput.elements'
import { useRef } from 'react'
import { IoIosSend } from 'react-icons/io'
import IconButton from '../../Atoms/IconButton/IconButton'

// This component uses the styles from the ChatInput Atom because it is so similar
// Note: the default variant for this is simply '', as that gives the correct sizing (default is too big, small to small)
function ComposeMessageBar (props) {
  const { placeholder = 'Write a Message...', name, onChange, onBlur, variant = '', color, ...rest } = props
  const ref = useRef(null)
  const handleClick = () => {
    ref.current.focus()
  }

  return (
    <ComposeMessageBarContainer>
      <ChatInputParent variant={variant} color={color} onClick={handleClick}>
        <ChatInputChild placeholder={placeholder} name={name} onChange={onChange} onBlur={onBlur} ref={ref} {...rest} />
      </ChatInputParent>
      <IconButton variant='icon' size='xl'><IoIosSend /></IconButton>
    </ComposeMessageBarContainer>
  )
}

export default ComposeMessageBar
