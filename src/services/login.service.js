import base from './airtable.service'
import store from '@/store'

const TABLE_NAME = 'User'

const loginService = {
  async login (shortname, nickname) {
    return new Promise((resolve, reject) => {
      base(TABLE_NAME).select({
        filterByFormula: `SEARCH(LOWER('${shortname}'),LOWER({Shortname}))`
      }).firstPage(async (err, records) => {
        if (err) {
          reject(err)
          console.error(err)
        } else {
          if (records.length >= 1) {
            const user = records[0]
            if (nickname !== user.fields.Nickname) {
              await base(TABLE_NAME).update([{
                id: user.id,
                fields: {
                  Shortname: user.fields.Shortname,
                  Nickname: nickname
                }
              }])
            }
          } else {
            await base(TABLE_NAME).create([{
              fields: {
                Shortname: shortname,
                Nickname: nickname
              }
            }])
          }
          await store.dispatch('setUser', shortname)
          resolve(true)
        }
      })
    })
  }
}

export default loginService
