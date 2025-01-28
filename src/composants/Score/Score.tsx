import { useState } from 'react'
import './Score.css'

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
