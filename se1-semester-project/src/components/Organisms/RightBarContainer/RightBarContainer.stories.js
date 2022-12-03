import RightBarContainer from './RightBarContainer'
import Tile from '../../Molecules/Tile/Tile'
import Woman from '../../../../public/woman-in-field.jpg'
import Movie from '../../../../public/movie.jpg'

export default {
  title: 'Organisms/Right Bar Container',
  component: RightBarContainer,
  argTypes: {
    variant: { control: 'text' },
    name: { control: 'text' },
    components: { control: 'text' }
  }
}

const Template = args => <RightBarContainer {...args} />

export const rightBarContainer = Template.bind({})
rightBarContainer.args = {
  children: <div> Test Test </div>
}
