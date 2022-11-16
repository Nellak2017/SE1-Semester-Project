import styled from 'styled-components'
import { space, layout, typography } from 'styled-system'
import { getPresetCSS, closeRightBarPresets, leftComponentWrapperSideNavPresets } from '../../../design_system/theme'

// This component has the Most Magic Numbers, and has the weird "Left" and "Right" component props
export const CloseRightBarParent = styled.nav`
    display: grid;
    grid-template-columns: 290px; // It is possible this might be wrong
    grid-template-rows: 64px auto auto auto; // This may break at different media queries (bc it is magic num)
    justify-content: center;
    align-items: center;
    row-gap: 0;
    z-index: 100; 
    width: 360px;
    height: 100vh;
    position: fixed;
    top: 0;
    right: -310px;
    transition: 850ms;
    border-radius: 1rem 0 0 1rem;
    overflow-y: scroll;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */

    background-color: ${props => props.theme.colors.lightNeutral};

    ::-webkit-scrollbar {
        display: none; /* for Chrome, Safari, and Opera */
    }

    // Without this, it will select all SVG and give all weird position
    & > svg:first-of-type {
        z-index: 999;
        position: absolute;
        top: 5px;
        left: 5px;
        font-size: 45px;
    }

    // The media queries here are designed to make the right bar responsive to smaller screens
    // Hide the Right bar if the screen is the size of a phone or smaller
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        display: none;
    }

    ${space}
    ${layout}
    ${typography}
    ${getPresetCSS(closeRightBarPresets, 'variant')}
    ${getPresetCSS(closeRightBarPresets, 'color')} 
`

export const LeftComponentWrapper = styled.div`
    margin: 0;
    padding: 0;
    height: 100%;
    
    &:first-child {
        width: calc(100% - 35px); // found through experiment
        transition: 850ms;
        margin: 0;
    }

    ${space}
    ${layout}
    ${typography}
    ${getPresetCSS(leftComponentWrapperSideNavPresets, 'variant')}
`
