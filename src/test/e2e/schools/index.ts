import { TestMutableParams } from '../types'
import { testEmployee } from './employee.e2e-d'
import { testGroup } from './group.e2e-d'
import { testPosition } from './position.e2e-d'
import { testSchool } from './schools.e2e-d'
import { testTitle } from './title.e2e-d'

export const testSchoolComponent = (params: TestMutableParams, basePath: string) => {
  const path = basePath + 'schools/'
  describe('[COMPONENT]: Schools', () => {
    testSchool(params, path)
    testGroup(params, path)
    testEmployee(params, path)
    testTitle(params, path)
    testPosition(params, path)
  })
}
