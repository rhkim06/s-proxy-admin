export function useLocalStorage(key: string) {
  return window.localStorage.getItem(key)
}
