# @bryce-loskie/signal

[![NPM version](https://img.shields.io/npm/v/@bryce-loskie/signal?color=a1b858&label=)](https://www.npmjs.com/package/@bryce-loskie/signal)

## Get Started

```bash
pnpm i @bryce-loskie/signal
```

## Usage

```ts
import { computed, createEffect, createSignal } from '@bryce-loskie/signal'

function setupCounter(element: HTMLButtonElement) {
  const counter = createSignal(0)
  const double = computed(() => counter.value * 2)

  createEffect(() => {
    element.innerHTML = `count is ${counter.value}, double is ${double.value}`
  })

  element.addEventListener('click', () => {
    counter.value++
  })
}
```

## License

[MIT](./LICENSE) License © 2023 [guygubaby](https://github.com/guygubaby)
