const fs = require('fs');
let file = 'src/app/layout.tsx';
let code = fs.readFileSync(file, 'utf8');

// The layout might be a server component importing a client component
// Let's check the imports
console.log(code.includes('ThemeProvider'));
