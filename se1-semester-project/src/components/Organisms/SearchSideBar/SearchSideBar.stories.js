import SearchSideBar from './SearchSideBar'
import ChatRoomCard from '../../Molecules/ChatRoomCard/ChatRoomCard'

export default {
  title: 'Organisms/Search Side Bar',
  component: SearchSideBar,
  argTypes: {
  }
}
const Template = args => <SearchSideBar {...args} />

// const read = <ChatRoomCard variant='read' name='Johan Sebastian' descriptionText='The project is due tomorrow' alt='alt img' color='darkNeutral' />
const listen = () => console.log('I am a card and I was clicked')

// const components = [read, read, read, read, read]
const events = [listen, listen, listen, listen, listen]

const mockData = [
  {
    chatId: 0,
    chatOwner: 'John Constantine',
    chatName: 'John Constantine, Connor Keenum',
    lastText: 'We ougt to play tarot sometime.'
  },
  {
    chatId: 1,
    chatOwner: 'Emily Valerez',
    chatName: 'Emily Valerez, Connor Keenum',
    lastText: 'I had fun last night ;p.'
  },
  {
    chatId: 2,
    chatOwner: 'Connor Keenum',
    chatName: 'Camille Harris, Connor Keenum',
    lastText: 'Thank you for your support lately.'
  },
  {
    chatId: 3,
    chatOwner: 'Connor Keenum',
    chatName: 'Lonnie Amara, Connor Keenum',
    lastText: 'How was the date?'
  }
]

export const searchSideBar = Template.bind({})
searchSideBar.args = {
  cardInfo: mockData,
  listeners: events,
  userName: 'Connor Keenum'
}
