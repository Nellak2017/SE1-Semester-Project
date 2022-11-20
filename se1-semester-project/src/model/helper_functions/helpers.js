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

// Note: add regex to deal with floatingpoint + 's' , so we can deal with the length of videos

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

// input: JSON
// output: Error | none
export const objHasAllowedProps = (json, allowedProps) => {
  if (!Array.isArray(json)) {
    if (!(Object?.keys(json).every(value => allowedProps.includes(value)))) {
      console.log(json)
      throw new Error('Provided json in objHasAllowedProps function has atleast 1 disallowed key in the Object (not Array).\nExpected this:' + json + `\nTo have all keys matching one of these: ${allowedProps}`)
    }
  } else if (Array.isArray(json)) {
    if (!(json.every(obj => Object.keys(obj).every(value => allowedProps.includes(value))))) {
      throw new Error('Provided json in objHasAllowedProps function has atleast 1 disallowed key in the Object Array.\nExpected this:' + json + `\nTo have all keys matching one of these: ${allowedProps}`)
    }
  }
}

// input: JSON
// output: Error | none
export const verifyJSONwithDTD = (json) => {
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
  const allowedMediaAttr = ['src', 'region', 'begin', 'end', 'dur']

  // do basic testing to see if the input json is smil compliant at the top level
  if (typeof json === 'undefined' || typeof json !== 'object') throw new Error('JSON provided in JSONtoMedia function is not valid JSON.')
  if (typeof json?.smil === 'undefined' || typeof json?.smil !== 'object') throw new Error('JSON provided in JSONtoMedia function does not have a valid smil property, so can not be parsed into a Media Array.')
  if (typeof json?.smil?.body === 'undefined' || typeof json?.smil.body !== 'object') throw new Error('JSON provided in JSONtoMedia function does not have a valid body property, so can not be parsed into a Media Array.')
  if (typeof parTag === 'undefined') throw new Error('JSON provided in JSONtoMedia function does not have any par tags, so can not be parsed into a Media Array.')

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
// output: <SMIL> string
export const JSONtoSMIL = (json) => {
  // return SMIL string
  verifyJSONwithDTD(json) // Error or nothing
  return convert.json2xml(json, { compact: true })
}

// input: start: String <positive+'s'>, end: String <positive+'s'>, dur: String <positive+'s'>, len: float <length of video>
// output: {presentationStart:<positive>, presentationEnd:<positive>, fileStart:<positive>, fileEnd:<positive>}
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
// output: String (int [0 | 1])
export const zIndex = (start, end, dur, len, time) => {
  // return z-index at particular time. Intended to be used with <Media />. (int)

  // 1. validate input and define variables
  validateDuration(start, end, dur, len, 'zIndex')
  if (typeof time !== 'number' || isNaN(time) === true) throw new Error(`Invalid input for zIndex function.\nExpected: float for time\nGot: ${time} is a ${typeof time}`)
  if (time > len) throw new Error(`Invalid input for zIndex function.\nExpected: time < len\nGot: ${time} > ${len}`)
  if (time < 0) throw new Error(`Invalid input for zIndex function.\nExpected: time > 0\nGot: ${time} < 0`)

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
// output: boolean
export const playing = (start, end, dur, time) => {
  // return whether a particular media is playing at a particular time or not (Boolean)
}

// input: medias:{media[n]:{start:<SMIL time>, end:<SMIL time>, dur:<float>,pos:[n]<int>}}, time:<float>
// output: {media[n]:[0 | 1], ...}
export const zIndexArr = (medias, time) => {
  // return object that has {media[n]:[0 | 1], ...}
}

// input: medias:{media[n]:{start:<SMIL time>, end:<SMIL time>, dur:<float>}}, time:<float>
// output: {media[n]:boolean, ...}
export const playingArr = (medias, time) => {
  // return object that has {media[n]:boolean, ...}
}

// input: medias:{media[n]:{start:<SMIL time>, end:<SMIL time>, dur:<float>,pos:[n]<int>}}, time:<float>)
// output: [int: <time in milliseconds>]
export const mediaChanges = (medias, time) => {
  // return array of ints for when media either changes z-index or when it changes from playing->paused or paused->playing
}

// input: JSON
// output: [<Media .../>, zIndexArr, playingArr]
// This fx requires a try-catch block for caller
export const JSONtoMedia = (json) => {
  // return [<Media ... />]
  verifyJSONwithDTD(json) // Error or nothing
  // 1. figure out layout of body.
  // 1.1 Get keys of body. Ex: -> [par, video] Ex: -> [video,par,par,video,img]
  // 2. for each non-par tag in the body, generate a <Media /> component, add it to return list
  // 2.1 Ex: [video] ->
}
