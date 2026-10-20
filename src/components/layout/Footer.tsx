import React from "react";
import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { Logo } from "@/components/ui/Logo";
import { footerColumns, footerContact, footerSocials } from "@/data/footer";
import { siteDetails } from "@/data/siteDetails";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (name: string) => {
    switch (name) {
      case "Facebook":
        return <FaFacebook className="size-5" />;
      case "Twitter / X":
        return <FaTwitter className="size-5" />;
      case "YouTube":
        return <FaYoutube className="size-5" />;
      case "Instagram":
        return <FaInstagram className="size-5" />;
      default:
        return <MaterialIcon name="link" className="text-[20px]" />;
    }
  };

  return (
    <footer className="border-t border-bosque bg-bosque text-white transition-colors">
      <div className="mx-auto w-full max-w-container-semta px-gutter-desktop py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.25fr]">
          {/* Columna Institucional */}
          <div className="space-y-6">
            <Logo variant="light" />
            <p className="max-w-sm text-body-sm leading-relaxed text-white/80">
              {siteDetails.siteDescription}
            </p>

            <div className="space-y-3 text-body-xs text-white/80">
              <p className="flex items-center gap-2">
                <MaterialIcon name="place" className="text-[18px] text-primary-fixed" />
                <span>{footerContact.direccion}</span>
              </p>
              <p className="flex items-center gap-2">
                <MaterialIcon name="phone" className="text-[18px] text-primary-fixed" />
                <span>{footerContact.telefono}</span>
              </p>
              <p className="flex items-center gap-2">
                <MaterialIcon name="mail" className="text-[18px] text-primary-fixed" />
                <span>{footerContact.email}</span>
              </p>
            </div>

            <div className="flex gap-4 pt-2">
              {footerSocials.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary-fixed hover:text-bosque"
                  aria-label={`Visitar nuestro ${social.name}`}
                >
                  {getSocialIcon(social.name)}
                </Link>
              ))}
            </div>
          </div>

          {/* Columnas de navegación */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="font-headline-sm text-label-caps uppercase tracking-wider text-primary-fixed">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-white/80 transition-colors hover:text-white hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Columna Newsletter */}
          <NewsletterForm />
        </div>

        {/* Barra inferior */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-8 text-body-xs text-white/60 sm:flex-row">
          <p>
            &copy; {currentYear} SEMTA - Servicios Múltiples de Tecnologías Apropiadas. Personería
            Jurídica reconocida. Bolivia.
          </p>

          <div className="flex items-center gap-4">
            <Link href="/transparencia" className="hover:text-white">
              Rendición de Cuentas
            </Link>
            <span>&middot;</span>
            <Link href="/verificar-certificado" className="hover:text-white">
              Verificador QR
            </Link>
            <span>&middot;</span>
            <Link href="/privacidad" className="hover:text-white">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
