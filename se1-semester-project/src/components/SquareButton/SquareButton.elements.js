import styled from 'styled-components'
import { space, layout, typography } from 'styled-system'
import { getPresetCSS, squareButtonPreSets } from '../../design_system/theme'

export const SquareButtonStyled = styled.button`
    outline: none;
    outline: 0px solid transparent;
    border-radius: ${props => props.theme.spaces.small};
    &:hover {
        box-shadow: ${props => props.theme.elevations.small};
      }
    &:active {
        box-shadow: ${props => props.theme.insets.normal};
    }
    ${space}
    ${layout}
    ${typography}
    ${getPresetCSS(squareButtonPreSets, 'size')}
    ${getPresetCSS(squareButtonPreSets, 'color')} 
`
