import base from './airtable.service'
import store from '@/store'

const TABLE_NAME = 'User'

const loginService = {

  async verifyPin (pin) {
    return new Promise((resolve, reject) => {
      const resultList = []

      base(TABLE_NAME).select({
        filterByFormula: `SEARCH(LOWER('${pin}'),LOWER({Pin}))`,
        maxRecords: 1
      }).eachPage(
        function page (partialRecords, fetchNextPage) {
          // This function (`page`) will get called for each page of records.
          partialRecords.forEach(partialRecord => {
            resultList.push({
              id: partialRecord.id,
              ...partialRecord.fields
            })
          })
          fetchNextPage()
        },
        function done (err) {
          if (err) {
            console.error(err)
            reject(err)
          }
          resolve(resultList)
        }
      )
    })
  },
  isUserUsed (shortname) {
    return new Promise((resolve, reject) => {
      base(TABLE_NAME).select({
        filterByFormula: `SEARCH(LOWER('${shortname}'),LOWER({Shortname}))`,
        maxRecords: 1
      }).firstPage((err, records) => {
        if (err) {
          console.error(err)
          reject(err)
        }
        resolve(records.length > 0)
      })
    })
  },
  setShortname (record, pin, shortname) {
    base(TABLE_NAME).update([{
      id: record.id,
      fields: {
        Pin: pin,
        Shortname: shortname
      }
    }
    ], function (err, records) {
      if (err) {
        console.error(err)
      }
    },
    async function done () {
      await store.dispatch('setUser', shortname)
    })
  }
}

export default loginService
