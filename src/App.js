import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ReservationPage from './pages/ReservationPage'
import NavBar from'./components/NavBar'
import CategoriesContext from './context'
import { useState } from 'react'

function App() {
  const [categories, setCategories] = useState(null)
  const value = {categories,setCategories}
  return (
    <div className="App">
      <CategoriesContext.Provider value = {value}>
      <BrowserRouter>
      <NavBar/>
      <Routes>

      <Route path='/' element={<Dashboard/>}/>        
      <Route path='/reservation' element={<ReservationPage/>}/>
      <Route path='/reservation/:id' element={<ReservationPage editMode={true}/>}/>

      </Routes>
      </BrowserRouter>
      </CategoriesContext.Provider>
    </div>
  );
}

export default App;
