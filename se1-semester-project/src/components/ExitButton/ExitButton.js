import { ExitButtonStyled } from './ExitButton.elements'

function ExitButton (props) {
  const { color = 'danger', size = 'm', children, ...rest } = props
  return (
    <ExitButtonStyled color={color} size={size} {...rest}>
      {children}
    </ExitButtonStyled>
  )
}

export default ExitButton
