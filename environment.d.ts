declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_BASE_URL: string
      TIMEOUT: number
      REACT_APP_BASE_URL_ROLA_URL: string
    }
  }
}
export {}
