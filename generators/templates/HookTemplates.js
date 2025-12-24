// ================================================
// HOOK TEMPLATES
// ================================================

class HookTemplates {
  constructor(config) {
    this.config = config;
  }

  generateUseFetch() {
    return `import { useState, useEffect, useCallback } from 'react'

interface UseFetchOptions<T> {
  endpoint: string
  initialData?: T
  autoFetch?: boolean
  dependencies?: any[]
}

export function useFetch<T = any>({
  endpoint,
  initialData,
  autoFetch = true,
  dependencies = []
}: UseFetchOptions<T>) {
  const [data, setData] = useState<T | null>(initialData || null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      let mockData: any = []
      
      if (endpoint.includes('users')) {
        mockData = Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          name: \`User \${i + 1}\`,
          email: \`user\${i + 1}@example.com\`,
          role: ['admin', 'user'][i % 2],
          createdAt: new Date().toISOString()
        }))
      } else if (endpoint.includes('products')) {
        mockData = Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          name: \`Product \${i + 1}\`,
          price: (i + 1) * 100,
          category: ['electronics', 'clothing', 'food'][i % 3],
        }))
      }
      
      setData(mockData)
      return mockData
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    } finally {
      setLoading(false)
    }
  }, [endpoint, ...dependencies])

  useEffect(() => {
    if (autoFetch) {
      fetch()
    }
  }, [fetch, autoFetch])

  const refetch = useCallback(() => {
    return fetch()
  }, [fetch])

  return {
    data,
    loading,
    error,
    refetch,
    setData
  }
}`;
  }

  generateUsePermission() {
    return `import { useAuthStore } from '@/store/authStore'
import { canAccessRoute } from '@/utils/permissions'

export function usePermission() {
  const { user, permissions, hasPermission: checkPermission } = useAuthStore()

  const hasPermission = (permission: string): boolean => {
    return checkPermission(permission)
  }

  const hasAnyPermission = (permissionList: string[]): boolean => {
    return permissionList.some(permission => hasPermission(permission))
  }

  const hasAllPermissions = (permissionList: string[]): boolean => {
    return permissionList.every(permission => hasPermission(permission))
  }

  const canAccess = (routePermissions?: string[]): boolean => {
    return canAccessRoute(routePermissions)
  }

  return {
    user,
    permissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    canAccess
  }
}`;
  }
}

module.exports = HookTemplates;