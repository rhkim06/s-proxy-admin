import React, { ChangeEvent, memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { buyStaticIp, getAllStaticIpList, getStaticIps, removeStaticIpById } from '@/service/static'
import { Country } from '@/types/ip'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { fetchStaticIpList, updateStaticIpList } from '@/store/module/staticIp'
import { staticListCategory } from './data'
import { shallowEqual } from 'react-redux'
import { message, Pagination, Popconfirm, Select, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { DataType } from './table-data'

interface IProps {
  children?: ReactNode
}

const StaticIp: FC<IProps> = memo(() => {
  // store
  const { userId, rows } = useAppSelector((state) => {
    return {
      userId: state.user.user.id,
      rows: state.staticIp.staticIpList
    }
  }, shallowEqual)
  const dispatch = useAppDispatch()
  // state
  const [staticOption, setStaticOption] = useState('0')
  const [staticCountry, setCountryOption] = useState<Country>('us')
  const [staticPerCost, setStaticPerCost] = useState(0.8)
  const [staticProtocol, setStaticProtocol] = useState('socks5')

  // useEffect
  useEffect(() => {
    switch (staticOption) {
      case '1':
        setStaticPerCost(3)
        break
      case '0':
        setStaticPerCost(0.8)
        break
      default:
        break
    }
  }, [staticOption])
  // antd
  const [messageApi, contextHolder] = message.useMessage()
  // handers
  const selectStaticOptionHandler = (value: string) => {
    setStaticOption(value)
  }
  const buyStaticHandler = async () => {
    const config = {
      userId,
      protocol: staticProtocol,
      private: staticOption,
      country: staticCountry
    }
    try {
      const res = await buyStaticIp(config)
      messageApi.open({
        type: 'success',
        content: '购买成功！'
      })
      dispatch(fetchStaticIpList({ userId }))
    } catch (error) {
      messageApi.open({
        type: 'success',
        content: '购买失败！'
      })
    }
  }
  const selectCountryOptionHandler = (value: Country) => {
    setCountryOption(value)
  }
  const selectProtocolHandler = (value: string) => {
    setStaticProtocol(value)
  }

  const removeStaticIp = async (id: number) => {
    try {
      const res = await removeStaticIpById(id)
      messageApi.open({
        type: 'success',
        content: '移除成功！'
      })
      dispatch(fetchStaticIpList({ userId }))
    } catch (error) {
      messageApi.open({
        type: 'success',
        content: '移除失败！'
      })
    }
  }
  const columns: ColumnsType<DataType> = [
    {
      title: '创建时间',
      dataIndex: ['sip_create_time'],
      key: 'creat_time'
    },
    {
      title: '上次续费时间',
      dataIndex: ['sip_last_check_rebuy_time'],
      key: 'last_check_rebuy_time'
    },
    {
      title: '协议',
      dataIndex: 'sip_protocol',
      key: 'protocol'
    },
    {
      title: '国家',
      dataIndex: 'sip_country',
      key: 'country'
    },
    {
      title: '服务器:端口',
      dataIndex: 'sip_ip',
      render: (text) => `proxy.jxit360.com:${text.split(':')[1]}`,
      key: 'ip'
    },
    {
      title: '账号',
      dataIndex: 'sip_user_name',
      key: 'user_name'
    },
    {
      title: '密码',
      dataIndex: 'sip_password',
      key: 'password'
    },
    {
      title: '类型',
      dataIndex: 'sip_private',
      render: (text) => (text === 0 ? '共享' : '独享'),
      key: 'private'
    },
    {
      title: '状态',
      dataIndex: 'sip_status',
      render: (text) => (text === 1 ? '正常' : '欠费'),
      key: 'status'
    },
    {
      title: '刷新次数',
      dataIndex: 'sip_refresh_times',
      key: 'refresh_times'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record: { sip_id: number }) => {
        return (
          <Popconfirm title="确认移除?" onConfirm={() => removeStaticIp(record.sip_id)} okText="确认" cancelText="取消">
            <a>移除</a>
          </Popconfirm>
        )
      },
      key: 'operation'
    }
  ]

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="show-data-box flex flex-col items-center">
        <div className="border border-slate-800/50">
          <table className="w-full">
            <colgroup>
              <col width="120px" />
              <col width="400px" />
            </colgroup>
            <tbody>
              <tr className="border-b border-slate-800/50">
                <th className="basic-th">国家/地区</th>
                <td className="basic-td flex">
                  <Select
                    defaultValue="us"
                    className="w-full"
                    onChange={selectCountryOptionHandler}
                    options={[
                      { value: 'us', label: '美国' },
                      { value: 'kr', label: '韩国' },
                      { value: 'jp', label: '日本' },
                      { value: 'in', label: '印度' }
                    ]}
                  />
                </td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <th className="basic-th">协议</th>
                <td className="basic-td flex">
                  <Select
                    defaultValue="socks5"
                    className="w-full"
                    onChange={selectProtocolHandler}
                    options={[
                      { value: 'socks5', label: 'SOCKS5' },
                      { value: 'http', label: 'HTTP/HTTPS' }
                    ]}
                  />
                </td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <th className="basic-th">IP 类型</th>
                <td className="basic-td flex">
                  <Select
                    defaultValue="0"
                    className="w-full"
                    onChange={selectStaticOptionHandler}
                    options={[
                      { value: '0', label: '共享' },
                      { value: '1', label: '独享' }
                    ]}
                  />
                </td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <th className="basic-th">IP 包月类型</th>
                <td className="basic-td">{staticPerCost}美金/IP/月</td>
              </tr>
              <tr className="">
                <th className="basic-th">流量费</th>
                <td className="basic-td">10美金/GB</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <Popconfirm title="确认购买?" onConfirm={() => buyStaticHandler()} okText="确认" cancelText="取消">
            <button className="basic-button">立即购买</button>
          </Popconfirm>
        </div>
      </div>

      <h2 className="mb-0 mt-20 rounded-t bg-white px-6 py-3 text-lg">静态住宅IP订单列表</h2>
      <div className="show-data-box">
        <Table columns={columns} dataSource={rows} bordered rowKey={(record) => record.sip_id} />
      </div>
      {contextHolder}
    </div>
  )
})

export default StaticIp

StaticIp.displayName = 'StaticIp'
