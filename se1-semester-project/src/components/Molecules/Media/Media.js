import React, { useRef, useState } from 'react'
import { MediaChild, MediaParent } from './Media.elements'

/* @docstring

   description:
    This component will play media with a text overlay if it is defined.
    It is to be used inside a SMIL Player which will orchestrate an array of these using the controls.

   prop reference:
    text is the displayed text
    color should be a rgba, rgb, or hex string
    position is one of [top, mid/middle, bottom]
    size is the size in px
    video is the video element
    image is the image location (not the image element)!
    audio is the audio element
    zIndex defaults to 0 if invalid input. Else it can be [0,1]. 0 means below all Media, 1 means above all Media
    playing is either 'true' or 'false' if neither then it defaults to 'false' and doesn't play media

   notes:
    there can only be 1 of [image, video]
    if more than one is defined then [video > image]
    audio can exist alongside image and video and text (it is hidden but plays)
*/
function Media (props) {
  const { text, color, position, size, video, image, audio, zindex, playing, ...rest } = props
  const [mediaLen, setMediaLen] = useState(0)
  const videoRef = useRef(null)
  const audioRef = useRef(null)

  const playMedia = () => {
    if (videoRef.current.tagName.toLowerCase() === 'video') videoRef.current?.play()
    else console.error("Can't play video, it isn't a video tag. Try putting <video> in video prop.")
    if (audioRef.current.tagName.toLowerCase() === 'audio') audioRef.current?.play()
    else console.error("Can't play audio, it isn't an audio tag. Try putting <audio> in audio prop.")
  }

  const pauseMedia = () => {
    if (videoRef.current.tagName.toLowerCase() === 'video') videoRef.current?.pause()
    else console.error("Can't pause video, it isn't a video tag. Try putting <video> in video prop.")
    if (audioRef.current.tagName.toLowerCase() === 'audio') audioRef.current?.pause()
    else console.error("Can't pause audio, it isn't an audio tag. Try putting <audio> in audio prop.")
  }

  // We have no other way but to useImperativeHook to get the MediaLength because it is not known ahead of time
  // So we make a rare exception of breaking the declarative nature of React to get the Media Length
  const getMediaLen = () => {
    if (videoRef.current.tagName.toLowerCase() === 'video') setMediaLen(videoRef.current?.duration)
    else console.error("Can't get Length of video, it isn't a video tag. Try putting <video> in video prop.")
    if (audioRef.current.tagName.toLowerCase() === 'audio') setMediaLen(audioRef.current?.duration)
    else console.error("Can't get Length of audio, it isn't an audio tag. Try putting <audio> in audio prop.")
  }

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
    backgroundImage: `url(${image && !video && image})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    zIndex: `${zindex === '0' || zindex === '1' ? zindex : '0'}`
  }

  return (
    <>
      <MediaParent style={parentStyles} {...rest}>
        <MediaChild style={childStyles}>
          {text && text}
        </MediaChild>
        {video && React.cloneElement(video, { ...props, autoPlay: !!(playing && playing.toString().toLowerCase().trim() === 'true'), ref: videoRef })}
        {audio && React.cloneElement(audio, { ...props, autoPlay: !!(playing && playing.toString().toLowerCase().trim() === 'true'), ref: audioRef })}
      </MediaParent>
    </>
  )
}

export default Media
