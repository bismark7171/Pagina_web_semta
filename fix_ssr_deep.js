const fs = require('fs');
let file = 'src/components/layout/ThemeProvider.tsx';
let code = fs.readFileSync(file, 'utf8');

const hook = `export function useTheme() {
  return useContext(ThemeContext);
}`;

const safeHook = `export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    // Provide fallback during SSR
    return {
      theme: "light",
      toggleTheme: () => {},
      setTheme: () => {}
    };
  }
  return context;
}`;

code = code.replace(hook, safeHook);
fs.writeFileSync(file, code);
