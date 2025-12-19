import { useState, useMemo, useEffect } from 'react';
import { Search } from '@mui/icons-material';
import { useShopsQuery, useItemsQuery, useCategoriesQuery, useCreateItemMutation, useUpdateItemMutation, useDeleteItemMutation } from '../hooks/queries';
import type { Item, CreateItemInput } from '../api';

export function Shop() {
  const [selectedShop, setSelectedShop] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editingItem, setEditingItem] = useState<Partial<Item> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 15;

  // Fetch shops
  const { data: shops = [], isLoading: isLoadingShops } = useShopsQuery();

  // Set default shop when shops are loaded
  useEffect(() => {
    if (shops.length > 0 && !selectedShop) {
      setSelectedShop(shops[0].id);
    }
  }, [shops, selectedShop]);

  // Fetch items for selected shop
  const { data: items = [], isLoading: isLoadingItems } = useItemsQuery(selectedShop || 0);
  const { data: categories = [] } = useCategoriesQuery();

  const createItemMutation = useCreateItemMutation();
  const updateItemMutation = useUpdateItemMutation();
  const deleteItemMutation = useDeleteItemMutation();

  // Filter items based on search term
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [items, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedShop]);

  // Get shop name by ID
  const getShopName = (shopId: number | null): string => {
    if (!shopId) return 'Loading...';
    const shop = shops.find(shop => shop.id === shopId);
    return shop ? shop.name : 'Unknown';
  };

  const handleEditItem = (item: Item) => {
    // Find category ID based on name
    const categoryId = categories.find(c => c.title === item.category)?.id || 1;

    setEditingItem({
      ...item,
      category: categoryId.toString() // Store as string for select value
    });
    setIsCreating(false);
    (document.getElementById('edit_item_modal') as HTMLDialogElement)?.showModal();
  };

  const handleAddItem = () => {
    if (!selectedShop) return;
    setEditingItem({
      name: '',
      description: '',
      price: 0,
      status: 'available',
      category: '1', // Default category as string for input, will be parsed
      shop_id: selectedShop,
      picture: ''
    });
    setIsCreating(true);
    (document.getElementById('edit_item_modal') as HTMLDialogElement)?.showModal();
  };

  const handleSaveItem = async () => {
    if (!editingItem || !selectedShop) return;

    try {
      const itemData: CreateItemInput = {
        name: editingItem.name || '',
        description: editingItem.description || '',
        price: Number(editingItem.price) || 0,
        status: (editingItem.status as "available" | "not_available") || 'available',
        category: Number(editingItem.category) || 1,
        shop_id: selectedShop,
        picture: editingItem.picture || undefined
      };

      if (isCreating) {
        await createItemMutation.mutateAsync(itemData);
      } else if (editingItem.id) {
        await updateItemMutation.mutateAsync({
          id: editingItem.id,
          data: itemData
        });
      }

      setEditingItem(null);
      (document.getElementById('edit_item_modal') as HTMLDialogElement)?.close();
    } catch (error) {
      console.error('Failed to save item:', error);
      // You might want to show an error toast here
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    if (!selectedShop) return;
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItemMutation.mutateAsync({ id: itemId, shopId: selectedShop });
      } catch (error) {
        console.error('Failed to delete item:', error);
      }
    }
  };

  if (isLoadingShops) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

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
                value={selectedShop || ''}
                onChange={(e) => setSelectedShop(Number(e.target.value))}
              >
                {shops.map(shop => (
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
              <button className="btn btn-primary" onClick={handleAddItem} disabled={!selectedShop}>
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

          {isLoadingItems ? (
            <div className="flex justify-center py-8">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          ) : (
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
                  {paginatedItems.map(item => (
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
                          {item.category}
                        </span>
                      </td>
                      <td className="font-semibold">${item.price.toFixed(2)}</td>
                      <td>
                        <span className={`badge ${item.status === 'available' ? 'badge-success' : 'badge-error'}`}>
                          {item.status === 'available' ? 'Available' : 'Not Available'}
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
          )}

          {/* Pagination Controls */}
          {filteredItems.length > 0 && (
            <div className="flex justify-center mt-4">
              <div className="join">
                <button
                  className="join-item btn"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  «
                </button>
                <button className="join-item btn">
                  Page {currentPage} of {totalPages}
                </button>
                <button
                  className="join-item btn"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  »
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Item Modal */}
      <dialog id="edit_item_modal" className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <h3 className="font-bold text-lg mb-4">{isCreating ? 'Add New Item' : 'Edit Item'}</h3>

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
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                />
              </div>

              <div className="form-control flex flex-col">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24 rounded-md"
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
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
                    onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Status</span>
                  </label>
                  <select
                    className="select select-bordered rounded-md"
                    value={editingItem.status}
                    onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                  >
                    <option value="available">Available</option>
                    <option value="not_available">Not Available</option>
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
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                >
                  {categories.map(category => (
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
                  value={editingItem.picture || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, picture: e.target.value })}
                />
              </div>

              <div className="modal-action">
                <button className="btn btn-primary" onClick={handleSaveItem}>
                  {createItemMutation.isPending || updateItemMutation.isPending ? 'Saving...' : 'Save Changes'}
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
