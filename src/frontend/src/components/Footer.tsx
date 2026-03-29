import { Music } from "lucide-react";
import {
  SiDiscord,
  SiGithub,
  SiInstagram,
  SiReddit,
  SiTelegram,
  SiTiktok,
  SiX,
  SiYoutube,
} from "react-icons/si";
import { SOCIAL_LINKS } from "../config/app.config";
import { useLanguage } from "../contexts/LanguageContext";
import { triggerSticker } from "./StickerOverlay";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  const handleLogoClick = () => {
    triggerSticker();
    window.open(SOCIAL_LINKS.creamcoin, "_blank", "noopener,noreferrer");
  };

  const socialLinks = [
    { icon: SiX, label: "X (Twitter)", href: SOCIAL_LINKS.x },
    { icon: SiDiscord, label: "Discord", href: SOCIAL_LINKS.discord },
    { icon: SiTelegram, label: "Telegram", href: SOCIAL_LINKS.telegram },
    { icon: SiReddit, label: "Reddit", href: SOCIAL_LINKS.reddit },
    { icon: SiYoutube, label: "YouTube", href: SOCIAL_LINKS.youtube },
    { icon: SiGithub, label: "GitHub", href: SOCIAL_LINKS.github },
    { icon: SiTiktok, label: "TikTok", href: SOCIAL_LINKS.tiktok },
    { icon: SiInstagram, label: "Instagram", href: SOCIAL_LINKS.instagram },
  ];

  const legalLinks = [
    { key: "footer_impressum" as const, href: "/" },
    { key: "footer_datenschutz" as const, href: "/" },
    { key: "footer_terms" as const, href: "/" },
    { key: "footer_kontakt" as const, href: "/" },
  ];

  return (
    <footer className="border-t border-border bg-card mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="font-display font-bold text-xl mb-2">
              <span style={{ color: "#D4AF37" }}>Creamy</span>
              <span className="text-foreground">Crypto</span>
              <span style={{ color: "#D4AF37" }}>AI</span>
              <span className="text-foreground">.org</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("footer_tagline")}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              {t("footer_legal")}
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-ocid={`footer.${link.key}.link`}
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
              cREAMY cOMMUNITY
              <button
                type="button"
                onClick={handleLogoClick}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                aria-label="cREAMY cOMMUNITY"
                title="cREAMY cOMMUNITY"
              >
                <img
                  src="/assets/uploads/e6149769-dde7-4cf9-a544-1cede158fbd1-019d3653-1931-72e3-9b25-c3751a055916-1.png"
                  alt="cREAMY cOMMUNITY Logo"
                  className="h-10 w-10 object-contain"
                />
              </button>
            </h4>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                  data-ocid={`footer.${label.toLowerCase().replace(/[^a-z0-9]/g, "")}.link`}
                >
                  <Icon size={16} />
                </a>
              ))}
              {/* Suno */}
              <a
                href={SOCIAL_LINKS.suno}
                aria-label="Suno"
                title="Suno"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 items-center justify-center gap-1 rounded-lg border border-border bg-background px-2.5 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors text-xs font-medium"
                data-ocid="footer.suno.link"
              >
                <Music size={14} />
                Suno
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>
            © {year} CreamyCryptoAI.org · Future Compass Lab. All rights
            reserved.
          </span>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
