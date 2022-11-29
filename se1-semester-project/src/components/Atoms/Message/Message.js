import { MessageStyled } from './Message.elements'
import SMILSmallPlayer from '../../Molecules/SMILSmallPlayer/SMILSmallPlayer'

// @TODO: Add conditional rendering based on the type passed in.
// text -> normal render, smil -> smil small player w/src, image/video/audio -> image/video/audio w/src
function Message (props) {
  const { children, variant, type, src, ...rest } = props
  const allowedTypes = ['text', 'smil', 'image', 'audio', 'video']
  return (
    <>
      {allowedTypes.includes(type.toLowerCase().trim()) && type.toLowerCase().trim() === 'text' &&
        <MessageStyled variant={variant} type={type} data-variant={typeof variant !== 'undefined' ? variant : 'sent'} {...rest}>
          <pre>{children}</pre>
        </MessageStyled>}
      {allowedTypes.includes(type.toLowerCase().trim()) && type.toLowerCase().trim() === 'smil' &&
        <SMILSmallPlayer />}
    </>
  )
}

export default Message
