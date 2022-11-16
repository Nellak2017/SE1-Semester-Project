import ComposeMessageBar from './ComposeMessageBar'
import { Temp } from '../ColorChooser/ColorChooser.elements'

export default {
  title: 'Molecules/Message/Compose Message Bar',
  component: ComposeMessageBar,
  argTypes: {
    variant: { control: 'text' },
    color: { control: 'text' }
  }
}

const Template = args => <Temp><ComposeMessageBar {...args} /></Temp>

export const defaultInput = Template.bind({})
defaultInput.args = {}
