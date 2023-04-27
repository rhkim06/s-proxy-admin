import React, { ChangeEvent, memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Input } from 'antd'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { fetchIpCheck } from '@/store/module/ip-check'
import { shallowEqual } from 'react-redux'

interface IProps {
  children?: ReactNode
}

const IpCheck: FC<IProps> = memo(() => {
  // store
  const dispatch = useAppDispatch()
  const { ipCheck } = useAppSelector((state) => {
    return {
      ipCheck: state.ipCheck
    }
  }, shallowEqual)
  const result = Object.entries(ipCheck)

  // states
  const [loadings, setLoadings] = useState<boolean[]>([])
  const [ip, setIp] = useState('')
  const enterLoading = async (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = true
      return newLoadings
    })
    await dispatch(fetchIpCheck(ip))
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = false
      return newLoadings
    })
  }
  // handerls
  const ipCheckInputHandler = (e: any) => {
    setIp(e.target.value)
  }
  return (
    <div className="flex flex-col items-center">
      <div className="show-data-box flex flex-col items-stretch">
        <Input onChange={(e) => ipCheckInputHandler(e)} />

        <Button className="mt-4" type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>
          开始检测
        </Button>
      </div>
      <h2
        className="mt-8
      "
      >
        检测结果
      </h2>
      <div className="mt-4 flex">
        {result.map((item, index) => {
          return (
            <div key={index} className="mr-4 rounded-md border border-indigo-900 p-3 shadow-xl shadow-indigo-900/30">
              <span className="" key={item[0]}>
                {item[0]}:
              </span>
              <span className="ml-2"> {item[1]}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
})

export default IpCheck

IpCheck.displayName = 'IpCheck'
