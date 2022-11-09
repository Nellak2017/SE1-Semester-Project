import styled from 'styled-components'
import { space, layout, typography } from 'styled-system'
import { getPresetCSS, chatInputPresets } from '../../../design_system/theme'

export const ChatInputStyled = styled.input`
    outline: none;
	/*
	display: inline-flex; //possibly unnecessary
	flex-direction: row; //possibly unnecessary
	justify-content: flex-start; //possibly unnecessary
	align-items: center; //possibly unnecessary
	*/
	word-wrap: break-word;
	word-break: break-word;
	scroll-behavior: auto;
	max-width: ${props => props.theme.breakpoints.sm};
	border-radius: ${props => props.theme.spaces.medium};

	// initially Light Neutral colored
	color: ${props => props.theme.colors.lightNeutralLight};
    background-color: ${props => props.theme.colors.lightNeutral};
    &:hover {
      background-color: ${props => props.theme.colors.lightNeutralHover};
    }
    &:active {
      background-color: ${props => props.theme.colors.lightNeutralActive};
    }

	${getPresetCSS(chatInputPresets, 'variant')}
    ${getPresetCSS(chatInputPresets, 'color')}
	${space}
    ${layout}
    ${typography}  
`
