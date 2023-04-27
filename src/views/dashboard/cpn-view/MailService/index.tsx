import React, { ChangeEvent, EventHandler, memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Input, InputProps, InputRef, Select, Table, Typography } from 'antd'
import { Option } from 'antd/es/mentions'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { addMailServerData, getUnreadMail } from '@/service/main-service'
import { checkEmailType } from '@/utils/mail-service'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { fetchMailServer } from '@/store/module/mail-server'
import { shallowEqual } from 'react-redux'
import { DataType } from './table-data'
import { ColumnsType } from 'antd/es/table'
interface IProps {
  children?: ReactNode
}
type InputStatus = '' | 'error' | 'warning'
const MailService: FC<IProps> = memo(() => {
  // store
  const { userId, mailServer } = useAppSelector((state) => {
    return {
      userId: state.user.user.id,
      mailServer: state.mailServer.mailServer
    }
  }, shallowEqual)
  const dispatch = useAppDispatch()
  // state
  const [loadings, setLoadings] = useState<boolean[]>([])
  const [passwordInputStatus, setPasswordInputStatus] = useState<InputStatus>('')
  const [emailAddressInputStatus, setEmailAddressInputStatus] = useState<InputStatus>('')
  const [info, setInfo] = useState('')
  const [password, setPassword] = useState('')
  const [emailAddress, setEmailAddress] = useState('')

  // ref
  // const password = useRef<InputRef>(null)
  // const emailAddress = useRef<InputRef>(null)

  // useEffect
  useEffect(() => {
    dispatch(fetchMailServer(userId))
  }, [])
  // button
  const enterLoading = async (index: number) => {
    if (password === '') {
      setPasswordInputStatus('error')
    } else {
      setPasswordInputStatus('')
    }
    if (emailAddress === '') {
      setEmailAddressInputStatus('error')
    } else {
      setEmailAddressInputStatus('')
    }
    if (password === '' || emailAddress === '') return
    const isValidEmail = checkEmailType(emailAddress)
    if (!isValidEmail) {
      setPasswordInputStatus('error')
      return
    }
    setPasswordInputStatus('')
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = true
      return newLoadings
    })
    const payload = {
      emailAddress,
      password
    }
    const { data } = await getUnreadMail({ ...payload, type: 'outlook' })
    if (typeof data === 'string' && data.length > 0) {
      setInfo(data)
    } else {
      const res = await addMailServerData({
        userId,
        code: data.map((item: any) => item.split(':')[0]).join(','),
        ...payload
      })
      setInfo('获取成功，数据在下方！')
      dispatch(fetchMailServer(userId))
    }
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = false
      return newLoadings
    })
  }
  // handlers
  const passwordChangeHandler = (e: any) => {
    setPassword(e.target.value)
  }
  const emailAddressChangeHandler = (e: any) => {
    setEmailAddress(e.target.value)
  }
  const columns: ColumnsType<DataType> = [
    {
      title: '创建时间',
      dataIndex: 'mailServer_create_time',
      key: 'create_time'
    },
    {
      title: '邮箱',
      dataIndex: 'mailServer_emailAddress',
      key: 'emailAddress'
    },
    {
      title: '密码',
      dataIndex: 'mailServer_password',
      key: 'password'
    },
    {
      title: '验证码',
      dataIndex: 'mailServer_code',
      key: 'code'
    }
  ]
  return (
    <div className="flex flex-col items-center">
      <div className="show-data-box flex flex-col items-stretch">
        <div className="flex items-center">
          <span className="w-20">邮箱：</span>
          <Input
            status={emailAddressInputStatus}
            onChange={(e) => emailAddressChangeHandler(e)}
            placeholder="请输入邮箱账号"
          />

          {/* <Typography.Paragraph copyable>AFYBYzlv700280@outlook.com</Typography.Paragraph> */}
        </div>
        {passwordInputStatus !== '' && (
          <Typography.Text className="ml-20" type="danger">
            邮箱格式错误！
          </Typography.Text>
        )}
        <div className="mt-4 flex items-center">
          <span className="w-20">密码：</span>
          <Input.Password
            status={passwordInputStatus}
            onChange={(e) => passwordChangeHandler(e)}
            placeholder="请输入邮箱密码"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
          {/* <Typography.Paragraph copyable>ZmGMr816835</Typography.Paragraph> */}
        </div>
        <Button className="mt-4" type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>
          获取邮件
        </Button>

        <Typography.Text className="mt-4 flex justify-center" mark>
          {info}
        </Typography.Text>
      </div>

      <div className="show-data-box mt-12">
        <Table dataSource={mailServer} columns={columns} rowKey={(record) => record.mailServer_create_time} />
      </div>
    </div>
  )
})

export default MailService

MailService.displayName = 'MailService'
