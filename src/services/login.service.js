import base from './airtable.service'

const TABLE_NAME = 'User'

const loginService = {

  verifyPin (pin) {
    console.log(pin)
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
        }
      }
    )
    console.log('resultList', resultList)

    return resultList
  },
  setShortname (pin, shortname) {
  }
}

export default loginService
