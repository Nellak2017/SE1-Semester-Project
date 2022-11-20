import { describe, expect, test } from '@jest/globals'
import {
  verifyJSONwithDTD,
  validateDuration,
  SMILtoJSON,
  JSONtoSMIL,
  JSONtoMedia,
  timeRules,
  zIndex,
  playing,
  zIndexArr,
  playingArr,
  mediaChanges
} from './helpers'

const testStr1 =
'<smil>' +
'<body>' +
'<par>' +
'<text src="1.txt" dur="10s"/>' +
'<img src="img2.jpg" dur="14s"/>' +
'<audio src="711.mp3" begin="5s" end="16s"/>' +
'</par>' +
'<video src="panda.flv" begin="3s"/>' +
'</body>' +
'</smil>'

const expectedStr1 = JSON.parse('{"smil": {"body": {"par": {"text": {"_attributes":{"src": "1.txt","dur": "10s"}},"img": {"_attributes": {"src": "img2.jpg","dur": "14s"}},"audio": {"_attributes": {"src": "711.mp3","begin": "5s","end": "16s"}}},"video": {"_attributes": {"src": "panda.flv","begin": "3s"}}}}}')

describe('SMIL -> JSON Tests', () => {
  test('output should be valid JSON', () => {
    expect(typeof SMILtoJSON(testStr1) === 'object').toBeTruthy()
  })

  test('output should have smil as first property if no XML prolog else second, that then contains smil object', () => {
    expect(typeof SMILtoJSON(testStr1)?.smil !== 'undefined').toBeTruthy()
    expect(typeof SMILtoJSON(testStr1)?.smil === 'object').toBeTruthy()
    expect(Object.keys(SMILtoJSON(testStr1))[0] === 'smil')
  })

  test('output should match what is on online converter', () => {
    expect(SMILtoJSON(testStr1)).toEqual(expectedStr1)
  })
})

describe('JSON -> SMIL Tests', () => {
  test('output should be a SMIL string', () => {
    expect(typeof JSONtoSMIL(expectedStr1) === 'string').toBeTruthy()
  })

  test('output should be the original SMIL string tested', () => {
    expect(JSONtoSMIL(expectedStr1).trim()).toEqual(testStr1)
  })
})

describe('JSON verifier Tests', () => {
  const badJSONnosmil = JSON.parse('{"foobar": {"body": {"par": {"text": {"_attributes":{"src": "1.txt","dur": "10s"}},"img": {"_attributes": {"src": "img2.jpg","dur": "14s"}},"audio": {"_attributes": {"src": "711.mp3","begin": "5s","end": "16s"}}},"video": {"_attributes": {"src": "panda.flv","begin": "3s"}}}}}')
  const badJSONnobody = JSON.parse('{"smil": {"foobar": {"par": {"text": {"_attributes":{"src": "1.txt","dur": "10s"}},"img": {"_attributes": {"src": "img2.jpg","dur": "14s"}},"audio": {"_attributes": {"src": "711.mp3","begin": "5s","end": "16s"}}},"video": {"_attributes": {"src": "panda.flv","begin": "3s"}}}}}')
  const badJSONnopar = JSON.parse('{"smil": {"foobar": {"nopar": {"text": {"_attributes":{"src": "1.txt","dur": "10s"}},"img": {"_attributes": {"src": "img2.jpg","dur": "14s"}},"audio": {"_attributes": {"src": "711.mp3","begin": "5s","end": "16s"}}},"video": {"_attributes": {"src": "panda.flv","begin": "3s"}}}}}')
  const badJSONillegalparattr = JSON.parse('{"smil": {"foobar": {"par": {"badtext": {"_attributes":{"src": "1.txt","dur": "10s"}},"img": {"_attributes": {"src": "img2.jpg","dur": "14s"}},"audio": {"_attributes": {"src": "711.mp3","begin": "5s","end": "16s"}}},"video": {"_attributes": {"src": "panda.flv","begin": "3s"}}}}}')
  const badJSONillegalpararr = JSON.parse('{"smil": {"foobody": {"par": [{"text": {"_attributes": {"src": "1.txt","dur": "10s"}},"img": {"_attributes": {"src": "img2.jpg","dur": "14s"}},"audio": {"_attributes": {"src": "711.mp3","begin": "5s","end": "16s"}}},{"text": {"_attributes": {"src": "1.txt","dur": "10s"}},"img": {"_attributes": {"src": "img2.jpg","dur": "14s"}},"audio": {"_attributes": {"src": "711.mp3","begin": "5s","end": "16s"}}}],"video": {"src": "panda.flv","begin": "3s"}}}}')
  const badJSONillegalnumber = JSON.parse('{"smil": {"body": {"par": {"text": {"_attributes":{"src": "1.txt","dur": "1.0s"}},"img": {"_attributes": {"src": "img2.jpg","dur": "14s"}},"audio": {"_attributes": {"src": "711.mp3","begin": "5s","end": "16s"}}},"video": {"_attributes": {"src": "panda.flv","begin": "3s"}}}}}')
  const badJSONillegalnumberarr = JSON.parse('{"smil": {"body": {"par": [{"text": {"_attributes": {"src": "1.txt","dur": "1.0s"}},"img": {"_attributes": {"src": "img2.jpg","dur": "14s"}},"audio": {"_attributes": {"src": "711.mp3","begin": "5s","end": "16s"}}},{"text": {"_attributes": {"src": "1.txt","dur": "10s"}},"img": {"_attributes": {"src": "img2.jpg","dur": "14s"}},"audio": {"_attributes": {"src": "711.mp3","begin": "5s","end": "16s"}}}],"video": {"src": "panda.flv","begin": "3s"}}}}')

  test('If JSON without a smil property is passed then an Error should be thrown', () => {
    expect(() => verifyJSONwithDTD(badJSONnosmil)).toThrow(Error)
  })

  test('If JSON without a body property is passed then an Error should be thrown', () => {
    expect(() => verifyJSONwithDTD(badJSONnobody)).toThrow(Error)
  })

  test('If JSON does not have a par, it is malformed', () => {
    expect(() => verifyJSONwithDTD(badJSONnopar)).toThrow(Error)
  })

  test('If JSON has an illegal value for any par, then it is malformed', () => {
    expect(() => verifyJSONwithDTD(badJSONillegalparattr)).toThrow(Error)
    expect(() => verifyJSONwithDTD(badJSONillegalpararr)).toThrow(Error)
  })

  test('If JSON has invalid duration value for any of {begin,end,dur}, it is malformed', () => {
    expect(() => verifyJSONwithDTD(badJSONillegalnumber)).toThrow(Error)
    expect(() => verifyJSONwithDTD(badJSONillegalnumberarr)).toThrow(Error)
  })
})

describe('Duration Input Validator', () => {
  test('validateDuration should verify it has valid input. It should throw errors if not', () => {
    expect(() => validateDuration('1.0s', '1s', '1s')).toThrow(Error)
    expect(() => validateDuration('s', '1s', '1s')).toThrow(Error)
    expect(() => validateDuration('kj;ks', '', '1s')).toThrow(Error)
    expect(() => validateDuration('1', '1', '1')).toThrow(Error)
    expect(() => validateDuration('s', 's', 's')).toThrow(Error)
    expect(() => validateDuration('drop table *;', 1, '1s')).toThrow(Error)
    expect(() => validateDuration('', '', '', '')).toThrow(Error)
    expect(() => validateDuration('9s', '1s', '', 10, 'default function name')).toThrow(Error)
  })
  test('validateDuration should not throw errors on valid inputs.', () => {
    expect(() => validateDuration('1s', '1s', '1s', 10.1, 'default function name')).not.toThrow(Error)
    expect(() => validateDuration('1012s', '1123s', '101s', 10000.1, 'default function name')).not.toThrow(Error)
    expect(() => validateDuration('01s', '0101111s', '23546s', 10000000.1, 'default function name')).not.toThrow(Error)
  })
})

describe('Time Rules Tests', () => {
  test('timeRules([start]) should return {presentationStart: "[start]s", presentationEnd: "[len]s", fileStart: "0s", fileEnd: "[len]s" }', () => {
    expect(timeRules('1s', '', '', 10)).toEqual({ presentationStart: '1s', presentationEnd: '10s', fileStart: '0s', fileEnd: '10s' })
    expect(timeRules('10s', '', '', 10)).toEqual({ presentationStart: '10s', presentationEnd: '10s', fileStart: '0s', fileEnd: '10s' })
    expect(timeRules('01s', '', '', 10)).toEqual({ presentationStart: '1s', presentationEnd: '10s', fileStart: '0s', fileEnd: '10s' })
  })
  test('timeRules([end]) should return {presentationStart: "0s", presentationEnd: "[dur]s", fileStart: "0s", fileEnd: "[dur]s" }', () => {
    expect(timeRules('', '1s', '', 10)).toEqual({ presentationStart: '0s', presentationEnd: '1s', fileStart: '0s', fileEnd: '1s' })
  })
  test('timeRules([dur]) should return {presentationStart: "0s", presentationEnd: "[dur]s", fileStart: "0s", fileEnd: "[dur]s" }', () => {
    expect(timeRules('', '', '1s', 10)).toEqual({ presentationStart: '0s', presentationEnd: '1s', fileStart: '0s', fileEnd: '1s' })
  })
  test('timeRules([start,end]) should return {presentationStart: "[start]s", presentationEnd: "[end]s", fileStart: "0s", fileEnd: "[end-start]s"}', () => {
    expect(timeRules('1s', '3s', '', 10)).toEqual({ presentationStart: '1s', presentationEnd: '3s', fileStart: '0s', fileEnd: '2s' })
  })
  test('timeRules([start,dur]) should return {presentationStart: "0s", presentationEnd: "[dur]s", fileStart: "[start]s", fileEnd: "[start+dur]s" }', () => {
    expect(timeRules('1s', '', '2s', 10)).toEqual({ presentationStart: '0s', presentationEnd: '2s', fileStart: '1s', fileEnd: '3s' })
  })
  test('timeRules([end,dur]) should return {presentationStart: "[end - dur]s", presentationEnd: "[end]s", fileStart: "0s", fileEnd: "[dur]s" }', () => {
    expect(timeRules('', '1s', '1s', 10)).toEqual({ presentationStart: '0s', presentationEnd: '1s', fileStart: '0s', fileEnd: '1s' })
  })
  test('timeRules([start, end, dur]) should return {presentationStart: "[start]s", presentationEnd: "[start+dur]s", fileStart: "[end]s", fileEnd: "[end+dur]s" }', () => {
    expect(timeRules('2s', '1s', '5s', 10)).toEqual({ presentationStart: '2s', presentationEnd: '7s', fileStart: '1s', fileEnd: '6s' })
  })
})

describe('zIndex Function Tests', () => {
  test('zIndex should verify it has valid input. It should throw errors if not', () => {
    expect(() => zIndex('1s', '1s', '1s', 'nan', 1)).toThrow(Error)
    expect(() => zIndex('1s', '1s', '1s', 1, 'nan')).toThrow(Error)
    expect(() => zIndex('1s', '1s', '1', 1, 1)).toThrow(Error)
    expect(() => zIndex('1s', '1', '1s', 1, 1)).toThrow(Error)
    expect(() => zIndex('1', '1s', '1s', 1, 1)).toThrow(Error)
    expect(() => zIndex('1s', '1s', '1s', 0.98, 1)).toThrow(Error)
    expect(() => zIndex('1s', '1s', '1', 1, NaN)).toThrow(Error)
    expect(() => zIndex('1s', '1s', NaN, 1, 1)).toThrow(Error)
    expect(() => zIndex(null, '1s', '1', 1, 1)).toThrow(Error)
    expect(() => zIndex('1s', '1', 1, 1)).toThrow(Error)
    expect(() => zIndex('1s', '1s', '1', 1, null)).toThrow(Error)
    expect(() => zIndex('1s', '1', -1, 1)).toThrow(Error)
    expect(() => zIndex('1s', '1', 10, 1)).toThrow(Error)
  })
  test('zIndex should not throw errors on valid inputs.', () => {
    expect(() => zIndex('1s', '1s', '1s', 10.1, 2)).not.toThrow(Error)
    expect(() => zIndex('1s', '1s', '5s', 11.1, 10.1)).not.toThrow(Error)
  })
  test('zIndex should return proper values for given durations', () => {
    expect(zIndex('1s', '', '', 10.1, 2)).toEqual('1')
    expect(zIndex('', '1s', '', 10.1, 2)).toEqual('0')
    expect(zIndex('', '', '1s', 10.1, 2)).toEqual('0')
    expect(zIndex('1s', '3s', '', 10.1, 2)).toEqual('1')
    expect(zIndex('1s', '', '3s', 10.1, 2)).toEqual('1')
    expect(zIndex('', '4s', '3s', 10.1, 2)).toEqual('1')
    expect(zIndex('', '4s', '1s', 10.1, 2)).toEqual('0')
    expect(zIndex('1s', '4s', '1s', 10.1, 2)).toEqual('1')
    expect(zIndex('1s', '4s', '2s', 10.1, 2)).toEqual('1')
    expect(zIndex('1s', '4s', '0s', 10.1, 2)).toEqual('0')
  })
})

describe('JSON -> Media Tests', () => {

})

/*

describe('playing Function Tests', () => {

})

describe('zIndexArr Function Tests', () => {

})

describe('playingArr Function Tests', () => {

})

describe('mediaChanges Function Tests', () => {

})
*/
