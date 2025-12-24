// ================================================
// STORE TEMPLATES
// ================================================

class StoreTemplates {
  constructor(config) {
    this.config = config;
  }

  generateAuthStore() {
    return `import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import toast from 'react-hot-toast'

interface User {
  id: string | number
  name: string
  email: string
  role: string
  permissions: string[]
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  permissions: string[]
  
  login: (credentials: { email: string; password: string }) => Promise<void>
  register: (data: any) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
  hasPermission: (permission: string) => boolean
  hasRole: (role: string) => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      permissions: [],

      login: async (credentials) => {
        set({ loading: true })
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const mockUser = {
            id: 1,
            name: 'Admin User',
            email: credentials.email,
            role: 'admin',
            permissions: ['*'],
          };
          
          const mockToken = 'mock-jwt-token';
          
          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            permissions: mockUser.permissions,
            loading: false
          });
          
          localStorage.setItem('token', mockToken);
          
          toast.success('सफलतापूर्वक लगइन भयो!');
        } catch (error) {
          set({ loading: false });
          toast.error('लगइन असफल भयो');
          throw error;
        }
      },

      register: async (data) => {
        set({ loading: true });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          toast.success('दर्ता सफल भयो! कृपया लगइन गर्नुहोस्');
          set({ loading: false });
        } catch (error) {
          set({ loading: false });
          toast.error('दर्ता असफल भयो');
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          permissions: []
        });
        toast.success('लगआउट भयो');
      },

      updateProfile: (data) => {
        set(state => ({
          user: state.user ? { ...state.user, ...data } : null
        }));
      },

      hasPermission: (permission) => {
        const { permissions } = get();
        return permissions.includes(permission) || permissions.includes('*');
      },

      hasRole: (role) => {
        const { user } = get();
        return user?.role === role;
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        token: state.token,
        permissions: state.permissions 
      })
    }
  )
);`;
  }

  generateConfigStore() {
    const pages = this.config.getPages();
    
    return `import { create } from 'zustand'
import { PageConfig } from '@/types'

interface ConfigState {
  pages: PageConfig[]
  currentPage: PageConfig | null
  setPages: (pages: PageConfig[]) => void
  setCurrentPage: (page: PageConfig | null) => void
  getPageById: (pageId: string) => PageConfig | undefined
}

export const useConfigStore = create<ConfigState>((set, get) => ({
  pages: [],
  currentPage: null,
  
  setPages: (pages) => {
    const sortedPages = [...pages].sort((a, b) => (a.order || 999) - (b.order || 999))
    set({ pages: sortedPages })
  },
  
  setCurrentPage: (page) => set({ currentPage: page }),
  
  getPageById: (pageId) => {
    return get().pages.find(p => p.page_id === pageId)
  }
}))

// Initialize with config from Excel
const initialPages = ${JSON.stringify(pages, null, 2)}
export const initializeConfig = () => {
  useConfigStore.getState().setPages(initialPages)
}`;
  }
}

module.exports = StoreTemplates;