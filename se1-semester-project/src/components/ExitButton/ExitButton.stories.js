import ExitButton from './ExitButton'
export default {
  title: 'Atoms/Buttons/ExitButton',
  component: ExitButton,
  argTypes: {
    size: { control: 'text' },
    color: { control: 'text' }
  }
}

const Template = args => <ExitButton {...args} />

export const exitButton = Template.bind({})
exitButton.args = {
  size: 'm',
  color: 'danger'
}
