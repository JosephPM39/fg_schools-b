import { faker } from '@faker-js/faker'
import { BaseFaker, Fake, WithId } from '../model.faker'
import { ITitle } from '../.././../models_school/'

export class TitleFaker extends BaseFaker<ITitle, {}> {
  makeOneFake = <C extends WithId = undefined>(_: {}, withId?: C): Fake<ITitle, C> => {
    const base: Partial<ITitle> = {
      name: faker.datatype.string(100)
    }

    return this.makeOneHelper(base, withId)
  }
}
