import React, { Component, memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { inputBasic } from '@/components/common/input'
import appRequest from '@/request'
import { buttonBasic } from '@/components/common/button'
import { getAuth, login } from '@/service/auth'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { updateUser } from '@/store/module/user'
import { checkAuth } from '@/hooks/useAuth'
import { updateToken } from '@/store/module/auth'
import { Alert, Button, Input } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import Logo from '@assets/image/logo.png'

interface IProps {
  children?: ReactNode
}

const Login: FC<IProps> = memo(() => {
  // state
  const [isAuth, setIsAuth] = useState(false)
  const [wrongId, setWrongId] = useState(false)
  const [password, setPassword] = useState('')
  const [id, setId] = useState('')
  // effect
  useEffect(() => {
    getAuth().then((res) => {
      if (res) {
        setIsAuth(true)
      }
    })
  }, [])
  // store
  const dispatch = useAppDispatch()
  // navigate
  const navigate = useNavigate()

  // handlers
  const pwdChangeHandler = (e: any) => {
    setPassword(e.target.value)
  }
  const idChangeHandler = (e: any) => {
    setId(e.target.value)
  }
  const signInHandler = async () => {
    console.log(id, password)

    try {
      const { data } = await login({ id, password })
      if (data && data.codeStatus === 200) {
        dispatch(updateUser(data.data))
        navigate('/dashboard')
      } else {
        setWrongId(true)
      }
    } catch (error) {
      setWrongId(true)
    }
  }
  if (isAuth) {
    return <Navigate to="/dashboard" />
  } else {
    return (
      <div>
        <h1 className="mt-24 flex justify-center">
          <img className="w-20" src={Logo} alt="logo" />
        </h1>
        <div className="container mx-auto flex justify-center">
          <div className="mt-10 max-w-md px-4">
            <div className="flex w-full items-center">
              <span className="w-16 text-stone-900">账号: </span>
              <Input size="large" placeholder="请输入账号" value={id} onChange={(e) => idChangeHandler(e)} />
            </div>
            <div className="mt-2 flex items-center ">
              <span className="w-16 text-stone-900">密码: </span>
              <Input.Password
                size="large"
                value={password}
                placeholder="请输入密码"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                onChange={(e) => pwdChangeHandler(e)}
              />
            </div>
            <div className="mt-8">
              <Button type="primary" size="large" block onClick={signInHandler}>
                登陆
              </Button>
            </div>
            {wrongId && (
              <div className="mt-8">
                <Alert message="警告" description="账号或密码错误，请重新输入！" type="error" showIcon />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
})

export default Login

Login.displayName = 'Login'
