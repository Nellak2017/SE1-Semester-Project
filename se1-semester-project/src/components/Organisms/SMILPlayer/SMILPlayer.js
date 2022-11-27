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
  const [zIndices, setZIndices] = useState([]) // Holds the array of stacking orders
  const [playing, setPlaying] = useState([]) // Holds the array of playing orders

  const setLens = (mediaArr_, ref_) => { // Returns {media[n][type]: Number | NaN, ...}
    const ret = {}
    let i = 0
    for (const theMedia of mediaArr_) {
      ret[theMedia.key] = ref_?.current[i]?.getMediaLen()
      i += 1
    }
    return ret
  } // this can't be extracted out because the ref.current thing inside

  // ----
  // Initial state
  // ----

  // 0. define a clock (10fps) (Means 1/10 of a second lag for video player)
  // @TODO: Extract to hooks folder
  // see also: https://stackoverflow.com/questions/68685880/how-to-increment-a-react-state-every-second-using-setinterval
  useEffect(() => {
    const id = setInterval(() => {
      setFastClock(old => old + 1)
    }, 10 * fps)
    return () => {
      clearInterval(id)
    }
  }, [])

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
  // @TODO: Add time-out feature that after a certain amount of time it just gives up and if it does then it displays error can't load
  // @TODO: Add a Write Lock so that it only updates it once with the Non-NaN values
  useEffect(() => {
    const mediaDurStr = JSON.stringify(mediaDurations)
    if (fastClock >= 1 && mediaDurStr === '{}') {
      if (Object.values(setLens(incorrectMediaArr, incorrectMediaRefs)).every(number => !isNaN(number))) { // supposedly prevents NaN values for MediaDurations
        console.log(mediaDurations)
        console.log(incorrectMediaArr)
        console.log(setLens(incorrectMediaArr, incorrectMediaRefs))
        setMediaDurations(setLens(incorrectMediaArr, incorrectMediaRefs))
      }
    }
  }, [incorrectMediaArr, fastClock])

  // 4. Update JSON with lens. JSON + Lens
  useEffect(() => {
    const jsonStr = JSON.stringify(jsonCopy)
    if (jsonCopy !== null && jsonStr !== '{}' && typeof jsonCopy !== 'undefined' && typeof mediaDurations !== 'undefined' && !isJsonSet) {
      console.log(mediaDurations)
      setJsonCopy(JSONplusLens(jsonCopy, mediaDurations))
      setIsJsonSet(true) // This ensures that the JSON Copy is set only once during intialization
    }
  }, [mediaDurations])

  // ----
  // Post Intialization
  // ----

  // 5. On each 10 frames (each 1 second), JSON -> Timings
  useEffect(() => {
    if (fastClock % fps === 0 && typeof mediaDurations !== 'undefined' && mediaDurations !== null && jsonCopy !== null) {
      console.log(jsonCopy)
      setJsonTimings(JSONtoTimings(jsonCopy, tag))
    }
  }, [mediaDurations, fastClock])

  // 6. When JSON->Timings finishes, calculate z-indices and playing array
  useEffect(() => {
    const jsonTimingStr = JSON.stringify(jsonTimings)
    if (jsonTimingStr !== '{}' && jsonTimings !== null && fastClock % fps === 0) {
      console.log(jsonTimings)
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
      console.log('---')
      console.log(zIndices)
      console.log(playing)
      console.log(jsonTimings)
      console.log(maxJsonTiming(jsonTimings))
      console.log('---')
      setCorrectMediaArr(mediaFactory(zIndices, playing, jsonTimings).reverse())
    }
    if (isChangeTag && jsonCopy) { // increment tag whenever all z-indices are '0', and < len
      setTag(tag + 1)
      setZIndices([])
      setPlaying([])
      setFastClock(0)
    }
  }, [zIndices])

  return (
    <>
      <div style={{ display: 'none' }}>{incorrectMediaArr !== null && incorrectMediaArr.map(el => el)}</div>
      {correctMediaArr !== null && correctMediaArr.map(el => el)}
      <p>{`Fast Clock: ${fastClock}`}</p>
      <p>{`Example Key: ${incorrectMediaArr !== null && incorrectMediaArr[0].key}`}</p>
      <p>{`Tag: ${tag}`}</p>
      <p>{`Length of Tags: ${jsonCopy?.smil?.body && Object.keys(jsonCopy?.smil?.body)?.length}`}</p>
      <p>{`Tag should increment at Clock Time = ${jsonTimings && JSON.stringify(jsonTimings) !== '{}' && 10 * maxJsonTiming(jsonTimings)}`}</p>
    </>
  )
}

export default SMILPlayer
