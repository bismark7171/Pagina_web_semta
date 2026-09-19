const fs = require('fs');

// The error MUST be inside a client component that is imported in layout.tsx.
// Let's replace layout.tsx entirely with the most basic version possible to see if it even compiles.
let file = 'src/app/layout.tsx';
let backupCode = fs.readFileSync(file, 'utf8');
fs.writeFileSync('src/app/layout.backup.tsx', backupCode);

const nuclearLayout = `export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
`;
fs.writeFileSync(file, nuclearLayout);
