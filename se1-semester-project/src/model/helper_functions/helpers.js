// These are **Most** of the helper functions used in the App (Some trivial ones are inline with the Component)
import convert from 'xml-js'
import Media from '../../components/Molecules/Media/Media'

// ---------------------------------------

/*
SMIL Player Functions
________  _____ ______   ___  ___               ________  ___       ________      ___    ___ _______   ________
|\   ____\|\   _ \  _   \|\  \|\  \             |\   __  \|\  \     |\   __  \    |\  \  /  /|\  ___ \ |\   __  \
\ \  \___|\ \  \\\__\ \  \ \  \ \  \            \ \  \|\  \ \  \    \ \  \|\  \   \ \  \/  / | \   __/|\ \  \|\  \
 \ \_____  \ \  \\|__| \  \ \  \ \  \            \ \   ____\ \  \    \ \   __  \   \ \    / / \ \  \_|/_\ \   _  _\
  \|____|\  \ \  \    \ \  \ \  \ \  \____        \ \  \___|\ \  \____\ \  \ \  \   \/  /  /   \ \  \_|\ \ \  \\  \|
    ____\_\  \ \__\    \ \__\ \__\ \_______\       \ \__\    \ \_______\ \__\ \__\__/  / /      \ \_______\ \__\\ _\
   |\_________\|__|     \|__|\|__|\|_______|        \|__|     \|_______|\|__|\|__|\___/ /        \|_______|\|__|\|__|
   \|_________|                                                                  \|___|/

 ________ ___  ___  ________   ________ _________  ___  ________  ________   ________
|\  _____\\  \|\  \|\   ___  \|\   ____\\___   ___\\  \|\   __  \|\   ___  \|\   ____\
\ \  \__/\ \  \\\  \ \  \\ \  \ \  \___\|___ \  \_\ \  \ \  \|\  \ \  \\ \  \ \  \___|_
 \ \   __\\ \  \\\  \ \  \\ \  \ \  \       \ \  \ \ \  \ \  \\\  \ \  \\ \  \ \_____  \
  \ \  \_| \ \  \\\  \ \  \\ \  \ \  \____   \ \  \ \ \  \ \  \\\  \ \  \\ \  \|____|\  \
   \ \__\   \ \_______\ \__\\ \__\ \_______\  \ \__\ \ \__\ \_______\ \__\\ \__\____\_\  \
    \|__|    \|_______|\|__| \|__|\|_______|   \|__|  \|__|\|_______|\|__| \|__|\_________\
                                                                               \|_________|

*/
// ---------------------------------------

// input: min, max, time
// output: 1 if time in interval, 0 otherwise
const between = (min, max, time) => {
  return time >= min && time <= max ? '1' : '0'
}

// input: String <begin|end|dur>
// output: boolean <matches allowed|doesn't match allowed>
// returns true if input <begin|end|dur> match the pattern of \positive+'s'\
export const testDurationInput = (duration) => {
  const re = /^[0-9]+[s]$/
  return re.test(duration)
}

// input: String <begin|end|dur>
// output: boolean <matches allowed|doesn't match allowed>
// returns true if input <begin|end|dur> match the pattern of \float+'s'\
export const testVideoLenInput = (duration) => {
  const re = /^[0-9]*\.?\d+[s]$/
  return re.test(duration)
}

// input: String <int+'s'>
// output: int
export const durationStrToInt = (duration) => {
  return parseInt(duration.replace(/s/, ''))
}

// input: String <float+'s'>
// output: float
export const durationStrToFloat = (duration) => {
  if (typeof duration !== 'undefined' && duration !== '') {
    return parseFloat(duration.replace(/s/, ''))
  } else {
    return ''
  }
}

// input: number
// output: String <int+'s'>
export const numberToDurationStr = (duration) => {
  return duration.toString() + 's'
}

// input: begin, end, dur, len, functionName
// output: Error | none
export const validateDuration = (begin, end, dur, len, functionName) => {
  if (typeof len !== 'number' || (typeof len === 'number' && isNaN(len))) throw new Error(`Entered len in ${functionName} is not a number\nIt is ${len}\nWhich has type: ${typeof len}`)
  if ([begin, end, dur].every(duration => duration === '')) throw new Error(`You must give atleast 1 duration argument to the ${functionName} function`)
  if (![begin, end, dur].every(duration => typeof duration === 'string')) throw new Error(`Only Strings or '' are allowed for durations in ${functionName}.\nExpected: String\nGot: ${typeof duration}`)
  if (![begin, end, dur].every(duration => testDurationInput(duration) === true || duration === '')) throw new Error(`Invalid duration input in ${functionName} function.\nExpected begin:${begin}, end:${end}, dur:${dur}\nTo be Strings of form int+'s'\nGot: begin:${begin}, end:${end}, dur:${dur}`)
  if ([begin, end, dur].some(duration => durationStrToInt(duration) > len)) throw new Error(`Invalid duration input in ${functionName} function.\nExpected begin, dur, and end to all be <= len\nGot: begin= ${durationStrToInt(begin)}, end = ${durationStrToInt(end)}, dur = ${durationStrToInt(dur)} \nExpected: begin<= ${len}, end <= ${len}, dur <= ${len}`) // (begin, dur, end) <= [len]s
  if ([begin, end, dur].some(duration => testDurationInput(duration) === false) && durationStrToInt(begin) > durationStrToInt(end)) throw new Error(`Invalid duration input in ${functionName} function.\nExpected begin< end \nGot begin= ${begin}, end = ${end}`) // begin<= end except for [begin,end,dur]
  if (durationStrToInt(begin) + durationStrToInt(dur) > len) throw new Error(`Invalid duration input in ${functionName} function.\nExpected: begin + dur <= len\nGot: ${durationStrToInt(begin)} + ${durationStrToInt(dur)} > ${len}`) // begin+ dur <= [len]s
  if (durationStrToInt(dur) + durationStrToInt(end) > len) throw new Error(`Invalid duration input in ${functionName} function.\nExpected: dur + end <= len\nGot: ${durationStrToInt(dur)} + ${durationStrToInt(end)} > ${len}`) // dur + end <= [len]s
}

// input: time
// output: Error | none
export const validateTime = (len, time, functionName) => {
  if (typeof time !== 'number' || isNaN(time) === true) throw new Error(`Invalid input for ${functionName} function.\nExpected: float for time\nGot: ${time} is a ${typeof time}`)
  if (time > len) throw new Error(`Invalid input for ${functionName} function.\nExpected: time < len\nGot: ${time} > ${len}`)
  if (time < 0) throw new Error(`Invalid input for ${functionName} function.\nExpected: time > 0\nGot: ${time} < 0`)
}

// input: JSON
// output: Error | none
export const objHasAllowedProps = (json, allowedProps) => {
  if (typeof json === 'undefined' || typeof allowedProps === 'undefined') throw new Error(`json or allowedProps undefined in objHasAllowedProps.\njson:${json}\nallowedProps:${allowedProps}`)
  if (!Array.isArray(json)) {
    if (!(Object?.keys(json).every(value => allowedProps.includes(value)))) {
      throw new Error('Provided json in objHasAllowedProps function has atleast 1 disallowed key in the Object (not Array).\nExpected this:' + Object.keys(json) + `\nTo have all keys matching one of these: ${allowedProps}`)
    }
  } else if (Array.isArray(json)) {
    if (!(json.every(obj => Object.keys(obj).every(value => allowedProps.includes(value))))) {
      throw new Error('Provided json in objHasAllowedProps function has atleast 1 disallowed key in the Object Array.\nExpected this:' + Object.keys(json) + `\nTo have all keys matching one of these: ${allowedProps}`)
    }
  }
}

// input: JSON
// output: Error | none
export const verifyJSONwithDTD = (json, functionName) => {
  /*
      1. json should be valid json, if it isn't it can't be parsed
      2. All valid SMIL has "smil" as the first property if the xml prolog isn't defined, so json.smil is always valid if xml prolog is not defined
      3. If the json.smil doesn't have a body, we can't parse the media contained
      4. If the json does have an XML Prolog, then it must be well formed
      5. The json may optionally have a head property ( we ignore it )
      6. The json must have 1 or many par tags inside body (1 object or an array of objects)
      7. The allowed attributes for a par are (audio, img, text, video)
      8. The allowed attributes for audio, img, text, video are [src, region, begin, end, dur]
      9. The allowed values for [begin, end, dur] is DIGIT + 's'
        10. The allowed values for region are [top,middle,mid, bottom]
        11. The values of [src, region, begin, end, dur] must be a String
        12. Text may also have color attribute that is a hex value (#xxx(x)*(x)*(x)*)
      */
  const parTag = json?.smil?.body?.par

  const allowedPar = ['audio', 'img', 'text', 'video']
  const allowedMediaAttr = ['src', 'region', 'begin', 'end', 'dur', 'len'] // len is an internal thing

  // do basic testing to see if the input json is smil compliant at the top level
  if (typeof json === 'undefined' || typeof json !== 'object') throw new Error(`JSON provided in ${functionName} function is not valid JSON.`)
  if (typeof json?.smil === 'undefined' || typeof json?.smil !== 'object') throw new Error(`JSON provided in ${functionName} function does not have a valid smil property, so can not be parsed with project DTD.`)
  if (typeof json?.smil?.body === 'undefined' || typeof json?.smil.body !== 'object') throw new Error(`JSON provided in ${functionName} function does not have a valid body property, so can not be parsed with project DTD.`)
  if (typeof parTag === 'undefined') throw new Error(`JSON provided in ${functionName} function does not have any par tags, so can not be parsed with project DTD.`)

  // test if par only has allowed attributes for the single par case and for the par in array case too
  objHasAllowedProps(parTag, allowedPar)

  // test if every par value has only allowed _attributes (each par value like audio should only have: src, begin, end, dur)
  if (!Array.isArray(parTag)) {
    for (const media in parTag) {
      if (typeof media !== 'undefined') objHasAllowedProps(parTag[media]?._attributes, allowedMediaAttr)
    }
  }
  if (Array.isArray(parTag)) {
    for (const obj of parTag) {
      for (const media in obj) {
        if (typeof media !== 'undefined') objHasAllowedProps(obj[media]?._attributes, allowedMediaAttr)
      }
    }
  }

  // test if [begin, end, dur] have allowed values (DIGIT + 's')
  if (!Array.isArray(parTag)) {
    for (const media in parTag) { // media is like: text, audio, img, video
      for (const attr in parTag[media]?._attributes) {
        if (['begin', 'end', 'dur'].includes(attr)) {
          if (!testDurationInput(parTag[media]?._attributes[attr]) && parTag[media]?._attributes[attr] !== '') {
            throw new Error(`One of the [begin, end, dur] _attributes of a par media element, for ${functionName} function has a disallowed value. It is not of form INT+"s"
          \nMedia: ${media}\nKeys: ${Object.keys(parTag[media]._attributes)}\nValues: ${Object.values(parTag[media]._attributes)}
          \nparTag[media]?._attributes[attr] should match par tag regex, but it actually is: ${parTag[media]?._attributes[attr]}
          \nattr=${attr}`)
          }
        }
      }
    }
  }

  if (Array.isArray(parTag)) {
    for (const obj of parTag) {
      for (const media in obj) {
        for (const attr in obj[media]?._attributes) {
          if (['begin', 'end', 'dur'].includes(attr)) {
            if (!testDurationInput(obj[media]?._attributes[attr]) && obj[media]?._attributes[attr] !== '') {
              throw new Error(`One of the [begin, end, dur] _attributes of a par media element, for ${functionName} function has a disallowed value. It is not of form INT+"s"
            \nMedia: ${media}\nKeys: ${Object.keys(parTag[media]._attributes)}\nValues: ${Object.values(parTag[media]._attributes)}
            \nparTag[media]?._attributes[attr] should match par tag regex, but it actually is: ${parTag[media]?._attributes[attr]}
            \nattr=${attr}`)
            }
          }
        }
      }
    }
  }
}

// input: <SMIL> string
// output: JSON
export const SMILtoJSON = (smil) => {
  // return JSON
  return convert.xml2js(smil, { compact: true })
}

// input: JSON
// output: <SMIL> string | Error
export const JSONtoSMIL = (json) => {
  // return SMIL string
  verifyJSONwithDTD(json, 'JSONtoSMIL') // Error or nothing
  return convert.json2xml(json, { compact: true })
}

// input: begin: String <positive+'s'>, end: String <positive+'s'>, dur: String <positive+'s'>, len: float <length of video>
// output: {presentationStart:<positive>, presentationEnd:<positive>, fileStart:<positive>, fileEnd:<positive>} | Error
export const timeRules = (begin, end, dur, len) => {
  // 1. Validate that input is of proper form: String(<positive>+'s')
  validateDuration(begin, end, dur, len, 'timeRules')

  // 2. Output the rules
  // [begin] -> {presentationStart: "[begin]s", presentationEnd:"[len]s", fileStart:"0s", fileEnd:"[len]s"}
  if (testDurationInput(begin) && end === '' && dur === '') return { presentationStart: numberToDurationStr(durationStrToInt(begin)), presentationEnd: numberToDurationStr(len), fileStart: '0s', fileEnd: numberToDurationStr(len) }

  // [end] -> {presentationStart: "0s", presentationEnd: "[end]s", fileStart: "0s", fileEnd: "[end]s" }
  if (begin === '' && testDurationInput(end) && dur === '') return { presentationStart: '0s', presentationEnd: numberToDurationStr(durationStrToInt(end)), fileStart: '0s', fileEnd: numberToDurationStr(durationStrToInt(end)) }

  // [dur] -> {presentationStart: "0s", presentationEnd: "[dur]s", fileStart: "0s", fileEnd: "[dur]s" }
  if (begin === '' && end === '' && testDurationInput(dur)) return { presentationStart: '0s', presentationEnd: numberToDurationStr(durationStrToInt(dur)), fileStart: '0s', fileEnd: numberToDurationStr(durationStrToInt(dur)) }

  // [begin, end] -> {presentationStart: "[begin]s", presentationEnd: "[end]s", fileStart: "0s", fileEnd: "[end-begin]s" }
  if (testDurationInput(begin) && testDurationInput(end) && dur === '') return { presentationStart: numberToDurationStr(durationStrToInt(begin)), presentationEnd: numberToDurationStr(durationStrToInt(end)), fileStart: '0s', fileEnd: numberToDurationStr(durationStrToInt(end) - durationStrToInt(begin)) }

  // [begin, dur] -> {presentationStart: "0s", presentationEnd: "[dur]s", fileStart: "[begin]s", fileEnd: "[begin+dur]s" }
  if (testDurationInput(begin) && end === '' && testDurationInput(dur)) return { presentationStart: '0s', presentationEnd: numberToDurationStr(durationStrToInt(dur)), fileStart: numberToDurationStr(durationStrToInt(begin)), fileEnd: numberToDurationStr(durationStrToInt(begin) + durationStrToInt(dur)) }

  // [end, dur] -> {presentationStart: "[end - dur]s", presentationEnd: "[end]s", fileStart: "0s", fileEnd: "[dur]s" }
  if (begin === '' && testDurationInput(end) && testDurationInput(dur)) return { presentationStart: numberToDurationStr(durationStrToInt(end) - durationStrToInt(dur)), presentationEnd: numberToDurationStr(durationStrToInt(end)), fileStart: '0s', fileEnd: numberToDurationStr(durationStrToInt(dur)) }

  // [begin, end, dur] -> {presentationStart: "[begin]s", presentationEnd: "[begin+dur]s", fileStart: "[end]s", fileEnd: "[end+dur]s" }
  if (testDurationInput(begin) && testDurationInput(end) && testDurationInput(dur)) return { presentationStart: numberToDurationStr(durationStrToInt(begin)), presentationEnd: numberToDurationStr(durationStrToInt(begin) + durationStrToInt(dur)), fileStart: numberToDurationStr(durationStrToInt(end)), fileEnd: numberToDurationStr(durationStrToInt(end) + durationStrToInt(dur)) }
}

// input: begin:<SMIL time>, end:<SMIL time>, dur:<SMIL time>, pos:<SMIL time>, time:<float>
// output: String (int [0 | 1]) | Error
export const zIndex = (begin, end, dur, len, time) => {
  // return z-index at particular time. Intended to be used with <Media />. (int)

  // 1. validate input and define variables
  /*
  const functionName = 'zIndex'

  if (tagName === 'audio' || tagName === 'video') {
    validateDuration(begin, end, dur, len, functionName)
    validateTime(len, time, functionName)
  }
  */

  const s = durationStrToInt(begin)
  const e = durationStrToInt(end)
  const d = durationStrToInt(dur)

  // 2. output correct z-index of Media
  // return 1 if time is in the time interval in the presentation where it is playing, 0 otherwise

  // [begin] -> [begin, len]
  if (testDurationInput(begin) && end === '' && dur === '') return between(s, len, time)

  // [end] -> [0, end]
  if (begin === '' && testDurationInput(end) && dur === '') return between(0, e, time)

  // [dur] -> [0, dur]
  if (begin === '' && end === '' && testDurationInput(dur)) return between(0, d, time)

  // [begin,end] -> [begin, end]
  if (testDurationInput(begin) && testDurationInput(end) && dur === '') return between(s, e, time)

  // [begin,dur] -> [0, dur]
  if (testDurationInput(begin) && end === '' && testDurationInput(dur)) return between(0, d, time)

  // [end,dur] -> [end-dur, end]
  if (begin === '' && testDurationInput(end) && testDurationInput(dur)) return between(e - d, e, time)

  // [begin,end,dur] -> [begin, begin+dur]
  if (testDurationInput(begin) && testDurationInput(end) && testDurationInput(dur)) return between(s, s + d, time)

  return '0' // if all else fails, return 0
}

// input: begin:<SMIL time>, end:<SMIL time>, dur:<SMIL time>,time:<float>
// output: boolean | console.error
export const playing = (begin, end, dur, len, time) => {
  // return whether a particular media is playing at a particular time or not (Boolean)
  // 1. validate input and define variables
  const functionName = 'playing'
  validateDuration(begin, end, dur, len, functionName)
  validateTime(len, time, functionName)

  // 2. output correct playing of Media
  // return true if time is in the time interval in the presentation where it is playing, false otherwise
  try {
    return zIndex(begin, end, dur, len, time) === '1'
  } catch (e) {
    console.error(e)
  }
}

// input: JSON, tag number
// output: JSON | Error
export const getNthTag = (json, tag) => {
  // return nth tag of a given JSON object | Value Error
  /* example: {'par': {'text':{ begin,...}, 'audio':...}}
     example: {'video': {begin,...}}
  */

  // 1. verify JSON and tag
  verifyJSONwithDTD(json, 'getNthTag')
  if (isNaN(tag) || typeof tag === 'undefined' || tag === null || tag < 0 || tag > Object.keys(json.smil.body).length) {
    throw new Error(`Invalid input in getNthTag.\nExpected a tag number in the range of 0 to ${Object.keys(json.smil.body).length - 1}\nGot ${tag}`)
  }

  // 2. get keys of json
  // ex: ['par', 'video']
  const topLevelKeys = Object.keys(json.smil.body)
  const len = topLevelKeys.length

  // 3. for each top lv key, loop through all sub-keys
  let count = 0
  for (let i = 0; i < len; i++) {
    const subKeyName = topLevelKeys[i]
    const subKeyValue = json.smil.body[topLevelKeys[i]]
    const isPar = subKeyName.toLowerCase().trim() === 'par'
    const isArr = Array.isArray(subKeyValue)
    // 4. Depending on whether it is par/!par and obj/arr do different processing logic.

    // If [par, obj]
    if (isPar && !isArr) {
      const ret = {}
      const par = Object.keys(subKeyValue) // obj
      for (const item of par) {
        ret[item] = subKeyValue[item]._attributes
      } if (count === tag) {
        return ret
      }
      count += 1
    } else if (isPar && isArr) { // If [par, arr]
      const par = subKeyValue // array
      for (let i = 0; i < par.length; i++) {
        const ret = {}
        for (const item of Object.keys(par[i])) {
          ret[item] = par[i][item]._attributes
        } if (count === tag) return ret
        count += 1 // iterate on every arr obj
      }
    } else if (!isPar && !isArr) { // if [!par, obj]
      for (const item of Object.values(subKeyValue)) {
        if (count === tag) {
          return {
            [subKeyName]: item
          }
        }
        count += 1
      }
    } else if (!isPar && isArr) { // If [!par, arr]
      const media = subKeyValue // array
      for (let i = 0; i < media.length; i++) {
        if (count === tag) {
          return {
            [subKeyName]: media[i]._attributes
          }
        }
        count += 1
      }
    }
  }
}

// input: Media object like {text: {...}, img: {...}, audio: {...}}
// output: Media object with all fields filled properly or ''
export const fillMedia = (MediaTag) => {
  if (MediaTag === null || typeof MediaTag === 'undefined') throw new Error(`MediaTag in fillMedia is\ntype: ${typeof MediaTag}\nis: ${MediaTag}`)
  if (Object.keys(MediaTag).length === 0) throw new Error('Media Tag in FillMedia is empty obj: {}')
  const mediaCopy = JSON.parse(JSON.stringify(MediaTag))
  const ret = {}
  for (const media in mediaCopy) {
    const isDefined = {
      src: typeof mediaCopy[media].src !== 'undefined',
      dur: typeof mediaCopy[media].dur !== 'undefined',
      begin: typeof mediaCopy[media].begin !== 'undefined',
      end: typeof mediaCopy[media].end !== 'undefined',
      len: typeof mediaCopy[media].len !== 'undefined',
      region: typeof mediaCopy[media].region !== 'undefined'
    }
    for (const attr in isDefined) {
      if (!isDefined[attr]) {
        mediaCopy[media][attr] = ''
      }
    }
    ret[media] = mediaCopy[media]
  }
  return ret
}

// input: JSON, tag (int)
// output: medias:{[mediaName][n]:{begin:<SMIL time>, end:<SMIL time>, dur:<SMIL time>, len:<float>}}
export const JSONtoTimings = (json, tag) => {
  // 1. verify JSON and Tag number
  verifyJSONwithDTD(json, 'JSONtoTimings')

  // 2. get nth tag of JSON Object
  const nthTag = getNthTag(json, tag)

  // 3. return it with all values proper or defaulted to ''
  return fillMedia(nthTag)
}

// input: medias:{media[n]:{begin:<SMIL time>, end:<SMIL time>, dur:<SMIL time>, len:<float>}}, time:<float>
// output: {media[n]:[0 | 1], ...}
// NOTE: No input validation is happening because if you validate durations -> text,img throw errors. If you validate time -> throws errors once time is greater than what you need.
export const zIndexArr = (medias, time) => {
  // return object that has {media[n]:[0 | 1], ...}
  // 1. validate input and define variables
  const functionName = 'zIndexArr'
  if (typeof medias !== 'object') throw new Error(`Invalid input in zIndexArr.\nExpected medias to be an Object, but got ${typeof medias}.`) // expect medias to be an object
  objHasAllowedProps(Object.values(medias), ['begin', 'end', 'dur', 'len', 'src', 'region']) // expect medias to have begin, end, dur, len keys

  for (const objKey of Object.keys(medias)) {
    if (objKey === 'video' || objKey === 'audio') { // only video/audio should have valid len durations
      validateDuration(medias[objKey]?.begin, medias[objKey]?.end, medias[objKey]?.dur, medias[objKey]?.len, objKey, functionName)
      // validateTime(medias[objKey]?.len, time, functionName)
    }
  }

  // 2. create an Object that has form of {media[n]:[0 | 1], ...}
  const ret = {}
  for (const objKey of Object.keys(medias)) {
    ret[objKey] = zIndex(medias[objKey]?.begin, medias[objKey]?.end, medias[objKey]?.dur, medias[objKey]?.len, time)
  }
  return ret
}

// input: medias:{media[n]:{begin:<SMIL time>, end:<SMIL time>, dur:<SMIL time>}}, time:<float>
// output: {media[n]:boolean, ...} | console.error
export const playingArr = (medias, time) => {
  // return object that has {media[n]:boolean, ...}
  try {
    const z = zIndexArr(medias, time)
    for (const obj in z) {
      z[obj] = z[obj] === '1' ? 'true' : 'false'
    }
    return z
  } catch (e) {
    console.error(e)
  }
}

// input: JSON
// output: [<Media ...INCORRECT (-[text,img,len,z,play])/>] | Error
// This fx requires a try-catch block for caller
// This fx is near the beginning of the SMIL Player pipe and is solely used to get the Length info of each Media it is INCORRECT
export const JSONtoMedia = (json, ref) => {
  // return [<Media ... />]
  verifyJSONwithDTD(json, 'JSONtoMedia') // Error or nothing

  // 1. Get the json to a convienient form using json->timings in a loop
  // note: I could have used map/filter/reduce for this, but I find imperative is simpler for me
  const body = json.smil.body
  let tagCount = 0
  for (const tag in body) {
    if (!Array.isArray(body[tag])) tagCount += 1
    else tagCount += body[tag].length
  }

  const timingTagsArr = []
  for (let tag = 0; tag < tagCount; tag++) { // iterate over all tags in JSON
    // for each tag, call the json->timings function and store the result in timingTagsArr
    timingTagsArr.push(JSONtoTimings(json, tag))
  }

  // 2. Do a 'mediaFactory' but without combining everything
  const ret = []
  let count = 0
  for (const medias of timingTagsArr) {
    // make video/audio if they exist
    // NOTE: NEVER PUT type='audio' or type='video' or it won't work!
    let video
    let audio
    if (typeof medias.video !== 'undefined') {
      video = (
        <video playsInline>
          <source src={medias.video.src} />
        </video>
      )
    }
    if (typeof medias.audio !== 'undefined') {
      audio = (
        <audio playsInline>
          <source src={medias.audio.src} />
        </audio>
      )
    }

    for (const tag in medias) {
      if (tag.toLowerCase().trim() !== 'text' && tag.toLowerCase().trim() !== 'img') {
        ret.push(<Media ref={ref} key={`Media[${count}][${tag}]`} video={tag === 'video' ? video && video : ''} audio={tag === 'audio' ? audio && audio : ''} image={medias.img && medias.img.src} text={medias.text && medias.text.src} />)
        count = count + 1
      }
    }
  }

  // 3. Return ret
  return ret
}

// input: [zIndex], [playing], {medias}
// output: {medias, ...zindex, ...playing}
// used to combine these 3 together for the final mediaFactory function
export const combine = (zIndices, playingArr, medias) => {
  for (const key in medias) {
    medias[key].zindex = zIndices[key]
    medias[key].playing = playingArr[key]
  }
  return medias
}

// input: [zIndex], [playing], {medias, ...lengths too}
// output: <Media ...CORRECT /> | Error
// This function is at the end of the SMIL Player pipe and generates <Media /> with correct props
export const mediaFactory = (zIndices, playingArr, medias, ref, sliderRef) => {
  /*
  src -> 1. Create a html video,img,audio element 2. add src 3. wrap in <Media video=video|audio=audio|... ...rest />
  dur, begin, end, len -> Passed through Rules fx to calculate begin/end times. Appended while making video/audio.
  region -> Map directly into position. <Media ...rest position=region />
  zIndex, playing -> Map directly onto Media. <Media ...rest zindex=zindex playing=playing />
  text -> This will be src of a Text element

  color -> To be added in allowed props list later (and in other fx too), will be color prop in Media
  */

  // 0. Throw errors if any of the input is undefined
  if (typeof zIndices === 'undefined') throw new Error('zIndices is undefined in mediaFactory.')
  if (typeof playingArr === 'undefined') throw new Error('playingArr is undefined in mediaFactory.')
  if (typeof medias === 'undefined') throw new Error('medias is undefined in mediaFactory.')

  // 1. define ret
  const ret = []

  // 2. combine zIndices, playing, and medias
  const combined = combine(zIndices, playingArr, medias)

  // 3. for each media in combined, createMedia and add that to ret

  // 4. Calculate t values
  const videoBegin = typeof combined?.video?.begin === 'undefined' ? '' : combined?.video?.begin
  const videoEnd = typeof combined?.video?.end === 'undefined' ? '' : combined?.video?.end
  const videoDur = typeof combined?.video?.dur === 'undefined' ? '' : combined?.video?.dur
  const videoLen = typeof combined?.video?.len === 'undefined' ? '' : combined?.video?.len
  const audioBegin = typeof combined?.audio?.begin === 'undefined' ? '' : combined?.audio?.begin
  const audioEnd = typeof combined?.audio?.end === 'undefined' ? '' : combined?.audio?.end
  const audioDur = typeof combined?.audio?.dur === 'undefined' ? '' : combined?.audio?.dur
  const audioLen = typeof combined?.audio?.len === 'undefined' ? '' : combined?.audio?.len

  // Only case that can't be covered by potentially missing video Len is the [begin] case. That is absolutely needed
  let videoTimes
  if (!videoBegin && !videoEnd && !videoDur && !videoLen) {
    videoTimes = undefined
  } else if ((videoBegin || videoEnd || videoDur) && videoLen) { // Anything where [begin,end,dur], len
    videoTimes = timeRules(videoBegin, videoEnd, videoDur, videoLen) // creates begin,end for video media clip
  } else if ((!videoBegin || videoEnd || videoDur) && !videoLen) { // Anything but the [begin],!len case
    const vidEndTime = durationStrToFloat(videoEnd) === '' ? 0 : durationStrToFloat(videoEnd)
    const vidDurTime = durationStrToFloat(videoDur) === '' ? 0 : durationStrToFloat(videoDur)
    const s = parseFloat(vidEndTime + vidDurTime) // we must use parse float bc the case of ''+number = 'number'
    videoTimes = timeRules('0s', videoEnd, videoDur, s) // creates begin,end for video media clip
  } else if ((videoBegin && (videoEnd || videoDur)) && !videoLen) {
    const vidEndTime = durationStrToFloat(videoEnd) === '' ? 0 : durationStrToFloat(videoEnd)
    const vidDurTime = durationStrToFloat(videoDur) === '' ? 0 : durationStrToFloat(videoDur)
    const s = parseFloat(vidEndTime + vidDurTime)
    videoTimes = timeRules(videoBegin, videoEnd, videoDur, s)
  }

  let audioTimes
  if (!audioBegin && !audioEnd && !audioDur && !audioLen) {
    audioTimes = undefined
  } else if ((audioBegin || audioEnd || audioDur) && audioLen) {
    audioTimes = timeRules(audioBegin, audioEnd, audioDur, audioLen)
  } else if ((!audioBegin && (audioEnd || audioDur)) && !audioLen) {
    const audEndTime = durationStrToFloat(audioEnd) === '' ? 0 : durationStrToFloat(audioEnd)
    const audDurTime = durationStrToFloat(audioDur) === '' ? 0 : durationStrToFloat(audioDur)
    const s = parseFloat(audEndTime + audDurTime)
    audioTimes = timeRules('0s', audioEnd, audioDur, s)
  } else if ((audioBegin && (audioEnd || audioDur)) && !audioLen) {
    const audEndTime = durationStrToFloat(audioEnd) === '' ? 0 : durationStrToFloat(audioEnd)
    const audDurTime = durationStrToFloat(audioDur) === '' ? 0 : durationStrToFloat(audioDur)
    const s = parseFloat(audEndTime + audDurTime)
    audioTimes = timeRules(audioBegin, audioEnd, audioDur, s)
  }

  const videoT = typeof videoTimes !== 'undefined' ? `${durationStrToInt(videoTimes.presentationStart)},${durationStrToInt(videoTimes.presentationEnd)}` : ''
  const audioT = typeof audioTimes !== 'undefined' ? `${durationStrToInt(audioTimes.presentationStart)},${durationStrToInt(audioTimes.presentationEnd)}` : ''

  // 5. Create video|audio elements if they exist
  let video
  let audio
  if (typeof combined.video !== 'undefined') {
    video = (
      <video playsInline className='video-preview' ref={sliderRef}>
        <source src={`${combined.video.src}#t=${videoT}`} />
        Your browser does not support the video tag. I suggest you upgrade your browser.
      </video>
    )
  }
  if (typeof combined.audio !== 'undefined') {
    audio = (
      <audio playsInline className='video-preview' ref={sliderRef}>
        <source src={`${combined.audio.src}#t=${audioT}`} />
        Your browser does not support the audio tag. I suggest you upgrade your browser.
      </audio>
    )
  }

  // 6. Create [<Media ...rest/>] by looping through Keys of all except text (display text only if z-index is 1)
  const text = combined?.text?.zindex === '1' ? combined.text : undefined
  const img = combined?.img?.zindex === '1' ? combined.img : undefined
  let count = 0
  for (const tag in combined) {
    if (tag.toLowerCase().trim() !== 'text') {
      ret.push(<Media ref={ref} key={`Media[${count}][${tag}]`} text={text ? text.src : ''} position={text ? text.region : ''} color={text && text.color} image={tag === 'img' ? img && img.src : ''} video={tag === 'video' ? video && video : ''} audio={tag === 'audio' ? audio && audio : ''} zindex={combined[tag].zindex} playing={combined[tag].playing} />)
      count += 1
    }
  }

  // 7. Return Ret
  return ret
}

// input: JSON
// output: JSON + lens | Error
export const JSONplusLens = (json, lens) => {
  verifyJSONwithDTD(json, 'JSONplusLens')
  if (typeof lens === 'undefined') throw new Error('lens is undefined in JSONplusLens')
  if (Object.keys(lens) === 0) throw new Error('lens is 0 length in JSONplusLens')
  if (Object.values(lens).some(value => isNaN(value))) throw new Error('Some or all values in JSONplusLens are NaN. Check the passer to make sure they don\'t give NaN values.')

  // Note: you should check if i < len lens
  const clone = JSON.parse(JSON.stringify(json))
  const body = clone.smil.body
  const len = Object.values(lens).length
  let i = 0
  for (const topTag of Object.keys(body)) {
    // [par, arr]
    if (topTag === 'par' && Array.isArray(body[topTag])) {
      for (const botTag of Object.values(body[topTag])) {
        for (const el of Object.keys(botTag)) {
          if (el === 'audio' || el === 'video') {
            if (i < len) {
              botTag[el]._attributes.len = Object.values(lens)[i]
              i += 1
            }
          }
        }
      }
    }

    // [par, !arr]
    if (topTag === 'par' && !Array.isArray(body[topTag])) {
      for (const botTag of Object.keys(body[topTag])) {
        if (botTag === 'audio' || botTag === 'video') {
          if (i < len) {
            body[topTag][botTag]._attributes.len = Object.values(lens)[i]
            i += 1
          }
        }
      }
    }

    // [!par, arr]
    if (topTag !== 'par' && Array.isArray(body[topTag])) {
      for (const botAttr of Object.values(body[topTag])) {
        if (i < len) {
          botAttr._attributes.len = Object.values(lens)[i]
          i += 1
        }
      }
    }

    // [!par, !arr]
    if (topTag !== 'par' && !Array.isArray(body[topTag])) {
      if (i < len) {
        body[topTag]._attributes.len = Object.values(lens)[i]
        i += 1
      }
    }
  }

  return clone
}

// input: {mediaType: {...begin:..., end:..., dur:..., len:...},...}
// output: <number> Max Presentation End time in the input Object | Error
// NOTE: I do a hacky solution to dealing with len. If len is '' then I say it is actually the max value of numbers. May cause issues?
export const maxJsonTiming = (jsonTimings) => {
  if (typeof jsonTimings === 'undefined' || jsonTimings === null || JSON.stringify(jsonTimings) === '{}' || (isNaN(jsonTimings) && typeof jsonTimings !== 'object')) throw new Error(`jsonTimings entered in maxJsonTiming\nis: ${jsonTimings}\ntype: ${typeof jsonTimings}\nexpected: {mediaType: {...begin:..., end:..., dur:..., len:...},...}; where mediaType can be audio|video|text|img`)
  return Math.max(...Object.values(jsonTimings).map(el => {
    return durationStrToFloat(timeRules(el.begin, el.end, el.dur, el.len === '' ? Number.MAX_VALUE : el.len).presentationEnd)
  }))
}

// ---------------------------------------

// Form Functions
/*
 ________ ________  ________  _____ ______           ________ ___  ___  ________   ________ _________  ___  ________  ________   ________
|\  _____\\   __  \|\   __  \|\   _ \  _   \        |\  _____\\  \|\  \|\   ___  \|\   ____\\___   ___\\  \|\   __  \|\   ___  \|\   ____\
\ \  \__/\ \  \|\  \ \  \|\  \ \  \\\__\ \  \       \ \  \__/\ \  \\\  \ \  \\ \  \ \  \___\|___ \  \_\ \  \ \  \|\  \ \  \\ \  \ \  \___|_
 \ \   __\\ \  \\\  \ \   _  _\ \  \\|__| \  \       \ \   __\\ \  \\\  \ \  \\ \  \ \  \       \ \  \ \ \  \ \  \\\  \ \  \\ \  \ \_____  \
  \ \  \_| \ \  \\\  \ \  \\  \\ \  \    \ \  \       \ \  \_| \ \  \\\  \ \  \\ \  \ \  \____   \ \  \ \ \  \ \  \\\  \ \  \\ \  \|____|\  \
   \ \__\   \ \_______\ \__\\ _\\ \__\    \ \__\       \ \__\   \ \_______\ \__\\ \__\ \_______\  \ \__\ \ \__\ \_______\ \__\\ \__\____\_\  \
    \|__|    \|_______|\|__|\|__|\|__|     \|__|        \|__|    \|_______|\|__| \|__|\|_______|   \|__|  \|__|\|_______|\|__| \|__|\_________\
                                                                                                                                   \|_________|
*/

// input: src object {video: src|'', audio: src|'', img: src|''}
// output: json (not smil compatible) {text: ..., video: {...src}, audio: {...src}, img: {...src} }
export const addSrcToJSON = (srcObj, jsonForm) => {
  const ret = JSON.parse(JSON.stringify(jsonForm))
  for (const key of Object.keys(srcObj)) {
    ret[key].src = srcObj[key].src
  }
  return ret
}

// input: json form obj {text: ..., video: {...src}, audio: {...src}, img: {...src} }
// output: json smil compatible {smil: body: par: {text: ..., video: {...src}, audio: {...src}, img: {...src} }}
// Since the form is simplified we support 2 of 4 cases. Either 1 media or multiple in a par. No grouping allowed.
export const formToJSON = (jsonForm) => {
  const ret = {
    smil: {
      body: {
        par: {

        }
      }
    }
  }
  // Do basic validation here... like text, isarray,..
  if (typeof jsonForm === 'undefined' || jsonForm === null || (isNaN(jsonForm) && typeof jsonForm === 'number')) throw new Error(`Expected jsonForm to be an Object got:\n${jsonForm}\nundefined: ${typeof jsonForm === 'undefined'}\nnull: ${jsonForm === null}\nisNaN: ${isNaN(jsonForm) && typeof jsonForm !== 'number'}`)
  if (Array.isArray(jsonForm)) throw new Error('Expected jsonForm to be an Object like: {text: {...}, video: {...}, ...}\nGot: Array')
  if (Object.keys(jsonForm).length > 4) throw new Error(`Expected jsonForm to be of length 4 or less\nGot Length: ${Object.keys(jsonForm).length}`)

  // CASE 1:
  if (Object.keys(jsonForm).length === 1) {
    // If it is 1 thing, then it is just that, no par
    const tagName = Object.keys(jsonForm)[0]
    // simply add an _attributes and call it a day
    ret.smil.body.par[tagName] = { _attributes: jsonForm[tagName] }
    return ret
  }

  // CASE 2:
  // If it is more than 1 thing, then it is a par
  else if (Object.keys(jsonForm).length > 1 && Object.keys(jsonForm).length <= 4) {
    const copy = JSON.parse(JSON.stringify(jsonForm))
    for (const key of Object.keys(copy)) {
      const initial = copy[key]
      copy[key] = { _attributes: initial }
    }
    ret.smil.body.par = copy
    return ret
  }
}

// ---------------------------------------
