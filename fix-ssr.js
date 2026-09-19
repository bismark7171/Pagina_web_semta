const fs = require('fs');
const file = 'src/components/layout/Header.tsx';
let code = fs.readFileSync(file, 'utf8');

const clientOnlyWrapper = `  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
`;

code = code.replace('  const pathname = usePathname();', '  const pathname = usePathname();\n' + clientOnlyWrapper);

code = code.replace(
/return pathname === path && hash === "#" \+ h;/g,
`return pathname === path && (isClient ? hash === "#" + h : false);`
);

fs.writeFileSync(file, code);
