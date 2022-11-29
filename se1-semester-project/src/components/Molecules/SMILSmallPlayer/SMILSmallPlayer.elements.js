import styled from 'styled-components'

// @TODO: Add Media Queries
export const SmallSmilStyled = styled.article`
    position: relative;
    width: 340px;
    min-height: 190px;
    height: 190px;
    border-radius: 5px;
    background-color: ${props => props.theme.colors.lightNeutral};
    box-shadow: ${props => props.theme.elevations.medium};
    &:hover {
        cursor: pointer;
    }
    &:active {
        cursor: pointer;
        box-shadow: ${props => props.theme.insets.normal};
    }
`

export const ExpandPlacer = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
`
export const PlayPlacer = styled.div`
    position: absolute;
    top: 30%;
    left: 40%;
`
