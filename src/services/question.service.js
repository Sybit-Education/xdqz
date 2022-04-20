import base from '@/services/airtable.service'

const questionService = {
  async getQuestions () {
    return new Promise((resolve, reject) => {
      const records = []
      base('Question').select({
        view: 'published',
        fields: ['Question', 'Level', 'Answer-A', 'Answer-B', 'Answer-C', 'Answer-D', 'Source', 'Solution']
      }).eachPage(
        function page (partialRecords, fetchNextPage) {
          partialRecords.forEach(partialRecord => {
            records.push({
              id: partialRecord.id,
              question: partialRecord?.fields?.Question,
              source: partialRecord?.fields?.Source,
              solution: partialRecord?.fields?.Solution,
              level: partialRecord?.fields?.Level,
              answers: [
                {
                  id: 'A',
                  answer: partialRecord.fields['Answer-A']
                },
                {
                  id: 'B',
                  answer: partialRecord.fields['Answer-B']
                },
                {
                  id: 'C',
                  answer: partialRecord.fields['Answer-C']
                },
                {
                  id: 'D',
                  answer: partialRecord.fields['Answer-D']
                }
              ]
            })
          })
          fetchNextPage()
        },
        function done (err) {
          if (err) {
            console.error(err)
            reject(err)
          }
          resolve(records)
        }
      )
    })
  }
}
export default questionService
