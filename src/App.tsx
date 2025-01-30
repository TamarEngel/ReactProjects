import { RouterProvider } from 'react-router'
import './App.css'
import { myRouter } from './Router'

function App() {
  return (
    <>
    <div className="background-image"></div>
    <h2>Tasty Recipes for Every Occasion</h2>
     <RouterProvider router={myRouter}/>
    </>
  )
}
export default App
