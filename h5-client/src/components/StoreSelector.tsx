import { useState } from 'react';
import { MapPin, Search, Navigation } from 'lucide-react';
import classNames from 'classnames';
import type { Store } from '../types';

interface StoreSelectorProps {
  stores: Store[];
  currentStoreId?: string;
  onSelectStore: (store: Store) => void;
  onClose: () => void;
}

export default function StoreSelector({ stores, currentStoreId, onSelectStore, onClose }: StoreSelectorProps) {
  const [search, setSearch] = useState('');

  const filteredStores = stores.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.address.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col max-w-md mx-auto animate-fade-in shadow-2xl">
      <div className="px-5 pt-12 pb-4 bg-white border-b border-gray-100 flex-none z-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">选择门店</h1>
          <button onClick={onClose} className="text-sm font-bold text-primary px-3 py-1.5 bg-primary-light rounded-full active:scale-95 transition-transform">
            取消
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="搜索门店名称或地址" 
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-900 placeholder:text-gray-400"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 no-scrollbar bg-gray-50">
        <div className="space-y-4">
          {filteredStores.map(store => {
            const isSelected = store.id === currentStoreId;
            const isOpen = store.status === 'OPEN';

            return (
              <div 
                key={store.id} 
                onClick={() => isOpen && onSelectStore(store)}
                className={classNames(
                  "p-5 rounded-2xl bg-white transition-all shadow-sm border",
                  isOpen ? "cursor-pointer active:scale-[0.98]" : "opacity-60 cursor-not-allowed",
                  isSelected ? "border-primary ring-1 ring-primary" : "border-gray-100"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-[16px] text-gray-900">{store.name}</h3>
                  <div className={classNames("text-[10px] font-bold px-2 py-0.5 rounded", isOpen ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500")}>
                    {isOpen ? '营业中' : '休息中'}
                  </div>
                </div>
                
                <div className="flex items-start gap-1.5 text-gray-500 mt-3">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="text-[13px] leading-snug">{store.address}</p>
                </div>
                
                <div className="flex items-center gap-1.5 text-gray-400 mt-2">
                  <Navigation className="w-3.5 h-3.5" />
                  <span className="text-[12px] font-medium">距您 {store.distance}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
