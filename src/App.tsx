import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* Tailwind CSS test element */}
      <div className="p-4 mb-4 bg-green-200 text-green-800 rounded shadow text-center">
        If you see this green box, Tailwind CSS is working!
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
