const fs = require('fs');
let file = 'src/components/layout/Header.tsx';
let code = fs.readFileSync(file, 'utf8');

// Undo the mounted trick since it's dynamic now, but keep standard client setup
code = code.replace(/  const \[mounted, setMounted\] = useState\(false\);\n  \n  useEffect\(\(\) => {\n    setMounted\(true\);\n  }, \[\]\);\n\n/g, "");
code = code.replace(/  if \(!mounted\) return null; \/\/ Avoid hydration mismatch on server\n\n/g, "");

fs.writeFileSync(file, code);
