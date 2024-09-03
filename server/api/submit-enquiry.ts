import { defineEventHandler, readBody, createError } from 'h3'
import { logToFile } from '~/utils/logger'

let apiCallCount = 0

export default defineEventHandler(async (event) => {
  // Check if the request method is POST
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    apiCallCount++
    logToFile('enquiry-api.log', `[Enquiry API] Call count: ${apiCallCount}`)

    const body = await readBody(event)
    logToFile('enquiry-api.log', `[Enquiry API] Received data: ${JSON.stringify(body, null, 2)}`)

    const strapiUrl = 'https://backend.mcdonaldsz.com'
    const endpoint = '/api/enquiries'

    const response = await fetch(`${strapiUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: body }),
    })

    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `HTTP error! status: ${response.status}`
      })
    }

    const result = await response.json()
    logToFile('enquiry-api.log', `[Enquiry API] Submission successful: ${JSON.stringify(result, null, 2)}`)

    return { success: true, message: 'Enquiry submitted successfully' }
  } catch (error) {
    logToFile('enquiry-api.log', `[Enquiry API] Error: ${error}`)
    if (error.statusCode) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})