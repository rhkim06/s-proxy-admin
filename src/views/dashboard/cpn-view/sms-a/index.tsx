import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { fetchPhoneNumber, fetchPlatformPrice, fetchVerifyCode } from '@/store/module/sms-a'
import { shallowEqual } from 'react-redux'
import flagUs from '@assets/image/flag-us.svg'
import flagIn from '@assets/image/flag-in.svg'
import { Radio } from 'antd'
import { Country } from '@/types/ip'
import iconfacebook from '@assets/image/icon-facebook.avif'
import iconinstagram from '@assets/image/icon-instagram.avif'
import Paragraph from 'antd/es/typography/Paragraph'
import { createSmsA } from '@/service/sms-a'
import VerifyHistory from './cpn/verify-history'

interface IProps {
  children?: ReactNode
}

const SmsA: FC<IProps> = memo(() => {
  // data
  type CountryObj = {
    label: Country
    icon: any
    name: string
    code: number
  }
  const coutryList: CountryObj[] = [
    { label: 'us', icon: flagUs, name: '美国', code: 5 },
    { label: 'in', icon: flagIn, name: '印度', code: 14 }
  ]
  // state
  const [country, setCountry] = useState(coutryList[0])
  const [requestId, setRequestId] = useState(0)
  const [phoneNumberLoading, setPhoneNumberLoading] = useState(false)
  const [phoneNumberErrorMsg, setPhoneNumberErrorMsg] = useState('')
  const [code, setCode] = useState('')
  const [codeNumberLoading, setCodeNumberLoading] = useState(false)
  // store
  const dispatch = useAppDispatch()
  const { platformPrices, phoneNumber, verifyRes, userId } = useAppSelector((state) => {
    return {
      userId: state.user.user.id,
      platformPrices: state.smsA.platformPrices,
      phoneNumber: state.smsA.phoneNumber,
      verifyRes: state.smsA.verifyRes
    }
  }, shallowEqual)
  useEffect(() => {
    dispatch(fetchPlatformPrice(country.label))
  }, [country])

  useEffect(() => {
    if (verifyRes.sms_code) {
      // if (true) {
      const code = verifyRes.sms_code.split(' ').join('')
      setCode(code)
      createSmsA({ ...verifyRes, userId, number: phoneNumber.number, code })
        .then((res) => {
          return res
        })
        .catch((err) => {})
    } else if (verifyRes.error_msg) {
      setCode('暂未收到验证码，请重新确认验证码。')
    } else {
      setCode('')
    }
  }, [verifyRes])
  useEffect(() => {
    if (phoneNumber.number) {
      setRequestId(phoneNumber.request_id)
      setPhoneNumberErrorMsg('')
    } else {
      setPhoneNumberErrorMsg(phoneNumber.error_msg)
    }
  }, [phoneNumber])
  // handers
  const countryClickHandler = (item: any) => {
    setCountry(item)
  }

  const getPhoneNumberHandler = async (platformId: number) => {
    setPhoneNumberLoading(true)
    await dispatch(fetchPhoneNumber({ platformId, countryId: country.code }))
    setPhoneNumberLoading(false)
  }
  const getVerifyCode = async () => {
    if (Object.keys(phoneNumber).length < 0 || phoneNumberLoading || requestId === undefined || 0) {
      return
    } else {
      setCodeNumberLoading(true)
      setCode('正在确认验证码...')
      await dispatch(fetchVerifyCode(requestId))
      setCodeNumberLoading(false)
    }
  }
  return (
    <div className="m-auto w-[80%]">
      <h2 className="font-mono text-xl text-stone-900/60">1. 请选择国家</h2>
      <div className="section flex">
        {coutryList.map((item) => {
          return (
            <label className="mr-6" key={item.label}>
              <input className="hidden" type="radio" name="country" onClick={() => countryClickHandler(item)} />
              <div
                className={`show-data-box select box-border flex !w-fit cursor-pointer items-center border-2  ${
                  country.label === item.label ? 'border-indigo-500/90' : 'border-indigo-500/40 !shadow-none'
                }`}
              >
                <img width="23" src={item.icon} alt="us" />
                <span className="ml-4">{item.name}</span>
              </div>
            </label>
          )
        })}
      </div>
      <h2 className="mt-12 font-mono text-xl text-stone-900/60">2. 请选择平台</h2>
      <div className="section flex">
        {platformPrices.map((item) => {
          return (
            <div key={item.platform} className="show-data-box relative mr-20 !w-full last:mr-0">
              {(phoneNumberLoading || codeNumberLoading) && (
                <div className="absolute left-0 top-0 flex h-full w-full cursor-not-allowed items-center justify-center rounded-md bg-black opacity-30">
                  <span className="text-indigo-100">请稍等...</span>
                </div>
              )}
              <div className="flex  items-center justify-between ">
                <div className="flex items-center">
                  <span className={`block h-6 w-6 ${item.platform}`}></span>
                  <span className="ml-4">{item.platform}</span>
                </div>
                <span>{item.price} $</span>
              </div>
              <button
                className="basic-button !ml-0 mt-3 !w-full"
                onClick={(e) => getPhoneNumberHandler(item.platformId)}
              >
                获取手机号
              </button>
            </div>
          )
        })}
      </div>
      <h2 className="mt-12 font-mono text-xl text-stone-900/60">3. 确认验证码</h2>
      <div className="show-data-box !w-full">
        <div className="flex items-center">
          <span className="flex w-60 items-center">
            <span>手机号码：</span>
            {phoneNumberErrorMsg}
            <span className="text-stone-500">
              {Object.keys(phoneNumber).length < 1 && !phoneNumberLoading ? (
                '请先获取手机号码'
              ) : phoneNumberLoading ? (
                '正在获取...'
              ) : (
                <Paragraph copyable className="!mb-0">
                  {`+${phoneNumber.number}`}
                </Paragraph>
              )}
            </span>
            {phoneNumberLoading}
          </span>
          <div className="relative">
            {(phoneNumberLoading || codeNumberLoading) && (
              <div className="absolute left-0 top-0 h-full w-full cursor-not-allowed rounded-md bg-black opacity-30"></div>
            )}
            <button className="basic-button !ml-0" onClick={getVerifyCode}>
              确认验证码
            </button>
          </div>
          <span className="ml-4">验证码：</span>
          {code === '' ? (
            <span className="text-stone-500">请确认验证码</span>
          ) : (
            <Paragraph copyable className="!mb-0 ml-4">
              {code}
            </Paragraph>
          )}
        </div>
      </div>
      <VerifyHistory />
    </div>
  )
})

export default SmsA

SmsA.displayName = 'SmsA'
