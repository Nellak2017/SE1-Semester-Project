import { useState, useEffect, useRef } from 'react'
import {
  SMILtoJSON,
  JSONtoMedia,
  JSONtoTimings,
  JSONplusLens,
  zIndexArr,
  playingArr,
  mediaFactory,
  maxJsonTiming
} from '../../../model/helper_functions/helpers'
import {
  SMILPlayerParentStyled,
  ExitBtnContainer,
  VideoContainer,
  ControlBtnsContainer
} from './SMILPlayer.elements'
import ExitButton from '../../Atoms/ExitButton/ExitButton'
import IconButton from '../../Atoms/IconButton/IconButton'
import { IoIosPause, IoIosPlay } from 'react-icons/io'

/* @docstring
inputs:
 json or smil, not both

output:
 SMILPlayer that plays media contained in json or smil
*/
// @TODO: For all functions calling Helpers, surround with Try-Catch
function SMILPlayer (props) {
  const { json, smil } = props
  const fps = 10
  const intervalRef = useRef() // Allows us to stop the clock when we need to
  const [initialPlay, setInitialPlay] = useState(true) // used to determine if it is the first play or not
  const [mediaPlaying, setMediaPlaying] = useState(false) // if media is playing, you can't call play(). If it is not playing you can't call pause()
  const [jsonCopy, setJsonCopy] = useState(null) // Holds JSON used throughout the Player. JSON+Len only changes it
  const [isJsonSet, setIsJsonSet] = useState(false) // Used to know when JSON Copy is set. Without this, it is called way too many times.
  const [fastClock, setFastClock] = useState(0) // Used for getting initial len info (maybe make clock into this?)
  const [tag, setTag] = useState(0) // Used to get the particular tag we are on in the SMIL

  const [mediaDurations, setMediaDurations] = useState({}) // Holds each media's durations

  const incorrectMediaRefs = useRef([]) // Used with initial Media so we can get media lens
  const [incorrectMediaArr, setIncorrectMediaArr] = useState(null) // Has incorrect media, don't render
  const correctMediaRefs = useRef([]) // Used in post-intial Media so we can RENDER it to the screen
  const [correctMediaArr, setCorrectMediaArr] = useState(null) // Has correct media, RENDER

  const [jsonTimings, setJsonTimings] = useState({}) // Holds timing info of each media
  const [zIndices, setZIndices] = useState({}) // Holds the array of stacking orders
  const [playing, setPlaying] = useState({}) // Holds the array of playing orders

  const setLens = (mediaArr_, ref_) => { // Returns {media[n][type]: Number | NaN, ...}
    const ret = {}
    let i = 0
    for (const theMedia of mediaArr_) {
      ret[theMedia.key] = ref_?.current[i]?.getMediaLen()
      i += 1
    }
    return ret
  } // this can't be extracted out because the ref.current thing inside

  const playMediaAuto = (mediaArr_, playingArr_, ref_) => { // Will loop through all Media and Press Play on all of them that are supposed to play
    let i = 0
    for (const theMedia of mediaArr_) {
      // [<Media key='Media[i][tagType]' ... />,...]
      // theMedia.key = 'Media[i][tagType]' // tagType is in ['text','audio','video','img']
      // Object.keys(playingArr_) = ['text','audio','video','img'] // 1 or 0 of each
      // Object.values(playingArr_) = ['true'|'false',...] // true or false for each
      const m = theMedia.key
      const mediaTagType = m.split('[')[m.split('[').length - 1].replace(']', '') // gives tag type of theMedia. Ex: audio, Ex: video
      const isMediaPlaying = playingArr_[mediaTagType] === 'true' // true if media should be playing, false otherwise
      if (isMediaPlaying) {
        ref_?.current[i]?.playMediaImp(mediaArr_)
      }
      i += 1
    }
  }

  const pauseMediaAuto = (mediaArr_, playingArr_, ref_) => { // Will loop through all Media and Press Pause on all of them that are supposed to !play
    let i = 0
    for (const theMedia of mediaArr_) {
      const m = theMedia.key
      const mediaTagType = m.split('[')[m.split('[').length - 1].replace(']', '') // gives tag type of theMedia. Ex: audio, Ex: video
      const isMediaPlaying = playingArr_[mediaTagType] === 'true' // true if media should be playing, false otherwise
      if (!isMediaPlaying) {
        ref_?.current[i]?.pauseMediaImp(mediaArr_)
      }
      i += 1
    }
  }

  const pauseMedia = (mediaArr_, ref_) => { // Will pause all media regardless of whether it should be playing or not
    let i = 0
    correctMediaRefs.current = correctMediaRefs.current.filter(x => x !== null)
    for (const theMedia of mediaArr_) {
      ref_?.current[i]?.pauseMediaImp(mediaArr_)
      i += 1
    }
  }

  const resetMedia = (mediaArr_, ref_) => { // Will loop through all Media and all of them to their initial starting points
  }

  // ----
  // Initial state - Do this once to get vital information
  // ----
  // see also: https://stackoverflow.com/questions/68685880/how-to-increment-a-react-state-every-second-using-setinterval

  // 1. Set JSON depending on the combination of json and smil passed in parameters. If both or none -> error
  // @TODO: Fix the Error handling and Create Error Components
  useEffect(() => {
    if (typeof json === 'undefined' && typeof smil !== 'undefined') setJsonCopy(SMILtoJSON(smil))
    else if (typeof json !== 'undefined' && typeof smil === 'undefined') setJsonCopy(json)
  }, [])

  // 2. Get JSON -> Media (Which is incorrect Media array)
  // @TODO: Add try-catch block to catch errors and display Error Component properly
  useEffect(() => {
    if (jsonCopy && jsonCopy !== null) {
      setIncorrectMediaArr(JSONtoMedia(jsonCopy, (ref) => incorrectMediaRefs.current.push(ref)))
    }
  }, [jsonCopy])

  // 3. Get durations for each media, Set durations for each Media
  useEffect(() => {
    const mediaDurStr = JSON.stringify(mediaDurations)
    if (fastClock >= 1 && mediaDurStr === '{}') {
      if (Object.values(setLens(incorrectMediaArr, incorrectMediaRefs)).every(number => !isNaN(number))) { // supposedly prevents NaN values for MediaDurations
        setMediaDurations(setLens(incorrectMediaArr, incorrectMediaRefs))
      }
    }
  }, [incorrectMediaArr, fastClock])

  // 4. Update JSON with lens. JSON + Lens
  useEffect(() => {
    const jsonStr = JSON.stringify(jsonCopy)
    if (jsonCopy !== null && jsonStr !== '{}' && typeof jsonCopy !== 'undefined' && typeof mediaDurations !== 'undefined' && !isJsonSet) {
      setJsonCopy(JSONplusLens(jsonCopy, mediaDurations))
      setIsJsonSet(true) // This ensures that the JSON Copy is set only once during intialization
    }
  }, [mediaDurations])

  // ----
  // Post Intialization - Do this every frame, fps times per second
  // ----

  // 5. On each 10 frames (each 1 second), JSON -> Timings
  useEffect(() => {
    if (fastClock % fps === 0 && typeof mediaDurations !== 'undefined' && mediaDurations !== null && jsonCopy !== null) {
      setJsonTimings(JSONtoTimings(jsonCopy, tag))
    }
  }, [mediaDurations, fastClock])

  // 6. When JSON->Timings finishes, calculate z-indices and playing array
  useEffect(() => {
    const jsonTimingStr = JSON.stringify(jsonTimings)
    if (jsonTimingStr !== '{}' && jsonTimings !== null && fastClock % fps === 0) {
      setZIndices(zIndexArr(jsonTimings, fastClock / fps))
      setPlaying(playingArr(jsonTimings, fastClock / fps))
    }
  }, [jsonTimings])

  // 7. Generate the Media using Media Factory, give each media an individual ref so we may mess with it when it needs to be messed with
  useEffect(() => {
    // for a tag to be incremented, it must have only non-displayed elements and time must be the same as or greater than maxJsonTiming
    const isChangeTag = zIndices === null || zIndices.length === 0 || JSON.stringify(jsonTimings) === '{}'
      ? false
      : Object.values(zIndices).every(num => num === '0') && maxJsonTiming(jsonTimings) <= fastClock / fps

    if (fastClock % fps === 0 && Object.keys(zIndices).length !== 0 && Object.keys(playing).length !== 0) {
      setCorrectMediaArr(mediaFactory(zIndices, playing, jsonTimings, (ref) => { correctMediaRefs.current.push(ref) }).reverse())
      correctMediaRefs.current = correctMediaRefs.current.filter(x => x !== null)
    }
    if (isChangeTag && jsonCopy && tag + 1 < Object.keys(jsonCopy?.smil?.body)?.length) { // increment tag whenever all z-indices are '0', max < clock, and < len
      setTag(tag + 1)
      setZIndices([])
      setPlaying([])
      setFastClock(0)
      correctMediaRefs.current = []
    } else if (isChangeTag && jsonCopy && tag + 1 === Object.keys(jsonCopy?.smil?.body)?.length) {
      onClickPause()
    }
  }, [zIndices])

  // 8. After the Media is created, call the play/pause functions for each automatically (after the user presses play of course)
  useEffect(() => {
    if (typeof correctMediaArr !== 'undefined' && correctMediaArr !== null && JSON.stringify(playing) !== '{}') {
      playMediaAuto(correctMediaArr, playing, correctMediaRefs)
      pauseMediaAuto(correctMediaArr, playing, correctMediaRefs)
      correctMediaRefs.current = []
    }
  }, [playing])

  const onClickPause = () => {
    if (mediaPlaying) {
      clearInterval(intervalRef.current)
      setMediaPlaying(false)
      pauseMedia(correctMediaArr, correctMediaRefs)
    }
  }

  const onClickPlay = () => {
    if (!mediaPlaying) {
      intervalRef.current = setInterval(() => {
        setFastClock(old => old + 1)
      }, 10 * fps)
      setInitialPlay(false)
      setMediaPlaying(true)
    }
    if (!initialPlay) {
      playMediaAuto(correctMediaArr, playing, correctMediaRefs)
    }
  }

  const onClickResetClock = () => {
    setFastClock(0)
  }

  const onClickResetTag = () => {
    setTag(0)
    correctMediaRefs.current = []
  }

  return (
    <>
      <div style={{ display: 'none' }}>{incorrectMediaArr !== null && incorrectMediaArr.map(el => el)}</div>
      <SMILPlayerParentStyled>
        <ExitBtnContainer><ExitButton size='s' /></ExitBtnContainer>
        <VideoContainer>{correctMediaArr !== null && correctMediaArr.map(el => el)}</VideoContainer>
        <ControlBtnsContainer>
          <IconButton onClick={mediaPlaying ? onClickPause : onClickPlay} variant='mediaControllerOutline' size='xl' outlineSize='m'>
            {mediaPlaying ? <IoIosPause /> : <IoIosPlay />}
          </IconButton>
        </ControlBtnsContainer>
      </SMILPlayerParentStyled>
      <p>{`Fast Clock: ${fastClock}`}</p>
      <p>{`Tag: ${tag}`}</p>
      <p>{`Length of Tags: ${jsonCopy?.smil?.body && Object.keys(jsonCopy?.smil?.body)?.length}`}</p>
      <p>{`Tag should increment at Clock Time = ${jsonTimings && JSON.stringify(jsonTimings) !== '{}' && 10 * maxJsonTiming(jsonTimings)}`}</p>
      <button onClick={onClickResetClock}>Click me to Reset the Clock</button>
      <button onClick={onClickResetTag}>Click me to Reset Tag</button>
    </>
  )
}

export default SMILPlayer
