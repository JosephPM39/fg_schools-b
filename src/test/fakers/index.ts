import { EmployeeFaker, EmployeePositionFaker, GroupFaker, PositionFaker, SchoolFaker, SchoolPromFaker, SectionPromFaker, TitleFaker } from '../fakers/schools'
import { BorderFaker, ColorFaker, ModelFaker, ProductFaker, ProfileFaker, SizeFaker, TypeFaker } from '../fakers/products'
import { ComboFaker, StudentFaker, OrderFaker, PaymentFaker, ComboOrderFaker, ProductOrderFaker, ProductComboFaker } from '../fakers/store'
import { ENTITIES, Fakers } from './types'
import { AlbumFaker, GalleryAlbumFaker, GalleryFaker, PhotoProductFaker, QrFaker } from './photos'
import { ENV_TEST_CONFIG, MODES } from '../config'
import { configForTest } from './fakes-test.config'
import { configForSeeder } from './fakes-seeder.config'

export const GetApiFakers = () => {
  const fakers: Fakers = {
    // SCHOOLS_ENTITIES
    [ENTITIES.Employee]: new EmployeeFaker(),
    [ENTITIES.Position]: new PositionFaker(),
    [ENTITIES.Title]: new TitleFaker(),
    [ENTITIES.Group]: new GroupFaker(),
    [ENTITIES.School]: new SchoolFaker(),
    [ENTITIES.EmployeePosition]: new EmployeePositionFaker(),
    [ENTITIES.SectionProm]: new SectionPromFaker(),
    [ENTITIES.SchoolProm]: new SchoolPromFaker(),
    // PRODUCTS_ENTITIES
    [ENTITIES.Border]: new BorderFaker(),
    [ENTITIES.Color]: new ColorFaker(),
    [ENTITIES.Model]: new ModelFaker(),
    [ENTITIES.Size]: new SizeFaker(),
    [ENTITIES.Type]: new TypeFaker(),
    [ENTITIES.Product]: new ProductFaker(),
    [ENTITIES.Profile]: new ProfileFaker(),
    // STORE_ENTITIES
    [ENTITIES.Combo]: new ComboFaker(),
    [ENTITIES.Student]: new StudentFaker(),
    [ENTITIES.Order]: new OrderFaker(),
    [ENTITIES.Payment]: new PaymentFaker(),
    [ENTITIES.ComboOrder]: new ComboOrderFaker(),
    [ENTITIES.ProductOrder]: new ProductOrderFaker(),
    [ENTITIES.ProductCombo]: new ProductComboFaker(),
    // PHOTOS_ENTITIES
    [ENTITIES.GalleryAlbum]: new GalleryAlbumFaker(),
    [ENTITIES.Gallery]: new GalleryFaker(),
    [ENTITIES.Album]: new AlbumFaker(),
    [ENTITIES.Qr]: new QrFaker(),
    [ENTITIES.PhotoProduct]: new PhotoProductFaker()
  }

  if (ENV_TEST_CONFIG.mode === MODES.test) {
    configForTest(fakers)
  }

  if (ENV_TEST_CONFIG.mode === MODES.seeder) {
    configForSeeder(fakers)
  }

  return fakers
}
