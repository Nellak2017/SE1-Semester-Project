import styled from 'styled-components'
import { space, layout, typography } from 'styled-system'
import { getPresetCSS, rightBarControlPanelPresets } from '../../../design_system/theme'
import Container from '../../Atoms/Container/Container'

// This is reaching Java levels of verbosity 😂
// This component acts as a Control Panel for the Side Bar
export const RightBarControlPanelParent = styled(Container)`
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 100%;
    max-width: 315px;
    max-height: 275px;
    scroll-behavior: auto;

    border-radius: ${props => props.theme.spaces.medium};

    & h3 {
        position: absolute;
        top: -20px;
        left: 5px;
        width: 315px;
        font-size: 14px;
        font-weight: 100;
    }
    &:hover {
        cursor: default;
        box-shadow: none;
    } 
    &:active {
        cursor: default;
        box-shadow: none;
        background-color: ${props => props.theme.colors.darkNeutralHover}; // works only on 1 color variant
    }

    ${space}
    ${layout}
    ${typography}
    ${getPresetCSS(rightBarControlPanelPresets, 'variant')}
`

// used to wrap the parent to give proper styling within the right bar container organism
export const WrapperDiv = styled.section`
    width: 100%; 
    display: flex; 
    flex-direction: row; 
    align-content: center; 
    justify-content: center;
`
