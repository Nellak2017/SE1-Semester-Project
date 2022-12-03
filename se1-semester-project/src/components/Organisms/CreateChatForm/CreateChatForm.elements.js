import styled from 'styled-components'
import Container from '../../Atoms/Container/Container'
import IconButton from '../../Atoms/IconButton/IconButton'

export const CreateChatFormParent = styled(Container)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    row-gap: 1rem;
    padding-top: 5px;
    padding-right: 5px;
    padding-bottom: 5px;
    min-width: 590px;
    width: 590px;
    min-height: 235px;
    width: 100%;
    border-radius: 10px;
    position: absolute;
`

export const CreateChatFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    row-gap: 1rem;
    width: 100%;
    height: 100%;
`

export const ExitContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    column-gap: 20%;
    width: 100%;
`

export const SearchContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    column-gap: 1rem;
    padding-right: 1rem;
    width: 100%;
`

export const AvailableUsersContainer = styled.article`
    z-index: 10;
    position: absolute;
    top: 100%;
    left: 25%;
    padding: .5rem;
    display: inline-flex;
    align-items: center;
    flex-direction: column;
    row-gap: .5rem;
    border-radius: 10px;
    width: 15rem;
    max-height: 15rem;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: ${props => props.theme.colors.darkNeutral};

    & p {
        width: 100%;
        border-radius: 10px;
        line-height: 1rem;
        padding: 0 .5rem;
        text-align: center;
        vertical-align: middle;
        text-overflow: ellipsis;
        overflow-x: hidden;
        overflow-y: hidden;

        &:hover {
            background-color: ${props => props.theme.colors.darkNeutralHover};
        }
        &:active {
            background-color: ${props => props.theme.colors.darkNeutralActive};
        }
    }
`

export const SelectedUsersGrid = styled.section`

    margin: 0;
    padding-top: .5rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: minmax(1fr, 1fr) repeat(4, 1fr);
    overflow-y: auto;
    align-items: center;
    justify-items: center;
    gap: 1rem 2rem;
    width: 100%;
    height: 100%;
    max-height: 10rem;
`

export const UserGridItem = styled.span`
    position: relative;
    padding: 0 .5rem;
    border-radius: 10px;
    text-align: center;
    vertical-align: middle;
    min-height: 1rem;
    &:hover {
        background-color: ${props => props.theme.colors.darkNeutralHover};
    }
    &:active {
        background-color: ${props => props.theme.colors.darkNeutralActive};
    }
`
export const GridExit = styled(IconButton)`
    z-index: 10;
    position: absolute;
    right: 100%;
`
