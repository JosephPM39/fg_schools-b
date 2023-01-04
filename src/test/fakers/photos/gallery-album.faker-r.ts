import { IGalleryAlbum, IGallery, IAlbum } from '../../../models_school'
import type { WithRequired } from '../types'
import { BaseFaker, Fake, WithId } from '../model.faker'

export type IGalleryAlbumD = {
  gallery: WithRequired<IGallery, 'id'>
  album: WithRequired<IAlbum, 'id'>
}

export class GalleryAlbumFaker extends BaseFaker<IGalleryAlbum, IGalleryAlbumD> {
  makeOneFake = <C extends WithId = undefined>(params: IGalleryAlbumD, withId?: C): Fake<IGalleryAlbum, C> => {
    const { gallery, album } = params
    const base: Partial<IGalleryAlbum> = {
      galleryId: gallery.id,
      albumId: album.id
    }

    return this.makeOneHelper(base, withId)
  }
}
