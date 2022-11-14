import { CloseRightBarParent, LeftComponentWrapper } from './CloseRightBar.elements'
import { useState } from 'react'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go'

function CloseRightBar (props) {
  const { variant = 'closed', color, leftComponent, rightComponent, ...rest } = props
  const [open, setOpen] = useState(variant.toLowerCase().trim() === 'open')
  const clickHandler = () => { setOpen(() => !open) }

  return (
    <>
      <LeftComponentWrapper variant={open ? 'open' : 'closed'}>{leftComponent}</LeftComponentWrapper>
      <CloseRightBarParent onClick={clickHandler} variant={open ? 'open' : 'closed'} color={color} {...rest}>
        {open && <GoChevronLeft />}
        {!open && <GoChevronRight />}
        {rightComponent}
      </CloseRightBarParent>
    </>
  )
}

export default CloseRightBar
