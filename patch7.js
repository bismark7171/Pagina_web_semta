const fs = require('fs');
const file = 'src/components/layout/Header.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(/<MaterialIcon\n\s*icon=/g, '<MaterialIcon\n                      name=');
code = code.replace(/<MaterialIcon icon=/g, '<MaterialIcon name=');

fs.writeFileSync(file, code);
