import React from 'react'
import { NestedExitButtonParent } from './NestedExitButton.elements'
import SquareButton from '../../Atoms/SquareButton/SquareButton'
import IconButton from '../../Atoms/IconButton/IconButton'
import { AiOutlineClose } from 'react-icons/ai'

function NestedExitButton (props) {
  const {
    color = 'darkNeutral', subColor = 'lightNeutral', component, backgroundImage,
    buttonListener = (e) => { e.stopPropagation(); console.log('button listener not assigned') }, icon,
    iconListener = (e) => { e.stopPropagation(); console.log('icon listener not assigned') },
    text, size = 'l', subSize = 'm', type, children, ...rest
  } = props

  const bgImg = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  }

  return (
    <>
      <NestedExitButtonParent
        {...rest}
        style={bgImg}
        icon={icon}
        color={color}
        size={size}
      >
        <>
          <IconButton variant='declineOutline' id='exitBtn' size='m' type={type} onClick={iconListener}><AiOutlineClose /></IconButton>
          <SquareButton color={subColor} size={subSize} onClick={buttonListener} type={type}>
            {icon && !text && icon}
            {text && !icon && text}
          </SquareButton>
        </>
        {children}
      </NestedExitButtonParent>
    </>
  )
}
export default NestedExitButton
