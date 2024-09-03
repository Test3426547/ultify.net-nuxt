import { defineEventHandler, readBody, createError } from 'h3'
import { logToFile } from '~/utils/logger'

export default defineEventHandler(async (event) => {
  logToFile('enquiry-api.log', `[Enquiry API] Received ${event.node.req.method} request`)

  if (event.node.req.method !== 'POST') {
    logToFile('enquiry-api.log', `[Enquiry API] Method Not Allowed: ${event.node.req.method}`)
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    const body = await readBody(event)
    logToFile('enquiry-api.log', `[Enquiry API] Received body: ${JSON.stringify(body)}`)

    // Map the incoming data to the correct Strapi field names
    const strapiData = {
      data: {
        URLBusinessName: body.data['url-business-name-(if-applicable)'] || body.data.URLBusinessName,
        Name: body.data.name || body.data.Name,
        Email: body.data.email || body.data.Email,
        Phone: body.data.phone || body.data.Phone
      }
    }

    const strapiUrl = 'https://backend.mcdonaldsz.com'
    const endpoint = '/api/enquiries'

    const strapiResponse = await fetch(`${strapiUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(strapiData),
    })

    if (!strapiResponse.ok) {
      const errorText = await strapiResponse.text()
      throw new Error(`Strapi error! status: ${strapiResponse.status}, message: ${errorText}`)
    }

    const result = await strapiResponse.json()
    logToFile('enquiry-api.log', `[Enquiry API] Submission successful: ${JSON.stringify(result, null, 2)}`)

    return { success: true, message: 'Enquiry submitted successfully' }
  } catch (error) {
    logToFile('enquiry-api.log', `[Enquiry API] Error: ${error}`)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Internal Server Error'
    })
  }
})