import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import Sidebar from '@/components/sidebar/indes'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { fetchStaticIpList } from '@/store/module/staticIp'
import { fetchDynamicIpInfo } from '@/store/module/dynamicIp'
import { shallowEqual } from 'react-redux'
import { fetchUser, updateRoles } from '@/store/module/user'

interface IProps {
  children?: ReactNode
}

const Dashboard: FC<IProps> = memo(() => {
  // store
  const dispatch = useAppDispatch()
  const { roles, userId, username } = useAppSelector((state) => {
    return {
      roles: state.user.user.roles,
      userId: state.user.user.id,
      username: state.user.user.name
    }
  }, shallowEqual)
  // effect
  useEffect(() => {
    roles.includes('admin') && dispatch(fetchStaticIpList({ userId }))
    roles.includes('admin') && dispatch(fetchDynamicIpInfo(userId))
    dispatch(fetchUser(userId))
  }, [userId])
  // router
  const navigate = useNavigate()
  // handers
  const signOutHandler = () => {
    localStorage.setItem('access_token', '')
    dispatch(updateRoles({ id: 0, roles: [] }))
    navigate('/login')
  }
  return (
    <div className="pl-52">
      <Sidebar />
      <h1 className="mt-6 text-center font-mono text-2xl font-bold text-blue-500">JX-科技</h1>
      <div className="px-6 pb-32 pt-12">
        <Outlet />
      </div>
      <div className="absolute right-6 top-6">
        <span className="text-lg text-blue-500">
          用户名：<span className="font-mono">{username}</span>
          <span className="ml-4 cursor-pointer underline hover:text-black" onClick={signOutHandler}>
            登出
          </span>
        </span>
      </div>
    </div>
  )
})

export default Dashboard

Dashboard.displayName = 'Dashboard'
