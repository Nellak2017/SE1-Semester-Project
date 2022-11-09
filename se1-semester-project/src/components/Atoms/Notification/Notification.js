import { NotificationStyled } from './Notification.elements'

// Notification has no children, only size and color props
function Notification (props) {
  const { ...rest } = props
  return (
    <NotificationStyled {...rest} />
  )
}

export default Notification
