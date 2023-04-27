import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { fetchVerifyHistory } from '@/store/module/sms-a'
import { Table } from 'antd'

interface IProps {
  children?: ReactNode
}

const VerifyHistory: FC<IProps> = memo(() => {
  // state
  // store
  const dispatch = useAppDispatch()
  const { verifyHistory, userId } = useAppSelector((state) => {
    return {
      verifyHistory: state.smsA.verifyHistory,
      userId: state.user.user.id
    }
  })
  // useEffect
  useEffect(() => {
    dispatch(fetchVerifyHistory(userId))
  }, [])
  const columns = [
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time'
    },
    {
      title: '平台',
      dataIndex: ['smsManPrice', 'platform'],
      key: 'platform'
    },
    {
      title: '国家',
      dataIndex: ['smsManPrice', 'country'],
      key: 'country'
    },
    {
      title: '电话号码',
      dataIndex: 'phoneNumber',
      key: 'number'
    },
    {
      title: '费用',
      dataIndex: ['smsManPrice', 'price'],
      key: 'price',
      render: (text: any) => text + ' $'
    },
    {
      title: '验证码',
      dataIndex: 'code',
      key: 'code'
    }
  ]
  return (
    <div>
      <h2 className="mt-12 font-mono text-xl text-stone-900/60">获取历史</h2>
      <div className="show-data-box !w-full">
        <Table columns={columns} dataSource={verifyHistory} rowKey={(record) => record.create_time} />
      </div>
    </div>
  )
})

export default VerifyHistory

VerifyHistory.displayName = 'VerifyHistory'
