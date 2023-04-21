import { Country } from '@/types/ip'
import appReqest from '@/request'

export const getPlatformPriceByCountry = (country: Country) => {
  return appReqest.get<any>('sms-a-price', {
    params: {
      country
    }
  })
}

export const getPhoneNumber = (platformId: number, countryId: number) => {
  return appReqest.post<any>('sms-a/phone-number', { platformId, countryId })
}

export const getVerifyCode = (requestId: number) => {
  return appReqest.post<any>('sms-a/code', { requestId })
}

export const createSmsA = async (payload: any) => {
  const { country_id, application_id, number, userId, code } = payload
  const { data } = await appReqest.get<any>('sms-a-price/id', {
    params: {
      country_id,
      application_id
    }
  })
  return appReqest.post<any>('sms-a', {
    smsManPriceId: data.id,
    userId,
    phoneNumber: number,
    code
  })
}

export const getVefiryHistory = async (userId: number) => {
  return await appReqest.get<any>(`sms-a/${userId}`)
}
