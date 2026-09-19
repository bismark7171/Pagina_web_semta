const fs = require('fs');

// Looking closely at the Header.tsx components code, there's absolutely NO hook that is conditional.
// The error must be due to the `useTheme` hook itself or something inside it, but we already added fallback.
// Wait, is it possible that `isMatch(sub.href)` inside a map causes a hook error? No, it's just a function.

// Let's completely nuke `Header.tsx` to a simple version to see if Header is actually the culprit.
let file = 'src/components/layout/Header.tsx';
let backupCode = fs.readFileSync(file, 'utf8');
fs.writeFileSync('src/components/layout/Header.backup.tsx', backupCode);

const simpleHeader = `"use client";
import React from "react";
import Link from "next/link";
export default function Header() {
  return <header><Link href="/">Inicio</Link></header>;
}
`;
fs.writeFileSync(file, simpleHeader);
