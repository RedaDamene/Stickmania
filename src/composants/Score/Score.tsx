import { useState } from 'react'
import './score_module.css'

function Score() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <label onClick={() => setCount((count) => count + 1)}>
            Score : {count}
        </label>
      </div>
    </>
  )
}

export default Score
