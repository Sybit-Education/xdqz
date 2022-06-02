import base from './airtable.service'

const TABLE_NAME = 'User'
const MAX_RECORDS = 20

const highscoreService = {
  getMaxRecords () {
    return MAX_RECORDS
  },
  async getHighscore () {
    return new Promise((resolve, reject) => {
      const resultList = []

      base(TABLE_NAME).select({
        sort: [
          { field: 'Score', direction: 'desc' },
          { field: 'Shortname', direction: 'asc' }
        ],
        filterByFormula: "NOT({Score} = '')",
        view: 'highscore',
        maxRecords: MAX_RECORDS
      }).eachPage(
        function page (partialRecords, fetchNextPage) {
          // This function (`page`) will get called for each page of records.
          partialRecords.forEach((partialRecord) => {
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
  setHighscore (user, score) {
    base(TABLE_NAME).select({
      filterByFormula: `SEARCH(LOWER('${user}'),LOWER({Shortname}))`
    }).firstPage((err, records) => {
      if (err) {
        console.error(err)
      }
      let id = records[0].id
      let highestScore = 0
      records.forEach((record) => {
        if (record.fields.Score > highestScore) {
          highestScore = record.fields.Score
          id = record.id
        }
      })
      base(TABLE_NAME).update([{ id, fields: { Score: score } }], function (err, records) {
        if (err) {
          console.error(err)
        }
      })
    })
  }
}

export default highscoreService
