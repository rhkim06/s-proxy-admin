import React, { FunctionComponentElement, memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { checkAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { updateRoles } from '@/store/module/user'
import { getAuth } from '@/service/auth'
import { shallowEqual } from 'react-redux'

interface IProps {
  children?: ReactNode
}

const ProtectedRoute: FC<IProps> = memo(({ children }) => {
  const [result, setResult] = useState<ReactNode>(null)
  // store
  const dispatch = useAppDispatch()
  const { id, roles } = useAppSelector((state) => {
    return {
      id: state.user.user.id,
      roles: state.user.user.roles
    }
  }, shallowEqual)

  // if (id === 0 && roles.length <= 0) {
  //   // setResult(<Navigate to="/login" />)
  // } else {
  //   setResult(children)
  // }
  useEffect(() => {
    getAuth()
      .then(async (res) => {
        if (res.data.codeStatus === 200) {
          dispatch(updateRoles(res.data.data))
        }
      })
      .catch((err) => {
        return <Navigate to="/login" />
      })
  }, [])

  return <>{children}</>
})

export default ProtectedRoute

ProtectedRoute.displayName = 'ProtectedRoute'
