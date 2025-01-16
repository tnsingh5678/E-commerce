import { BrowserRouter as Router , Route , Routes} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Item from './pages/Item'
import AddItem from './pages/AddItem'
import AuthProvider from './context/AuthContext'
import { ToastContainer } from 'react-toastify'
import { UserProvider } from './context/UserContext'
import Payment from './pages/Payment'
import User from './pages/User'
import ProtectedRoute from './components/Protected'
import Cart from './components/Cart'

import './App.css'
import Purchase from './pages/Purchase'

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
    <Route path="/item" element={<Item/>}/>
    <Route path="/additem" element={<AddItem/>}/>
    <Route path="/payment" element={<Payment/>}/>
    <Route path="/purchase" element={<Purchase/>}/>
    <Route path="/Cart" element={<Cart/>}></Route>
    <Route
          path="/"
          element={<ProtectedRoute element={Home} />}
        />
        <Route
          path="/item"
          element={<ProtectedRoute element={Item} />}
        />
        <Route
          path="/additem"
          element={<ProtectedRoute element={AddItem} />}
        />
        <Route
          path="/Payment"
          element={<ProtectedRoute element={Payment} />}
        />
        <Route
          path="/User"
          element={<ProtectedRoute element={User} />}
        />
    {/* <Route path='/purchase' element={<Purchase/>}></Route> */}
    <Route
          path="/purchase"
          element={<ProtectedRoute element={Purchase} />}
        />    
    </Routes>
    
    </UserProvider>
    </AuthProvider>
  </Router>
  )
  
}

export default App
