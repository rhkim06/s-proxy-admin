import React, { ChangeEvent, memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import appRequest from '@/request'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { basicTd, basicTh } from '@/components/common/table'
import { buttonBasic } from '@/components/common/button'
import { Country } from '@/types/ip'
import { changeIp } from '@/service/dynamic'
import Sidebar from '@/components/sidebar/indes'
import { fetchDynamicIpInfo, updateDynamicIp } from '@/store/module/dynamicIp'
import { stat } from 'fs'
import { shallowEqual } from 'react-redux'
import { message, Popconfirm } from 'antd'

interface IProps {
  children?: ReactNode
}
const DynamicIp: FC<IProps> = memo(() => {
  // state
  const [country, setCountry] = useState<Country>('ko')
  // store
  const appDispatch = useAppDispatch()
  const { proxyId, proxyPwd } = useAppSelector((state) => {
    return {
      proxyId: state.dynamic.dynamicIp.proxyId,
      proxyPwd: state.dynamic.dynamicIp.proxyPassword
    }
  }, shallowEqual)
  // antd
  const [messageApi, contextHolder] = message.useMessage()
  // button handlers
  const handleChangeCountryBtn = async () => {
    try {
      const res = await changeIp(country)
      messageApi.open({
        type: 'success',
        content: 'IP切换成功！'
      })
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'IP切换失败！'
      })
    }
  }
  const selectCountryChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value as Country)
  }
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="show-data-box">
        <div className="border border-slate-800/50">
          <table className="w-full">
            <colgroup>
              <col width="120px" />
              <col width="150px" />
              <col width="120px" />
              <col width="150px" />
            </colgroup>
            <tbody>
              <tr className="border-b border-slate-800/50">
                <th className="basic-th">代理服务器</th>
                <td className="basic-td">proxy.jxit360.com</td>
                <th className="basic-th border-l border-slate-800/50">端口</th>
                <td className="basic-td">2029</td>
              </tr>
              <tr>
                <th className="basic-th">账号</th>
                <td className="basic-td">{proxyId}</td>
                <th className="basic-th border-l border-slate-800/50">密码</th>
                <td className="basic-td">{proxyPwd}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-8 flex">
        <select className="basic-select" onChange={(e) => selectCountryChangeHandler(e)}>
          <option value="ko">韩国</option>
          <option value="en">美国</option>
          <option value="jp">日本</option>
        </select>
        <Popconfirm title="确认切换IP?" onConfirm={() => handleChangeCountryBtn()} okText="确认" cancelText="取消">
          <button className="basic-button">切换IP</button>
        </Popconfirm>
      </div>
      {contextHolder}
    </div>
  )
})

export default DynamicIp

DynamicIp.displayName = 'DynamicIp'
