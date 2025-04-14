import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import NewProduct from './pages/NewProduct';
import EditProduct from './pages/EditProduct';
import ActivateAccount from './pages/ActivateAccount';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/layout.css';
import './styles/auth.css';
import './styles/products.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activate" element={<ActivateAccount />} />
        
        {/* Rotas protegidas */}
        <Route path="/products" element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        } />
        
        <Route path="/products/new" element={
          <ProtectedRoute>
            <NewProduct />
          </ProtectedRoute>
        } />
        
        <Route path="/products/:id" element={
          <ProtectedRoute>
            <ProductDetail />
          </ProtectedRoute>
        } />
        
        <Route path="/products/:id/edit" element={
          <ProtectedRoute>
            <EditProduct />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;