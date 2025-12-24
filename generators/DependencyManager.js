// ================================================
// DEPENDENCY MANAGER - PACKAGE.JSON GENERATION
// ================================================

class DependencyManager {
  constructor(excelConfig) {
    this.config = excelConfig;
  }

  generatePackageJson() {
    const uiLib = this.config.getUILibrary();
    
    const uiDependencies = {
      antd: { antd: '^5.8.0', '@ant-design/icons': '^5.2.0' },
      mui: { 
        '@mui/material': '^5.14.0', 
        '@mui/icons-material': '^5.14.0',
        '@emotion/react': '^11.11.0',
        '@emotion/styled': '^11.11.0'
      }
    };

    const deps = {
      react: '^18.2.0',
      'react-dom': '^18.2.0',
      'react-router-dom': '^6.14.0',
      axios: '^1.5.0',
      'react-hook-form': '^7.45.0',
      'zustand': '^4.4.0',
      'jwt-decode': '^3.1.2',
      'crypto-js': '^4.1.1',
      'react-query': '^3.39.3',
      'react-hot-toast': '^2.4.1',
      'yup': '^1.3.0',
      '@hookform/resolvers': '^3.3.0',
      ...uiDependencies[uiLib]
    };

    return {
      name: "generated-app",
      private: true,
      type: "module",
      scripts: {
        dev: "vite",
        build: "vite build",
        preview: "vite preview"
      },
      dependencies: deps,
      devDependencies: {
        "@vitejs/plugin-react": "^4.0.0",
        "vite": "^4.4.0",
        "autoprefixer": "^10.4.0",
        "postcss": "^8.4.0",
        "tailwindcss": "^3.3.0",
        "@types/react": "^18.2.0",
        "@types/react-dom": "^18.2.0",
        "typescript": "^5.0.0"
      }
    };
  }
}

module.exports = DependencyManager;