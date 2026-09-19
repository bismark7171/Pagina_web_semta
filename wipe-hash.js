const fs = require('fs');
const file = 'src/components/layout/Header.tsx';
let code = fs.readFileSync(file, 'utf8');

const theCode = `  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [hash, setHash] = useState("");
  useEffect(() => {
    setHash(window.location.hash);
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]);

  const isMatch = (href: string) => {
    if (href.includes("#")) {
      const [path, h] = href.split("#");
      return pathname === path && (isClient ? hash === "#" + h : false);
    }
    return pathname === href;
  };`;

const simpleCode = `  const isMatch = (href: string) => {
    return pathname === href.split("#")[0];
  };`;

code = code.replace(theCode, simpleCode);
fs.writeFileSync(file, code);
