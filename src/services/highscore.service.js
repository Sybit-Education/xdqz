import base from './airtable.service'

const TABLE_NAME = 'User'

const highscoreService = {
  async getHighscore () {
    return new Promise((resolve, reject) => {
      const resultList = []

      base(TABLE_NAME).select({
        sort: [
          { field: 'Score', direction: 'desc' },
          { field: 'Shortname', direction: 'asc' }
        ],
        filterByFormula: "NOT({Score} = '')",
        maxRecords: 50
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
      resolve(resultList)
    })
  },
  setHighscore (user, score) {
    base(TABLE_NAME).select({
      filterByFormula: `SEARCH(LOWER('${user}'),LOWER({Shortname}))`,
      maxRecords: 1
    }).firstPage((err, records) => {
      if (err) {
        console.error(err)
      }
      base(TABLE_NAME).update([
        {
          id: records[0].id,
          fields: {
            Score: score
          }
        }
      ], function (err, records) {
        if (err) {
          console.error(err)
        }
      })
    })
  }
}

export default highscoreService
