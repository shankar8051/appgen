// ================================================
// LAYOUT TEMPLATES
// ================================================

class LayoutTemplates {
  constructor(config) {
    this.config = config;
  }

  generateLayout() {
    const sidebarType = this.config.getGlobalValue('sidebar_type') || 'fixed';
    const appName = this.config.getAppName();
    
    return `import React, { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useConfigStore } from '@/store/configStore'
import { canAccessRoute } from '@/utils/permissions'
import './Layout.css'

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const { pages } = useConfigStore()
  
  // Predefined pages
  const predefinedPages = [
    { page_id: 'dashboard', title: 'ड्यासबोर्ड', icon: '📊', route: '/dashboard', permissions: 'dashboard.view' },
    { page_id: 'profile', title: 'प्रोफाइल', icon: '👤', route: '/profile', permissions: 'profile.view' },
    { page_id: 'settings', title: 'सेटिङ्गहरू', icon: '⚙️', route: '/settings', permissions: 'settings.view' }
  ];
  
  // Excel बाट आएका pages
  const excelPages = pages || [];
  
  // Unique pages merge गर्ने
  const allPages = [...predefinedPages];
  
  // Excel pages थप्ने
  excelPages.forEach(excelPage => {
    const exists = allPages.some(p => p.page_id === excelPage.page_id);
    if (!exists) {
      allPages.push(excelPage);
    }
  });
  
  const menuPages = allPages
    .filter(page => canAccessRoute(page.permissions?.split(',')))
    .sort((a, b) => (a.order || 999) - (b.order || 999));

  const handleProfileClick = () => {
    navigate('/profile')
  }

  const handleSettingsClick = () => {
    navigate('/settings')
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="app-layout ${sidebarType === 'fixed' ? 'fixed-sidebar' : 'collapsible-sidebar'}">
      <header className="app-header">
        <div className="header-left">
          <button 
            className="sidebar-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
          <h1 className="app-title">
            ${appName}
          </h1>
        </div>
        
        <div className="header-right">
          <div className="user-menu">
            <div className="user-info">
              <span className="user-name">{user?.name}</span>
              <span className="user-role">{user?.role}</span>
            </div>
            <div 
              className="user-avatar"
              onClick={handleProfileClick}
              style={{ cursor: 'pointer' }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            
            <div className="dropdown-menu">
              <button onClick={handleProfileClick}>
                <span>👤</span> प्रोफाइल
              </button>
              <button onClick={handleSettingsClick}>
                <span>⚙️</span> सेटिङ्ग
              </button>
              <button onClick={handleLogout}>
                <span>🚪</span> लगआउट
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="app-container">
        <aside className={\`app-sidebar \${collapsed ? 'collapsed' : ''} \${mobileOpen ? 'mobile-open' : ''}\`}>
          <div className="sidebar-header">
            <h2>मेन्यु</h2>
            <button 
              className="collapse-btn"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? '→' : '←'}
            </button>
          </div>

          <nav className="sidebar-nav">
            {menuPages.map(page => {
              const isActive = location.pathname === page.route
              
              return (
                <Link
                  key={page.page_id}
                  to={page.route}
                  className={\`nav-item \${isActive ? 'active' : ''}\`}
                  title={collapsed ? page.title : ''}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="nav-icon">{page.icon}</span>
                  {!collapsed && <span className="nav-label">{page.title}</span>}
                </Link>
              )
            })}
          </nav>
        </aside>

        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout`;
  }

  generateLayoutCss() {
    return `.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.sidebar-toggle {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.sidebar-toggle:hover {
  background: #f5f5f5;
}

.app-title {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  color: #1890ff;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.user-menu {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
}

.user-menu:hover {
  background: #f5f5f5;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.user-name {
  font-weight: 600;
  font-size: 14px;
}

.user-role {
  font-size: 12px;
  color: #666;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1890ff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  border-radius: 8px;
  min-width: 200px;
  display: none;
  flex-direction: column;
  padding: 8px 0;
  z-index: 1001;
}

.user-menu:hover .dropdown-menu {
  display: flex;
}

.dropdown-menu button {
  background: none;
  border: none;
  padding: 12px 16px;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
}

.dropdown-menu button:hover {
  background: #f5f5f5;
}

.app-container {
  display: flex;
  flex: 1;
}

.app-sidebar {
  width: 250px;
  background: white;
  border-right: 1px solid #f0f0f0;
  transition: width 0.3s;
  display: flex;
  flex-direction: column;
}

.app-sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.collapse-btn {
  background: none;
  border: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.collapse-btn:hover {
  background: #f5f5f5;
}

.sidebar-nav {
  flex: 1;
  padding: 16px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 24px;
  color: #333;
  text-decoration: none;
  position: relative;
  transition: background 0.3s;
  gap: 12px;
}

.nav-item:hover {
  background: #f5f5f5;
}

.nav-item.active {
  background: #e6f7ff;
  color: #1890ff;
  border-right: 3px solid #1890ff;
}

.nav-icon {
  font-size: 20px;
  width: 24px;
  text-align: center;
}

.nav-label {
  font-size: 14px;
  font-weight: 500;
}

.app-main {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  background: #fafafa;
}

@media (max-width: 768px) {
  .app-sidebar {
    position: fixed;
    left: -250px;
    top: 64px;
    bottom: 0;
    z-index: 999;
    transition: left 0.3s;
  }
  
  .app-sidebar.mobile-open {
    left: 0;
  }
  
  .user-info {
    display: none;
  }
}`;
  }
}

module.exports = LayoutTemplates;