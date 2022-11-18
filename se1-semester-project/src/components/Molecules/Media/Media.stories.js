import Media from './Media'
import Woman from '../../../../public/woman-in-field.jpg'
import { Temp } from './Media.elements'

export default {
  title: 'Molecules/Media',
  component: Media,
  argTypes: {
    text: { control: 'text' },
    color: { control: 'text' },
    position: { control: 'text' },
    size: { control: 'text' }
  }
}
// Temp merely positions the TextOverlay so that it is easier to see
const Template = args => <Temp><Media {...args} /></Temp>

// if you pass in a React Fragment containing the Video, then the React Clone will not have the ref to play/pause the video
// So always pass in a <video /> or <audio />
const testVideo = (
  <video playsInline autoPlay muted loop>
    <source src='https://www.w3schools.com/html/mov_bbb.mp4' type='video/mp4' />
    <source src='https://www.w3schools.com/html/mov_bbb.ogg' type='video' />
    Your browser does not support the video tag. I suggest you upgrade your browser.
  </video>
)

const testAudio = (
  <audio playsInline autoPlay muted loop>
    <source src='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' />
  </audio>
)

// font sizes: [14px, 20px, 32px, 34px] work fine
// Only last image is displayed as background image, videos have higher z-index than images
// Only last video is displayed, all others are hidden underneath with 0 z-index yet are all playing
export const media = Template.bind({})
media.args = {
  text: 'The Quick Brown Fox Jumped Over The Lazy Dog.',
  position: 'Center',
  color: '#fff',
  size: '20px',
  video: testVideo,
  audio: testAudio,
  image: Woman,
  zindex: '1',
  playing: 'true'
}
