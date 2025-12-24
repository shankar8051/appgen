// ================================================
// CONFIG TEMPLATES
// ================================================

class ConfigTemplates {
  constructor(config) {
    this.config = config;
  }

  generateViteConfig() {
    return `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: { port: 3000, open: true },
  resolve: { 
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@store': path.resolve(__dirname, './src/store'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@services': path.resolve(__dirname, './src/services'),
      '@layouts': path.resolve(__dirname, './src/layouts')
    }
  }
})`;
  }

  generateMainFiles() {
    const appName = this.config.getAppName();
    const uiLib = this.config.getUILibrary();
    
    return {
      indexHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${appName}</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`,

      mainTsx: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
${uiLib === 'antd' ? "import 'antd/dist/reset.css'" : ''}
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)`,

      css: `@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}`,

      tailwindConfig: `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '${this.config.getGlobalValue('theme_color') || '#1890ff'}',
      }
    }
  },
  plugins: []
}`
    };
  }

  generateEnvFile() {
    const appName = this.config.getAppName();
    
    return `VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=${appName}
VITE_WS_URL=ws://localhost:3000
VITE_UPLOAD_URL=http://localhost:3000/uploads
NODE_ENV=development`;
  }

  generateTypes() {
    return `export interface User {
  id: string | number
  name: string
  email: string
  role: string
  permissions: string[]
}

export interface PageConfig {
  page_id: string
  title: string
  icon: string
  route: string
  permissions?: string
  order?: number
}

export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
}`;
  }
}

module.exports = ConfigTemplates;