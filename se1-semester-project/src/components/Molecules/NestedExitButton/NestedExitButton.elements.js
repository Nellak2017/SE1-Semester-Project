import styled from 'styled-components'
import { space, layout, typography } from 'styled-system'
import { getPresetCSS, nestedExitButtonPresets } from '../../../design_system/theme'
import NestedButton from '../NestedButton/NestedButton'

export const NestedExitButtonParent = styled(NestedButton)`
    position: relative; // added so that exit button works as expected
    & button {
        opacity: 50%;
        box-shadow: ${props => props.theme.elevations.smaller};
        &:hover {
            opacity: 80%;
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

    ${space}
    ${layout}
    ${typography}
    ${getPresetCSS(nestedExitButtonPresets, 'variant')}
    ${getPresetCSS(nestedExitButtonPresets, 'color')} 
`
