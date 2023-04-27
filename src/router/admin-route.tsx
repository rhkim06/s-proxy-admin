import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { useAppSelector } from '@/hooks/store'
import { shallowEqual } from 'react-redux'
import Forbidden from '@/views/error/403'

interface IProps {
  children?: ReactNode
}

const AdminRoute: FC<IProps> = memo(({ children }) => {
  // store
  const { roles } = useAppSelector((state) => {
    return {
      roles: state.user.user.roles
    }
  }, shallowEqual)
  if (!roles.includes('admin')) {
    return <Forbidden />
  }
  return <div>{children}</div>
})

export default AdminRoute

AdminRoute.displayName = 'AdminRoute'
