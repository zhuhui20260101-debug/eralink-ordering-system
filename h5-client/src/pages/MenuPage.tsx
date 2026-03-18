import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import classNames from 'classnames';
import type { FoodItem, Store } from '../types';
import { mockCategories, mockItems, mockStores } from '../data/mock';
import SkuModal from '../components/SkuModal';
import StoreSelector from '../components/StoreSelector';

export default function MenuPage() {
  const [currentStore, setCurrentStore] = useState<Store>(mockStores[0]);
  const [showStoreSelector, setShowStoreSelector] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const handleAddToCart = (item: FoodItem, selections: Record<string, string>) => {
    let total = item.price;
    item.skuCategories?.forEach(cat => {
      const selectedOptionId = selections[cat.id];
      if (selectedOptionId) {
        const opt = cat.options.find(o => o.id === selectedOptionId);
        if (opt) total += opt.price;
      }
    });

    setCartCount(prev => prev + 1);
    setCartTotal(prev => prev + total);
    setSelectedItem(null);
  };

  return (
    <div className="flex h-[calc(100vh-60px)] pt-[52px]">
      {/* 顶部导航 */}
      <div 
        onClick={() => setShowStoreSelector(true)}
        className="absolute top-0 left-0 right-0 h-[52px] bg-white/95 backdrop-blur-lg flex items-center justify-between px-4 z-10 border-b border-gray-100 shadow-sm cursor-pointer active:bg-gray-50 transition-colors"
      >
        <div className="flex flex-col">
          <div className="font-bold text-[15px] truncate text-gray-900 drop-shadow-sm flex items-center gap-1">
            📍 {currentStore.name} 
            <span className="text-[10px] text-primary bg-primary-light px-1.5 py-0.5 rounded ml-1 tracking-wide">切换</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5 max-w-[200px] truncate">{currentStore.address}</p>
        </div>
        <div className="bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full text-[11px] font-bold text-gray-600 shadow-inner">
          自取 / 极速达
        </div>
      </div>
      
      {/* 左侧分类 */}
      <div className="w-[84px] bg-[#F9F9F9] h-full overflow-y-auto no-scrollbar pb-24 shadow-[inset_-1px_0_0_rgba(0,0,0,0.03)] border-r border-[#EEEEEE]">
        {mockCategories.map((cat, i) => (
          <div 
            key={i} 
            onClick={() => setActiveCategory(i)}
            className={classNames(
              "p-4 text-center text-[13px] relative transition-colors cursor-pointer", 
              i === activeCategory 
                ? "bg-white font-black text-gray-900" 
                : "text-gray-500 font-medium active:bg-gray-200"
            )}
          >
            {i === activeCategory && <div className="absolute left-0 top-3 bottom-3 w-[5px] bg-gradient-to-b from-[#FF4B3A] to-[#FF6B3A] rounded-r-md shadow-sm"></div>}
            {cat}
          </div>
        ))}
      </div>

      {/* 右侧菜品列表 */}
      <div className="flex-1 bg-white h-full overflow-y-auto pb-32 p-4 no-scrollbar scroll-smooth">
        <h2 className="font-black text-gray-900 mb-5 text-[15px] flex items-center gap-2 tracking-tight">
          {mockCategories[activeCategory]}
          <span className="h-px bg-gray-100 flex-1 ml-2"></span>
        </h2>
        <div className="flex flex-col gap-7">
          {mockItems.map(item => (
            <div key={item.id} className="flex gap-3.5" onClick={() => setSelectedItem(item)}>
              <div className="relative shrink-0">
                <img src={item.img} alt={item.name} className="w-[100px] h-[100px] rounded-[20px] object-cover bg-gray-100 shadow-sm border border-black/5" />
                {item.tags?.[0] && (
                  <div className="absolute -top-2 -left-2 bg-gradient-to-r from-[#FF4B3A] to-[#FF6B3A] text-white text-[10px] font-bold px-2 py-0.5 rounded-br-lg rounded-tl-xl shadow-sm border border-white/20">
                    {item.tags[0]}
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col py-0.5">
                <div>
                  <h3 className="font-bold text-[15px] leading-[1.3] text-gray-900 tracking-tight">{item.name}</h3>
                  <p className="text-[11px] text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">{item.desc}</p>
                </div>
                <div className="flex justify-between items-end mt-auto">
                  <span className="font-black text-[17px] text-gray-900 leading-none">€<span className="text-[18px]">{item.price.toFixed(1)}</span></span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItem(item);
                    }}
                    className="w-[28px] h-[28px] rounded-full bg-primary text-white flex items-center justify-center font-bold pb-0.5 shadow-[0_3px_12px_rgba(255,75,58,0.35)] active:scale-90 transition-transform"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部悬浮购物车 */}
      <div className="fixed bottom-[74px] left-4 right-4 h-14 bg-[#2C2C2C] backdrop-blur-xl bg-opacity-[0.97] rounded-[24px] flex items-center pl-4 pr-1.5 justify-between shadow-[0_8px_30px_rgba(0,0,0,0.2)] text-white z-20 mx-auto max-w-[calc(448px-2rem)] border border-white/10 ring-1 ring-black/5">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-[50px] h-[50px] -mt-6 bg-gradient-to-b from-gray-800 to-[#222] rounded-full flex items-center justify-center shadow-lg border-[3.5px] border-white/95">
              <ShoppingCart className="w-6 h-6 text-white ml-0.5 opacity-90" />
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-[26px] -right-1 bg-primary text-white text-[10px] min-w-[20px] h-[20px] px-1 flex items-center justify-center rounded-full font-black shadow-md transform scale-100 border border-white/20">
                {cartCount}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-black text-[19px] tracking-tight leading-none overflow-hidden mt-0.5 shadow-black">
              €{cartTotal > 0 ? cartTotal.toFixed(2) : '0.00'}
            </span>
            <span className="text-[10px] text-gray-400 font-medium">另需配送费 €2.5</span>
          </div>
        </div>
        <button 
          className={classNames(
            "px-6 py-2.5 rounded-[18px] font-bold text-[14px] transition-all duration-200 tracking-wide",
            cartCount === 0 
              ? "bg-white/10 text-gray-400 leading-none cursor-not-allowed border border-transparent" 
              : "bg-gradient-to-r from-[#FF4B3A] to-[#FF6B3A] shadow-[0_4px_15px_rgba(255,75,58,0.3)] text-white"
          )}
        >
          {cartCount === 0 ? '€15起送' : '去结算'}
        </button>
      </div>

      {/* Modals */}
      {showStoreSelector && (
        <StoreSelector 
          stores={mockStores}
          currentStoreId={currentStore.id}
          onClose={() => setShowStoreSelector(false)}
          onSelectStore={(store) => {
            setCurrentStore(store);
            setShowStoreSelector(false);
          }}
        />
      )}

      {selectedItem && (
        <SkuModal 
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}
