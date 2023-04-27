import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Result } from 'antd'
import { Navigate, useNavigate } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const Forbidden: FC<IProps> = memo(() => {
  // router
  const navigate = useNavigate()
  // handlers
  const backHomeButtonHandler = () => {}
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={() => navigate('/dashboard/ip-check')}>
          返回
        </Button>
      }
    />
  )
})

export default Forbidden

Forbidden.displayName = 'Forbidden'
