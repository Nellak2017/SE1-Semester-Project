import { DropDownButtonStyled } from './DropDownButton.elements'

function DropDownButton (props) {
  const { size = 'm', color = 'lightNeutral', borderSize = 's', borderColor = 'lightNeutralLight', children, ...rest } = props
  return (
    <DropDownButtonStyled size={size} color={color} borderSize={borderSize} borderColor={borderColor} {...rest}>
      {children}
    </DropDownButtonStyled>
  )
}

export default DropDownButton
