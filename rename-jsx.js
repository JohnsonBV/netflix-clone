const fs = require("fs");
const path = require("path");

// Folder to scan
const SRC_DIR = path.join(__dirname, "src");

// Recursively scan directory
function scanDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
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

        // Update imports in all src files
        updateImports(path.basename(fullPath, ".js"), path.basename(newPath));
      }
    }
  });
}

// Update imports in all src files
function updateImports(oldName, newName) {
  const files = fs.readdirSync(SRC_DIR);
  files.forEach((file) => {
    const fullPath = path.join(SRC_DIR, file);
    const stats = fs.statSync(fullPath);

    if (stats.isFile() && /\.(js|jsx)$/.test(fullPath)) {
      let content = fs.readFileSync(fullPath, "utf-8");
      const regex = new RegExp(`(['"\`])\\./${oldName}\\1`, "g");
      if (regex.test(content)) {
        content = content.replace(regex, `"./${newName}"`);
        fs.writeFileSync(fullPath, content, "utf-8");
        console.log(`Updated imports in: ${fullPath}`);
      }
    }
  });
}

scanDir(SRC_DIR);

console.log("✅ Done renaming JSX files and updating imports.");
