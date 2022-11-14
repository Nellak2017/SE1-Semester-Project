import styled from 'styled-components'
import { space, layout, typography } from 'styled-system'
import { getPresetCSS, closeRightBarPresets, leftComponentWrapperSideNavPresets } from '../../../design_system/theme'

// This component has the Most Magic Numbers, and has the weird "Left" and "Right" component props
export const CloseRightBarParent = styled.nav`
    z-index: 999; 
    width: 360px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
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

    & svg, path {
        position: absolute;
        top: 5px;
        left: 5px;
        font-size: 45px;
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
