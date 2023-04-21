import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const BadRequest: FC<IProps> = memo(() => {
  return <div>BadRequest</div>
})

export default BadRequest

BadRequest.displayName = 'BadRequest'
