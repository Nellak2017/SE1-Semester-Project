import RightBarControlPanel from './RightBarControlPanel'
import Tile from '../../Molecules/Tile/Tile'
import Woman from '../../../../public/woman-in-field.jpg'
import Movie from '../../../../public/movie.jpg'

export default {
  title: 'Organisms/Right Bar Control Panel',
  component: RightBarControlPanel,
  argTypes: {
    variant: { control: 'text' },
    name: { control: 'text' },
    components: { control: 'text' }
  }
}

const Template = args => <RightBarControlPanel {...args} />

export const messageControlPanel = Template.bind({})
messageControlPanel.args = {
  variant: 'messageControl',
  listeners: [
    () => { console.log('First Listener') },
    () => { console.log('Second Listener') },
    () => { console.log('Third Listener') },
    () => { console.log('Fourth Listener') }
  ]
}

const linkMedia = <Tile variant='link' linkText='https://www.google.com' />
const imgMedia = <Tile variant='image' backgroundImage={Woman} onClick={() => { console.log('First Listener') }} />
const videoMedia = <Tile variant='video' backgroundImage={Movie} hours='0' minutes='5' seconds='42' />

export const mediaControlPanel = Template.bind({})
mediaControlPanel.args = {
  variant: 'media',
  name: 'Media & Links',
  components: [imgMedia, linkMedia, linkMedia, videoMedia, imgMedia, linkMedia, imgMedia, linkMedia, videoMedia],
  listeners: [
    () => { console.log('First Listener') },
    () => { console.log('Second Listener') },
    () => { console.log('Third Listener') },
    () => { console.log('Fourth Listener') },
    () => { console.log('Fifth Listener') },
    () => { console.log('Sixth Listener') },
    () => { console.log('Seventh Listener') },
    () => { console.log('Eighth Listener') },
    () => { console.log('Nineth Listener') }
  ]
}

export const chatControlPanel = Template.bind({})
chatControlPanel.args = {
  variant: 'chatroomOptions'
}
