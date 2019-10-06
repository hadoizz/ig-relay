import Datastore from 'nedb-promises'
import Person from '../types/Person'

const getDb = (() => {
  const datastore = new Datastore(`./data/followed.db`)

  return async () =>
    datastore
})()

export default new class {
  async wasFollowed({ login }: Pick<Person, 'login'>){
    const db = await getDb()
    return await db.findOne({ login }) !== null
  }

  async add({ login }: Pick<Person, 'login'>){
    const db = await getDb()
    await db.insert({ login })
  }
}