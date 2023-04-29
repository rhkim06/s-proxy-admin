import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '@assets/image/logo.png'
import { useAppSelector } from '@/hooks/store'
import { shallowEqual } from 'react-redux'

interface IProps {
  children?: ReactNode
}

const Sidebar: FC<IProps> = memo(() => {
  // store
  const { roles } = useAppSelector((state) => {
    return {
      roles: state.user.user.roles
    }
  }, shallowEqual)
  return (
    <div className="fixed left-0 top-0 flex h-full w-52 flex-col items-center justify-center bg-indigo-500/40  text-xl">
      <h1 className="absolute left-0 top-0 flex h-20 w-full items-center justify-center bg-stone-700">
        <img className="w-20" src={Logo} alt="logo" />
      </h1>
      <div className="w-full cursor-pointer text-center ">
        <NavLink className="block  p-2 hover:bg-indigo-200/70" to="/dashboard/ip-check">
          IP 检测
        </NavLink>
      </div>
      {roles.includes('admin') && (
        <>
          <div className="w-full cursor-pointer text-center ">
            <NavLink className="block  p-2 hover:bg-indigo-200/70" to="/dashboard/dynamic-ip">
              动态 IP
            </NavLink>
          </div>
          <div className="w-full cursor-pointer text-center ">
            <NavLink className="block  p-2 hover:bg-indigo-200/70" to="/dashboard/static-ip">
              静态 IP
            </NavLink>
          </div>
          <div className="w-full cursor-pointer text-center ">
            <NavLink className="block  p-2 hover:bg-indigo-200/70" to="/dashboard/sms-a">
              验证码
            </NavLink>
          </div>
          <div className="w-full cursor-pointer text-center ">
            <NavLink className="block  p-2 hover:bg-indigo-200/70" to="/dashboard/mail-service">
              邮件服务
            </NavLink>
          </div>
          <div className="w-full cursor-pointer text-center ">
            <NavLink className="block  p-2 hover:bg-indigo-200/70" to="/dashboard/image-server">
              图片服务
            </NavLink>
          </div>
        </>
      )}
    </div>
  )
})

export default Sidebar

Sidebar.displayName = 'Sidebar'
