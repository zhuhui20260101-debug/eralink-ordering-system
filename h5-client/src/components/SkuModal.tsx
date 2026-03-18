import { useState } from 'react';
import { X } from 'lucide-react';
import classNames from 'classnames';
import type { FoodItem } from '../types';

interface SkuModalProps {
  item: FoodItem;
  onClose: () => void;
  onAddToCart: (item: FoodItem, selections: Record<string, string>) => void;
}

export default function SkuModal({ item, onClose, onAddToCart }: SkuModalProps) {
  const [selections, setSelections] = useState<Record<string, string>>({});

  const handleSelect = (categoryId: string, optionId: string) => {
    setSelections(prev => ({ ...prev, [categoryId]: optionId }));
  };

  const calculateTotal = () => {
    let total = item.price;
    item.skuCategories?.forEach(cat => {
      const selectedOptionId = selections[cat.id];
      if (selectedOptionId) {
        const opt = cat.options.find(o => o.id === selectedOptionId);
        if (opt) total += opt.price;
      }
    });
    return total;
  };

  const isAddDisabled = item.skuCategories?.some(cat => cat.required && !selections[cat.id]);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-[#00000066] backdrop-blur-sm animate-fade-in" onClick={onClose} />
      
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[28px] overflow-hidden animate-slide-up max-h-[90vh] flex flex-col max-w-md mx-auto shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 z-10 transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="flex-1 overflow-y-auto pb-6 no-scrollbar">
          <div className="relative h-64 w-full bg-gray-100">
            <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent" />
          </div>

          <div className="px-5 -mt-6 relative">
            <h2 className="text-[22px] font-black tracking-tight text-gray-900 leading-tight">{item.name}</h2>
            <p className="text-[13px] text-gray-500 mt-2 leading-relaxed">{item.desc}</p>
            
            <div className="mt-8 space-y-8">
              {item.skuCategories?.map(cat => (
                <div key={cat.id}>
                  <div className="flex items-center gap-2 mb-3.5">
                    <h3 className="font-bold text-[15px] text-gray-900">{cat.name}</h3>
                    {cat.required && <span className="text-[10px] font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded">必选</span>}
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {cat.options.map(opt => {
                      const isSelected = selections[cat.id] === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelect(cat.id, opt.id)}
                          className={classNames(
                            "px-5 py-2.5 border rounded-xl text-[13px] font-medium transition-all duration-200",
                            isSelected 
                              ? "border-primary bg-primary-light text-primary ring-2 ring-primary/10" 
                              : "border-gray-200 bg-white text-gray-600 active:bg-gray-50"
                          )}
                        >
                          {opt.name} {opt.price > 0 && <span className="text-[11px] opacity-80 ml-1">+€{opt.price}</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 px-5 bg-white border-t border-gray-100 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between gap-5">
            <div className="flex flex-col justify-center">
              <span className="text-[11px] text-gray-400 font-medium">合计金额</span>
              <span className="text-[26px] font-black text-gray-900 tracking-tight leading-none overflow-hidden mt-0.5">€{calculateTotal().toFixed(2)}</span>
            </div>
            <button 
              disabled={isAddDisabled}
              onClick={() => onAddToCart(item, selections)}
              className={classNames(
                "flex-1 h-12 rounded-2xl font-bold text-white shadow-xl transition-all duration-200 active:scale-[0.98]",
                isAddDisabled 
                  ? "bg-gray-200 shadow-none text-gray-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-[#FF4B3A] to-[#FF6B3A] shadow-primary/30"
              )}
            >
              加入购物车
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
