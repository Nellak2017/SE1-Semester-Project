import {
  ChatRoomCardParent,
  CardDescription,
  CardImageContainer,
  CardImage
} from './ChatRoomCard.elements'
import Notification from '../../Atoms/Notification/Notification'
import Placeholder from '../../../../public/card-placeholder.jpg'

function ChatRoomCard (props) {
  const { variant, color = 'lightNeutral', src = Placeholder, alt = 'someone forgot an alt attribute.. it is supposed to be an image', name, descriptionText, ...rest } = props
  return (
    <ChatRoomCardParent variant={variant} color={color} size='m' {...rest}>
      <CardImageContainer>
        <CardImage src={src} alt={alt} />
        {variant === 'unread' && <Notification id='notification' />}
      </CardImageContainer>
      <CardDescription>
        <h1>{name}</h1>
        <p>{descriptionText}</p>
      </CardDescription>
    </ChatRoomCardParent>
  )
}

export default ChatRoomCard
