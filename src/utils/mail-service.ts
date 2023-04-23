export const checkEmailType = (email: string) => {
  const res = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)
  return res
}
