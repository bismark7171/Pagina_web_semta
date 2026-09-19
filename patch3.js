const fs = require('fs');
const file = 'src/components/layout/Header.tsx';
let code = fs.readFileSync(file, 'utf8');

const newHook = `  const [hash, setHash] = useState("");

  useEffect(() => {
    setHash(window.location.hash);
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const isMatch = (href: string) => {
    if (!isMounted) return pathname === href.split("#")[0];
    
    if (href.includes("#")) {
      const [path, h] = href.split("#");
      return pathname === path && hash === "#" + h;
    }
    return pathname === href;
  };`;

const oldHook = `  const [hash, setHash] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHash(window.location.hash);
      const onHashChange = () => setHash(window.location.hash);
      window.addEventListener("hashchange", onHashChange);
      return () => window.removeEventListener("hashchange", onHashChange);
    }
  }, [pathname]);

  const isMatch = (href: string) => {
    if (href.includes("#")) {
      const [path, h] = href.split("#");
      // Si el href es solo "/#algo" el path sera "/"
      return pathname === path && hash === "#" + h;
    }
    return pathname === href;
  };`;

code = code.replace(oldHook, newHook);
fs.writeFileSync(file, code);
