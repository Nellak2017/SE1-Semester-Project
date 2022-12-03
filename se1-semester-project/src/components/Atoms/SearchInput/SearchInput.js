import { SearchInputParent, SearchInputChild } from './SearchInput.elements'
import { useRef } from 'react' // used to focus child when parent div pressed (accessibility)
import { MdSearch } from 'react-icons/md' // testing only
import IconButton from '../IconButton/IconButton' // testing only

// ChatInput is defined here as just a div wrapping a textarea with No Internal State.
// I.E. This is still just a Stateless Functional React Component, that has composibility
// This ChatInput will be controlled by a Formik form that has ChatInput as a Field
// NOTE: Small variant overrides the Button Size to make it fit!!
function SearchInput (props) {
  const { placeholder = 'Find a person or chatroom', initialValue, name, onClick, onChange, onBlur, variant, color, ...rest } = props
  const ref = useRef(null)

  const handleClick = () => {
    ref.current.focus()
  }

  return (
    <SearchInputParent variant={variant} color={color} onClick={handleClick}>
      <IconButton variant='icon' size='xl' color='lightNeutralLight' onClick={onClick}><MdSearch /></IconButton>
      <SearchInputChild type='search' maxLength={100} placeholder={placeholder} name={name} onChange={onChange} onBlur={onBlur} ref={ref} {...rest} />
    </SearchInputParent>
  )
}

export default SearchInput
