const fs = require('fs');
const file = 'src/components/layout/Header.tsx';
let code = fs.readFileSync(file, 'utf8');

const hookToRevert = `  const isMatch = (href: string) => {
    // Simplificado para evitar hydration mismatches y hooks complejos en SSR
    if (href.includes("#")) {
      const path = href.split("#")[0];
      return pathname === path && typeof window !== "undefined" && window.location.hash === "#" + href.split("#")[1];
    }
    return pathname === href;
  };`;

const originalLogic = `  const [hash, setHash] = useState("");

  useEffect(() => {
    setHash(window.location.hash);
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]);

  const isMatch = (href: string) => {
    if (href.includes("#")) {
      const [path, h] = href.split("#");
      return pathname === path && hash === "#" + h;
    }
    return pathname === href;
  };`;

code = code.replace(hookToRevert, originalLogic);
fs.writeFileSync(file, code);
