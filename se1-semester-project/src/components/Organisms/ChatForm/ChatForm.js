import {
  FormContainer,
  ChatFormStyled,
  ExitButtonStyled,
  LeftButtonBottom,
  LeftButtonMiddle,
  LeftButtonTop,
  MediaBox
} from './ChatForm.elements'
import { useState } from 'react'
import ChatInput from '../../Atoms/ChatInput/ChatInput'
import MessageBar from '../../Molecules/MessageBar/MessageBar'
import NestedButton from '../../Molecules/NestedButton/NestedButton'

import NestedExitButton from '../../Molecules/NestedExitButton/NestedExitButton' // Testing only
import Woman from '../../../../public/woman-in-field.jpg' // Testing only
import { AiOutlinePlus } from 'react-icons/ai' // Testing only

// Note store the form state outside of the form, it has conditional rendering applied
// Note it is likely that to get rid of the Media inside this, you simply display none until the form is submitted (then you clean it out)
// 		if you do it in this way, you can avoid messing with refs and stuff
function ChatForm (props) {
  const { ...rest } = props
  const [small, setSmall] = useState(false) // if small -> molecule, if !small -> full size

  const onClickChangeSmall = () => {
    setSmall(!small)
  }

  return (
    <>
      <FormContainer color={!small ? 'lightNeutral' : 'transparent'} borderRadius={20} {...rest}>
        {!small &&
          <>
            <LeftButtonTop variant='savedMMS' color='lightNeutral' />
            <LeftButtonMiddle variant='save' color='lightNeutral' />
            <LeftButtonBottom variant='eyeglass' color='lightNeutral' />
            <ExitButtonStyled size='s' onClick={onClickChangeSmall} />
            <ChatFormStyled>
              <MediaBox>
                <NestedButton variant='newMedia' color='darkNeutral' size='m' padding={24} borderRadius={20} />
              </MediaBox>
              <ChatInput color='darkNeutral' size='m' />
            </ChatFormStyled>
          </>}
        {small &&
          <MessageBar buttonListener={onClickChangeSmall} />}
      </FormContainer>
    </>
  )
}

export default ChatForm
