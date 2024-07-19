import { PollOptions, ReloadOptions } from '@inertiajs/core'
import { router } from '@inertiajs/vue3'
import { onMounted, onUnmounted } from 'vue'

export default function usePoll(
  interval: number,
  requestOptions: ReloadOptions = {},
  options: PollOptions = {
    keepAlive: false,
    autoStart: true,
  },
): {
  stop: VoidFunction
  start: VoidFunction
} {
  const { stop, start } = router.poll(interval, requestOptions, {
    ...options,
    autoStart: false,
  })

  onMounted(() => {
    if (options.autoStart) {
      start()
    }
  })

  onUnmounted(() => {
    stop()
  })

  return {
    stop,
    start,
  }
}