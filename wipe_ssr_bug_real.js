const fs = require('fs');

// The issue IS NOT HEADER. The error happens even with a trivial header.
// It must be another component in the layout!
// Let's check layout.tsx.
let file = 'src/app/layout.tsx';
let code = fs.readFileSync(file, 'utf8');

// I will make EVERY component in the layout dynamic to find the culprit.
const dynamicImports = `
import dynamic from 'next/dynamic';
import { ThemeProvider, ThemeScript } from "@/components/layout/ThemeProvider";
import { ImageViewerProvider } from "@/components/ui";

const Header = dynamic(() => import("@/components/layout/Header"), { ssr: false });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: false });
const FloatingChat = dynamic(() => import("@/components/layout/FloatingChat"), { ssr: false });
const BackToTop = dynamic(() => import("@/components/layout/BackToTop"), { ssr: false });
const SplashScreen = dynamic(() => import("@/components/layout/SplashScreen"), { ssr: false });
`;

code = code.replace(/import Header from "@\/components\/layout\/Header";/, "");
code = code.replace(/import Footer from "@\/components\/layout\/Footer";/, "");
code = code.replace(/import FloatingChat from "@\/components\/layout\/FloatingChat";/, "");
code = code.replace(/import { BackToTop } from "@\/components\/layout\/BackToTop";/, "");
code = code.replace(/import { SplashScreen } from "@\/components\/layout\/SplashScreen";/, dynamicImports);

fs.writeFileSync(file, code);
