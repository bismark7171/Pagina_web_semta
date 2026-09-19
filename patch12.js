const fs = require('fs');
const file = 'src/components/layout/Header.tsx';
let code = fs.readFileSync(file, 'utf8');

const errorLine = `  const isMatch = (href: string) => {
    return pathname === href.split("#")[0];
  };`;

const safeLine = `  const isMatch = (href: string) => {
    if (!pathname) return false;
    return pathname === href.split("#")[0];
  };`;

code = code.replace(errorLine, safeLine);
fs.writeFileSync(file, code);
