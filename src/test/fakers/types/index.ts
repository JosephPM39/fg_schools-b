export interface gOneFakeParams {
  withId?: boolean
}

export interface gManyFakesParams extends gOneFakeParams {
  quantity?: number
}

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

export interface EntityFaker<Entity> {
  generateOneFake: (params?: gOneFakeParams) => Partial<Entity>
  generateManyFakes: (params?: gManyFakesParams) => Array<Partial<Entity>>
}
