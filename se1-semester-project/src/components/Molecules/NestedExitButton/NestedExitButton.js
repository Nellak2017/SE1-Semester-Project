import { NestedExitButtonParent } from './NestedExitButton.elements'
import SquareButton from '../../Atoms/SquareButton/SquareButton'
import IconButton from '../../Atoms/IconButton/IconButton'
import { AiOutlineClose } from 'react-icons/ai'

function NestedExitButton (props) {
  const { color, component, backgroundImage, icon, size, ...rest } = props
  const bgImg = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  }

  return (
    <NestedExitButtonParent
      {...rest}
      style={bgImg}
      component={
        <>
          <IconButton variant='declineOutline' id='exitBtn' size='m'><AiOutlineClose /></IconButton>
          <SquareButton color='darkNeutral' size='xs'>{icon}</SquareButton>
        </>
}
      icon={icon}
      size='l'
    />
  )
}

export default NestedExitButton
