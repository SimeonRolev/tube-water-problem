import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [i1, seti1] = useState(15);
  const [i2, seti2] = useState(0);
  const [i3, seti3] = useState(0);
  const [c1, setc1] = useState(15);
  const [c2, setc2] = useState(9);
  const [c3, setc3] = useState(5);
  
  return (
    <div className='wrapper'>
      <input value={i1} onChange={seti1}></input>
      <input value={i2} onChange={seti2}></input>
      <input value={i3} onChange={seti3}></input>
      <input value={c1} onChange={setc1}></input>
      <input value={c2} onChange={setc2}></input>
      <input value={c3} onChange={setc3}></input>
    </div>
  )
}

export default App
