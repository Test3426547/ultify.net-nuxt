import fs from 'fs'
import path from 'path'

const isDev = process.env.NODE_ENV === 'development'

export const logToFile = (filename: string, message: string) => {
  if (isDev) {
    const logPath = path.join(process.cwd(), filename)
    fs.appendFileSync(logPath, `${new Date().toISOString()} - ${message}\n`)
  } else {
    console.log(`[${filename}] ${message}`)
  }
}