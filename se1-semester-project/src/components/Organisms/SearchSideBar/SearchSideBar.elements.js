import styled from 'styled-components'
import CreateChatForm from '../CreateChatForm/CreateChatForm'

export const ParentContainer = styled.aside`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: flex-start;
    row-gap: 1rem;
    max-width: 400px;
    width: 100%;
`
export const CreateChatFormStyled = styled(CreateChatForm)`
    position: absolute;
    top: 110px;
    left: 400px;
`
