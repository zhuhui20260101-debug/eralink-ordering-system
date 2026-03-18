import type { FoodItem, Store } from '../types';

export const mockStores: Store[] = [
  { id: '1', name: 'CHI.LA 马德里市中心店', address: 'Calle Silva 4, 28013 Madrid', distance: '1.2 km', status: 'OPEN' },
  { id: '2', name: 'CHI.LA 巴塞罗那店', address: 'Carrer de Trafalgar 12, 08010 BCN', distance: '500+ km', status: 'CLOSED' },
];

export const skuTemplate = [
  {
    id: 'spicy', name: '辣度 (必选)', required: true,
    options: [{ id: 's1', name: '不辣', price: 0 }, { id: 's2', name: '微辣', price: 0 }, { id: 's3', name: '中辣', price: 0 }]
  },
  {
    id: 'extra', name: '加料 (可选)', required: false,
    options: [{ id: 'e1', name: '加肉沫', price: 1.5 }, { id: 'e2', name: '加煎蛋', price: 1.0 }]
  }
];

export const mockCategories = ['热门推荐', '经典湘菜', '凉菜小吃', '主食', '饮品'];

export const mockItems: FoodItem[] = [
  { id: 1, name: '招牌蒜香脱骨凤爪', desc: '软糯脱骨 香卤入味 (大火现炒)', price: 11.5, img: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&q=80&w=400&h=400', tags: ['爆款', '推荐'], skuCategories: [skuTemplate[0]] },
  { id: 2, name: '口味肉沫炒毛豆', desc: '经典下饭神器，极度下饭！', price: 12.0, img: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&q=80&w=400&h=400', skuCategories: skuTemplate },
  { id: 3, name: '砂锅胡椒猪肚鸡', desc: '暖胃滋补，汤白味鲜', price: 15.0, img: 'https://images.unsplash.com/photo-1605296830714-7fb71f0f29f0?auto=format&fit=crop&q=80&w=400&h=400' },
  { id: 4, name: '老长沙臭豆腐', desc: '闻着臭吃着香，外酥里嫩，配秘制酱汁', price: 6.5, img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=400&h=400', tags: ['小吃'] },
];
