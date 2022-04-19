import base from './airtable.service'

const TABLE_NAME = 'User'

const highscoreService = {
  getHighscore () {
    return new Promise((resolve, reject) => {
      const resultList = []

      base(TABLE_NAME).select({
        sort: [{ field: 'Score', direction: 'desc' }],
        filterByFormula: "NOT({Score} = '')",
        maxRecords: 100
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
  }
}

export default highscoreService
