import Tiles from './Tiles'
import Movie from '../../../../public/movie.jpg'
import Woman from '../../../../public/woman-in-field.jpg' // source: https://unsplash.com/photos/y83TaGzr3mk

export default {
  title: 'Molecules/Tiles',
  component: Tiles,
  argTypes: {
    variant: { control: 'text' },
    size: { control: 'text' },
    color: { control: 'text' },
    linkText: { control: 'text' },
    hours: { control: 'text' },
    minutes: { control: 'text' },
    seconds: { control: 'text' },
    backgroundImage: { control: 'text' }
  }
}

const Template = args => <Tiles {...args} />

export const imageTile = Template.bind({})
imageTile.args = {
  variant: 'image',
  backgroundImage: Woman
}

export const linkTile = Template.bind({})
linkTile.args = {
  variant: 'link',
  linkText: 'https://www.google.com'
}

export const videoTile = Template.bind({})
videoTile.args = {
  variant: 'video',
  hours: '0',
  minutes: '0',
  seconds: '0',
  backgroundImage: Movie
}

export const audioTile = Template.bind({})
audioTile.args = {
  variant: 'audio'
}
