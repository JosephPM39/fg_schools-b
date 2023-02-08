import fs from 'fs'
import mime from 'mime-types'
import { IQuery } from '../../../core_db/validations/query'

export const pathStat = async (path: string) => {
  return await new Promise<fs.Stats>(
    (resolve, reject) => fs.stat(path, (err, stat) => {
      if (err) return reject(err)
      return resolve(stat)
    })
  )
}

export const pathIs = async (path: string): Promise<'FILE' | 'DIR' | 'UNKNOWN'> => {
  try {
    const stat = (await pathStat(path))
    if (stat.isFile()) return 'FILE'
    if (stat.isDirectory()) return 'DIR'
    return 'UNKNOWN'
  } catch {
    return 'UNKNOWN'
  }
}

export const pathIsFile = async (path: string): Promise<boolean> => {
  return (await pathIs(path)) === 'FILE'
}

export const isMime = (filemime: string, mimeBase: string) => {
  const mimeMatch = !!filemime.match(mimeBase)
  const mimeExists = !!mime.extension(filemime)
  return mimeMatch && mimeExists
}

export const determineWH = (query?: IQuery): {
  height: number | 'AUTO'
  width: number | 'AUTO'
} => {
  const { w, h } = {
    h: query?.imgheight,
    w: query?.imgwidth
  }
  if (w && h) return { height: h, width: w }
  if (w && !h) return { height: 'AUTO', width: w }
  if (!w && h) return { height: h, width: 'AUTO' }
  return { height: 100, width: 'AUTO' }
}
