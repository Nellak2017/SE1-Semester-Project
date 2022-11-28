import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react'
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
const Media = forwardRef((props, ref) => {
  const { text, color, position, size, video, image, audio, zindex, playing, ...rest } = props
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef(null)
  const audioRef = useRef(null)

  // NOTE: I only use this because I see no other way to get the durations of medias
  useImperativeHandle(ref, () => ({
    getMediaLen () { return getMediaLen() },
    playMediaImp () { playMedia() },
    pauseMediaImp () { pauseMedia() }
  }))

  const playMedia = () => {
    // if media is video
    if (videoRef !== null && videoRef?.current?.tagName?.toLowerCase() === 'video') {
      videoRef.current?.play()
    }

    // if media is audio
    if (audioRef !== null && audioRef?.current?.tagName?.toLowerCase() === 'audio') {
      audioRef.current?.play()
    }
  }

  const pauseMedia = () => {
    if (videoRef !== null && videoRef?.current?.tagName?.toLowerCase() === 'video') {
      if (videoRef.current?.play()) {
        videoRef.current?.play().then(() => {
          videoRef.current?.pause()
        })
      }
    }

    if (audioRef !== null && audioRef?.current?.tagName?.toLowerCase() === 'audio') {
      if (audioRef.current?.play()) {
        audioRef.current?.play().then(() => {
          audioRef.current?.pause()
        })
      }
    }
  }

  // onClick={playPauseMedia} was in MediaParent, it allowed any one pressing the media to play/pause it at will
  // It was removed because it makes the presentation get out of sync
  const playPauseMedia = () => {
    // if media is video
    if (videoRef !== null && videoRef?.current?.tagName?.toLowerCase() === 'video') {
      if (!isPlaying) {
        videoRef.current?.play()
      } else {
        if (videoRef.current?.play()) {
          videoRef.current?.play().then(() => {
            videoRef.current?.pause()
          })
        }
      }
      setIsPlaying(!isPlaying)
    }

    // if media is audio
    if (audioRef !== null && audioRef?.current?.tagName?.toLowerCase() === 'audio') {
      if (!isPlaying) {
        audioRef.current?.play()
      } else {
        if (audioRef.current?.play()) {
          audioRef.current?.play().then(() => {
            audioRef.current?.pause()
          })
        }
      }
      setIsPlaying(!isPlaying)
    }
  }

  // We have no other way but to useImperativeHook to get the MediaLength because it is not known ahead of time
  // So we make a rare exception of breaking the declarative nature of React to get the Media Length
  const getMediaLen = () => {
    if (videoRef.current?.tagName.toLowerCase() === 'video') return videoRef.current?.duration
    if (audioRef.current?.tagName.toLowerCase() === 'audio') return audioRef.current?.duration
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
    backgroundSize: 'contain',
    zIndex: `${zindex === '0' || zindex === '1' ? zindex : '0'}`
  }

  return (
    <>
      <MediaParent style={parentStyles} {...rest}>
        <MediaChild style={childStyles}>
          {text && text}
        </MediaChild>
        {video && React.cloneElement(video, { autoPlay: !!(playing && playing.toString().toLowerCase().trim() === 'true'), ref: videoRef })}
        {audio && React.cloneElement(audio, { ref: audioRef })}
      </MediaParent>
    </>
  )
})

export default Media
