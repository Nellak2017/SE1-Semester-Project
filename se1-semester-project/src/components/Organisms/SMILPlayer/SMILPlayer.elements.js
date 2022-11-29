import styled from 'styled-components'
import Container from '../../Atoms/Container/Container'

export const SMILPlayerParentStyled = styled(Container)`
	padding: 0;
	margin: 0;
	z-index: 0;
	display: inline-flex;
	flex-direction: column;
	row-gap: 0;
	max-width: 1480px;
	min-width: 250px;
	width: 100%;
	background-color: ${props => props.theme.colors.darkNeutralDarker}40;
`

export const ExitBtnContainer = styled.div`
	z-index: 2;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	width: 100%;
	border-radius: 5px 5px 0 0;
	margin: 0;
	padding: ${props => props.theme.spaces.smaller};
	background-color: ${props => props.theme.colors.lightNeutral};
`

// Holds ALL Of the Video Media
export const VideoContainer = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 200px;
	height: 100%;
	width: 100%;
	border-radius: 5px;
	background-color: ${props => props.theme.colors.darkNeutralDarker};
	// phones and below
	@media (max-width: ${props => props.theme.breakpoints.sm}) {
        min-height: 200px;
		max-height: 300px;
    }
	// tablets and above
	@media (min-width: ${props => props.theme.breakpoints.md}) {
        min-height: 300px;
		max-height: 400px;
    }
	// laptops and above
	@media (min-width: ${props => props.theme.breakpoints.lg}) {
        min-height: 400px;
		max-height: 500px;
    }
	// desktops and above
	@media (min-width: ${props => props.theme.breakpoints.xl}) {
        min-height: 500px;
		max-height: 600px;
    }

	// Video Slider Styles

	// The whole Slider
	& .ui-video-seek-slider {
		//position: absolute;
		//bottom: 2rem;
		& > .thumb .track .main .connect .handler{
			background-color: purple;
		}
	}

	// color the slider to be primary colored
	& .ui-video-seek-slider .thumb .track .main .connect .handler {
		background-color: purple;
	}

`

export const CenterContainer = styled.span`
	position: relative;
	width: 100%;
	min-height: 250px;
	height: 100%;
	// phones and below
	@media (max-width: ${props => props.theme.breakpoints.sm}) {
        min-height: 200px;
		max-height: 300px;
    }
	// tablets and above
	@media (min-width: ${props => props.theme.breakpoints.md}) {
        min-height: 300px;
		max-height: 400px;
    }
	// laptops and above
	@media (min-width: ${props => props.theme.breakpoints.lg}) {
        min-height: 400px;
		max-height: 500px;
    }
	// desktops and above
	@media (min-width: ${props => props.theme.breakpoints.xl}) {
        min-height: 500px;
		max-height: 600px;
    }
`

export const MediaContainer = styled.section`
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: ${props => props.theme.colors.darkNeutralDarker};
`

export const ControlBtnsContainer = styled.div`
	z-index: 2;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	column-gap: 1.5rem;
	border-radius: 0 0 5px 5px;
	height: ${props => props.theme.spaces.extraLarge};
	background-color: ${props => props.theme.colors.lightNeutral};
`
