import { IconButtonStyled } from './IconButton.elements'

function IconButton (props) {
  const { children, ...rest } = props
  return (
    <IconButtonStyled {...rest}>
      {children}
    </IconButtonStyled>
  )
}

export default IconButton
