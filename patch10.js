const fs = require('fs');
const file = 'src/components/layout/Header.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(/variant="filled"/g, 'variant="primary"');

fs.writeFileSync(file, code);
