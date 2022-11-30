import { TestMutableParams } from '../types'
import { testSchool } from './schools.e2e-d'

export const testSchoolComponent = (params: TestMutableParams, basePath: string) => {
  const path = basePath + 'schools/'
  describe('Schools Component', () => {
    testSchool(params, path)
  })
}
