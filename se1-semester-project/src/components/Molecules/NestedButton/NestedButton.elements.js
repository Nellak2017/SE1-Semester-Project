import styled from 'styled-components'
import { space, layout, typography } from 'styled-system'
import { getPresetCSS, nestedButtonPresets } from '../../../design_system/theme'
// import SquareButton from '../../Atoms/SquareButton/SquareButton'
import Container from '../../Atoms/Container/Container'

export const NestedButtonParent = styled(Container)`
    background-color: ${props => props.theme.colors.darkNeutral};
    & svg {
        font-size: ${props => props.theme.fontSizes.large};
    }
    ${space}
    ${layout}
    ${typography}
    ${getPresetCSS(nestedButtonPresets, 'variant')}
    ${getPresetCSS(nestedButtonPresets, 'color')} 
`
