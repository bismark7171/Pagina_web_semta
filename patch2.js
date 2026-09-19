const fs = require('fs');
const file = 'src/components/layout/Header.tsx';
let code = fs.readFileSync(file, 'utf8');

const oldHook = `  const [hash, setHash] = useState("");

  useEffect(() => {
    setHash(window.location.hash);
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]); // Update hash when pathname changes just in case`;

const newHook = `  const [hash, setHash] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHash(window.location.hash);
      const onHashChange = () => setHash(window.location.hash);
      window.addEventListener("hashchange", onHashChange);
      return () => window.removeEventListener("hashchange", onHashChange);
    }
  }, [pathname]);`;

code = code.replace(oldHook, newHook);
fs.writeFileSync(file, code);
