import { SquareButtonStyled } from './SquareButton.elements'

function SquareButton (props) {
  const { size = 'xl', color = 'lightNeutral', children, ...rest } = props
  return (
    <SquareButtonStyled size={size} color={color} {...rest}>
      {children}
    </SquareButtonStyled>
  )
}

export default SquareButton
