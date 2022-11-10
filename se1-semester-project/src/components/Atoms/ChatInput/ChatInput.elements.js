import styled from 'styled-components'
import { space, layout, typography } from 'styled-system'
import { getPresetCSS, chatInputPresets } from '../../../design_system/theme'

// This should be a div with div children. The first child should have role='textbox'
export const ChatInputParent = styled.div`
    padding: ${props => props.theme.fontSizes.smaller}; 

    outline: none;
    display: inline-flex; 
    flex-direction: row; 
    justify-content: flex-start;
    align-items: flex-start; 
    //line-height: 1rem;
    
    width: 100%;
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

// This is the actual input element that is made from scratch using a div
export const ChatInputChild = styled.div`
    outline: none;
    width: 100%;
    forced-color-adjust: none;

    line-height: 1.375rem;
    overflow-wrap: break-word;
    word-break: break-word;
    white-space: break-spaces;
    caret-color: ${props => props.theme.colors.lightNeutralLight};
    text-align: left;
`
