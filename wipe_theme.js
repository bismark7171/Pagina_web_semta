const fs = require('fs');
const file = 'src/components/layout/ThemeProvider.tsx';
let code = fs.readFileSync(file, 'utf8');

const theCode = `  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
      localStorage.setItem("semta-theme", theme);
    }
  }, [theme]);`;

const safeCode = `  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
        localStorage.setItem("semta-theme", theme);
      }
    } catch(e) {}
  }, [theme]);`;

code = code.replace(theCode, safeCode);
fs.writeFileSync(file, code);
