// ================================================
// FILE GENERATOR - MAIN CLASS
// ================================================

const ConfigTemplates = require('./templates/ConfigTemplates');
const StoreTemplates = require('./templates/StoreTemplates');
const ServiceTemplates = require('./templates/ServiceTemplates');
const HookTemplates = require('./templates/HookTemplates');
const LayoutTemplates = require('./templates/LayoutTemplates');
const ComponentTemplates = require('./templates/ComponentTemplates');
const PageTemplates = require('./templates/PageTemplates');
const LandingPageTemplates = require('./templates/LandingPageTemplates'); // नयाँ

class FileGenerator {
  constructor(excelConfig) {
    this.config = excelConfig;
    this.configTemplates = new ConfigTemplates(excelConfig);
    this.storeTemplates = new StoreTemplates(excelConfig);
    this.serviceTemplates = new ServiceTemplates(excelConfig);
    this.hookTemplates = new HookTemplates(excelConfig);
    this.layoutTemplates = new LayoutTemplates(excelConfig);
    this.componentTemplates = new ComponentTemplates(excelConfig);
    this.pageTemplates = new PageTemplates(excelConfig);
    this.landingPageTemplates = new LandingPageTemplates(excelConfig); // नयाँ
  }

  generateViteConfig() {
    return this.configTemplates.generateViteConfig();
  }

  generateMainFiles() {
    return this.configTemplates.generateMainFiles();
  }

  generateTypes() {
    return this.configTemplates.generateTypes();
  }

  generateAuthStore() {
    return this.storeTemplates.generateAuthStore();
  }

  generateConfigStore() {
    return this.storeTemplates.generateConfigStore();
  }

  generateApiService() {
    return this.serviceTemplates.generateApiService();
  }

  generatePermissionsUtil() {
    return this.serviceTemplates.generatePermissionsUtil();
  }

  generateCommonUtil() {
    return this.serviceTemplates.generateCommonUtil();
  }

  generateUseFetch() {
    return this.hookTemplates.generateUseFetch();
  }

  generateUsePermission() {
    return this.hookTemplates.generateUsePermission();
  }

  generateLayout() {
    return this.layoutTemplates.generateLayout();
  }

  generateLayoutCss() {
    return this.layoutTemplates.generateLayoutCss();
  }

  generateProtectedRoute() {
    return this.componentTemplates.generateProtectedRoute();
  }

  generatePageHeader() {
    return this.componentTemplates.generatePageHeader();
  }

  generateLoginPage() {
    return this.pageTemplates.generateLoginPage();
  }

  generateRegisterPage() {
    return this.pageTemplates.generateRegisterPage();
  }

  generateDynamicPage(page) {
    return this.pageTemplates.generateDynamicPage(page);
  }

  generateDashboardPage() {
    return this.pageTemplates.generateDashboardPage();
  }

  generateSettingsPage() {
    return this.pageTemplates.generateSettingsPage();
  }

  generateProfilePage() {
    return this.pageTemplates.generateProfilePage();
  }

  generateAppRoutes() {
    return this.pageTemplates.generateAppRoutes();
  }

  generateEnvFile() {
    return this.configTemplates.generateEnvFile();
  }

  // ================================================
  // LANDING PAGES - नयाँ methods
  // ================================================

  generateLandingHomePage() {
    return this.landingPageTemplates.generateLandingHomePage();
  }

  generateLandingAboutPage() {
    return this.landingPageTemplates.generateLandingAboutPage();
  }

  generateLandingContactPage() {
    return this.landingPageTemplates.generateLandingContactPage();
  }

  generateLanding404Page() {
    return this.landingPageTemplates.generateLanding404Page();
  }

  generateLandingServicesPage() {
    return this.landingPageTemplates.generateLandingServicesPage();
  }

  // Landing pages को list generate गर्ने
  generateAllLandingPages() {
    return {
      home: this.generateLandingHomePage(),
      about: this.generateLandingAboutPage(),
      contact: this.generateLandingContactPage(),
      services: this.generateLandingServicesPage(),
      notFound: this.generateLanding404Page()
    };
  }
}

module.exports = FileGenerator;