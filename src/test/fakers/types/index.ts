export interface gOneFakeParams {
  withId?: boolean
}

export interface gManyFakesParams extends gOneFakeParams {
  quantity?: number
}

export type WithRequired<T, K extends keyof T> = { [P in keyof T]?: T[P] | undefined } & { [P in K]-?: T[P] }

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends ReadonlyArray<(infer ElementType)> ? ElementType : never

export interface EntityFaker<Entity> {
  generateOneFake: (params?: gOneFakeParams) => Partial<Entity>
  generateManyFakes: (params?: gManyFakesParams) => Array<Partial<Entity>>
}
