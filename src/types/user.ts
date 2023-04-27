export type User = {
  id: number
  name: string
  roles: string[]
}

export type TokenVerified = {
  codeStatus: number
  data: any
  message: string
}

export type Token = {
  token: string
}
