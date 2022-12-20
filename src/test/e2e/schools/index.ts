import { TestMutableParams } from '../types'
import { testEmployeePosition } from './employee-position.e2e-d'
import { testEmployee } from './employee.e2e-d'
import { testGroup } from './group.e2e-d'
import { testPosition } from './position.e2e-d'
import { testSchool } from './schools.e2e-d'
import { testTitle } from './title.e2e-d'
import { testProm } from './prom.e2e-d'

export const testSchoolComponent = (params: TestMutableParams) => {
  describe('[COMPONENT]: Schools', () => {
    testSchool(params)
    testGroup(params)
    testPosition(params)
    testEmployee(params)
    testTitle(params)
    testEmployeePosition(params)
    testProm(params)
  })
}
