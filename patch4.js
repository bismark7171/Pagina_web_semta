const fs = require('fs');
const file = 'src/components/layout/Header.tsx';
let code = fs.readFileSync(file, 'utf8');

const oldCode = `  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const isMatch = (href: string) => {
    if (!isMounted) return pathname === href.split("#")[0];
    
    if (href.includes("#")) {
      const [path, h] = href.split("#");
      return pathname === path && hash === "#" + h;
    }
    return pathname === href;
  };`;

const newCode = `  const isMatch = (href: string) => {
    // Simplificado para evitar hydration mismatches y hooks complejos en SSR
    if (href.includes("#")) {
      const path = href.split("#")[0];
      return pathname === path && typeof window !== "undefined" && window.location.hash === "#" + href.split("#")[1];
    }
    return pathname === href;
  };`;

code = code.replace(oldCode, newCode);
fs.writeFileSync(file, code);
