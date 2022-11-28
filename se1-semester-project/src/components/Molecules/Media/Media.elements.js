import styled from 'styled-components'

export const MediaParent = styled.span`
    z-index: 0; // by default the parent will be below all other Media
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    background: transparent;
    min-height: 10rem;
    min-width: 10rem;
    height: 100%;
    width: 100%;
    // justify content is determined by text placement area prop

    // Every video or image that isn't the last video must be below the current video, but still playable
    & > video,image {
        position: absolute;
        height: 100%;
        width: 100%;
        object-fit: contain;
        :not(:last-child) {
            z-index: 0;
        }
        :last-child {
            z-index: 1;
        }
    }
    // Every Audio will be hidden, but will still play noise and be controlled by the component
    & > audio {
        // audios by default don't display, so you don't do any styles haha

    }
`

// The Text overlay must have a higher z-index than the video (last video has z-index 1)
export const MediaChild = styled.h1`
    // color is determined by text color prop
    position: absolute;
    max-height: 33%;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    z-index: 2;
`

export const Temp = styled.div`
    height: 98vh;
    width: 100%;
    display: flex;
    column-gap: 5rem;
    align-items: center;
    justify-content: center;
`
