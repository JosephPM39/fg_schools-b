export type WithRequired<T, K extends keyof T> = { [P in keyof T]?: T[P] | undefined } & { [P in K]-?: T[P] }

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends ReadonlyArray<(infer ElementType)> ? ElementType : never
