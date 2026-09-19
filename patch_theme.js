const fs = require('fs');
const file = 'src/components/layout/ThemeProvider.tsx';
let code = fs.readFileSync(file, 'utf8');

const oldCode = `  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("semta-theme", theme);
  }, [theme]);`;

const newCode = `  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
      localStorage.setItem("semta-theme", theme);
    }
  }, [theme]);`;

code = code.replace(oldCode, newCode);
fs.writeFileSync(file, code);
