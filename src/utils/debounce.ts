import { logInfo } from '../logger'

/**
 * Debounce Function Utility
 * Params: Callback, WaitTime
 */
export function debounceFunction(callback: (...args: any[]) => void, waitTime: number) {
  let timeoutHandler: ReturnType<typeof setTimeout> | null = null
  return function (...contextArgs: any[]) {
    if (timeoutHandler !== null) {
      clearTimeout(timeoutHandler)
    }
    timeoutHandler = setTimeout(function () {
      callback.apply(null, contextArgs)
      timeoutHandler = null
    }, waitTime)
  }
}