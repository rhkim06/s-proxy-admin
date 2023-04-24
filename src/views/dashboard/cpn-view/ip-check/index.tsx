import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Input } from 'antd'

interface IProps {
  children?: ReactNode
}

const IpCheck: FC<IProps> = memo(() => {
  // states
  const [loadings, setLoadings] = useState<boolean[]>([])

  const enterLoading = async (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = true
      return newLoadings
    })
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings]
        newLoadings[index] = false
        return newLoadings
      })
    }, 500)
  }
  return (
    <div className="flex flex-col items-center">
      <div className="show-data-box flex flex-col items-stretch">
        <Input />

        <Button className="mt-4" type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>
          开始检测
        </Button>
      </div>
    </div>
  )
})

export default IpCheck

IpCheck.displayName = 'IpCheck'
