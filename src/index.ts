type Fn<T = any> = () => T

function noop() {}

const effects: Fn[] = [noop]
const disposed = new WeakSet<Fn>()

class Signal<T = any> {
  #value: T
  #effects = new Set<Fn>()

  constructor(value: T = undefined as any) {
    this.#value = value
  }

  get value() {
    this.#effects.add(effects.at(-1)!)
    return this.#value
  }

  set value(value: T) {
    if (this.#value !== value) {
      this.#value = value
      for (const effect of this.#effects) {
        if (disposed.has(effect))
          this.#effects.delete(effect)
        else
          effect()
      }
    }
  }

  peek() {
    return this.#value
  }

  toString() {
    return String(this.value)
  }

  valueOf() {
    return this.value
  }
}

export const createSignal = <T = any>(value: T) => new Signal(value)

export const createEffect = (fn: Fn) => {
  effects.push(fn)
  try {
    fn()
    return () => {
      disposed.add(fn)
    }
  }
  finally {
    effects.pop()
  }
}

export const computed = <T = any>(fn: Fn<T>) => {
  const signal = new Signal()

  const dispose = createEffect(() => {
    signal.value = fn() as any
  })

  return Object.assign(signal, { dispose })
}
