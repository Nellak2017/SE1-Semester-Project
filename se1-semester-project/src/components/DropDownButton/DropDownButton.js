import { DropDownButtonStyled } from './DropDownButton.elements'

function DropDownButton (props) {
  const { size = 'm', color = 'lightNeutral', outlineSize = 's', outlineColor = 'lightNeutralLight', children, ...rest } = props
  return (
    <DropDownButtonStyled size={size} color={color} outlineSize={outlineSize} outlineColor={outlineColor} {...rest}>
      {children}
    </DropDownButtonStyled>
  )
}

export default DropDownButton
