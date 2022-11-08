import { ContainerStyled } from './Container.elements'

function Container (props) {
  const { children, ...rest } = props
  return (
    <ContainerStyled {...rest}>
      {children}
    </ContainerStyled>
  )
}

export default Container
