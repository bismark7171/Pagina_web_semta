const fs = require('fs');
const file = 'src/components/layout/Header.tsx';
let code = fs.readFileSync(file, 'utf8');

const hookInject = `  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    setHash(window.location.hash);
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]); // Update hash when pathname changes just in case

  const isMatch = (href: string) => {
    if (href.includes("#")) {
      const [path, h] = href.split("#");
      // Si el href es solo "/#algo" el path sera "/"
      return pathname === path && hash === "#" + h;
    }
    return pathname === href;
  };
`;

code = code.replace('  const pathname = usePathname();', hookInject);

code = code.replace(
/const isCurrentActive =[\s\S]*?\(item\.children && item\.children\.some\(\(c\) => pathname === c\.href\)\);/g,
`const isCurrentActive =
                isMatch(item.href) ||
                (item.children && item.children.some((c) => isMatch(c.href)));`
);

code = code.replace(
/const isSubActive = pathname === sub\.href;/g,
`const isSubActive = isMatch(sub.href);`
);

fs.writeFileSync(file, code);
