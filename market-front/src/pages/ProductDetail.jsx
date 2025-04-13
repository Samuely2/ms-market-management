import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProduct } from '../services/productService'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProduct(id)
        setProduct(data)
      } catch (error) {
        console.error('Erro ao carregar produto:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [id])

  if (loading) return <div className="text-center py-8">Carregando...</div>
  if (!product) return <div className="text-center py-8">Produto não encontrado</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {product.image && (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <span className={`px-3 py-1 rounded-full text-sm ${
              product.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {product.status ? 'Ativo' : 'Inativo'}
            </span>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-gray-500">Preço</h3>
              <p className="text-xl font-semibold">R$ {product.price.toFixed(2)}</p>
            </div>
            <div>
              <h3 className="text-gray-500">Estoque</h3>
              <p className="text-xl font-semibold">{product.quantity}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-gray-500">Cadastrado em</h3>
            <p>{new Date(product.created_at).toLocaleDateString()}</p>
          </div>

          <div className="mt-6 flex space-x-4">
            <Link
              to={`/products/${product.id}/edit`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Editar
            </Link>
            <Link
              to="/products"
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              Voltar
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}