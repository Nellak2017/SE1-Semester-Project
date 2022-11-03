import React from 'react'
import { PillButtonStyled } from './PillButton.elements'

function PillButton (props) {
  const { variant = 'default', children, ...rest } = props
  return (
    <PillButtonStyled variant={variant} {...rest}>
      {children}
    </PillButtonStyled>
  )
}

export default PillButton
