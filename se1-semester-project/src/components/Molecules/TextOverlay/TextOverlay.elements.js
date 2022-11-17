import styled from 'styled-components'

export const TextOverlayParent = styled.span`
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    background: transparent;
    min-height: 10rem;
    min-width: 10rem;
    // justify content is determined by text placement area prop

    // Every video or image that isn't the last video must be below the current video, but still playable
    & > video,image {
        :not(:last-child) {
            position: absolute;
            z-index: 0;
        }
        :last-child {
            z-index: 1;
        }
    }
`

// The Text overlay must have a higher z-index than the video (last video has z-index 1)
export const TextOverlayChild = styled.h1`
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
    align-items: center;
    justify-content: center;
`
