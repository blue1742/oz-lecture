import useCounterStore from '../store/counterStore'

function Counter() {
  const { count, increase, decrease, reset } = useCounterStore()

  return (
    <div>
      <h2>카운터: {count}</h2>
      <button onClick={increase}>+1</button>
      <button onClick={decrease}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default Counter
