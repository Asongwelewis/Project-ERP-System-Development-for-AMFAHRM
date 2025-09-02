const fs = require('fs');
const path = require('path');

// Define the new directory structure mappings
const pathMappings = {
  // Old paths to new paths
  'components/ProtectedRoute': 'components/auth/ProtectedRoute',
  'components/LoadingSpinner': 'components/common/LoadingSpinner',
  'components/Navbar': 'components/layout/Navbar',
  'components/Sidebar': 'components/layout/Sidebar',
  'components/Layout': 'components/layout/Layout',
  'services/authService': 'services/auth/authService',
  'services/studentService': 'services/students/studentService',
  'services/userService': 'services/users/userService',
};

// File extensions to process
const fileExtensions = ['.js', '.jsx', '.ts', '.tsx'];

// Function to process a single file
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;

    // Update import/require paths
    for (const [oldPath, newPath] of Object.entries(pathMappings)) {
      // Handle both single and double quotes
      const importRegex = new RegExp(`(['"])${oldPath.replace(/\//g, '\\/')}(['"])`, 'g');
      const newContent = content.replace(importRegex, `$1${newPath}$2`);
      
      if (newContent !== content) {
        updated = true;
        content = newContent;
      }
    }

    // Save the file if it was updated
    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

// Function to walk through directories
function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and build directories
      if (file !== 'node_modules' && file !== 'build' && !file.startsWith('.')) {
        walkDir(fullPath);
      }
    } else if (fileExtensions.includes(path.extname(file).toLowerCase())) {
      processFile(fullPath);
    }
  });
}

// Start processing from the src directory
const srcDir = path.join(__dirname, '..', 'src');
console.log('Updating import paths...');
walkDir(srcDir);
console.log('Import paths update complete!');
