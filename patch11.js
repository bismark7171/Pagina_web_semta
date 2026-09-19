const fs = require('fs');
const file = 'src/components/layout/Header.tsx';
let code = fs.readFileSync(file, 'utf8');

const theCode = `  const isMatch = (href: string) => {
    return pathname === href.split("#")[0];
  };`;

const safeCode = `  const isMatch = (href: string) => {
    if (!pathname) return false;
    return pathname === href.split("#")[0];
  };`;

code = code.replace(theCode, safeCode);
fs.writeFileSync(file, code);
