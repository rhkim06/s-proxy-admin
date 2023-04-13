import React, { FunctionComponentElement, memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { checkAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { getProfile } from '@/service/dashboard'
import { useAppDispatch } from '@/hooks/store'
import { updateUser } from '@/store/module/user'

interface IProps {
  children?: ReactNode
}

const ProtectedRoute: FC<IProps> = memo(({ children }) => {
  const [result, setResult] = useState<ReactNode>(null)
  const dispatch = useAppDispatch()
  checkAuth().then(async (res) => {
    console.log(res, 'res')

    if (res) {
      const result = await getProfile(res.data.data.name)
      dispatch(updateUser(result.data))
      setResult(children)
    } else {
      setResult(<Navigate to="/login" />)
    }
  })
  return <>{result}</>
})

export default ProtectedRoute

ProtectedRoute.displayName = 'ProtectedRoute'
