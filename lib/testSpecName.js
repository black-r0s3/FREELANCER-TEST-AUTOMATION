import path from 'path'

export function getTestSpecName(pathName) {
  const baseName = path.basename(pathName)
  const newBaseName = baseName.substring(26)
  const endIndex = newBaseName.indexOf('.spec.js')
  return newBaseName.substr(0, endIndex)
}
