import { useState, useEffect, useRef } from 'react'
import {
  SMILtoJSON,
  JSONtoMedia,
  JSONtoTimings,
  JSONplusLens,
  zIndexArr,
  playingArr,
  mediaFactory
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

  const setLens = (mediaArr_, ref_) => {
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
  useEffect(() => {
    if ((fastClock === 1 || mediaDurations === {} || !Object.values(mediaDurations).every(number => !isNaN(number))) && fastClock < fps * 10) {
      setMediaDurations(setLens(incorrectMediaArr, incorrectMediaRefs))
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
  // Post Intialization
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
    if (jsonTimingStr !== '{}' && fastClock % fps === 0) {
      setZIndices(zIndexArr(jsonTimings, fastClock / fps))
      setPlaying(playingArr(jsonTimings, fastClock / fps))
    }
  }, [jsonTimings])

  // 7. Generate the Media using Media Factory, give each media an individual ref so we may mess with it when it needs to be messed with
  useEffect(() => {
    if (Object.keys(zIndices).length !== 0 && Object.keys(playing).length !== 0 && fastClock % fps === 0) {
      setCorrectMediaArr(mediaFactory(zIndices, playing, jsonTimings).reverse())
    }
  }, [zIndices])

  return (
    <>
      <div style={{ display: 'none' }}>{incorrectMediaArr !== null && incorrectMediaArr.map(el => el)}</div>
      {correctMediaArr !== null && correctMediaArr.map(el => el)}
      <p>{`Fast Clock: ${fastClock}`}</p>
      <p>{`Example Key: ${incorrectMediaArr !== null && incorrectMediaArr[0].key}`}</p>
    </>
  )
}

export default SMILPlayer
