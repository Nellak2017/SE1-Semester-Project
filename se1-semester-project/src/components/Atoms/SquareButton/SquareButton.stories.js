import SquareButton from './SquareButton'

export default {
  title: 'Atoms/Buttons/SquareButton',
  component: SquareButton,
  argTypes: {
    size: { control: 'text' },
    color: { control: 'text' }
  }
}

const Template = args => <SquareButton {...args} />

export const squareButton = Template.bind({})
squareButton.args = {
  size: 'l',
  color: 'lightNeutral'
}
