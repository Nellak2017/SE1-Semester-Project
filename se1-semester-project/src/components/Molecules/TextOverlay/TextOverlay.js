import React from 'react'
import { TextOverlayChild, TextOverlayParent } from './TextOverlay.elements'

// color should be a rgba, rgb, or hex string
// position is one of [top, mid/middle, bottom]
// text is the displayed text
// size is the size in px
function TextOverlay (props) {
  const { text, color, position, size, videos, images, ...rest } = props
  const posToStyle = (position) => {
    if (position?.toLowerCase()?.trim() === 'top') {
      return 'flex-start'
    } else if (position?.toLowerCase()?.trim() === 'middle' || position?.toLowerCase()?.trim() === 'mid') {
      return 'center'
    } else if (position?.toLowerCase()?.trim() === 'bottom') {
      return 'flex-end'
    } else {
      return 'center'
    }
  }
  const childStyles = {
    color: `${color}`,
    fontSize: `${size}`
  }
  const parentStyles = {
    justifyContent: `${posToStyle(position)}`,
    backgroundImage: `url(${images && Array.isArray(images) && images[images?.length - 1]})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  }

  return (
    <TextOverlayParent style={parentStyles} {...rest}>
      <TextOverlayChild style={childStyles}>
        {text && text}
      </TextOverlayChild>
      {videos && Array.isArray(videos) &&
      videos.map((video, index) => <React.Fragment key={`video${index}`}>{video}</React.Fragment>)}
    </TextOverlayParent>
  )
}

export default TextOverlay
