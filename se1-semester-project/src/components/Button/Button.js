import React from 'react'
import { ButtonStyled } from './Button.elements'

function Button (props) {
  const { variant = 'pill', children, ...rest } = props
  return (
    <ButtonStyled variant={variant} {...rest}>
      {children}
    </ButtonStyled>
  )
}

export default Button
