import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, FileText, User } from 'lucide-react';
import classNames from 'classnames';
import MenuPage from './pages/MenuPage';

function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navs = [
    { name: '点单', path: '/', icon: Home },
    { name: '发现', path: '/explore', icon: Search },
    { name: '订单', path: '/orders', icon: FileText },
    { name: '我的', path: '/mine', icon: User },
  ];

  return (
    <div className="h-screen w-full bg-gray-50 overflow-hidden relative max-w-md mx-auto shadow-2xl sm:border-x sm:border-gray-200 selection:bg-primary/20">
      {children}
      <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-white border-t border-gray-100 flex py-1 z-30 pb-safe shadow-[0_-5px_30px_rgba(0,0,0,0.03)] backdrop-blur-lg bg-white/95">
        {navs.map(nav => {
          const active = location.pathname === nav.path;
          return (
            <div 
              key={nav.path} 
              onClick={() => navigate(nav.path)}
              className={classNames(
                "flex-1 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 relative", 
                active ? "text-gray-900" : "text-gray-400 hover:text-gray-700 active:scale-95"
              )}
            >
              {active && <div className="absolute top-0 w-8 h-0.5 bg-gray-900 rounded-b-full shadow-sm" />}
              <nav.icon className={classNames("w-[22px] h-[22px]", active && "fill-current text-gray-900 stroke-[1.5]")} strokeWidth={active ? 2 : 2} />
              <span className={classNames("text-[10px] tracking-wide", active ? "font-black text-gray-900" : "font-semibold")}>{nav.name}</span>
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
        <Route path="*" element={<div className="h-full flex flex-col gap-4 items-center justify-center text-sm font-bold text-gray-400 bg-gray-50"><span className="text-4xl opacity-50">🚧</span>模块努力开发中...</div>} />
      </Routes>
    </Layout>
  );
}
