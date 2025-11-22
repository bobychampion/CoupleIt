import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import Button from '../components/Button';
import { Category, FinishColor, Material, Product } from '../types';

const Admin: React.FC = () => {
  const { addProduct, products } = useStore();
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    basePrice: 0,
    imageUrl: '',
    availableMaterials: [],
    availableColors: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.basePrice) return;

    const product: Product = {
      id: `p${Date.now()}`,
      name: newProduct.name!,
      description: newProduct.description || '',
      category: newProduct.category || Category.LIVING_ROOM,
      basePrice: Number(newProduct.basePrice),
      baseDimensions: { width: 100, height: 100, depth: 50 }, // Default
      imageUrl: newProduct.imageUrl || 'https://picsum.photos/600/400',
      availableMaterials: [Material.MDF, Material.PLYWOOD], // Default set
      availableColors: [FinishColor.NATURAL, FinishColor.WHITE], // Default set
    };

    addProduct(product);
    alert('Product Added!');
    setNewProduct({ name: '', description: '', basePrice: 0, imageUrl: '' });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Add Product Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
          <h2 className="text-xl font-bold mb-4">Add New Template</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700">Template Name</label>
              <input 
                type="text" 
                className="mt-1 block w-full rounded-md border border-stone-300 p-2"
                value={newProduct.name}
                onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700">Description</label>
              <textarea 
                className="mt-1 block w-full rounded-md border border-stone-300 p-2"
                value={newProduct.description}
                onChange={e => setNewProduct({...newProduct, description: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700">Category</label>
              <select 
                 className="mt-1 block w-full rounded-md border border-stone-300 p-2"
                 onChange={e => setNewProduct({...newProduct, category: e.target.value as Category})}
              >
                 {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700">Base Price (₦)</label>
              <input 
                type="number" 
                className="mt-1 block w-full rounded-md border border-stone-300 p-2"
                value={newProduct.basePrice}
                onChange={e => setNewProduct({...newProduct, basePrice: Number(e.target.value)})}
                required
              />
            </div>
             <div>
              <label className="block text-sm font-medium text-stone-700">Image URL</label>
              <input 
                type="text" 
                placeholder="https://..."
                className="mt-1 block w-full rounded-md border border-stone-300 p-2"
                value={newProduct.imageUrl}
                onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})}
              />
            </div>
            <Button type="submit" fullWidth>Publish Template</Button>
          </form>
        </div>

        {/* Existing Inventory List */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
          <h2 className="text-xl font-bold mb-4">Current Inventory ({products.length})</h2>
          <div className="max-h-[500px] overflow-y-auto space-y-3 pr-2">
             {products.map(p => (
               <div key={p.id} className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg">
                  <img src={p.imageUrl} alt="" className="h-10 w-10 rounded object-cover" />
                  <div>
                    <p className="font-bold text-sm">{p.name}</p>
                    <p className="text-xs text-stone-500">{p.category} - ₦{p.basePrice.toLocaleString()}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
