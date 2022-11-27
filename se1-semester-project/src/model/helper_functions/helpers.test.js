import { describe, expect, test } from '@jest/globals'
import {
  verifyJSONwithDTD,
  validateDuration,
  SMILtoJSON,
  JSONtoSMIL,
  getNthTag,
  JSONtoTimings,
  timeRules,
  zIndex,
  playing,
  zIndexArr,
  playingArr,
  mediaFactory,
  JSONtoMedia,
  JSONplusLens
} from './helpers'
import Media from '../../components/Molecules/Media/Media'

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
  test('timeRules([begin]) should return {presentationStart: "[begin]s", presentationEnd: "[len]s", fileStart: "0s", fileEnd: "[len]s" }', () => {
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
  test('timeRules([begin,end]) should return {presentationStart: "[begin]s", presentationEnd: "[end]s", fileStart: "0s", fileEnd: "[end-begin]s"}', () => {
    expect(timeRules('1s', '3s', '', 10)).toEqual({ presentationStart: '1s', presentationEnd: '3s', fileStart: '0s', fileEnd: '2s' })
  })
  test('timeRules([begin,dur]) should return {presentationStart: "0s", presentationEnd: "[dur]s", fileStart: "[begin]s", fileEnd: "[begin+dur]s" }', () => {
    expect(timeRules('1s', '', '2s', 10)).toEqual({ presentationStart: '0s', presentationEnd: '2s', fileStart: '1s', fileEnd: '3s' })
  })
  test('timeRules([end,dur]) should return {presentationStart: "[end - dur]s", presentationEnd: "[end]s", fileStart: "0s", fileEnd: "[dur]s" }', () => {
    expect(timeRules('', '1s', '1s', 10)).toEqual({ presentationStart: '0s', presentationEnd: '1s', fileStart: '0s', fileEnd: '1s' })
  })
  test('timeRules([begin, end, dur]) should return {presentationStart: "[begin]s", presentationEnd: "[begin+dur]s", fileStart: "[end]s", fileEnd: "[end+dur]s" }', () => {
    expect(timeRules('2s', '1s', '5s', 10)).toEqual({ presentationStart: '2s', presentationEnd: '7s', fileStart: '1s', fileEnd: '6s' })
  })
})

describe('zIndex Function Tests', () => {
  // NOTE: It turns out to actually be a bad idea to input validate zIndex. Once time is out of bounds it throws a fit.
  //       Likewise for durations on non-video/audio inputs
  /*
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
  */
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

describe('playing Function Tests', () => {
  test('playing should return proper values for given durations', () => {
    expect(playing('1s', '', '', 10.1, 2)).toBeTruthy()
    expect(playing('', '1s', '', 10.1, 2)).toBeFalsy()
    expect(playing('', '', '1s', 10.1, 2)).toBeFalsy()
    expect(playing('1s', '3s', '', 10.1, 2)).toBeTruthy()
    expect(playing('1s', '', '3s', 10.1, 2)).toBeTruthy()
    expect(playing('', '4s', '3s', 10.1, 2)).toBeTruthy()
    expect(playing('', '4s', '1s', 10.1, 2)).toBeFalsy()
    expect(playing('1s', '4s', '1s', 10.1, 2)).toBeTruthy()
    expect(playing('1s', '4s', '2s', 10.1, 2)).toBeTruthy()
    expect(playing('1s', '4s', '0s', 10.1, 2)).toBeFalsy()
  })
})

const goodMedias = { media1: { begin: '1s', end: '3s', dur: '', len: 10.1 }, media2: { begin: '2s', end: '6s', dur: '', len: 10.1 } }
const goodTime = 5
const goodMediasXgoodTimeRetValue = { media1: '0', media2: '1' }
describe('zIndexArr Function Tests', () => {
  const l = 10.1
  const badMediasArr = [{ media1: { begin: '1s', end: '3s', dur: '', len: l }, media2: { begin: '2s', end: '4s', dur: '', len: l } }]
  const badMediasBadProp = { media1: { begin: '1s', ended: '3s', dur: '', len: l }, media2: { begin: '2s', end: '4s', dur: '', len: l } }
  const badMediasBadDuration = { media1: { begin: '1s', end: '3s', dur: '-1', len: l }, media2: { begin: '2s', end: '4s', dur: '', len: l } }

  const badTime = '1'

  // NOTE: It turns out to actually be a bad idea to input validate zIndexArr. Once time is out of bounds it throws a fit.
  //       Likewise for durations on non-video/audio inputs
  /*
  test('zIndexArr Function should throw an Error when given invalid inputs', () => {
    expect(() => zIndexArr(badMediasArr, goodTime)).toThrow(Error)
    expect(() => zIndexArr(badMediasBadProp, goodTime)).toThrow(Error)
    expect(() => zIndexArr(badMediasBadDuration, goodTime)).toThrow(Error)
    expect(() => zIndexArr(goodMedias, badTime)).toThrow(Error)
    expect(() => zIndexArr(badMediasArr, badTime)).toThrow(Error)
    expect(() => zIndexArr(badMediasBadProp, badTime)).toThrow(Error)
    expect(() => zIndexArr(badMediasBadDuration, badTime)).toThrow(Error)
  })
  */
  test('zIndexArr Function not throw an Error when given valid inputs', () => {
    expect(() => zIndexArr(goodMedias, goodTime)).not.toThrow(Error)
  })

  test('zIndexArr Function should return proper values on valid inputs', () => {
    expect(zIndexArr(goodMedias, goodTime)).toEqual(goodMediasXgoodTimeRetValue)
  })
})

describe('playingArr Function Tests', () => {
  test('zIndexArr Function should return proper values on valid inputs', () => {
    const goodMedias2 = { par1media1: { begin: '1s', end: '3s', dur: '', len: 10.1 }, media2: { begin: '2s', end: '6s', dur: '', len: 10.1 } }
    const expected = { par1media1: 'false', media2: 'true' }
    expect(playingArr(goodMedias2, goodTime)).toEqual(expected)
  })
})

const validClass1 = {
  smil: {
    body: {
      par: {
        text: {
          _attributes: {
            src: '1.txt',
            dur: '10s'
          }
        },
        img: {
          _attributes: {
            src: 'img2.jpg',
            dur: '14s'
          }
        },
        audio: {
          _attributes: {
            src: '711.mp3',
            begin: '5s',
            end: '16s',
            len: '20s'
          }
        }
      },
      video: {
        _attributes: {
          src: 'panda.flv',
          begin: '3s'
        }
      },
      audio: [{
        _attributes: {
          src: 'panda.flv',
          begin: '3s'
        }
      },
      {
        _attributes: {
          src: 'panda.flv',
          begin: '30s'
        }
      }]
    }
  }
} // [par, obj]

const validClass2 = {
  smil: {
    body: {
      par: [{
        text: {
          _attributes: {
            src: '1.txt',
            dur: '10s'
          }
        },
        img: {
          _attributes: {
            src: 'img2.jpg',
            dur: '14s'
          }
        },
        audio: {
          _attributes: {
            src: '711.mp3',
            begin: '5s',
            end: '16s',
            len: '20s'
          }
        }
      },
      {
        text: {
          _attributes: {
            src: '1.txt',
            dur: '10s'
          }
        },
        img: {
          _attributes: {
            src: 'img2.jpg',
            dur: '16s'
          }
        },
        audio: {
          _attributes: {
            src: '711.mp3',
            begin: '5s',
            end: '18s',
            len: '20s'
          }
        }
      }]
    }
  }
} // [par, !obj]

const validClass3 = {
  smil: {
    body: {
      par: {
        text: {
          _attributes: {
            src: '1.txt',
            dur: '10s'
          }
        },
        img: {
          _attributes: {
            src: 'img2.jpg',
            dur: '14s'
          }
        },
        audio: {
          _attributes: {
            src: '711.mp3',
            begin: '5s',
            end: '16s',
            len: '20s'
          }
        }
      },
      video: {
        _attributes: {
          src: 'panda.flv',
          begin: '3s'
        }
      }
    }
  }
} // [!par, obj]

const validClass4 = {
  smil: {
    body: {
      par: {
        text: {
          _attributes: {
            src: '1.txt',
            dur: '10s'
          }
        },
        img: {
          _attributes: {
            src: 'img2.jpg',
            dur: '14s'
          }
        },
        audio: {
          _attributes: {
            src: '711.mp3',
            begin: '5s',
            end: '16s',
            len: '20s'
          }
        }
      },
      audio: [{
        _attributes: {
          src: 'panda.flv',
          begin: '3s'
        }
      },
      {
        _attributes: {
          src: 'panda.flv',
          begin: '30s',
          len: '60s'
        }
      }]
    }
  }
} // [!par, !obj]

const validIntegrated1 = {
  smil: {
    body: {
      par: {
        text: {
          _attributes: {
            src: '1.txt',
            dur: '10s'
          }
        },
        img: {
          _attributes: {
            src: 'img2.jpg',
            dur: '14s'
          }
        },
        audio: {
          _attributes: {
            src: '711.mp3',
            begin: '5s',
            end: '16s',
            len: '20s'
          }
        }
      },
      video: {
        _attributes: {
          src: 'panda.flv',
          begin: '3s'
        }
      },
      audio: [
        {
          _attributes: {
            src: 'panda.flv',
            begin: '3s'
          }
        },
        {
          _attributes: {
            src: 'panda.flv',
            begin: '30s'
          }
        }]
    }
  }
}

const validIntegrated2 = {
  smil: {
    body: {
      par: [
        {
          text: {
            _attributes: {
              src: '1.txt',
              dur: '10s'
            }
          },
          img: {
            _attributes: {
              src: 'img2.jpg',
              dur: '14s'
            }
          },
          audio: {
            _attributes: {
              src: '711.mp3',
              begin: '5s',
              end: '16s',
              len: '20s'
            }
          }
        },
        {
          text: {
            _attributes: {
              src: '1.txt',
              dur: '10s'
            }
          },
          img: {
            _attributes: {
              src: 'img2.jpg',
              dur: '16s'
            }
          },
          audio: {
            _attributes: {
              src: '711.mp3',
              begin: '5s',
              end: '18s',
              len: '20s'
            }
          }
        }],
      video: {
        _attributes: {
          src: 'panda.flv',
          begin: '3s'
        }
      },
      audio: [
        {
          _attributes: {
            src: 'panda.flv',
            begin: '3s'
          }
        },
        {
          _attributes: {
            src: 'panda.flv',
            begin: '30s'
          }
        }]
    }
  }
}

describe('getNthTag Tests', () => {
  const invalid1 = {
    smil: {
      body: {
        par: {
          text: {
            _attributes: {
              src: '1.txt',
              dur: '10s'
            }
          },
          img: {
            _attributes: {
              src: 'img2.jpg',
              dur: '14s'
            }
          },
          audio: {
            _attributes: {
              sourrc: '711.mp3',
              begin: '5s',
              end: '16s',
              len: '20s'
            }
          }
        },
        video: {
          _attributes: {
            src: 'panda.flv',
            begin: '3s'
          }
        },
        audio: [{
          _attributes: {
            src: 'panda.flv',
            begin: '3s'
          }
        },
        {
          _attributes: {
            src: 'panda.flv',
            begin: '30s'
          }
        }]
      }
    }
  }
  const invalid2 = {
    par: {
      text: {
        attributes: {
          src: '1.txt',
          dur: '10s'
        }
      },
      img: {
        _attributes: {
          src: 'img2.jpg',
          dur: '14s'
        }
      },
      audio: {
        _attributes: {
          src: '711.mp3',
          begin: '5s',
          end: '16s',
          len: '20s'
        }
      }
    }
  }
  const invalid3 = {
    par: {
      text: {
        _attributes: {
          src: '1.txt',
          duration: '10s'
        }
      },
      img: {
        _attributes: {
          src: 'img2.jpg',
          dur: '14s'
        }
      },
      audio: {
        _attributes: {
          src: '711.mp3',
          begin: '5s',
          end: '16s',
          len: '20s'
        }
      }
    }
  }

  const validClass1Res = {
    text: { src: '1.txt', dur: '10s' },
    img: { src: 'img2.jpg', dur: '14s' },
    audio: { src: '711.mp3', begin: '5s', end: '16s', len: '20s' }
  }

  const validClass2Res = {
    text: { src: '1.txt', dur: '10s' },
    img: { src: 'img2.jpg', dur: '14s' },
    audio: { src: '711.mp3', begin: '5s', end: '16s', len: '20s' }
  }

  const validClass3Res = { video: { src: 'panda.flv', begin: '3s' } }

  const validClass4Res = { audio: { src: 'panda.flv', begin: '3s' } }

  test('getNthTag should throw errors on invalid inputs', () => {
    expect(() => getNthTag(invalid1)).toThrow(Error)
    expect(() => getNthTag(invalid2)).toThrow(Error)
    expect(() => getNthTag(invalid1, -5)).toThrow(Error)
    expect(() => getNthTag(invalid2, -5)).toThrow(Error)
    expect(() => getNthTag(invalid1, NaN)).toThrow(Error)
    expect(() => getNthTag(invalid2, NaN)).toThrow(Error)
    expect(() => getNthTag(invalid1, null)).toThrow(Error)
    expect(() => getNthTag(invalid2, null)).toThrow(Error)
    expect(() => getNthTag(invalid1, 0)).toThrow(Error)
    expect(() => getNthTag(invalid2, 0)).toThrow(Error)
    expect(() => getNthTag(invalid3, 0)).toThrow(Error)
  })
  test('getNthTag should return proper results on the 4 classes of valid inputs', () => {
    expect(getNthTag(validClass1, 0)).toEqual(validClass1Res)
    expect(getNthTag(validClass1, 0)).toEqual(validClass1Res)
    expect(getNthTag(validClass2, 0)).toEqual(validClass2Res)
    expect(getNthTag(validClass3, 1)).toEqual(validClass3Res)
    expect(getNthTag(validClass4, 1)).toEqual(validClass4Res)

    expect(getNthTag(validIntegrated1, 0)).toEqual(validClass1Res)
    expect(getNthTag(validIntegrated2, 2)).toEqual(validClass3Res)
  })
})

describe('JSON -> Timings Tests', () => {
  const class1Res = {
    text: { src: '1.txt', dur: '10s', begin: '', end: '', len: '', region: '' },
    img: {
      src: 'img2.jpg',
      dur: '14s',
      begin: '',
      end: '',
      len: '',
      region: ''
    },
    audio: {
      src: '711.mp3',
      begin: '5s',
      end: '16s',
      len: '20s',
      dur: '',
      region: ''
    }
  }
  const class1Res1 = {
    video: {
      src: 'panda.flv',
      begin: '3s',
      dur: '',
      end: '',
      len: '',
      region: ''
    }
  }
  const class2Res = {
    text: { src: '1.txt', dur: '10s', begin: '', end: '', len: '', region: '' },
    img: {
      src: 'img2.jpg',
      dur: '14s',
      begin: '',
      end: '',
      len: '',
      region: ''
    },
    audio: {
      src: '711.mp3',
      begin: '5s',
      end: '16s',
      dur: '',
      len: '20s',
      region: ''
    }
  }
  const class2Res1 = {
    text: { src: '1.txt', dur: '10s', begin: '', end: '', len: '', region: '' },
    img: {
      src: 'img2.jpg',
      dur: '16s',
      begin: '',
      end: '',
      len: '',
      region: ''
    },
    audio: {
      src: '711.mp3',
      begin: '5s',
      end: '18s',
      dur: '',
      len: '20s',
      region: ''
    }
  }
  test('JSON -> Timings should return proper values on valid inputs', () => {
    expect(JSONtoTimings(validClass1, 0)).toEqual(class1Res)
    expect(JSONtoTimings(validClass1, 1)).toEqual(class1Res1)

    expect(JSONtoTimings(validClass2, 0)).toEqual(class2Res)
    expect(JSONtoTimings(validClass2, 1)).toEqual(class2Res1)
  })
})

// @TODO: Create Error Throwing logic in this function and tests for it as well
describe('mediaFactory Tests', () => {
  const validTestMedia1 = {
    text: { src: '1.txt', dur: '10s', begin: '', end: '', len: '', region: '' },
    img: {
      src: 'img2.jpg',
      dur: '14s',
      begin: '',
      end: '',
      len: '',
      region: ''
    },
    audio: {
      src: '711.mp3',
      begin: '5s',
      end: '16s',
      dur: '',
      len: '',
      region: ''
    }
  }

  const validTestZ1 = {
    text: '1',
    img: '1',
    audio: '0'
  }

  const validTestPlay1 = {
    text: 'true',
    img: 'true',
    audio: 'false'
  }

  const validAudio1 = (
    <audio playsInline>
      <source src='711.mp3#t=5,16' type='audio' />
      Your browser does not support the audio tag. I suggest you upgrade your browser.
    </audio>
  )

  const validTestMedia2 = {
    text: { src: '1.txt', dur: '10s', begin: '', end: '', len: '', region: '' },
    img: {
      src: 'img2.jpg',
      dur: '14s',
      begin: '',
      end: '',
      len: '',
      region: ''
    },
    video: {
      src: '711.mp3',
      begin: '0s',
      end: '16s',
      dur: '',
      len: '',
      region: ''
    }
  }

  const validTestZ2 = {
    text: '1',
    img: '1',
    video: '0'
  }

  const validTestPlay2 = {
    text: 'true',
    img: 'true',
    video: 'false'
  }

  const validVideo2 = (
    <video playsInline>
      <source src='711.mp3#t=0,16' type='video' />
      Your browser does not support the video tag. I suggest you upgrade your browser.
    </video>
  )

  const validExpected1 = [
    <Media key='Media[0]' text='1.txt' position='' color={undefined} image='img2.jpg' video='' audio='' zindex='1' playing='true' />,
    <Media key='Media[1]' text='1.txt' position='' color={undefined} image='' video='' audio={validAudio1} zindex='0' playing='false' />
  ]

  const validExpected2 = [
    <Media key='Media[0]' text='1.txt' position='' color={undefined} image='img2.jpg' video='' audio='' zindex='1' playing='true' />,
    <Media key='Media[1]' text='1.txt' position='' color={undefined} image='' video={validVideo2} audio='' zindex='0' playing='false' />
  ]

  test('mediaFactory should return proper output on proper inputs', () => {
    expect(mediaFactory(validTestZ1, validTestPlay1, validTestMedia1)).toEqual(validExpected1)
    expect(mediaFactory(validTestZ2, validTestPlay2, validTestMedia2)).toEqual(validExpected2)
  })
})

const class1Audio1 = (
  <audio playsInline>
    <source src='711.mp3' />
  </audio>
)

const class1Audio2 = (
  <audio playsInline>
    <source src='panda.flv' />
  </audio>
)

const class1Video1 = (
  <video playsInline>
    <source src='panda.flv' />
  </video>
)

const validClass1Ret = [
  <Media key='Media[0][audio]' audio={class1Audio1} video='' image='img2.jpg' text='1.txt' />,
  <Media key='Media[1][video]' audio='' video={class1Video1} />,
  <Media key='Media[2][audio]' audio={class1Audio2} video='' />,
  <Media key='Media[3][audio]' audio={class1Audio2} video='' />
]

const validIntegrated1Ret = [
  <Media key='Media[0][audio]' audio={class1Audio1} video='' image='img2.jpg' text='1.txt' />,
  <Media key='Media[1][video]' audio='' video={class1Video1} />,
  <Media key='Media[2][audio]' audio={class1Audio2} video='' />,
  <Media key='Media[3][audio]' audio={class1Audio2} video='' />
]

describe('JSON -> Media Tests', () => {
  test('JSON -> Media should return proper values on valid inputs', () => {
    expect(JSONtoMedia(validClass1)).toEqual(validClass1Ret)
    expect(JSONtoMedia(validClass1)).toEqual(validClass1Ret)

    expect(JSONtoMedia(validIntegrated1)).toEqual(validIntegrated1Ret)
    expect(JSONtoMedia(validIntegrated1)).toEqual(validIntegrated1Ret)
  })
})

describe('JSON + Lens Tests', () => {
  const lens = {
    'Media[0][audio]': 372.715083,
    'Media[1][video]': 10.1,
    'Media[2][audio]': 10.1,
    'Media[3][audio]': 10.1
  }

  // We are rounding up on lens to nearest int!
  const validClass1PlusLens = {
    smil: {
      body: {
        par: {
          text: {
            _attributes: {
              src: '1.txt',
              dur: '10s'
            }
          },
          img: {
            _attributes: {
              src: 'img2.jpg',
              dur: '14s'
            }
          },
          audio: {
            _attributes: {
              src: '711.mp3',
              begin: '5s',
              end: '16s',
              len: 372.715083
            }
          }
        },
        video: {
          _attributes: {
            src: 'panda.flv',
            begin: '3s',
            len: 10.1
          }
        },
        audio: [{
          _attributes: {
            src: 'panda.flv',
            begin: '3s',
            len: 10.1
          }
        },
        {
          _attributes: {
            src: 'panda.flv',
            begin: '30s',
            len: 10.1
          }
        }]
      }
    }
  }
  test('JSON + Lens should return proper values on valid inputs', () => {
    expect(JSONplusLens(validClass1, lens)).toEqual(validClass1PlusLens)
  })
})
