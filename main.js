// ================================================
// UNIVERSAL EXCEL-BASED APP GENERATOR - MAIN ENTRY
// ================================================

const { execSync } = require('child_process');
const ProjectGenerator = require('./generators/ProjectGenerator');

class UniversalAppGenerator {
  constructor(configFile = 'app-config.xlsx') {
    console.clear();
    console.log('🚀 UNIVERSAL EXCEL-BASED APP GENERATOR');
    console.log('   Excel बाट कुनै पनि App Generate!\n');
    
    this.projectDir = 'Generated-App';
    this.configFile = configFile;
    this.run();
  }

  async run() {
    const generator = new ProjectGenerator(this.configFile, this.projectDir);
    await generator.generate();
    await this.installDependencies();
    this.showSuccess();
  }

  async installDependencies() {
    console.log('\n📦 Installing dependencies...');
    process.chdir(this.projectDir);
    try {
      execSync('npm install', { stdio: 'inherit' });
    } catch (error) {
      console.log('⚠️  Installation had warnings');
    }
  }

  showSuccess() {
    console.log('\n🚀 UNIVERSAL APP GENERATED SUCCESSFULLY!');
    console.log('\n✅ What\'s Included:');
    console.log('   • Complete React + TypeScript App');
    console.log('   • Zustand State Management');
    console.log('   • React Router v6');
    console.log('   • Authentication System');
    console.log('   • Role-Based Permissions');
    console.log('   • Responsive Layout');
    console.log('   • Custom Hooks (useFetch, usePermission)');
    console.log('   • API Service Layer');
    console.log('   • Form Validation');
    console.log('   • Table Components');
    console.log('   • Excel-Based Configuration');
    
    console.log('\n📊 Excel Configuration Sheets:');
    console.log('   1. GLOBAL - App settings');
    console.log('   2. ROLES - User roles & permissions');
    console.log('   3. PAGES - Application pages');
    console.log('   4. COLUMNS - Table columns for each page');
    console.log('   5. FORM_FIELDS - Form inputs for each page');
    console.log('   6. ACTIONS - Table actions');
    
    console.log('\n🎯 How to Create Different Apps:');
    console.log('   For School Management:');
    console.log('   - Add pages: students, teachers, classes, exams');
    console.log('   - Add columns for each page in COLUMNS sheet');
    console.log('   - Define form fields in FORM_FIELDS sheet');
    
    console.log('   For Hostel Management:');
    console.log('   - Add pages: rooms, bookings, payments, complaints');
    console.log('   - Add room types, payment methods in GLOBAL');
    
    console.log('   For Hospital Management:');
    console.log('   - Add pages: patients, doctors, appointments, prescriptions');
    
    console.log('\n🚀 Run the App:');
    console.log('   cd Generated-App');
    console.log('   npm run dev');
    
    console.log('\n🔧 To Generate Another App:');
    console.log('   1. Edit app-config.xlsx file');
    console.log('   2. Update pages, columns, forms');
    console.log('   3. Run: node UniversalAppGenerator.js app-config.xlsx');
    console.log('   4. Enter new project directory name when prompted');
    
    console.log('\n💡 Pro Tips:');
    console.log('   • Developer can modify any generated file');
    console.log('   • All components are customizable');
    console.log('   • Add new hooks in src/hooks/');
    console.log('   • Extend store in src/store/');
    console.log('   • Modify styles in src/layouts/Layout.css');
  }
}

// Run generator
if (require.main === module) {
  const configFile = process.argv[2] || 'app-config.xlsx';
  new UniversalAppGenerator(configFile);
}

module.exports = UniversalAppGenerator;