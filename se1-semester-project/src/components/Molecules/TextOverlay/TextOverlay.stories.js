import TextOverlay from './TextOverlay'
import Woman from '../../../../public/woman-in-field.jpg'
import { Temp } from './TextOverlay.elements'

export default {
  title: 'Molecules/Text Overlay',
  component: TextOverlay,
  argTypes: {
    text: { control: 'text' },
    color: { control: 'text' },
    position: { control: 'text' },
    size: { control: 'text' }
  }
}
// Temp merely positions the TextOverlay so that it is easier to see
const Template = args => <Temp><TextOverlay {...args} /></Temp>

const testVideo = (
  <>
    <video playsInline autoPlay muted loop>
      <source src='https://www.w3schools.com/html/mov_bbb.mp4' type='video/mp4' />
      <source src='https://www.w3schools.com/html/mov_bbb.ogg' type='video' />
      Your browser does not support the video tag. I suggest you upgrade your browser.
    </video>
  </>
)
const testVideos = [testVideo, testVideo, testVideo]
const testImages = [Woman, Woman]

// font sizes: [14px, 20px, 32px, 34px] work fine
// Only last image is displayed as background image, videos have higher z-index than images
// Only last video is displayed, all others are hidden underneath with 0 z-index yet are all playing
export const textOverlay = Template.bind({})
textOverlay.args = {
  text: 'The Quick Brown Fox Jumped Over The Lazy Dog.',
  position: 'Center',
  color: '#fff',
  size: '20px',
  videos: testVideos,
  images: testImages
}
