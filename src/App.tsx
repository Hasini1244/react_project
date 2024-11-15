
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Categories from './pages/Categories'

import Orders from './pages/orders/Orders'
import CreateOrder from './pages/orders/CreateOrder'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/auth/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Items from './pages/Items'


function App() { //parent
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/items" element={<Items />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/create" element={<CreateOrder />} />
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}





export default App