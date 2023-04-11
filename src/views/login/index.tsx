import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Login: FC<IProps> = memo(() => {
  return <div className="container mx-auto flex px-4"></div>
})

export default Login

Login.displayName = 'Login'
