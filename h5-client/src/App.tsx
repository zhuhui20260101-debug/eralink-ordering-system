import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingCart, User } from 'lucide-react';
import classNames from 'classnames';

// 模拟数据
const categories = ['新菜尝鲜', '主厨推荐', '家常小炒', '主食', '饮料', '特色凉菜', '自制甜点'];
const mockItems = [
  { id: 1, name: '招牌蒜香脱骨凤爪', desc: '软糯脱骨 香卤入味 (大火现炒)', price: 11.5, img: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 2, name: '口味肉沫炒毛豆', desc: '经典下饭神器，超级下饭', price: 12.0, img: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 3, name: '砂锅胡椒猪肚鸡', desc: '暖胃滋补，汤鲜味美', price: 15.0, img: 'https://images.unsplash.com/photo-1605296830714-7fb71f0f29f0?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 4, name: '老长沙臭豆腐', desc: '闻着臭吃着香，外酥里嫩', price: 6.5, img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=200&h=200' },
];

function MenuPage() {
  return (
    <div className="flex h-[calc(100vh-60px)] pt-12">
      {/* 顶部导航 */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-white flex items-center justify-between px-4 z-10 shadow-sm">
        <div className="font-bold text-lg truncate flex-1">📍 马德里市中心店</div>
        <div className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium shrink-0 ml-2">自取 / 极速达</div>
      </div>
      
      {/* 左侧分类 */}
      <div className="w-24 bg-gray-50 h-full overflow-y-auto no-scrollbar pb-20">
        {categories.map((cat, i) => (
          <div key={i} className={classNames("p-4 text-center text-[13px] relative", i === 0 ? "bg-white font-bold text-gray-900" : "text-gray-500")}>
            {i === 0 && <div className="absolute left-0 top-3 bottom-3 w-1 bg-primary rounded-r-md"></div>}
            {cat}
          </div>
        ))}
      </div>

      {/* 右侧菜品列表 */}
      <div className="flex-1 bg-white h-full overflow-y-auto pb-32 p-4 no-scrollbar">
        <h2 className="font-bold text-gray-800 mb-4 text-sm">{categories[0]}</h2>
        <div className="flex flex-col gap-6">
          {mockItems.map(item => (
            <div key={item.id} className="flex gap-3">
              <img src={item.img} alt={item.name} className="w-[88px] h-[88px] rounded-lg object-cover bg-gray-200 shrink-0" />
              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div>
                  <h3 className="font-bold text-[15px] leading-tight text-gray-900">{item.name}</h3>
                  <p className="text-[11px] text-gray-400 mt-1 line-clamp-2 leading-snug">{item.desc}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-base text-gray-900">€{item.price.toFixed(1)}</span>
                  <button className="w-[26px] h-[26px] rounded-full bg-primary text-white flex items-center justify-center font-bold pb-0.5 shadow-sm active:scale-95 transition-transform">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部悬浮购物车 */}
      <div className="fixed bottom-[75px] left-4 right-4 h-14 bg-[#333333] rounded-full flex items-center pl-5 pr-2 justify-between shadow-xl text-white z-20 mx-auto max-w-[calc(448px-2rem)]">
        <div className="flex items-center gap-4">
          <div className="relative">
            <ShoppingCart className="w-7 h-7" />
            <span className="absolute -top-1.5 -right-2 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold border border-[#333333]">3</span>
          </div>
          <span className="font-medium text-lg">€38.50</span>
        </div>
        <button className="bg-primary px-6 py-2.5 rounded-full font-medium text-sm">去结算</button>
      </div>
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navs = [
    { name: '点餐', path: '/', icon: Home },
    { name: '发现', path: '/explore', icon: Search },
    { name: '订单', path: '/orders', icon: ShoppingCart },
    { name: '我的', path: '/mine', icon: User },
  ];

  return (
    <div className="h-screen w-full bg-gray-100 overflow-hidden relative max-w-md mx-auto shadow-2xl sm:border-x sm:border-gray-200">
      {children}
      <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-white border-t border-gray-100 flex py-1 z-30 pb-safe">
        {navs.map(nav => {
          const active = location.pathname === nav.path;
          return (
            <div 
              key={nav.path} 
              onClick={() => navigate(nav.path)}
              className={classNames("flex-1 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors", active ? "text-primary" : "text-gray-400 hover:text-gray-600")}
            >
              <nav.icon className={classNames("w-[22px] h-[22px]", active && "fill-current opacity-20")} />
              <span className="text-[10px] font-medium">{nav.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="*" element={<div className="h-full flex items-center justify-center text-sm text-gray-400">模块开发中...</div>} />
      </Routes>
    </Layout>
  );
}
