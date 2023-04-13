import React, { ChangeEvent, memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import appRequest from '@/request'
import { useAppSelector } from '@/hooks/store'
import { basicTd, basicTh } from '@/components/common/table'
import { buttonBasic } from '@/components/common/button'
import { Country } from '@/types/ip'
import { changeIp } from '@/service/dashboard'

interface IProps {
  children?: ReactNode
}
const Dashboard: FC<IProps> = memo(() => {
  // state
  const [country, setCountry] = useState<Country>('ko')
  // store
  const { profile } = useAppSelector((state) => {
    return {
      profile: state.user.profile
    }
  })
  // button handlers
  const handleChangeCountryBtn = async () => {
    const res = await changeIp(country)
    if (res.data.Ret === 'SUCCESS') {
      alert(res.data.Ret)
    }
  }
  const selectCountryChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value as Country)
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-indigo-500/40 px-2">
      <div className="w-2/5 min-w-fit rounded-md bg-white p-3 shadow-xl shadow-indigo-500/40">
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
                <th className={basicTh}>代理服务器</th>
                <td className={basicTd}>gate7.rola.info </td>
                <th className={`border-l border-slate-800/50 ${basicTh}`}>端口</th>
                <td className={basicTd}>2029</td>
              </tr>
              <tr>
                <th className={basicTh}>账号</th>
                <td className={basicTd}>{profile.proxyId}</td>
                <th className={`border-l border-slate-800/50 ${basicTh}`}>密码</th>
                <td className={basicTd}>{profile.proxyPwd}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-8 flex">
        <select className="block w-20 flex-1 rounded-md outline-none" onChange={(e) => selectCountryChangeHandler(e)}>
          <option value="ko">韩国</option>
          <option value="en">美国</option>
          <option value="jp">日本</option>
        </select>
        <button
          onClick={handleChangeCountryBtn}
          className={`${buttonBasic} ml-4 w-20 rounded-lg bg-violet-500/80 px-4 py-2 text-white shadow-lg shadow-indigo-500/40 transition-all duration-300 hover:bg-violet-600/80 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 `}
        >
          切换IP
        </button>
      </div>
    </div>
  )
})

export default Dashboard

Dashboard.displayName = 'Dashboard'
