
import { BrowserRouter as Router , Route , Routes} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Item from './pages/Item'
import AddItem from './pages/AddItem'
import AuthProvider from './context/AuthContext'
import { ToastContainer } from 'react-toastify'
import { UserProvider } from './context/UserContext'
import Cart from './pages/Cart'

import './App.css'

function App() {
  return(
    
    <Router>
      <AuthProvider>
        <UserProvider>
        <ToastContainer/>
    <Routes>
    <Route path="/Login" element={<Login/>}/>
    <Route path="/SignUp" element={<Signup/>}/>
    <Route path="/" element={<Home/>}/>
    <Route path='/item' element={<Item/>}/>
    <Route path='/additem' element={<AddItem/>}/>
    <Route path="/Cart" element={<Cart/>}></Route>
    </Routes>
    </UserProvider>
    </AuthProvider>
  </Router>
  )
  
}

export default App
