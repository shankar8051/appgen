// ================================================
// SERVICE TEMPLATES
// ================================================

class ServiceTemplates {
  constructor(config) {
    this.config = config;
  }

  generateApiService() {
    return `import axios, { AxiosInstance } from 'axios'

class ApiService {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = \`Bearer \${token}\`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token')
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  async get<T = any>(url: string, config?: any): Promise<T> {
    const response = await this.instance.get<T>(url, config)
    return response.data
  }

  async post<T = any>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.instance.post<T>(url, data, config)
    return response.data
  }

  async put<T = any>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.instance.put<T>(url, data, config)
    return response.data
  }

  async delete<T = any>(url: string, config?: any): Promise<T> {
    const response = await this.instance.delete<T>(url, config)
    return response.data
  }
}

export const api = new ApiService()`;
  }

  generatePermissionsUtil() {
    return `import { useAuthStore } from '@/store/authStore'

export const hasPermission = (permission: string): boolean => {
  const { hasPermission: checkPermission } = useAuthStore.getState()
  return checkPermission(permission)
}

export const canAccessRoute = (routePermissions?: string[]): boolean => {
  if (!routePermissions || routePermissions.length === 0) return true
  
  const { permissions } = useAuthStore.getState()
  
  return routePermissions.some(permission => 
    permissions.includes(permission) || permissions.includes('*')
  )
}`;
  }

  generateCommonUtil() {
    return `export const formatDate = (date: Date | string): string => {
  const d = new Date(date)
  return d.toLocaleDateString('ne-NP')
}

export const formatCurrency = (amount: number, currency = 'NPR'): string => {
  return new Intl.NumberFormat('ne-NP', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}`;
  }
}

module.exports = ServiceTemplates;