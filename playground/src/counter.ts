import { computed, createEffect, createSignal } from '../../src/index'

export function setupCounter(element: HTMLButtonElement) {
  const counter = createSignal(0)
  const double = computed(() => counter.value * 2)

  const setCounter = () => {
    element.innerHTML = `count is ${counter.value}, double is ${double.value}`
  }

  createEffect(setCounter)

  element.addEventListener('click', () => {
    counter.value++
  })
}
