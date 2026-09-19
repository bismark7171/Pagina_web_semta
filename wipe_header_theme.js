const fs = require('fs');
let file = 'src/components/layout/Header.tsx';
let code = fs.readFileSync(file, 'utf8');

const newHeader = `  const themeCtx = useTheme();
  const theme = themeCtx?.theme || "light";
  const toggleTheme = themeCtx?.toggleTheme || (() => {});`;

const oldHeader = `  const { theme, toggleTheme } = useTheme();`;

code = code.replace(newHeader, oldHeader);

// We need to restore the pathname logic too to original
const dynamicMatch = `  const isMatch = (href: string) => {
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : (pathname || '/');
    return currentPath === href.split("#")[0];
  };`;

const originalMatch = `  const isMatch = (href: string) => {
    if (!pathname) return false;
    return pathname === href.split("#")[0];
  };`;

code = code.replace(dynamicMatch, originalMatch);

// Ensure it starts with "use client"
if(!code.includes('"use client"')) {
    code = '"use client";\n' + code;
}

fs.writeFileSync(file, code);
