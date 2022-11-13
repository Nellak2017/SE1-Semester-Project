import NestedButton from './NestedButton'
import { AiOutlinePlus } from 'react-icons/ai'
import SquareButton from '../../Atoms/SquareButton/SquareButton'

export default {
  title: 'Molecules/Nested Button',
  component: NestedButton,
  argTypes: {
    variant: { control: 'text' },
    size: { control: 'text' },
    color: { control: 'text' },
    component: { control: 'text' }
  }
}

const Template = args => <NestedButton {...args} />

export const savedMMSButton = Template.bind({})
savedMMSButton.args = {
  variant: 'savedMMS'
}

export const eyeglassButton = Template.bind({})
eyeglassButton.args = {
  variant: 'eyeglass'
}

export const saveButton = Template.bind({})
saveButton.args = {
  variant: 'save'
}

export const newMediaButton = Template.bind({})
newMediaButton.args = {
  variant: 'newMedia'
}

export const customNestedButton = Template.bind({})
customNestedButton.args = {
  component: <SquareButton color='primary' size='xs'><AiOutlinePlus /></SquareButton>
}
