import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Dashboard: FC<IProps> = memo(() => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  )
})

export default Dashboard

Dashboard.displayName = 'Dashboard'
