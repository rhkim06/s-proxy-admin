import React, { FunctionComponentElement, memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { checkAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { useAppDispatch } from '@/hooks/store'
import { updateUser } from '@/store/module/user'
import { updateToken } from '@/store/module/auth'
import { getAuth } from '@/service/auth'

interface IProps {
  children?: ReactNode
}

const ProtectedRoute: FC<IProps> = memo(({ children }) => {
  const [result, setResult] = useState<ReactNode>(null)
  const dispatch = useAppDispatch()
  getAuth()
    .then(async (res) => {
      if (res.data.message === 'token verified') {
        dispatch(updateUser(res.data.data.user))
        setResult(children)
      }
    })
    .catch((err) => {
      setResult(<Navigate to="/login" />)
    })
  return <>{result}</>
})

export default ProtectedRoute

ProtectedRoute.displayName = 'ProtectedRoute'
