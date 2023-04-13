import React, { Component, memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { inputBasic } from '@/components/common/input'
import appRequest from '@/request'
import { buttonBasic } from '@/components/common/button'
import { getAuth, login } from '@/service/auth'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { updateUser } from '@/store/module/user'
import { getProfile } from '@/service/dashboard'
import { checkAuth } from '@/hooks/useAuth'

interface IProps {
  children?: ReactNode
}

const Login: FC<IProps> = memo(() => {
  const [isAuth, setIsAuth] = useState(false)
  useEffect(() => {
    checkAuth().then((res) => {
      if (res) {
        setIsAuth(true)
      }
    })
  })
  if (localStorage.getItem('access_token')) {
  }

  // store
  const dispatch = useAppDispatch()
  // navigate
  const navigate = useNavigate()
  // Refs
  const idRef = useRef<HTMLInputElement>(null)
  const pwRef = useRef<HTMLInputElement>(null)
  const signInHandler = async () => {
    const name = idRef.current!.value
    const password = pwRef.current!.value
    try {
      const { data } = await login({ name, password })
      if (data && data.codeStatus === 200) {
        window.localStorage.setItem('access_token', data.token!)
        navigate('/dashboard')
        const res = await getProfile(name)
        dispatch(updateUser(res.data))
      }
    } catch (error) {}
  }
  if (isAuth) {
    return <Navigate to="/dashboard" />
  } else {
    return (
      <div className="container mx-auto flex justify-center">
        <div className="mt-20 flex w-1/4 flex-col items-center justify-center px-4">
          <div className="flex items-center justify-center">
            <span className="w-8 text-blue-400">ID: </span>
            <input ref={idRef} type="text" className={`${inputBasic} ml-2`} />
          </div>
          <div className="mt-2 flex items-center justify-center">
            <span className="w-8 text-blue-400">PW: </span>
            <input ref={pwRef} type="text" className={`ml-2 ${inputBasic}`} />
          </div>
          <div onClick={signInHandler}>
            <button onClick={signInHandler} className={`${buttonBasic} mt-2 block`}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    )
  }
})

export default Login

Login.displayName = 'Login'
