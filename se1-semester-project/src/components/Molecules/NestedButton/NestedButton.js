import { NestedButtonParent } from './NestedButton.elements'
import { GiHamburgerMenu, GiSave } from 'react-icons/gi'
import { MdSearch } from 'react-icons/md'
import { AiOutlinePlus } from 'react-icons/ai'
import SquareButton from '../../Atoms/SquareButton/SquareButton'

function NestedButton (props) {
  const { variant, color, component, type, onClick, ...rest } = props
  return (
    <>{(['savedMMS', 'eyeglass', 'save', 'newMedia'].includes(variant)) &&
      <NestedButtonParent variant={variant} color={color} size='s' {...rest}>
        {variant === 'savedMMS' && <GiHamburgerMenu onClick={onClick} type={type} />}
        {variant === 'eyeglass' && <MdSearch onClick={onClick} type={type} />}
        {variant === 'save' && <GiSave onClick={onClick} type={type} />}
        {variant === 'newMedia' && <SquareButton onClick={onClick} type={type} color='lightNeutral' size='xs'><AiOutlinePlus /></SquareButton>}
      </NestedButtonParent>}
      {!(['savedMMS', 'eyeglass', 'save', 'newMedia'].includes(variant)) &&
        <NestedButtonParent variant={variant} color={color} size='s' {...rest}>
          {component}
        </NestedButtonParent>}
    </>
  )
}

export default NestedButton
