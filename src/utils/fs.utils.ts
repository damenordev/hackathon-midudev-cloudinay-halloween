import fs, { type WriteFileOptions } from 'fs'

export const writeFile = async (path: string, data: string, options: WriteFileOptions) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, options, error => {
      if (error) reject(error)
      resolve(true)
    })
  })
}
