import styled from 'styled-components'
import { space, layout, typography, border } from 'styled-system'
import { getPresetCSS, nestedExitButtonPresets } from '../../../design_system/theme'
import Container from '../../Atoms/Container/Container'

export const NestedExitButtonParent = styled(Container)`
    position: relative; // added so that exit button works as expected
    overflow: visible;
    & button {
        opacity: 85%;
        box-shadow: ${props => props.theme.elevations.smaller};
        &:hover {
            opacity: 90%;
        }
        &:active {
            opacity: 95%;
        }
    }
    & #exitBtn {
        opacity: 100%;
        position: absolute;
        top: -7px;
        right: -7px;
    }
    &:hover {
        box-shadow: none;
    }
    &:active {
        box-shadow: none;
    }

    ${space}
    ${layout}
    ${typography}
    ${border}
    ${getPresetCSS(nestedExitButtonPresets, 'variant')}
    ${getPresetCSS(nestedExitButtonPresets, 'color')} 
`
