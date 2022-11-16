import ColorChooser from './ColorChooser'
import { Temp } from './ColorChooser.elements'

export default {
  title: 'Molecules/Color Chooser',
  component: ColorChooser,
  argTypes: {
    color: { control: 'text' }
  }
}

const Template = args => <Temp><ColorChooser {...args} /></Temp>

export const colorChooser = Template.bind({})
colorChooser.args = {}
