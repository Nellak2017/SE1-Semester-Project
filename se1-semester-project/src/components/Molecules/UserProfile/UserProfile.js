import {
  UserProfileParent,
  CardDescription,
  CardImageContainer,
  CardImage,
  WrapperDiv
} from './UserProfile.elements'
import Placeholder from '../../../../public/card-placeholder.jpg'

// TODO: Add listener prop passing pattern
function UserProfile (props) {
  const { color = 'transparent', src = Placeholder, alt = 'someone forgot an alt attribute.. it is supposed to be an image', name, ...rest } = props
  const handleClickBubbling = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  return (
    <WrapperDiv>
      <UserProfileParent color={color} size='xs' onClick={handleClickBubbling} {...rest}>
        <CardDescription>
          <h2>{name}</h2>
        </CardDescription>
        <CardImageContainer>
          <CardImage src={src} alt={alt} />
        </CardImageContainer>
      </UserProfileParent>
    </WrapperDiv>

  )
}

export default UserProfile
