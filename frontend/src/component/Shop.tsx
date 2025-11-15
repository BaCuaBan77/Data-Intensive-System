import { useState, useMemo } from 'react';
import { Search } from '@mui/icons-material';

// Mock data based on the database schema
const mockShops = [
  { id: 1, type: 'premium', name: 'Elite Chess Store' },
  { id: 2, type: 'standard', name: 'Classic Chess Shop' }
];

const mockCategories = [
  { id: 1, title: 'Chess Pieces', description: 'Various chess piece designs and styles' },
  { id: 2, title: 'Chess Boards', description: 'Different board materials and designs' },
  { id: 3, title: 'Chess Clocks', description: 'Timers and clocks for chess games' },
  { id: 4, title: 'Chess Sets', description: 'Complete chess sets with pieces and board' },
  { id: 5, title: 'Chess Books', description: 'Educational and strategy books' },
  { id: 6, title: 'Chess Software', description: 'Digital chess programs and apps' },
  { id: 7, title: 'Chess Accessories', description: 'Additional chess-related items' },
  { id: 8, title: 'Chess Art', description: 'Artistic chess-themed decorations' },
  { id: 9, title: 'Chess Apparel', description: 'Clothing with chess themes' },
  { id: 10, title: 'Chess Jewelry', description: 'Chess-inspired jewelry pieces' }
];

const mockItems = [
  { id: 1, name: 'Royal King Piece', description: 'Premium gold-plated king piece', price: 299.99, picture: '/images/royal_king.jpg', status: 'available', category: 1, shop_id: 1, created_at: '2024-01-15 10:00:00' },
  { id: 2, name: 'Elite Queen Piece', description: 'Luxury silver queen piece', price: 249.99, picture: '/images/elite_queen.jpg', status: 'available', category: 1, shop_id: 2, created_at: '2024-01-15 11:00:00' },
  { id: 3, name: 'Classic Rook Set', description: 'Traditional wooden rook pieces', price: 89.99, picture: '/images/classic_rook.jpg', status: 'available', category: 1, shop_id: 1, created_at: '2024-01-15 12:00:00' },
  { id: 4, name: 'Modern Bishop Pair', description: 'Contemporary design bishops', price: 79.99, picture: '/images/modern_bishop.jpg', status: 'available', category: 1, shop_id: 2, created_at: '2024-01-15 13:00:00' },
  { id: 5, name: 'Knight Collection', description: 'Handcrafted knight pieces', price: 99.99, picture: '/images/knight_collection.jpg', status: 'available', category: 1, shop_id: 1, created_at: '2024-01-15 14:00:00' },
  { id: 6, name: 'Marble Chess Board', description: 'Premium marble 8x8 board', price: 450.00, picture: '/images/marble_board.jpg', status: 'available', category: 2, shop_id: 2, created_at: '2024-01-15 15:00:00' },
  { id: 7, name: 'Wooden Tournament Board', description: 'Professional tournament board', price: 120.00, picture: '/images/wooden_board.jpg', status: 'available', category: 2, shop_id: 1, created_at: '2024-01-15 16:00:00' },
  { id: 8, name: 'Glass Chess Board', description: 'Elegant glass board design', price: 280.00, picture: '/images/glass_board.jpg', status: 'available', category: 2, shop_id: 2, created_at: '2024-01-15 17:00:00' },
  { id: 9, name: 'Digital Chess Clock', description: 'Electronic tournament clock', price: 65.99, picture: '/images/digital_clock.jpg', status: 'available', category: 3, shop_id: 1, created_at: '2024-01-15 18:00:00' },
  { id: 10, name: 'Analog Chess Timer', description: 'Classic analog timer', price: 45.99, picture: '/images/analog_timer.jpg', status: 'available', category: 3, shop_id: 2, created_at: '2024-01-15 19:00:00' },
  { id: 11, name: 'Staunton Chess Set', description: 'Complete Staunton design set', price: 350.00, picture: '/images/staunton_set.jpg', status: 'available', category: 4, shop_id: 1, created_at: '2024-01-16 10:00:00' },
  { id: 12, name: 'Travel Chess Set', description: 'Compact portable set', price: 25.99, picture: '/images/travel_set.jpg', status: 'available', category: 4, shop_id: 2, created_at: '2024-01-16 11:00:00' },
  { id: 13, name: 'Chess Strategy Book', description: 'Advanced strategy guide', price: 29.99, picture: '/images/strategy_book.jpg', status: 'available', category: 5, shop_id: 1, created_at: '2024-01-16 12:00:00' },
  { id: 14, name: 'Opening Theory Book', description: 'Comprehensive opening guide', price: 34.99, picture: '/images/opening_book.jpg', status: 'available', category: 5, shop_id: 2, created_at: '2024-01-16 13:00:00' },
  { id: 15, name: 'Chess Master Software', description: 'Professional analysis software', price: 89.99, picture: '/images/master_software.jpg', status: 'available', category: 6, shop_id: 1, created_at: '2024-01-16 14:00:00' }
];

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  picture: string;
  status: string;
  category: number;
  shop_id: number;
  created_at: string;
}

interface Shop {
  id: number;
  type: string;
  name: string;
}

export function Shop() {
  const [selectedShop, setSelectedShop] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  // Filter items based on selected shop and search term
  const filteredItems = useMemo(() => {
    return mockItems.filter(item => {
      const matchesShop = item.shop_id === selectedShop;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesShop && matchesSearch;
    });
  }, [selectedShop, searchTerm]);

  // Get category name by ID
  const getCategoryName = (categoryId: number): string => {
    const category = mockCategories.find(cat => cat.id === categoryId);
    return category ? category.title : 'Unknown';
  };

  // Get shop name by ID
  const getShopName = (shopId: number): string => {
    const shop = mockShops.find(shop => shop.id === shopId);
    return shop ? shop.name : 'Unknown';
  };

  const handleEditItem = (item: Item) => {
    setEditingItem(item);
    // Open modal - in this case we'll use the DaisyUI modal
    (document.getElementById('edit_item_modal') as HTMLDialogElement)?.showModal();
  };

  const handleSaveItem = () => {
    // TODO: Implement API call to save item
    console.log('Saving item:', editingItem);
    setEditingItem(null);
    (document.getElementById('edit_item_modal') as HTMLDialogElement)?.close();
  };

  const handleDeleteItem = (itemId: number) => {
    // TODO: Implement API call to delete item
    console.log('Deleting item:', itemId);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Shop Management</h1>
        <p className="text-base-content/70">Manage items in your shops</p>
      </div>

      {/* Controls */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Shop Selection */}
            <div className="form-control w-full lg:max-w-xs">
              <label className="label">
                <span className="label-text font-semibold">Select Shop</span>
              </label>
              <select 
                className="select select-bordered w-full"
                value={selectedShop}
                onChange={(e) => setSelectedShop(Number(e.target.value))}
              >
                {mockShops.map(shop => (
                  <option key={shop.id} value={shop.id}>
                    {shop.name} ({shop.type})
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="form-control w-full lg:flex-1">
              <label className="label">
                <span className="label-text font-semibold">Search Items</span>
              </label>
              <div className="input-group flex">
                <input 
                  type="text" 
                  placeholder="Search by name or description..." 
                  className="input input-bordered w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="btn btn-square btn-ghost">
                  <Search className="w-5 h-5" />
                </span>
              </div>
            </div>

            {/* Add New Item Button */}
            <div className="form-control">
              <label className="label">
                <span className="label-text opacity-0">Add</span>
              </label>
              <button className="btn btn-primary">
                Add New Item
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Current Shop Info */}
      <div className="alert alert-info mb-6">
        <div>
          <h3 className="font-bold">Currently editing: {getShopName(selectedShop)}</h3>
          <div className="text-sm">
            Found {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
            {searchTerm && ` matching "${searchTerm}"`}
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Items</h2>
          
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map(item => (
                  <tr key={item.id} className="hover">
                    <td className="font-mono text-sm">{item.id}</td>
                    <td>
                      <div>
                        <div className="font-bold">{item.name}</div>
                        <div className="text-sm text-base-content/70 truncate max-w-xs">
                          {item.description}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-outline">
                        {getCategoryName(item.category)}
                      </span>
                    </td>
                    <td className="font-semibold">${item.price.toFixed(2)}</td>
                    <td>
                      <span className={`badge ${
                        item.status === 'available' ? 'badge-success' : 
                        item.status === 'out_of_stock' ? 'badge-warning' : 
                        'badge-error'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="text-sm">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button 
                          className="btn btn-sm btn-ghost"
                          onClick={() => handleEditItem(item)}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn btn-sm btn-error btn-outline"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredItems.length === 0 && (
              <div className="text-center py-8">
                <div className="text-base-content/50 mb-2">No items found</div>
                <div className="text-sm text-base-content/40">
                  {searchTerm ? 'Try adjusting your search term' : 'This shop has no items yet'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Item Modal */}
      <dialog id="edit_item_modal" className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          
          <h3 className="font-bold text-lg mb-4">Edit Item</h3>
          
          {editingItem && (
            <div className="space-y-4">
              <div className="form-control">
                <label className="label pr-2">
                  <span className="label-text">Name</span>
                </label>
                <input 
                  type="text" 
                  className="input input-bordered rounded-md"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                />
              </div>

              <div className="form-control flex flex-col">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea 
                  className="textarea textarea-bordered h-24 rounded-md"
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input 
                    type="number" 
                    step="0.01"
                    className="input input-bordered rounded-md"
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({...editingItem, price: parseFloat(e.target.value)})}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Status</span>
                  </label>
                  <select 
                    className="select select-bordered rounded-md"
                    value={editingItem.status}
                    onChange={(e) => setEditingItem({...editingItem, status: e.target.value})}
                  >
                    <option value="available">Available</option>
                    <option value="out_of_stock">Out of Stock</option>
                    <option value="discontinued">Discontinued</option>
                  </select>
                </div>
              </div>

              <div className="form-control">
                <label className="label pr-2">
                  <span className="label-text">Category</span>
                </label>
                <select 
                  className="select select-bordered rounded-md"
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({...editingItem, category: parseInt(e.target.value)})}
                >
                  {mockCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label pr-2">
                  <span className="label-text">Picture URL</span>
                </label>
                <input 
                  type="text" 
                  className="input input-bordered rounded-md"
                  value={editingItem.picture}
                  onChange={(e) => setEditingItem({...editingItem, picture: e.target.value})}
                />
              </div>

              <div className="modal-action">
                <button className="btn btn-primary" onClick={handleSaveItem}>
                  Save Changes
                </button>
                <form method="dialog">
                  <button className="btn">Cancel</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
}
