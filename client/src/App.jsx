
import { BrowserRouter as Router , Route , Routes} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Item from './pages/Item'
import AddItem from './pages/AddItem'
import AuthProvider from './context/AuthContext'
import { ToastContainer } from 'react-toastify'

import './App.css'

function App() {
  return(
    
    <Router>
      <AuthProvider>
        <ToastContainer/>
    <Routes>
    <Route path="/Login" element={<Login/>}/>
    <Route path="/SignUp" element={<Signup/>}/>
    <Route path="/" element={<Home/>}/>
    <Route path='/item' element={<Item/>}/>
    <Route path='/additem' element={<AddItem/>}/>
    </Routes>
    </AuthProvider>
  </Router>
  )
  
}

export default App
