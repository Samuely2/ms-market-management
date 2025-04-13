import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts, toggleStatus } from '../services/productService'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error('Erro ao carregar produtos:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  const handleToggleStatus = async (id) => {
    try {
      await toggleStatus(id)
      setProducts(products.map(p => 
        p.id === id ? { ...p, status: !p.status } : p
      ))
    } catch (error) {
      console.error('Erro ao alterar status:', error)
    }
  }

  if (loading) return <div className="text-center py-8">Carregando...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Meus Produtos</h1>
        <Link
          to="/products/new"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Novo Produto
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            {product.image && (
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-40 object-cover mb-3 rounded"
              />
            )}
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                product.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {product.status ? 'Ativo' : 'Inativo'}
              </span>
            </div>
            <p className="text-gray-600 mt-1">R$ {product.price.toFixed(2)}</p>
            <p className="text-gray-500 text-sm">Estoque: {product.quantity}</p>
            
            <div className="flex justify-end space-x-2 mt-4">
              <Link
                to={`/products/${product.id}`}
                className="text-blue-600 hover:underline text-sm"
              >
                Detalhes
              </Link>
              <button
                onClick={() => handleToggleStatus(product.id)}
                className={`text-sm ${
                  product.status ? 'text-yellow-600' : 'text-green-600'
                } hover:underline`}
              >
                {product.status ? 'Inativar' : 'Ativar'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}