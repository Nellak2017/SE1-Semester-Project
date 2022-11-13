import ChatRoomCard from './ChatRoomCard'

export default {
  title: 'Molecules/ChatRoom Card',
  component: ChatRoomCard,
  argTypes: {
    variant: { control: 'text' },
    size: { control: 'text' },
    src: { control: 'text' },
    alt: { control: 'text' },
    name: { control: 'text' },
    descriptionText: { control: 'text' }
  }
}

const Template = args => <ChatRoomCard {...args} />

export const readChatRoomCard = Template.bind({})
readChatRoomCard.args = {
  variant: 'read',
  name: 'Johan Sebastion',
  descriptionText: 'The project is due tomorrow',
  alt: 'read image placeholder'
}

export const unreadChatRoomCard = Template.bind({})
unreadChatRoomCard.args = {
  variant: 'unread',
  name: 'Johan Sebastion',
  descriptionText: 'The project is due tomorrow',
  alt: 'unread image placeholder'
}
