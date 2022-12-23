export const findWithLength = (params: { lessThan: number, faker: () => string }) => {
  let string: string
  do {
    string = params.faker()
  } while (string.length > params.lessThan)
  return string
}
