import base from './airtable.service'
import store from '@/store'

const TABLE_NAME = 'User'

const loginService = {

  verifyPin (pin) {
    console.log(pin)
    return new Promise((resolve, reject) => {
      const resultList = []

      base(TABLE_NAME).select({
        filterByFormula: `SEARCH(LOWER('${pin}'),LOWER({Pin}))`,
        maxRecords: 1
      }).eachPage(
        function page (partialRecords) {
          // This function (`page`) will get called for each page of records.
          partialRecords.forEach((partialRecord) => {
            resultList.push({
              id: partialRecord.id,
              ...partialRecord.fields
            })
          })
        },
        function done (err) {
          if (err) {
            console.error(err)
            reject(err)
          }
        }
      )
      console.log('resultList', resultList)

      resolve(resultList)
    })
  },
  setShortname (record, pin, shortname) {
    console.log(record, pin, shortname)

    base(TABLE_NAME).select({
      filterByFormula: `SEARCH(LOWER('${shortname}'),LOWER({Shortname}))`,
      maxRecords: 1
    }).firstPage((err, records) => {
      if (err) {
        console.error(err)
        return
      }
      console.log('already registered:', records)
    })
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
        return
      }
      console.log(records)
    },
    async function done () {
      await store.dispatch('setUser', shortname)
    })
  }
}

export default loginService
