// ================================================
// PROJECT GENERATOR - MAIN GENERATOR
// ================================================

const fs = require('fs-extra');
const path = require('path');
const ExcelConfig = require('../config/ExcelConfig');
const FileGenerator = require('./FileGenerator');
const DependencyManager = require('./DependencyManager');

class ProjectGenerator {
  constructor(configFile, projectDir) {
    this.configFile = configFile;
    this.projectDir = projectDir;
    this.excelConfig = new ExcelConfig(configFile);
    this.fileGenerator = new FileGenerator(this.excelConfig);
    this.dependencyManager = new DependencyManager(this.excelConfig);
  }

  async generate() {
    fs.removeSync(this.projectDir);
    fs.ensureDirSync(this.projectDir);
    
    this.generatePackageJson();
    this.generateViteConfig();
    this.generateMainFiles();
    this.generateTypes();
    this.generateStore();
    this.generateServices();
    this.generateUtils();
    this.generateHooks();
    this.generateLayout();
    this.generateComponents();
    this.generateAuthPages();
    this.generateAppPages();
    this.generateAppRoutes();
    this.generateEnvFile();
  }

  generatePackageJson() {
    const packageJson = this.dependencyManager.generatePackageJson();
    fs.writeFileSync(
      path.join(this.projectDir, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );
  }

  generateViteConfig() {
    const viteConfig = this.fileGenerator.generateViteConfig();
    fs.writeFileSync(path.join(this.projectDir, 'vite.config.ts'), viteConfig);
  }

  generateMainFiles() {
    const mainFiles = this.fileGenerator.generateMainFiles();
    
    // Index.html
    fs.writeFileSync(path.join(this.projectDir, 'index.html'), mainFiles.indexHtml);
    
    // Main.tsx
    fs.ensureDirSync(path.join(this.projectDir, 'src'));
    fs.writeFileSync(path.join(this.projectDir, 'src/main.tsx'), mainFiles.mainTsx);
    
    // CSS
    fs.writeFileSync(path.join(this.projectDir, 'src/index.css'), mainFiles.css);
    
    // Tailwind Config
    fs.writeFileSync(path.join(this.projectDir, 'tailwind.config.js'), mainFiles.tailwindConfig);
  }

  generateTypes() {
    const typesDir = path.join(this.projectDir, 'src/types');
    fs.ensureDirSync(typesDir);
    
    const typesContent = this.fileGenerator.generateTypes();
    fs.writeFileSync(path.join(typesDir, 'index.ts'), typesContent);
  }

  generateStore() {
    const storeDir = path.join(this.projectDir, 'src/store');
    fs.ensureDirSync(storeDir);
    
    const authStore = this.fileGenerator.generateAuthStore();
    fs.writeFileSync(path.join(storeDir, 'authStore.ts'), authStore);
    
    const configStore = this.fileGenerator.generateConfigStore();
    fs.writeFileSync(path.join(storeDir, 'configStore.ts'), configStore);
  }

  generateServices() {
    const servicesDir = path.join(this.projectDir, 'src/services');
    fs.ensureDirSync(servicesDir);
    
    const apiService = this.fileGenerator.generateApiService();
    fs.writeFileSync(path.join(servicesDir, 'api.ts'), apiService);
  }

  generateUtils() {
    const utilsDir = path.join(this.projectDir, 'src/utils');
    fs.ensureDirSync(utilsDir);
    
    const permissionsUtil = this.fileGenerator.generatePermissionsUtil();
    fs.writeFileSync(path.join(utilsDir, 'permissions.ts'), permissionsUtil);
    
    const commonUtil = this.fileGenerator.generateCommonUtil();
    fs.writeFileSync(path.join(utilsDir, 'common.ts'), commonUtil);
  }

  generateHooks() {
    const hooksDir = path.join(this.projectDir, 'src/hooks');
    fs.ensureDirSync(hooksDir);
    
    const useFetch = this.fileGenerator.generateUseFetch();
    fs.writeFileSync(path.join(hooksDir, 'useFetch.ts'), useFetch);
    
    const usePermission = this.fileGenerator.generateUsePermission();
    fs.writeFileSync(path.join(hooksDir, 'usePermission.ts'), usePermission);
  }

  generateLayout() {
    const layoutDir = path.join(this.projectDir, 'src/layouts');
    fs.ensureDirSync(layoutDir);
    
    const layoutContent = this.fileGenerator.generateLayout();
    fs.writeFileSync(path.join(layoutDir, 'Layout.tsx'), layoutContent);
    
    const layoutCss = this.fileGenerator.generateLayoutCss();
    fs.writeFileSync(path.join(layoutDir, 'Layout.css'), layoutCss);
  }

  generateComponents() {
    const componentsDir = path.join(this.projectDir, 'src/components');
    fs.ensureDirSync(componentsDir);
    
    const protectedRoute = this.fileGenerator.generateProtectedRoute();
    fs.writeFileSync(path.join(componentsDir, 'ProtectedRoute.tsx'), protectedRoute);
    
    const pageHeader = this.fileGenerator.generatePageHeader();
    fs.writeFileSync(path.join(componentsDir, 'PageHeader.tsx'), pageHeader);
  }

  generateAuthPages() {
    const authDir = path.join(this.projectDir, 'src/pages/auth');
    fs.ensureDirSync(authDir);
    
    const loginPage = this.fileGenerator.generateLoginPage();
    fs.writeFileSync(path.join(authDir, 'Login.tsx'), loginPage);
    
    const registerPage = this.fileGenerator.generateRegisterPage();
    fs.writeFileSync(path.join(authDir, 'Register.tsx'), registerPage);
  }

  generateAppPages() {
    const pages = this.excelConfig.getPages();
    const pagesDir = path.join(this.projectDir, 'src/pages');
    fs.ensureDirSync(pagesDir);
    
    pages.forEach(page => {
      if (page.page_id === 'dashboard' || page.page_id === 'settings' || page.page_id === 'profile') {
        return;
      }
      
      const pageCode = this.fileGenerator.generateDynamicPage(page);
      fs.writeFileSync(path.join(pagesDir, `${page.page_id}.tsx`), pageCode);
    });

    this.generateDashboardPage();
    this.generateSettingsPage();
    this.generateProfilePage();
  }

  generateDashboardPage() {
    const dashboardCode = this.fileGenerator.generateDashboardPage();
    fs.writeFileSync(path.join(this.projectDir, 'src/pages/dashboard.tsx'), dashboardCode);
  }

  generateSettingsPage() {
    const settingsCode = this.fileGenerator.generateSettingsPage();
    fs.writeFileSync(path.join(this.projectDir, 'src/pages/settings.tsx'), settingsCode);
  }

  generateProfilePage() {
    const profileCode = this.fileGenerator.generateProfilePage();
    fs.writeFileSync(path.join(this.projectDir, 'src/pages/profile.tsx'), profileCode);
  }

  generateAppRoutes() {
    const appCode = this.fileGenerator.generateAppRoutes();
    fs.writeFileSync(path.join(this.projectDir, 'src/App.tsx'), appCode);
  }

  generateEnvFile() {
    const envContent = this.fileGenerator.generateEnvFile();
    fs.writeFileSync(path.join(this.projectDir, '.env'), envContent);
  }
}

module.exports = ProjectGenerator;