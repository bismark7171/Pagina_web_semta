const fs = require('fs');
const file = 'src/components/layout/Header.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(/variant="outlined"/g, 'variant="outline"');

fs.writeFileSync(file, code);
