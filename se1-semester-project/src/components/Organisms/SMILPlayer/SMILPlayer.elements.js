import styled from 'styled-components'
import Container from '../../Atoms/Container/Container'

export const SMILPlayerParentStyled = styled(Container)`
	padding: 0;
	z-index: 0;
	background-color: ${props => props.theme.colors.darkNeutralDarker}40;
	display: inline-flex;
	flex-direction: column;
	row-gap: 0;
	max-width: 1097px;
	min-width: 450px;
	width: 75%;
	
`

export const ExitBtnContainer = styled.div`
	margin: 0;
	padding: ${props => props.theme.spaces.smaller};
	background-color: ${props => props.theme.colors.lightNeutral};
	display: flex;
	align-items: center;
	justify-content: flex-end;
	width: 100%;
	border-radius: 5px 5px 0 0;
`

export const VideoContainer = styled.div`
	min-height: 250px;
	height: 100%;
	width: 100%;
	object-fit: contain; // video or image keeps aspect ratio, but resized
	background-color: ${props => props.theme.colors.darkNeutralDarker};
`

export const ControlBtnsContainer = styled.div`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: ${props => props.theme.spaces.extraLarge};
`
