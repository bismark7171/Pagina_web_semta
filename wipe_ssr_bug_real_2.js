const fs = require('fs');
let file = 'src/app/layout.tsx';
let code = fs.readFileSync(file, 'utf8');

// I accidentally duplicated imports.
code = code.replace(`
import dynamic from 'next/dynamic';
import { ThemeProvider, ThemeScript } from "@/components/layout/ThemeProvider";
import { ImageViewerProvider } from "@/components/ui";

const Header = dynamic(() => import("@/components/layout/Header"), { ssr: false });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: false });
const FloatingChat = dynamic(() => import("@/components/layout/FloatingChat"), { ssr: false });
const BackToTop = dynamic(() => import("@/components/layout/BackToTop"), { ssr: false });
const SplashScreen = dynamic(() => import("@/components/layout/SplashScreen"), { ssr: false });
`, `
import dynamic from 'next/dynamic';

const Header = dynamic(() => import("@/components/layout/Header"), { ssr: false });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: false });
const FloatingChat = dynamic(() => import("@/components/layout/FloatingChat"), { ssr: false });
const BackToTop = dynamic(() => import("@/components/layout/BackToTop"), { ssr: false });
const SplashScreen = dynamic(() => import("@/components/layout/SplashScreen"), { ssr: false });
`);

fs.writeFileSync(file, code);
