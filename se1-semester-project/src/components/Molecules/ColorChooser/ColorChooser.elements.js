import styled from 'styled-components'

// This Component has 1 variant and 1 size hard coded in

// holds the colorchooser btn and the color picker, it is relatively positioned
export const ColorChooserBtnParent = styled.div`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    box-shadow: ${props => props.theme.elevations.extraSmall};
    display: inline-block;
    cursor: pointer;
`
// has the color of the chosen color
export const ColorChooserBtnChild = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
`

// holds the color picker, should be absolutely positioned
export const ColorChooserContainer = styled.div`
    position: absolute;
    z-index: 2;
    top: -310px;
    left: 0;
`
export const Cover = styled.div`
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
`

// simply used to visually see it in Storybook
export const Temp = styled.div`
    display: flex;
    height: 100vh;
    width: 80%;
    align-items: center;
    justify-content: center;
`
