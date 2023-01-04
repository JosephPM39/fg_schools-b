import { ArrayProperties } from './types'

export const findWithLength = (params: { lessThan: number, faker: () => string }) => {
  let string: string
  do {
    string = params.faker()
  } while (string.length > params.lessThan)
  return string
}

/** This method converts
* from { n1: [v1, v2], n2: [v3, v5] }
* to [ { n1: v1, n2: v3 }, { n1: v2, n2: v5 }  ]
*/
export const pairProps = <D extends { [key: string]: object } >(obj: ArrayProperties<D>) => {
  const keys = Object.keys(obj)
  const lengths = keys.map((k) => obj[k].length)
  const validLengths = lengths.every((l) => l === lengths[0])
  if (!validLengths) {
    const principalMsg = 'Error: Every properties must be with the same length'
    const message = `${principalMsg}, Props: ${keys.reduce((p, c) => `${p} | ${c}:${obj[c].length}`, '')}`
    throw Error(message)
  }

  const getPair = (i: number) => {
    const d = keys.reduce((p, c) => {
      return {
        ...p,
        [c]: obj[c][i]
      }
    }, {})
    return d as D
  }

  const res: D[] = []

  for (let i = 0; i < lengths[0]; i++) {
    res.push(getPair(i))
  }

  return res
}
