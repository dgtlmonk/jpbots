
/* eslint "one-var": 0, "no-plusplus": 0 */

export const FILTER_KEY = {
  ONFIRE: 'On fire',
  SENTIENT: 'Sentient',
  RUSTY: 'Rusty',
  HAS_WHEELS: 'Has wheels',
  LOOSE_SCREWS: 'Loose screws',
  HAS_TRACKS: 'Has tracks',

  // Recycle Filter * ANY
  VALID_ROTOR_COUNT: 'Has fewer than 3 or greater than 8 rotors',
  HAS_ROTOR_AND_BLUE:'Has any number of rotors and blue in colour',
  HAS_WHEELS_AND_TRACKS: 'Has both wheels and tracks',
  HAS_WHEELS_AND_RUSTY: 'Has wheels and is rusty',
  SENTIENT_AND_LOOSE_SCREW:'Is sentient and has screws loose',
  PASSED_QA: 'Passed QA',
  // Factory Second Filter
  LOOSE_SCREW_OR_SCRATCH_PAINT: 'Has loose screws or Scratched paint '
}

export const RECYCLE_FILTERS = [
  FILTER_KEY.HAS_ROTOR_AND_BLUE,
  FILTER_KEY.VALID_ROTOR_COUNT,
  FILTER_KEY.HAS_WHEELS_AND_TRACKS,
  FILTER_KEY.SENTIENT_AND_LOOSE_SCREW,
  FILTER_KEY.HAS_WHEELS_AND_RUSTY,
]

function remove(arrOriginal, elementToRemove) {
  return arrOriginal.filter(el => el !== elementToRemove);
}

export const extinguishFire = source => {
  const extinguishedData = source;

  extinguishedData.forEach((item, index) => {
    const statuses = item.statuses;
    const status = remove(statuses, 'on fire')

    extinguishedData[index].statuses = status;
  })

  return extinguishedData
}

export const filterBots = (key, source) => {
  try {
    const conditions = {
      [FILTER_KEY.ONFIRE]: () => source.filter(robot => robot.statuses.indexOf('on fire') !== -1),
      [FILTER_KEY.SENTIENT]: () => source.filter(robot => robot.configuration.hasSentience === true),
      [FILTER_KEY.RUSTY]: () => source.filter(robot => robot.statuses.indexOf('rusty') !== -1),
      [FILTER_KEY.HAS_WHEELS]: () => source.filter(robot => robot.configuration.hasWheels === true),
      [FILTER_KEY.HAS_TRACKS]: () => source.filter(robot => robot.configuration.hasTracks === true),
      [FILTER_KEY.LOOSE_SCREWS]: () => source.filter(robot => robot.statuses.indexOf('loose screws') !== -1),

      // recycle filters
      [FILTER_KEY.HAS_ROTOR_AND_BLUE]: () => source.filter(robot => (robot.configuration.Colour === 'blue') && (robot.configuration.numberOfRotors > 0)),
      [FILTER_KEY.VALID_ROTOR_COUNT]: () => source.filter(robot => ((robot.configuration.numberOfRotors < 3) || (robot.configuration.numberOfRotors > 8))),
      [FILTER_KEY.HAS_WHEELS_AND_TRACKS]: () => source.filter(robot => ((robot.configuration.hasWheels === true) && (robot.configuration.hasTracks === true))),
      [FILTER_KEY.HAS_WHEELS_AND_RUSTY]: () => source.filter(robot => ((robot.configuration.hasWheels === true) && (robot.statuses.indexOf('rusty') !== -1))),
      [FILTER_KEY.SENTIENT_AND_LOOSE_SCREW]: () => source.filter(robot => ((robot.configuration.hasSentience === true) && (robot.statuses.indexOf('loose screws') !== -1))),

      // factory second
      [FILTER_KEY.LOOSE_SCREW_OR_SCRATCH_PAINT]: () => source.filter(robot => ((robot.statuses.indexOf('loose screws') !== -1) || (robot.statuses.indexOf('paint scratched') !== -1))),

      // Passed QA
[FILTER_KEY.PASSED_QA] : () => source.filter(robot => ((robot.statuses.indexOf('loose screws') === -1) && (robot.statuses.indexOf('paint scratched') === -1)) ),


      'default': () => source
    }

    return conditions[key]() || conditions.default();
  } catch (e) {
    return [];
  }
}

/** Bonus feature - multiple filter  */
export const filterDataByKeys = (keys, source) => {
  let filteredData = []

  keys.reduce((reducedResult, nextKey) => {
    filteredData = filterBots(nextKey, reducedResult)
    return filterBots(nextKey, source);
  }, source)

  return filteredData;
}


export const getIndexFromArray = (source, key) => {
  for (let i = 0; i < source.length; i++)
    if (source[i].key === key)
      return i;
return -1;
}
