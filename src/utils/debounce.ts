import { logInfo } from '../logger'

/**
 * Debounce Function Utility
 * Params: Callback, WaitTime
 */
export function debounceFunction(callback: (...args: any[]) => void, waitTime: number) {
  let timeoutHandler: ReturnType<typeof setTimeout>
  return function (...contextArgs: any[]) {
    logInfo('Debounce function called')
    if (timeoutHandler) {
      clearTimeout(timeoutHandler)
    }
    timeoutHandler = setTimeout(function () {
      callback.apply(null, contextArgs)
    }, waitTime)
  }
}