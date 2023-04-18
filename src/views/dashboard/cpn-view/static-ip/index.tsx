import React, { ChangeEvent, memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { buyStaticIp, getAllStaticIpList, getStaticIps, removeStaticIpById } from '@/service/static'
import { Country } from '@/types/ip'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { fetchStaticIpList, updateStaticIpList } from '@/store/module/staticIp'
import { staticListCategory } from './data'
import { shallowEqual } from 'react-redux'
import { message, Pagination, Popconfirm, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { DataType } from './table-data'

interface IProps {
  children?: ReactNode
}

const StaticIp: FC<IProps> = memo(() => {
  // store
  const { id, rows, total } = useAppSelector((state) => {
    return {
      id: state.user.user.id,
      rows: state.staticIp.staticIpList,
      total: state.staticIp.total
    }
  }, shallowEqual)
  const dispatch = useAppDispatch()
  // state
  const [staticOption, setStaticOption] = useState('0')
  const [staticCountry, setCountryOption] = useState<Country>('us')
  const [staticPerCost, setStaticPerCost] = useState(0.8)
  const [staticProtocol, setStaticProtocol] = useState('socks5')
  const [buyStatus, setBuyStatus] = useState(false)

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
  const selectStaticOptionHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setStaticOption(e.target.value)
  }
  const buyStaticHandler = async () => {
    const config = {
      userId: id,
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
      dispatch(fetchStaticIpList({ id }))
    } catch (error) {
      messageApi.open({
        type: 'success',
        content: '购买失败！'
      })
    }
  }
  const selectCountryOptionHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setCountryOption(e.target.value as Country)
  }
  const selectProtocolHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setStaticProtocol(e.target.value)
  }

  const removeStaticIp = async (id: string) => {
    try {
      const res = await removeStaticIpById(id)
      dispatch(fetchStaticIpList(id))
      messageApi.open({
        type: 'success',
        content: '移除成功！'
      })
    } catch (error) {
      console.log(error)
      messageApi.open({
        type: 'success',
        content: '移除失败！'
      })
    }
  }
  const clickPageHandler = (page: number) => {
    dispatch(fetchStaticIpList({ id }))
  }
  const columns: ColumnsType<DataType> = [
    {
      title: '创建时间',
      dataIndex: ['sip_create_time']
    },
    {
      title: '上次续费时间',
      dataIndex: ['sip_last_check_rebuy_time']
    },
    {
      title: '协议',
      dataIndex: 'sip_protocol'
    },
    {
      title: '国家',
      dataIndex: 'sip_country'
    },
    {
      title: '服务器:端口',
      dataIndex: 'sip_ip',
      render: (text) => `proxy.jxit360.net:${text.split(':')[1]}`
    },
    {
      title: '账号',
      dataIndex: 'sip_user_name'
    },
    {
      title: '密码',
      dataIndex: 'sip_password'
    },
    {
      title: '类型',
      dataIndex: 'sip_private',
      render: (text) => (text === 0 ? '共享' : '独享')
    },
    {
      title: '状态',
      dataIndex: 'sip_status',
      render: (text) => (text === 1 ? '正常' : '欠费')
    },
    {
      title: '刷新次数',
      dataIndex: 'sip_refresh_times'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record: { sip_id: string }) => {
        return (
          <Popconfirm title="确认移除?" onConfirm={() => removeStaticIp(record.sip_id)} okText="确认" cancelText="取消">
            <a>移除</a>
          </Popconfirm>
        )
      }
    }
  ]

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="show-data-box flex justify-between">
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
                  <select className="basic-select flex-1" onChange={(e) => selectCountryOptionHandler(e)}>
                    <option value="us">美国</option>
                    <option value="kr">韩国</option>
                    <option value="jp">日本</option>
                    <option value="in">印度</option>
                  </select>
                </td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <th className="basic-th">协议</th>
                <td className="basic-td flex">
                  <select className="basic-select flex-1" onChange={(e) => selectProtocolHandler(e)}>
                    <option value="socks5">SOCKS5</option>
                    <option value="http">HTTP/HTTPS</option>
                  </select>
                </td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <th className="basic-th">IP 类型</th>
                <td className="basic-td flex">
                  <select className="basic-select flex-1" onChange={(e) => selectStaticOptionHandler(e)}>
                    <option value="0">共享</option>
                    <option value="1">独享</option>
                  </select>
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
      </div>
      <div className="mt-4">
        <Popconfirm title="确认购买?" onConfirm={() => buyStaticHandler()} okText="确认" cancelText="取消">
          <button className="basic-button">立即购买</button>
        </Popconfirm>
      </div>
      <h2 className="mt-5 text-2xl">静态住宅IP订单列表</h2>
      <div className="show-data-box mt-4">
        <Table columns={columns} dataSource={rows} bordered />
      </div>
      {/* <div className="show-data-box mt-4">
        <table className="border border-slate-800/50">
          <colgroup>
            <col width="50px" />
            <col width="220px" />
            <col width="50px" />
            <col width="60px" />
            <col width="170px" />
            <col width="170px" />
            <col width="70px" />
            <col width="60px" />
            <col width="60px" />
            <col width="100px" />
            <col width="60px" />
          </colgroup>
          <thead>
            <tr className="border-b border-slate-800/50">
              <th className="basic-th border-l border-slate-800/50 !text-center">No.</th>
              <th className="basic-th border-l border-slate-800/50 !text-center">
                创建时间 <br /> 上次续费时间
              </th>
              {staticListCategory.map((item) => {
                return (
                  <th className="basic-th border-l border-slate-800/50 !text-center" key={item}>
                    {item}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {rows &&
              rows.map((item, index) => {
                return (
                  <tr className="border-b border-slate-800/50 text-center" key={item.sip_id}>
                    <td>{index + 1}</td>
                    <td className="border-l border-slate-800/50 p-2">
                      {item.sip_create_time}
                      <br />
                      {item.sip_last_check_rebuy_time}
                    </td>
                    <td className="border-l border-slate-800/50 p-2">{item.sip_protocol}</td>
                    <td className="border-l border-slate-800/50 p-2">{item.sip_country}</td>
                    <td className="border-l border-slate-800/50 p-2">proxy.jxit360.net:{item.sip_ip.split(':')[1]}</td>
                    <td className="border-l border-slate-800/50 p-2">{item.sip_user_name}</td>
                    <td className="border-l border-slate-800/50 p-2">{item.sip_password}</td>
                    <td className="border-l border-slate-800/50 p-2">{item.sip_private === 0 ? '共享' : '独享'}</td>
                    <td className="border-l border-slate-800/50 p-2">{item.sip_status === 1 ? '正常' : '欠费'}</td>
                    <td className="border-l border-slate-800/50 p-2">{item.sip_refresh_times}</td>
                    <td className="border-l border-slate-800/50 p-2">
                      <span
                        className="cursor-pointer hover:text-indigo-500/60 hover:underline"
                        onClick={(e) => removeStaticIp(item.id)}
                      >
                        移除
                      </span>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <Pagination defaultCurrent={1} total={total} onChange={clickPageHandler} />
      </div> */}
      {contextHolder}
    </div>
  )
})

export default StaticIp

StaticIp.displayName = 'StaticIp'
