import { MessageStyled } from './Message.elements'
import SMILSmallPlayer from '../../Molecules/SMILSmallPlayer/SMILSmallPlayer'
import {SMILtoJSON} from '../../../model/helper_functions/helpers'

// @TODO: If 1 par Text then regular chat bubble
// @TODO: If any par !Text then smil small player
// text -> normal render, smil -> smil small player w/src, image/video/audio -> image/video/audio w/src
const errorSMIL = 
  '<smil>' +
  '<body>' +
  '<par>' +
  '<text src="Entered SMIL in Message Component is not a string. This is an error message."/>' +
  '</par>' +
  '</body>' +
  '</smil>'
  
function Message (props) {
  const { children, variant, src, ...rest } = props // removed type, all is smil now

  // in: children --> Expected = smil string
  // out: smil small (false) or text (true)
  const checkType = (children) => {
    const JSONfromSMIL = typeof children === 'string' && children ? SMILtoJSON(children) : SMILtoJSON(errorSMIL)
    // if 1 par tag that is text, then regular chat bubble (return true) else return false
    return (JSONfromSMIL && Object.keys(JSONfromSMIL?.smil?.body?.par).length === 1 && Object.keys(JSONfromSMIL?.smil?.body?.par)[0] === 'text') 
  }

  return (
    <>
      {children && checkType(children) &&
        <MessageStyled variant={variant} data-variant={typeof variant !== 'undefined' ? variant : 'sent'} {...rest}>
          <pre>{SMILtoJSON(children)?.smil?.body?.par?.text?._attributes?.src}</pre>
        </MessageStyled>}
      {children && !checkType(children) &&
        <SMILSmallPlayer data-variant={typeof variant !== 'undefined' ? variant : 'sent'}>
          {children}
        </SMILSmallPlayer>}
    </>
  )
}

export default Message
