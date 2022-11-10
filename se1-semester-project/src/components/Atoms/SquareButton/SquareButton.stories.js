import SquareButton from './SquareButton'

export default {
  title: 'Atoms/Buttons/SquareButton',
  component: SquareButton,
  argTypes: {
    children: { control: 'text' },
    size: { control: 'text' },
    color: { control: 'text' }
  }
}

const Template = args => <SquareButton {...args} />

export const squareButton = Template.bind({})
squareButton.args = {
  children: 'icons can go here',
  size: 'l',
  color: 'lightNeutral'
}
