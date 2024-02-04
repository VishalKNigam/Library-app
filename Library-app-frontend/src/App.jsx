import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Pages/Navbar'
import Allroutes from './Pages/Allroutes'

function App() {

  return (
    <>
      <Navbar />
      <Allroutes />
    </>
  )
}

export default App