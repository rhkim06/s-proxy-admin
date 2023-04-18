import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import Sidebar from '@/components/sidebar/indes'
import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { fetchStaticIpList } from '@/store/module/staticIp'
import { fetchDynamicIpInfo } from '@/store/module/dynamicIp'
import { shallowEqual } from 'react-redux'

interface IProps {
  children?: ReactNode
}

const Dashboard: FC<IProps> = memo(() => {
  // store
  const diapatch = useAppDispatch()
  const { id } = useAppSelector((state) => {
    return {
      id: state.user.user.id
    }
  }, shallowEqual)
  // effect
  useEffect(() => {
    diapatch(fetchStaticIpList({ id }))
    diapatch(fetchDynamicIpInfo(id))
  }, [])
  return (
    <div className="pl-52">
      <Sidebar />
      <h1 className="mt-24 text-center font-mono text-2xl font-bold text-indigo-500/60">JX-科技</h1>
      <div className="px-6 pb-32 pt-12 ">
        <Outlet />
      </div>
    </div>
  )
})

export default Dashboard

Dashboard.displayName = 'Dashboard'
