// ================================================
// COMPONENT TEMPLATES
// ================================================

class ComponentTemplates {
  constructor(config) {
    this.config = config;
  }

  generateProtectedRoute() {
    return `import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { canAccessRoute } from '@/utils/permissions'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermissions?: string[]
  requiredRole?: string
  isPublic?: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermissions = [],
  requiredRole,
  isPublic = false
}) => {
  const location = useLocation()
  const { isAuthenticated, user } = useAuthStore()

  if (isPublic) {
    return <>{children}</>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />
  }

  if (!canAccessRoute(requiredPermissions)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute`;
  }

  generatePageHeader() {
    return `import React from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  children?: React.ReactNode
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, children }) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
        {children && <div>{children}</div>}
      </div>
    </div>
  )
}

export default PageHeader`;
  }
}

module.exports = ComponentTemplates;