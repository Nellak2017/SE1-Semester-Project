import styled from 'styled-components'
import { space, layout, typography } from 'styled-system'
import { getPresetCSS, messageBarPresets } from '../../../design_system/theme'
import ChatInput from '../../Atoms/ChatInput/ChatInput'
import SquareButton from '../../Atoms/SquareButton/SquareButton'

// This only supports one size variant, to make development faster.
// Unless it is explicitly needed, I will omit it for now.
export const MessageBarParent = styled.div`
    display: flex;
    column-gap: .5rem;
    align-items: center;
    width: 100%;

    ${space}
    ${layout}
    ${typography}
    ${getPresetCSS(messageBarPresets, 'color')}
`
// in case you need to style the ChatInput, change it here.
export const ChatInputStyled = styled(ChatInput)``

// in case you need to style the IconButton, change it here
export const SquareButtonStyled = styled(SquareButton)`
    padding: ${props => props.theme.spaces.small}; // Here for the one size variant
    & svg {
        height: ${props => props.theme.fontSizes.larger};
        width: ${props => props.theme.fontSizes.larger};
    }
`
