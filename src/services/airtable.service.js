import Airtable from 'airtable'

export const base = new Airtable({
  apiKey: `${process.env.VUE_APP_AIRTABLE_API_KEY}`
}).base(`${process.env.VUE_APP_AIRTABLE_BASE}`)

export default base
