import {
  DataSource, EntityTarget, Repository
} from 'typeorm'
import { AppDataSource, EntitiesADS } from './data-source'

interface IConnection {
  init: () => Promise<boolean | Error>
  getRepo: <T extends {}>(entity: EntityTarget<T>) => Promise<Repository<T>>
  quit: () => Promise<void>
}

export class Connection implements IConnection {
  private source?: DataSource

  private readonly entities?: EntitiesADS

  constructor (entities?: EntitiesADS) {
    this.entities = entities
  }

  async init () {
    if (!this.source) return true
    this.source = await this.initSource()
    return !!this.source
  }

  private async initSource () {
    return await AppDataSource(this.entities).initialize()
  }

  async getRepo<T extends {}>(entity: EntityTarget<T>) {
    if (!this.source) {
      this.source = await this.initSource()
    }
    return this.source.getRepository(entity)
  }

  async rawQuery (query: string) {
    if (this.source == null) {
      this.source = await this.initSource()
    }
    return await this.source.query(query)
  }

  async dropDB (confirm: 'confirm') {
    if (confirm === 'confirm') {
      if (this.source == null) {
        this.source = await this.initSource()
      }
      await this.source.dropDatabase()
    }
  }

  async syncDB (confirm: 'confirm') {
    if (confirm === 'confirm') {
      if (this.source == null) {
        this.source = await this.initSource()
      }
      await this.source.synchronize()
    }
  }

  async quit () {
    if (this.source) {
      await this.source.destroy()
      this.source = undefined
    }
  }
}
