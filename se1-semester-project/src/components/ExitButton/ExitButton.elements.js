import styled from 'styled-components'
import { space, layout, typography } from 'styled-system'
import { getPresetCSS, exitButtonPreSets } from '../../design_system/theme'

export const ExitButtonStyled = styled.button`
    outline: none;
    outline: 0px solid transparent;
    border-radius: 100%;
    &:hover {
        box-shadow: ${props => props.theme.elevations.small};
      }
    &:active {
        box-shadow: ${props => props.theme.insets.normal};
    }
    ${space} 
    ${layout}
    ${typography} 
    ${getPresetCSS(exitButtonPreSets, 'size')}
    ${getPresetCSS(exitButtonPreSets, 'color')}
`
