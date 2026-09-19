const fs = require('fs');
const file = 'src/components/layout/Header.tsx';
let code = fs.readFileSync(file, 'utf8');

const hookToRemove = `  const isMatch = (href: string) => {
    if (!pathname) return false;
    return pathname === href.split("#")[0];
  };`;

const originalHook = `  const isMatch = (href: string) => {
    return pathname === href.split("#")[0];
  };`;

code = code.replace(hookToRemove, originalHook);

// Also remove the "use client" if it was corrupted or just verify it
if(!code.includes('"use client";')) {
    code = '"use client";\n' + code;
}

fs.writeFileSync(file, code);
