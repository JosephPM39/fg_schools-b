import {
  DataSource, EntityTarget, Repository
} from 'typeorm'
// import { AppDataSource, EntitiesADS } from './data-source'

interface IConnection {
  init: () => Promise<boolean | Error>
  getRepo: <T extends {}>(entity: EntityTarget<T>) => Promise<Repository<T>>
  quit: () => Promise<void>
}

export class Connection implements IConnection {
  constructor (private readonly source: DataSource) {
  }

  async init () {
    if (this.source.isInitialized) return true
    await this.source.initialize()
    return this.source.isInitialized
  }

  async getRepo<T extends {}>(entity: EntityTarget<T>) {
    await this.init()
    return this.source.getRepository(entity)
  }

  async rawQuery (query: string) {
    await this.init()
    return await this.source.query(query)
  }

  async dropDB (confirm: 'confirm') {
    if (confirm === 'confirm') {
      await this.init()
      await this.source.dropDatabase()
    }
  }

  async syncDB (confirm: 'confirm') {
    if (confirm === 'confirm') {
      await this.init()
      await this.source.synchronize()
    }
  }

  async quit () {
    await this.init()
    await this.source.destroy()
  }
}
