import { EntityTarget, Repository } from 'typeorm';
import { DB } from '../../../db/';

export interface IController<T, Create, Id, Get, Update > {
  create(data: Create | string): Promise<boolean | Id>;
  read(id?: Id | Get | string): Promise<T | null | T[]>;
  update(id: Id, data: Update | string): Promise<boolean>;
  delete(id: Id | Get | string): Promise<boolean>;
}

export class BaseController<Model extends {}> {
  protected repo: Repository<Model>;

  protected model: EntityTarget<Model>;

  private connection: DB;

  constructor(
    connection: DB,
    model: EntityTarget<Model>,
  ) {
    this.connection = connection;
    this.model = model;
  }

  async init() {
    this.repo = await this.connection.getRepo(this.model);
  }
}
