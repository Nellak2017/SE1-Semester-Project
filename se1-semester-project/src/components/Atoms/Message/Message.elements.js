import styled from 'styled-components'
import { space, layout, typography } from 'styled-system'
import { getPresetCSS, messagePreSets } from '../../../design_system/theme'

// Note: Message Component has a single pre child
export const MessageStyled = styled.div`
    outline: none;
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    word-wrap: break-word;
    word-break: break-word;
    scroll-behavior: auto;
    max-width: ${props => props.theme.breakpoints.sm};
    border-radius: ${props => props.theme.spaces.medium};

    // initially m sized
    padding: ${props => props.theme.spaces.small} ${props => props.theme.spaces.medium}; 

    // initially primary colored
    color: ${props => props.theme.colors.primaryLight};
    background-color: ${props => props.theme.colors.primary};
    
    // Added in to fix the Pre not word wrapping bug
    & pre {
        width: 100%;
        overflow-x: auto;
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -pre-wrap;
        white-space: -o-pre-wrap;
        word-wrap: break-word;
    }

    &:hover {
        background-color: ${props => props.theme.colors.primaryHover};
        box-shadow: ${props => props.theme.elevations.small};
        cursor: text;
        }
    &:active {
        background-color: ${props => props.theme.colors.primaryActive};
        cursor: text;
    }
    ${getPresetCSS(messagePreSets, 'variant')}
    ${getPresetCSS(messagePreSets, 'color')}
    ${space}
    ${layout}
    ${typography}  
`
