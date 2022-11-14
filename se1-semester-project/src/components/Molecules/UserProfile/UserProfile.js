import {
  UserProfileParent,
  CardDescription,
  CardImageContainer,
  CardImage
} from './UserProfile.elements'
import Placeholder from '../../../../public/card-placeholder.jpg'

function UserProfile (props) {
  const { color = 'transparent', src = Placeholder, alt = 'someone forgot an alt attribute.. it is supposed to be an image', name, ...rest } = props
  return (
    <UserProfileParent color={color} size='xs' {...rest}>
      <CardDescription>
        <h2>{name}</h2>
      </CardDescription>
      <CardImageContainer>
        <CardImage src={src} alt={alt} />
      </CardImageContainer>
    </UserProfileParent>
  )
}

export default UserProfile
