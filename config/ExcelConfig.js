// ================================================
// EXCEL CONFIGURATION HANDLER
// ================================================

const fs = require('fs-extra');
const path = require('path');
const XLSX = require('xlsx');

class ExcelConfig {
  constructor(configFile) {
    this.configFile = configFile;
    this.config = null;
  }

  findConfig() {
    const paths = [this.configFile, path.join(process.cwd(), this.configFile)];
    for (const p of paths) {
      if (fs.existsSync(p)) return p;
    }
    return null;
  }

  createSampleExcel() {
    const data = {
      GLOBAL: [
        { key: 'app_name', value: 'Universal Management System' },
        { key: 'organization', value: 'Demo Organization' },
        { key: 'ui_library', value: 'antd' },
        { key: 'theme_color', value: '#1890ff' },
        { key: 'sidebar_type', value: 'fixed' },
        { key: 'auth_enabled', value: 'YES' },
        { key: 'currency', value: 'NPR' },
        { key: 'timezone', value: 'Asia/Kathmandu' }
      ],
      ROLES: [
        { role_id: 'super_admin', name: 'Super Admin', permissions: '*' },
        { role_id: 'admin', name: 'Admin', permissions: 'read.*,write.*,delete.*' },
        { role_id: 'user', name: 'User', permissions: 'read.own,write.own' }
      ],
      PAGES: [
        { page_id: 'dashboard', title: 'ड्यासबोर्ड', icon: '📊', route: '/dashboard', permissions: 'dashboard.view', order: 1 },
        { page_id: 'users', title: 'प्रयोगकर्ताहरू', icon: '👥', route: '/users', permissions: 'users.*', order: 2 },
        { page_id: 'products', title: 'सामानहरू', icon: '📦', route: '/products', permissions: 'products.*', order: 3 }
      ],
      COLUMNS: [
        { page_id: 'users', field: 'id', label: 'आईडी', type: 'number', sortable: 'YES', width: 80 },
        { page_id: 'users', field: 'name', label: 'नाम', type: 'string', sortable: 'YES', width: 150 },
        { page_id: 'users', field: 'email', label: 'इमेल', type: 'email', width: 200 },
        { page_id: 'products', field: 'id', label: 'आईडी', type: 'number', width: 80 },
        { page_id: 'products', field: 'name', label: 'नाम', type: 'string', width: 200 }
      ],
      FORM_FIELDS: [
        { page_id: 'users', field: 'name', label: 'नाम', type: 'text', required: 'YES', order: 1 },
        { page_id: 'users', field: 'email', label: 'इमेल', type: 'email', required: 'YES', order: 2 },
        { page_id: 'products', field: 'name', label: 'सामानको नाम', type: 'text', required: 'YES', order: 1 },
        { page_id: 'products', field: 'price', label: 'मूल्य', type: 'number', order: 2 }
      ],
      ACTIONS: [
        { page_id: 'users', action_type: 'edit', label: 'सम्पादन', icon: '✏️', permission: 'users.update' },
        { page_id: 'users', action_type: 'delete', label: 'मेट्नुहोस्', icon: '🗑️', permission: 'users.delete' }
      ]
    };

    const wb = XLSX.utils.book_new();
    Object.entries(data).forEach(([sheet, rows]) => {
      XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows), sheet);
    });
    XLSX.writeFile(wb, 'app-config.xlsx');
  }

  loadConfig() {
    const filePath = this.findConfig();
    if (!filePath) {
      this.createSampleExcel();
      console.log('✅ Universal Config Excel बन्यो: app-config.xlsx');
      console.log('   अब भरिएको Excel ल्याउनुहोस्!\n');
      process.exit();
    }

    const wb = XLSX.readFile(filePath);
    const config = {};
    wb.SheetNames.forEach(s => {
      config[s] = XLSX.utils.sheet_to_json(wb.Sheets[s]);
    });
    
    this.config = config;
    return config;
  }

  getConfig() {
    if (!this.config) {
      return this.loadConfig();
    }
    return this.config;
  }

  getUILibrary() {
    const global = this.getConfig().GLOBAL || [];
    return global.find(g => g.key === 'ui_library')?.value || 'antd';
  }

  getAppName() {
    const global = this.getConfig().GLOBAL || [];
    return global.find(g => g.key === 'app_name')?.value || 'Generated App';
  }

  getPages() {
    return this.getConfig().PAGES || [];
  }

  getColumns(pageId) {
    const columns = this.getConfig().COLUMNS || [];
    return columns.filter(c => c.page_id === pageId);
  }

  getFormFields(pageId) {
    const formFields = this.getConfig().FORM_FIELDS || [];
    return formFields.filter(f => f.page_id === pageId);
  }

  getGlobalValue(key) {
    const global = this.getConfig().GLOBAL || [];
    return global.find(g => g.key === key)?.value;
  }
}

module.exports = ExcelConfig;