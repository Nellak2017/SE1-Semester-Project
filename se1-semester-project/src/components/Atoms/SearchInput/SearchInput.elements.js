import styled from 'styled-components'
import { space, layout, typography } from 'styled-system'
import { getPresetCSS, chatInputPresets } from '../../../design_system/theme'

// This should be a div with div children. The first child should have role='textbox'
export const SearchInputParent = styled.div`
    padding: .5rem ${props => props.theme.fontSizes.smaller}; 
    outline: none;
    display: inline-flex; 
    flex-direction: row; 
    justify-content: flex-start;
    align-items: flex-end;
    column-gap: .5rem;
    width: 100%;
    cursor: text; // This is for accessibility. If user clicks parent div, chatInput child is focused

    border-radius: ${props => props.theme.spaces.medium};

    // initially Light Neutral colored
    color: ${props => props.theme.colors.lightNeutralLight};
    background-color: ${props => props.theme.colors.lightNeutral};
    &:hover {
        background-color: ${props => props.theme.colors.lightNeutralHover};
    }
   
    & input[type="search"]::-webkit-search-cancel-button {
        -webkit-appearance: none;
        height: 1em;
        width: 1em;
        border-radius: 50em;
        background: url('https://pro.fontawesome.com/releases/v5.10.0/svgs/solid/times-circle.svg') no-repeat 50% 50%;
        background-size: contain;
        opacity: 0;
        pointer-events: none;
        filter: invert(1); // value of 1 for dark theme, 0 for light. This is not supported in general, only for dark themes
    }

    & input[type="search"]:focus::-webkit-search-cancel-button {
        opacity: .3;
        pointer-events: all;
    }

    ${getPresetCSS(chatInputPresets, 'variant')}
    ${getPresetCSS(chatInputPresets, 'color')}
    ${space}
    ${layout}
    ${typography}  
`

export const SearchInputChild = styled.input`
    border-radius: 0; // for accesibility
    padding: .5rem 0; // This is here so that no matter where a user presses it will focus
    line-height: 1.375rem;
    min-height: 1.375rem;
    max-height: 8.5rem; // max height is 6 lines, addressed here
    outline: none;
    box-shadow: none;

    width: 100%;
    resize: none;
    align-self: center; // if you have xl sized icon buttons, then it looks weird
    outline: none;
    background-color: transparent;
    border: none;
    text-align: left;
    user-select: text;
    overflow: hidden;
    cursor: text; // This is for accessibility.

    color: ${props => props.theme.colors.lightNeutralLight};
    caret-color: ${props => props.theme.colors.lightNeutralLight};
    font-size: ${props => props.theme.fontSizes.medium};

    &:active{
        box-shadow: none;
    }
`
