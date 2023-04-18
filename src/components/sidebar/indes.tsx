import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const Sidebar: FC<IProps> = memo(() => {
  return (
    <div className="fixed left-0 top-0 flex h-full w-52 flex-col items-center justify-center bg-violet-500/40  text-xl">
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
    </div>
  )
})

export default Sidebar

Sidebar.displayName = 'Sidebar'
