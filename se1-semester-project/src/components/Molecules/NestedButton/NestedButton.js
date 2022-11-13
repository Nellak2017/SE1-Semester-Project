import { NestedButtonParent } from './NestedButton.elements'
import { GiHamburgerMenu, GiSave } from 'react-icons/gi'
import { MdSearch } from 'react-icons/md'
import { AiOutlinePlus } from 'react-icons/ai'
import SquareButton from '../../Atoms/SquareButton/SquareButton'

function NestedButton (props) {
  const { variant, color, component, ...rest } = props
  return (
    <>{(['savedMMS', 'eyeglass', 'save', 'newMedia'].includes(variant)) &&
      <NestedButtonParent variant={variant} color={color} component={component} size='s' {...rest}>
        {variant === 'savedMMS' && <GiHamburgerMenu />}
        {variant === 'eyeglass' && <MdSearch />}
        {variant === 'save' && <GiSave />}
        {variant === 'newMedia' && <SquareButton color='darkNeutral' size='xs'><AiOutlinePlus /></SquareButton>}
      </NestedButtonParent>}
      {!(['savedMMS', 'eyeglass', 'save', 'newMedia'].includes(variant)) &&
        <NestedButtonParent variant={variant} color={color} component={component} size='s' {...rest}>
          {component}
        </NestedButtonParent>}
    </>
  )
}

export default NestedButton
