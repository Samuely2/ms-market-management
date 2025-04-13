import { useState } from 'react'

export default function ProductForm({ initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    price: initialData.price || '',
    quantity: initialData.quantity || '',
    image: initialData.image || '',
    status: initialData.status !== undefined ? initialData.status : true,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Nome</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-2">Preço (R$)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Quantidade</label>
          <input
            type="number"
            min="0"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Imagem (URL)</label>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
            className="mr-2"
          />
          <span>Produto ativo</span>
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
      >
        Salvar Produto
      </button>
    </form>
  )
}