import NestedExitButton from './NestedExitButton'
import Woman from '../../../../public/woman-in-field.jpg'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsLink45Deg } from 'react-icons/bs'

export default {
  title: 'Molecules/Nested Button/Nested Exit Button',
  component: NestedExitButton,
  argTypes: {
    size: { control: 'text' },
    color: { control: 'text' },
    component: { control: 'text' },
    backgroundImage: { control: 'text' },
    onClick: { action: 'onClick works' }
  }
}

const Template = args => <NestedExitButton {...args} />

export const photoAttachment = Template.bind({})
photoAttachment.args = {
  backgroundImage: Woman,
  icon: <AiOutlinePlus />
}

export const linkAttachment = Template.bind({})
linkAttachment.args = {
  icon: <BsLink45Deg />
}
