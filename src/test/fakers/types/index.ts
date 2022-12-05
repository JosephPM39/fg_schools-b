export interface gOneFakeParams {
  withId?: boolean
}

export interface gManyFakesParams extends gOneFakeParams {
  quantity?: number
}

export interface EntityFaker<Entity> {
  generateOneFake: (params?: gOneFakeParams) => Partial<Entity>
  generateManyFakes: (params?: gManyFakesParams) => Array<Partial<Entity>>
}
