const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "src");

// Recursively scan directories
function scanDir(dir) {
  const entries = fs.readdirSync(dir);
  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      scanDir(fullPath);
    } else if (stats.isFile() && path.extname(fullPath) === ".js") {
      const content = fs.readFileSync(fullPath, "utf-8");
      if (/<[A-Za-z]/.test(content)) {
        // Rename file to .jsx
        const newPath = fullPath.replace(/\.js$/, ".jsx");
        fs.renameSync(fullPath, newPath);
        console.log(`Renamed: ${fullPath} → ${newPath}`);

        // Update imports in all files
        updateImports(path.basename(fullPath, ".js"), path.basename(newPath));
      }
    }
  });
}

// Update import statements in all files inside src
function updateImports(oldName, newName) {
  const files = getAllFiles(SRC_DIR);
  files.forEach((file) => {
    if (/\.(js|jsx)$/.test(file)) {
      let content = fs.readFileSync(file, "utf-8");
      const regex = new RegExp(`(['"\`])\\./${oldName}\\1`, "g");
      if (regex.test(content)) {
        content = content.replace(regex, `"./${newName}"`);
        fs.writeFileSync(file, content, "utf-8");
        console.log(`Updated imports in: ${file}`);
      }
    }
  });
}

// Helper: get all files recursively
function getAllFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir);
  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      results = results.concat(getAllFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  });
  return results;
}

// Run the scan
scanDir(SRC_DIR);
console.log("✅ Done renaming JSX files and updating imports.");
