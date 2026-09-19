const fs = require('fs');
let file = 'src/app/layout.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace("import dynamic from 'next/dynamic';", "");
code = code.replace('const Header = dynamic(() => import("@/components/layout/Header"), { ssr: false });', 'import Header from "@/components/layout/Header";');
code = code.replace('const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: false });', 'import Footer from "@/components/layout/Footer";');
code = code.replace('const FloatingChat = dynamic(() => import("@/components/layout/FloatingChat"), { ssr: false });', 'import FloatingChat from "@/components/layout/FloatingChat";');
code = code.replace('const BackToTop = dynamic(() => import("@/components/layout/BackToTop"), { ssr: false });', 'import { BackToTop } from "@/components/layout/BackToTop";');
code = code.replace('const SplashScreen = dynamic(() => import("@/components/layout/SplashScreen"), { ssr: false });', 'import { SplashScreen } from "@/components/layout/SplashScreen";');

fs.writeFileSync(file, code);

// Also restore Header.tsx
fs.copyFileSync('src/components/layout/Header.backup.tsx', 'src/components/layout/Header.tsx');
