import { useNavigate, Link } from 'react-router-dom'
import { createProduct } from '../services/productService'
import ProductForm from '../components/ProductForm'
import Header from '../components/Header';
import '../styles/products.css'; 


export default function NewProduct() {
  const navigate = useNavigate()

  const handleSubmit = async (productData) => {
    try {
      await createProduct(productData)
      navigate('/products')
    } catch (error) {
      console.error('Erro ao criar produto:', error)
    }
  }

  return (
    <>
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Novo Produto</h1>
        <Link to="/products" className="detail-btn">
          Voltar
        </Link>
        <div className="products-actions">
      </div>
        <ProductForm onSubmit={handleSubmit} />
      </div>
    </>
  );
}