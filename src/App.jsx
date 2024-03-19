
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Card from './components/Card'

function App() {
 

  return (
    <>
   <Routes>
     <Route path='/' element={<Home/>}></Route>
     <Route path='/card'element={<Card/>} ></Route>
     </Routes>
    </>
  )
}

export default App
