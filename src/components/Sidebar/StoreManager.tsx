import React, { useState } from 'react';
import { useCustomization } from '../../context/CustomizationContext';
import { Save, Trash2, Eye, Edit, Plus, Store } from 'lucide-react';

const StoreManager: React.FC = () => {
  const { 
    savedStores, 
    saveStore, 
    loadStore, 
    deleteStore, 
    viewMode, 
    setViewMode,
    selectedStoreId,
    customization
  } = useCustomization();
  
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [storeName, setStoreName] = useState('');

  const handleSaveStore = () => {
    if (storeName.trim()) {
      saveStore(storeName.trim());
      setStoreName('');
      setShowSaveDialog(false);
    }
  };

  const handleLoadStore = (storeId: string) => {
    loadStore(storeId);
    setViewMode('preview');
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-800">Store Manager</h3>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('editor')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              viewMode === 'editor' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Edit size={12} className="inline mr-1" />
            Editor
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              viewMode === 'preview' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Eye size={12} className="inline mr-1" />
            Preview
          </button>
        </div>
      </div>

      {/* Current Store Save */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-blue-900">Current Store</h4>
          <button
            onClick={() => setShowSaveDialog(true)}
            className="flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors"
          >
            <Save size={12} className="mr-1" />
            Save Store
          </button>
        </div>
        <p className="text-xs text-blue-700">
          {customization.elements.length} sections • {customization.isSetupComplete ? 'Complete' : 'In Progress'}
        </p>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <h4 className="text-sm font-medium text-gray-800 mb-3">Save Store</h4>
          <div className="space-y-3">
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="Enter store name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              autoFocus
            />
            <div className="flex space-x-2">
              <button
                onClick={handleSaveStore}
                disabled={!storeName.trim()}
                className="flex-1 px-3 py-2 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowSaveDialog(false);
                  setStoreName('');
                }}
                className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 text-xs rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Stores */}
      <div>
        <h4 className="text-sm font-medium text-gray-800 mb-3">
          Saved Stores ({savedStores.length})
        </h4>
        
        {savedStores.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <Store className="mx-auto mb-2 text-gray-400" size={24} />
            <p className="text-sm text-gray-500 mb-1">No saved stores yet</p>
            <p className="text-xs text-gray-400">Create and save your first store to get started</p>
          </div>
        ) : (
          <div className="space-y-2">
            {savedStores.map((store) => (
              <div
                key={store.id}
                className={`p-3 border rounded-lg transition-colors ${
                  selectedStoreId === store.id
                    ? 'border-blue-300 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h5 className="text-sm font-medium text-gray-800">{store.name}</h5>
                    <p className="text-xs text-gray-500">
                      {store.customization.elements.length} sections • {formatDate(store.updatedAt)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleLoadStore(store.id)}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                      title="Load & Preview Store"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      onClick={() => deleteStore(store.id)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                      title="Delete Store"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {viewMode === 'preview' && (
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-xs text-green-700">
            <Eye size={12} className="inline mr-1" />
            Preview mode active. Switch to Editor to make changes.
          </p>
        </div>
      )}
    </div>
  );
};

export default StoreManager;