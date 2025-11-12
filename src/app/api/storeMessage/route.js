import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import ExcelJS from 'exceljs'

const FILE_NAME = 'Shared Questions.xlsx'
const LOCK_NAME = FILE_NAME + '.lock'
const RETRIES = 30
const DELAY_MS = 100

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function acquireLock(lockPath) {
  for (let i = 0; i < RETRIES; i++) {
    try {
      const fh = await fs.open(lockPath, 'wx')
      await fh.close()
      return
    } catch (err) {
      // lock exists; wait and retry
      await sleep(DELAY_MS)
    }
  }
  throw new Error('Could not acquire file lock')
}

async function releaseLock(lockPath) {
  try {
    await fs.unlink(lockPath)
  } catch (e) {
    // ignore
  }
}

function sanitizeCell(value, maxLen = 2000) {
  if (value == null) return ''
  let s = String(value)
  // remove newlines and control chars
  s = s.replace(/[\r\n]+/g, ' ').trim()
  if (s.length > maxLen) s = s.slice(0, maxLen)
  // Avoid Excel formula injection: prefix any cell starting with = + - or @ with a single quote
  if (/^[=+\-@]/.test(s)) s = "'" + s
  return s
}

export async function POST(request) {
  try {
    const body = await request.json()
    const name = sanitizeCell(body.name || '')
    const email = sanitizeCell(body.email || '')
    const message = sanitizeCell(body.message || '', 5000)

    // Basic validation: name and email required
    if (!name) {
      return NextResponse.json({ ok: false, error: 'Name is required' }, { status: 400 })
    }
    // basic email validation
    if (!email) {
      return NextResponse.json({ ok: false, error: 'Email is required' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: 'Invalid email address' }, { status: 400 })
    }

    // Resolve file path inside the project's public folder
    const filePath = path.join(process.cwd(), 'public', FILE_NAME)
    const lockPath = path.join(process.cwd(), 'public', LOCK_NAME)

    // Ensure public directory exists
    try {
      await fs.access(path.join(process.cwd(), 'public'))
    } catch (e) {
      await fs.mkdir(path.join(process.cwd(), 'public'), { recursive: true })
    }

    // Acquire lock for concurrent writes
    await acquireLock(lockPath)
    try {
      const workbook = new ExcelJS.Workbook()
      let worksheet

      // Check if file exists
      let fileExists = true
      try {
        await fs.access(filePath)
      } catch (e) {
        fileExists = false
      }

      if (fileExists) {
        await workbook.xlsx.readFile(filePath)
        worksheet = workbook.worksheets[0] || workbook.addWorksheet('Messages')
      } else {
        worksheet = workbook.addWorksheet('Messages')
        // Add headers
        worksheet.addRow(['Name', 'Email', 'Message'])
      }

      // Append row
      worksheet.addRow([name, email, message])

      // Write file
      await workbook.xlsx.writeFile(filePath)
    } finally {
      await releaseLock(lockPath)
    }

    return NextResponse.json({ ok: true, message: 'Saved' })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err?.message || err) }, { status: 500 })
  }
}

export async function GET() {
  // Simple health-check for the endpoint
  return NextResponse.json({ ok: true, message: 'storeMessage endpoint ready' })
}
