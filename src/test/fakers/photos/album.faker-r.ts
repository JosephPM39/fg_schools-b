import { faker } from '@faker-js/faker'
import { BaseFaker, Fake, WithId } from '../model.faker'
import { IAlbum } from '../.././../models_school/'
import { ENV_TEST_CONFIG, MODES } from '../../config'
import { findWithLength } from '../utils'

const fake = (): Partial<IAlbum> => {
  if (ENV_TEST_CONFIG.mode === MODES.seeder) {
    return {
      url: findWithLength({ faker: faker.internet.url, lessThan: 100 }),
      available: faker.datatype.boolean()
    }
  }
  return {
    url: faker.datatype.string(100),
    available: faker.datatype.boolean()
  }
}

export class AlbumFaker extends BaseFaker<IAlbum, {}> {
  makeOneFake = <C extends WithId = undefined>(_: {}, withId?: C): Fake<IAlbum, C> => {
    return this.makeOneHelper(fake(), withId)
  }
}
