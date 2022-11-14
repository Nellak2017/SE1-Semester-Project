import ComposeMessageBar from './ComposeMessageBar'

export default {
  title: 'Molecules/Compose Message Bar',
  component: ComposeMessageBar,
  argTypes: {
    variant: { control: 'text' },
    color: { control: 'text' }
  }
}

const Template = args => <ComposeMessageBar {...args} />

export const defaultInput = Template.bind({})
defaultInput.args = {}
