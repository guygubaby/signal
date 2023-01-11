import { expect, it, vi } from 'vitest'
import { computed, createEffect, createSignal } from '../src/index'

it('should signal works', () => {
  const s = createSignal(1)

  const fn1 = vi.fn()

  const dispose = createEffect(() => {
    fn1(s.value)
  })

  s.value++

  expect(fn1).toBeCalledTimes(2)
  expect(fn1).toHaveBeenNthCalledWith(1, 1)
  expect(fn1).toHaveBeenNthCalledWith(2, 2)

  expect(s.value).toBe(2)
  expect(s.peek()).toBe(2)

  dispose()

  s.value++
  expect(fn1).toBeCalledTimes(2)
})

it('should computed works', () => {
  const signal1 = createSignal(1)
  const signal2 = createSignal(2)

  const sum = computed(() => signal1.value + signal2.value)
  expect(sum.value).toBe(3)

  signal1.value++
  expect(sum.value).toBe(4)

  sum.dispose()
  signal2.value++
  expect(sum.value).toBe(4)
})
