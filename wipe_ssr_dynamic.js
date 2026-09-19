const fs = require('fs');
let file = 'src/app/layout.tsx';
let code = fs.readFileSync(file, 'utf8');

const originalImport = `import Header from "@/components/layout/Header";`;
const dynamicImport = `import dynamic from 'next/dynamic';\nconst Header = dynamic(() => import("@/components/layout/Header"), { ssr: false });`;

code = code.replace(originalImport, dynamicImport);
fs.writeFileSync(file, code);
