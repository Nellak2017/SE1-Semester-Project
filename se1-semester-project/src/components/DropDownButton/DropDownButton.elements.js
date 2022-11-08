import styled from 'styled-components'
import { space, layout, typography } from 'styled-system'
import { getPresetCSS, dropDownButtonPreSets } from '../../design_system/theme'

export const DropDownButtonStyled = styled.button`
    outline-style: solid;
    border-radius: ${props => props.theme.spaces.medium};
    &:hover {
        box-shadow: ${props => props.theme.elevations.small};
      }
    &:active {
        box-shadow: ${props => props.theme.insets.normal};
    }
    ${space} 
    ${layout}
    ${typography}
    ${getPresetCSS(dropDownButtonPreSets, 'size')}
    ${getPresetCSS(dropDownButtonPreSets, 'color')} 
    ${getPresetCSS(dropDownButtonPreSets, 'outlineSize')}
    ${getPresetCSS(dropDownButtonPreSets, 'outlineColor')} 
`
