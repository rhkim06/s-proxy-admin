export type ImageListPayload = {
  page: number
  type: number
}
export type ImageListRecord = {
  id: number
  imageUrl: string
  type: string
  createTime: string
  isBlock: number
  projectType: number
  display: number
}
export type ImageListDataRes = {
  records: ImageListRecord[]
  total: number
  size: number
  current: number
  orders: any[]
  optimizeCountSql: boolean
  searchCount: boolean
  countId: any
  maxLimit: any
  pages: number
}
export type ImageList = {
  records: ImageListRecord[]
  total: number
  size: number
  current: number
}
