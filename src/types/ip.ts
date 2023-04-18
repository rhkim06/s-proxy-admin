export type Country = 'ko' | 'us' | 'jp'

export type ChangeIp = {
  Data: string
  Msg: string
  Ret: string
}

export type RemoveRes = {
  code: number
  msg: string
}

export type DynamicIp = {
  proxyId: string
  proxyPassword: string
}
