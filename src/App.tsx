
import { RouterProvider } from 'react-router-dom'
import './App.css'
import UserProvider from './components/UserProvider'
import { myRouter } from './Router'

function App() {
  

  return (
    <>
    <h2>Home</h2>
     <UserProvider />
     <RouterProvider router={myRouter}/>
    </>
  )
}

export default App
