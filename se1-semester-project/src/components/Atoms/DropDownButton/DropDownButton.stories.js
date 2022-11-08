import DropDownButton from './DropDownButton'

export default {
  title: 'Atoms/Buttons/DropDownButton',
  component: DropDownButton,
  argTypes: {
    size: { control: 'text' },
    color: { control: 'text' },
    outlineSize: { control: 'text' },
    outlineColor: { control: 'text' }
  }
}

const Template = args => <DropDownButton {...args} />

export const dropDownButton = Template.bind({})
dropDownButton.args = {
  size: 'm',
  children: 'Drop Down Button',
  color: 'primary'
}
