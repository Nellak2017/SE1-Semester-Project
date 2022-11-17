import React from 'react'
import { PopUpParent, PopUpOption } from './TextPosPopup.elements'

function TextPosPopup (props) {
  const { options, listeners, ...rest } = props
  return (
    <>
      {!options &&
        <PopUpParent {...rest}>
          <PopUpOption size='s' color='lightNeutral' outlineSize='xs' outlineColor='lightNeutralLight'>
            <p>Top</p>
          </PopUpOption>
          <PopUpOption size='s' color='lightNeutral' outlineSize='xs' outlineColor='lightNeutralLight'>
            <p>Middle</p>
          </PopUpOption>
          <PopUpOption size='s' color='lightNeutral' outlineSize='xs' outlineColor='lightNeutralLight'>
            <p>Bottom</p>
          </PopUpOption>
        </PopUpParent>}
      {options && Array.isArray(options) &&
        <PopUpParent {...rest}> {options?.map((option, index) =>
          <PopUpOption key={`popup${index}`} onClick={listeners && listeners[index]} size='s' color='lightNeutral' outlineSize='xs' outlineColor='lightNeutralLight'>
            <p>{option}</p>
          </PopUpOption>
        )}
        </PopUpParent>}
    </>
  )
}

export default TextPosPopup
