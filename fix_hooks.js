const fs = require('fs');
let file = 'src/components/layout/Header.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace("  if (!mounted) return null; // Avoid hydration mismatch on server\n  ", "");
code = code.replace("  return (\n    <header", "  if (!mounted) return null; // Avoid hydration mismatch on server\n\n  return (\n    <header");

fs.writeFileSync(file, code);
