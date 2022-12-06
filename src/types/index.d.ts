export {}

declare global {
  namespace Express {
    interface User {
      role: string
    }
  }
}
