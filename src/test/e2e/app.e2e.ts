import 'reflect-metadata'
import config from '../../config'
import { EntitiesORM } from '../../models_school'
import { createApp } from '../../app'
import { testSchoolComponent } from './schools'
import { SCHOOLS_ENTITIES, TestMutableParams } from './types'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { Connection } from '../../core_db'
import { AppDataSource } from '../../db/data-source'
import { EmployeeFaker, EmployeePositionFaker, GroupFaker, PositionFaker, PromFaker, SchoolFaker, TitleFaker } from '../fakers/schools'
// import { testProductComponent } from './products'
// import { testStoreComponent } from './store'

describe('Full e2e App Testing', () => {
  const mutableParams: TestMutableParams = {}
  const path = '/api/v1/'

  mutableParams.fakers = {
    schools: {
      [SCHOOLS_ENTITIES.EmployeePosition]: new EmployeePositionFaker(),
      [SCHOOLS_ENTITIES.Employee]: new EmployeeFaker(),
      [SCHOOLS_ENTITIES.Position]: new PositionFaker(),
      [SCHOOLS_ENTITIES.Prom]: new PromFaker(),
      [SCHOOLS_ENTITIES.School]: new SchoolFaker(),
      [SCHOOLS_ENTITIES.Title]: new TitleFaker(),
      [SCHOOLS_ENTITIES.Group]: new GroupFaker()
    }
  }

  mutableParams.fakers.schools.group.makeFakesPack({})
  mutableParams.fakers.schools.position.makeFakesPack({})
  mutableParams.fakers.schools.employee.makeFakesPack({})
  mutableParams.fakers.schools.school.makeFakesPack({})
  mutableParams.fakers.schools.title.makeFakesPack({})
  mutableParams.fakers.schools['employee-position'].makeFakesPack({
    employee: mutableParams.fakers.schools.employee.getFakes().manyWithId[0],
    position: mutableParams.fakers.schools.position.getFakes().manyWithId[0]
  })
  mutableParams.fakers.schools.prom.makeFakesPack({
    // ERROR HERE: manyWithId, this is not used to post in anohter tests
    group: mutableParams.fakers.schools.group.getFakes().manyWithId[0],
    title: mutableParams.fakers.schools.title.getFakes().manyWithId[0],
    profesor: mutableParams.fakers.schools['employee-position'].getFakes().manyWithId[0],
    principal: mutableParams.fakers.schools['employee-position'].getFakes().manyWithId[1],
    school: mutableParams.fakers.schools.school.getFakes().manyWithId[0]
  })

  beforeAll(async () => {
    mutableParams.connection = new Connection(await AppDataSource(EntitiesORM).initialize())
    await mutableParams.connection.syncDB('confirm')

    const { allowedOrigins } = config
    const createdApp = createApp({ connection: mutableParams.connection, port: 3001, allowedOrigins })

    mutableParams.app = createdApp.app
    mutableParams.server = createdApp.server

    if (!config.jwtSecret) return
    const token = jwt.sign({
      sub: uuidv4(),
      role: 'root'
    }, config.jwtSecret)
    mutableParams.auth = {
      token
    }
  })

  afterAll(async () => {
    await mutableParams.connection?.dropDB('confirm')
    await mutableParams.connection?.quit()
    mutableParams.server?.close()
  })
  testSchoolComponent(mutableParams, path)
  // testProductComponent(mutableParams, path)
  // testStoreComponent(mutableParams, path)
})
