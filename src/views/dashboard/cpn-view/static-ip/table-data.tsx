import { Popconfirm } from 'antd'
import { ColumnsType } from 'antd/es/table'

export type DataType = {
  sip_id: number
  sip_create_time: string
  sip_protocol: number
  sip_country: string
  sip_ip: number
  sip_user_name: string
  sip_password: string
  sip_private: boolean
  sip_status: number
  sip_refresh_times: number
}
