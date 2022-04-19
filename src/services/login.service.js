import base from './airtable.service'

const TABLE_NAME = 'User'

const loginService = {

  verifyPin (pin) {
    console.log(pin)
    return new Promise((resolve, reject) => {
      const resultList = []

      base(TABLE_NAME).select({
        filterByFormula: `SEARCH(LOWER('${pin}'),LOWER({Pin}))`
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
      records.forEach(function (record) {
        console.log(record.get('Score'))
      })
    })
  }
}

export default loginService
