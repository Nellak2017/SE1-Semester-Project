import styled from 'styled-components'
import Container from '../../Atoms/Container/Container'
import ExitButton from '../../Atoms/ExitButton/ExitButton'
import NestedButton from '../../Molecules/NestedButton/NestedButton'

export const FormContainer = styled(Container)`
    padding-bottom: 0rem; // was .5rem
    padding-top: 0rem; // was 1.5rem
    padding-left: 1.5rem;
    padding-right: 1rem;
    position: relative;
    min-width: 215px;
    max-width: 90%;
    width: 100%;
    min-height: 0px; // was 250px
    height: 100%;

    &:hover {
        box-shadow: none;
        cursor: default;
    }
    &:active{
        box-shadow: none;
        cursor: default;
    }
    `

export const ChatFormStyled = styled.form`
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    row-gap: 1rem;
    min-height: 218px;
    height: 100%;
    width: 100%;
    padding-bottom: .5rem;
    `

export const MediaBox = styled.div`
    z-index: 0;
    overflow: visible;
    padding-top: 8px;
    display: flex;
    column-gap: 1.0rem;
    row-gap: 1rem;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
    max-height: 240px;
    //overflow-y: auto;
    scroll-behavior: auto;
    
    `

export const ExitButtonStyled = styled(ExitButton)`
    z-index: 10; // fixes the half button hover glitch
    position: absolute;
    top: 8px;
    right: 8px;
    `

export const LeftButtonBottom = styled(NestedButton)`
    position: absolute;
    left: -45px;
    top: 20px;
    cursor: pointer;
    & :hover {
        cursor: pointer;
    }
    `
export const LeftButtonMiddle = styled(NestedButton)`
    position: absolute;
    left: -45px;
    top: 65px;
    cursor: pointer;
    & :hover {
        cursor: pointer;
    }
    `
export const LeftButtonTop = styled(NestedButton)`
    position: absolute;
    left: -45px;
    top: 110px;
    cursor: pointer;
    & :hover {
        cursor: pointer;
    }
`
