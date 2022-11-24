// These are **Most** of the helper functions used in the App (Some trivial ones are inline with the Component)
import convert from 'xml-js'

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
  return parseFloat(duration.replace(/s/, ''))
}

// input: number
// output: String <int+'s'>
export const numberToDurationStr = (duration) => {
  return duration.toString() + 's'
}

// input: start, end, dur, len, functionName
// output: Error | none
export const validateDuration = (start, end, dur, len, functionName) => {
  if (typeof len !== 'number' || (typeof len === 'number' && isNaN(len))) throw new Error(`Entered len in ${functionName} is not a number`)
  if ([start, end, dur].every(duration => duration === '')) throw new Error(`You must give atleast 1 duration argument to the ${functionName} function`)
  if (![start, end, dur].every(duration => typeof duration === 'string')) throw new Error(`Only Strings or '' are allowed for durations in ${functionName}.\nExpected: String\nGot: ${typeof duration}`)
  if (![start, end, dur].every(duration => testDurationInput(duration) === true || duration === '')) throw new Error(`Invalid duration input in ${functionName} function.\nExpected start:${start}, end:${end}, dur:${dur}\nTo be Strings of form int+'s'\nGot: start:${start}, end:${end}, dur:${dur}`)
  if ([start, end, dur].some(duration => durationStrToInt(duration) > len)) throw new Error(`Invalid duration input in ${functionName} function.\nExpected start, dur, and end to all be <= len\nGot: start = ${durationStrToInt(start)}, end = ${durationStrToInt(end)}, dur = ${durationStrToInt(dur)} \nExpected: start <= ${len}, end <= ${len}, dur <= ${len}`) // (start, dur, end) <= [len]s
  if ([start, end, dur].some(duration => testDurationInput(duration) === false) && durationStrToInt(start) > durationStrToInt(end)) throw new Error(`Invalid duration input in ${functionName} function.\nExpected start < end \nGot start = ${start}, end = ${end}`) // start <= end except for [start,end,dur]
  if (durationStrToInt(start) + durationStrToInt(dur) > len) throw new Error(`Invalid duration input in ${functionName} function.\nExpected: start + dur <= len\nGot: ${durationStrToInt(start)} + ${durationStrToInt(dur)} > ${len}`) // start + dur <= [len]s
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
      objHasAllowedProps(parTag[media]?._attributes, allowedMediaAttr)
    }
  }
  if (Array.isArray(parTag)) {
    for (const obj of parTag) {
      for (const media in obj) {
        objHasAllowedProps(obj[media]?._attributes, allowedMediaAttr)
      }
    }
  }

  // test if [begin, end, dur] have allowed values (DIGIT + 's')
  if (!Array.isArray(parTag)) {
    for (const media in parTag) { // media is like: text, audio, img, video
      for (const attr in parTag[media]?._attributes) {
        if (['begin', 'end', 'dur'].includes(attr)) {
          if (!testDurationInput(parTag[media]?._attributes[attr])) throw new Error('One of the [begin, end, dur] _attributes of a par media element has a disallowed value. It is not of form INT+"s"')
        }
      }
    }
  }

  if (Array.isArray(parTag)) {
    for (const obj of parTag) {
      for (const media in obj) {
        for (const attr in obj[media]?._attributes) {
          if (['begin', 'end', 'dur'].includes(attr)) {
            if (!testDurationInput(obj[media]?._attributes[attr])) throw new Error('One of the [begin, end, dur] _attributes of a par media element has a disallowed value. It is not of form INT+"s"')
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

// input: start: String <positive+'s'>, end: String <positive+'s'>, dur: String <positive+'s'>, len: float <length of video>
// output: {presentationStart:<positive>, presentationEnd:<positive>, fileStart:<positive>, fileEnd:<positive>} | Error
export const timeRules = (start, end, dur, len) => {
  // 1. Validate that input is of proper form: String(<positive>+'s')
  validateDuration(start, end, dur, len, 'timeRules')

  // 2. Output the rules
  // [start] -> {presentationStart: "[start]s", presentationEnd:"[len]s", fileStart:"0s", fileEnd:"[len]s"}
  if (testDurationInput(start) && end === '' && dur === '') return { presentationStart: numberToDurationStr(durationStrToInt(start)), presentationEnd: numberToDurationStr(len), fileStart: '0s', fileEnd: numberToDurationStr(len) }

  // [end] -> {presentationStart: "0s", presentationEnd: "[end]s", fileStart: "0s", fileEnd: "[end]s" }
  if (start === '' && testDurationInput(end) && dur === '') return { presentationStart: '0s', presentationEnd: numberToDurationStr(durationStrToInt(end)), fileStart: '0s', fileEnd: numberToDurationStr(durationStrToInt(end)) }

  // [dur] -> {presentationStart: "0s", presentationEnd: "[dur]s", fileStart: "0s", fileEnd: "[dur]s" }
  if (start === '' && end === '' && testDurationInput(dur)) return { presentationStart: '0s', presentationEnd: numberToDurationStr(durationStrToInt(dur)), fileStart: '0s', fileEnd: numberToDurationStr(durationStrToInt(dur)) }

  // [start, end] -> {presentationStart: "[start]s", presentationEnd: "[end]s", fileStart: "0s", fileEnd: "[end-start]s" }
  if (testDurationInput(start) && testDurationInput(end) && dur === '') return { presentationStart: numberToDurationStr(durationStrToInt(start)), presentationEnd: numberToDurationStr(durationStrToInt(end)), fileStart: '0s', fileEnd: numberToDurationStr(durationStrToInt(end) - durationStrToInt(start)) }

  // [start, dur] -> {presentationStart: "0s", presentationEnd: "[dur]s", fileStart: "[start]s", fileEnd: "[start+dur]s" }
  if (testDurationInput(start) && end === '' && testDurationInput(dur)) return { presentationStart: '0s', presentationEnd: numberToDurationStr(durationStrToInt(dur)), fileStart: numberToDurationStr(durationStrToInt(start)), fileEnd: numberToDurationStr(durationStrToInt(start) + durationStrToInt(dur)) }

  // [end, dur] -> {presentationStart: "[end - dur]s", presentationEnd: "[end]s", fileStart: "0s", fileEnd: "[dur]s" }
  if (start === '' && testDurationInput(end) && testDurationInput(dur)) return { presentationStart: numberToDurationStr(durationStrToInt(end) - durationStrToInt(dur)), presentationEnd: numberToDurationStr(durationStrToInt(end)), fileStart: '0s', fileEnd: numberToDurationStr(durationStrToInt(dur)) }

  // [start, end, dur] -> {presentationStart: "[start]s", presentationEnd: "[start+dur]s", fileStart: "[end]s", fileEnd: "[end+dur]s" }
  if (testDurationInput(start) && testDurationInput(end) && testDurationInput(dur)) return { presentationStart: numberToDurationStr(durationStrToInt(start)), presentationEnd: numberToDurationStr(durationStrToInt(start) + durationStrToInt(dur)), fileStart: numberToDurationStr(durationStrToInt(end)), fileEnd: numberToDurationStr(durationStrToInt(end) + durationStrToInt(dur)) }
}

// input: start:<SMIL time>, end:<SMIL time>, dur:<SMIL time>, pos:<SMIL time>, time:<float>
// output: String (int [0 | 1]) | Error
export const zIndex = (start, end, dur, len, time) => {
  // return z-index at particular time. Intended to be used with <Media />. (int)

  // 1. validate input and define variables
  const functionName = 'zIndex'
  validateDuration(start, end, dur, len, functionName)
  validateTime(len, time, functionName)

  const s = durationStrToInt(start)
  const e = durationStrToInt(end)
  const d = durationStrToInt(dur)

  // 2. output correct z-index of Media
  // return 1 if time is in the time interval in the presentation where it is playing, 0 otherwise

  // [start] -> [start, len]
  if (testDurationInput(start) && end === '' && dur === '') return between(s, len, time)

  // [end] -> [0, end]
  if (start === '' && testDurationInput(end) && dur === '') return between(0, e, time)

  // [dur] -> [0, dur]
  if (start === '' && end === '' && testDurationInput(dur)) return between(0, d, time)

  // [start,end] -> [start, end]
  if (testDurationInput(start) && testDurationInput(end) && dur === '') return between(s, e, time)

  // [start,dur] -> [0, dur]
  if (testDurationInput(start) && end === '' && testDurationInput(dur)) return between(0, d, time)

  // [end,dur] -> [end-dur, end]
  if (start === '' && testDurationInput(end) && testDurationInput(dur)) return between(e - d, e, time)

  // [start,end,dur] -> [start, start+dur]
  if (testDurationInput(start) && testDurationInput(end) && testDurationInput(dur)) return between(s, s + d, time)
}

// input: start:<SMIL time>, end:<SMIL time>, dur:<SMIL time>,time:<float>
// output: boolean | console.error
export const playing = (start, end, dur, len, time) => {
  // return whether a particular media is playing at a particular time or not (Boolean)
  // 1. validate input and define variables
  const functionName = 'playing'
  validateDuration(start, end, dur, len, functionName)
  validateTime(len, time, functionName)

  // 2. output correct playing of Media
  // return true if time is in the time interval in the presentation where it is playing, false otherwise
  try {
    return zIndex(start, end, dur, len, time) === '1'
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
      }
      if (count === tag) {
        return ret
      }
      count += 1
    }

    // If [par, arr]
    else if (isPar && isArr) {
      const par = subKeyValue // array
      for (let i = 0; i < par.length; i++) {
        const ret = {}
        for (const item of Object.keys(par[i])) {
          ret[item] = par[i][item]._attributes
        }
        if (count === tag) return ret
        count += 1 // iterate on every arr obj
      }
    }

    // if [!par, obj]
    else if (!isPar && !isArr) {
      for (const item of Object.values(subKeyValue)) {
        if (count === tag) {
          return {
            [subKeyName]: item
          }
        }
        count += 1
      }
    }

    // If [!par, arr]
    else if (!isPar && isArr) {
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
  const ret = {}
  for (const media in MediaTag) {
    const isDefined = {
      src: typeof MediaTag[media].src !== 'undefined',
      dur: typeof MediaTag[media].dur !== 'undefined',
      begin: typeof MediaTag[media].begin !== 'undefined',
      end: typeof MediaTag[media].end !== 'undefined',
      len: typeof MediaTag[media].len !== 'undefined',
      region: typeof MediaTag[media].region !== 'undefined'
    }
    for (const attr in isDefined) {
      if (!isDefined[attr]) {
        MediaTag[media][attr] = ''
      }
    }
    ret[media] = MediaTag[media]
  }
  return ret
}

// input: JSON, tag (int)
// output: medias:{[mediaName][n]:{start:<SMIL time>, end:<SMIL time>, dur:<SMIL time>, len:<float>}}
export const JSONtoTimings = (json, tag) => {
  // 1. verify JSON and Tag number
  verifyJSONwithDTD(json, 'JSONtoTimings')

  // 2. get nth tag of JSON Object
  const nthTag = getNthTag(json, tag)

  // 3. return it with all values proper or defaulted to ''
  return fillMedia(nthTag)
}

// input: medias:{media[n]:{start:<SMIL time>, end:<SMIL time>, dur:<SMIL time>, len:<float>}}, time:<float>
// output: {media[n]:[0 | 1], ...} | Error
export const zIndexArr = (medias, time) => {
  // return object that has {media[n]:[0 | 1], ...}
  // 1. validate input and define variables
  const functionName = 'zIndexArr'
  if (typeof medias !== 'object') throw new Error(`Invalid input in zIndexArr.\nExpected medias to be an Object, but got ${typeof medias}.`) // expect medias to be an object
  objHasAllowedProps(Object.values(medias), ['start', 'end', 'dur', 'len', 'src', 'region']) // expect medias to have start, end, dur, len keys
  for (const obj in medias) {
    validateDuration(medias[obj]?.start, medias[obj]?.end, medias[obj]?.dur, medias[obj]?.len, functionName)
    validateTime(medias[obj]?.len, time, functionName)
  }

  // 2. create an Object that has form of {media[n]:[0 | 1], ...}
  const ret = {}
  for (const obj in medias) {
    ret[obj] = zIndex(medias[obj]?.start, medias[obj]?.end, medias[obj]?.dur, medias[obj]?.len, time)
  }
  return ret
}

// input: medias:{media[n]:{start:<SMIL time>, end:<SMIL time>, dur:<SMIL time>}}, time:<float>
// output: {media[n]:boolean, ...} | console.error
export const playingArr = (medias, time) => {
  // return object that has {media[n]:boolean, ...}
  try {
    const z = zIndexArr(medias, time)
    for (const obj in z) {
      z[obj] = z[obj] === '1'
    }
    return z
  } catch (e) {
    console.error(e)
  }
}

// input: medias:{media[n]:{start:<SMIL time>, end:<SMIL time>, dur:<SMIL time>,pos:[n]<int>}}, time:<float>)
// output: [int: <time in milliseconds>]
export const mediaChanges = (medias, time) => {
  // return array of ints for when media either changes z-index or when it changes from playing->paused or paused->playing
}

// input: JSON
// output: [<Media .../>] | Error
// This fx requires a try-catch block for caller
export const JSONtoMedia = (json) => {
  // return [<Media ... />]
  verifyJSONwithDTD(json, 'JSONtoMedia') // Error or nothing
  // 1. figure out layout of body.
  // 1.1 Get keys of body. Ex: -> [par, video] Ex: -> [video,par,par,video,img]
  // 2. for each non-par tag in the body, generate a <Media /> component, add it to return list. Make sure it has z-index = 0, and is not playing
  // 2.1 Ex: [video](src=.., start=2, end=6, dur='') -> <Media zindex='0' playing='false' video=<video><source src='https://www.w3schools.com/html/mov_bbb.mp4#t=2,6' type='video/mp4' /></video>/>
  // 3.
}
