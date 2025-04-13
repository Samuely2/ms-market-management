import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Products from '../pages/Products'
import ProductDetail from '../pages/ProductDetail'
import NewProduct from '../pages/NewProduct'
import { AuthProvider } from '../contexts/AuthContext'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/new" element={<NewProduct />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}