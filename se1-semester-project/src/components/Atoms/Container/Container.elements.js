import styled from 'styled-components'
import { space, layout, typography, border } from 'styled-system'
import { getPresetCSS, containerPreSets } from '../../../design_system/theme'

export const ContainerStyled = styled.span`
    outline: none;
    outline: 0px solid transparent;
    border-radius: ${props => props.theme.spaces.small};
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    row-gap: 1rem;
    column-gap: 1rem;

    // initially xl sized
    padding: ${props => props.theme.spaces.larger} ${props => props.theme.spaces.larger};

    // initially primary colored
    color: ${props => props.theme.colors.primaryLight};
    background-color: ${props => props.theme.colors.primary};

    &:hover {
        box-shadow: ${props => props.theme.elevations.small};
        cursor: default;
        }
    &:active {
        box-shadow: none;
        cursor: default;
    }
    ${getPresetCSS(containerPreSets, 'variant')}
    ${getPresetCSS(containerPreSets, 'size')}
    ${getPresetCSS(containerPreSets, 'color')}
    ${getPresetCSS(containerPreSets, 'outlineSize')}
    ${getPresetCSS(containerPreSets, 'outlineColor')}
    ${space}
    ${layout}
    ${typography}
    ${border}   
`
