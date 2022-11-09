import styled from 'styled-components'
import { space, layout, typography } from 'styled-system'
import { getPresetCSS, notificationPreSets } from '../../../design_system/theme'

export const NotificationStyled = styled.span`
    outline: none;
    outline: 0px solid transparent;
    border-radius: 100%;
	display: inline-flex;

	// initially small sized
	width: ${props => props.theme.spaces.small};
	height: ${props => props.theme.spaces.small};

	// initially primary colored
	color: ${props => props.theme.colors.primaryLight};
    background-color: ${props => props.theme.colors.primary};
    
    &:hover {
		background-color: ${props => props.theme.colors.primaryHover};
        box-shadow: ${props => props.theme.elevations.small};
      }
	${getPresetCSS(notificationPreSets, 'variant')}
    ${getPresetCSS(notificationPreSets, 'size')}
    ${getPresetCSS(notificationPreSets, 'color')}
	${space}
    ${layout}
    ${typography}  
`
