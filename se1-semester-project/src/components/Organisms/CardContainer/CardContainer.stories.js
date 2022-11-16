import CardContainer from './CardContainer'
import ChatRoomCard from '../../Molecules/ChatRoomCard/ChatRoomCard'

export default {
  title: 'Organisms/Card Container',
  component: CardContainer,
  argTypes: {
    name: { control: 'text' },
    components: { control: 'text' }
  }
}

const Template = args => <CardContainer {...args} />

const read = <ChatRoomCard variant='read' name='Johan Sebastian' descriptionText='The project is due tomorrow' alt='alt img' color='darkNeutral' />
const unread = <ChatRoomCard variant='unread' name='Alice Smith' descriptionText='I knew we were going for steak!' alt='alt img' color='darkNeutral' />
const listen = () => console.log('I am a card and I was clicked')

const components = [read, unread, read, unread, read, unread, read, unread, read, unread]
const events = [listen, listen, listen, listen, listen, listen, listen, listen, listen, listen]

export const cardContainer = Template.bind({})
cardContainer.args = {
  children: components,
  listeners: events,
  btnListener: () => console.log('I am the button, I was clicked')
}
