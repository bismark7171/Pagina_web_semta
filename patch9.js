const fs = require('fs');
const file = 'src/components/layout/Header.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(/icon="mail"/g, 'icono="mail"');

fs.writeFileSync(file, code);
