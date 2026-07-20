import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Link from "next/link";
import { getDictionary, ValidLocale } from "@/dictionaries/getDictionary";
import { DictionaryProvider } from "@/components/DictionaryContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
// import ReadAloudButton from "@/components/ReadAloudButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GovHealth - Healthcare Eligibility Portal",
  description: "Government healthcare services and scheme eligibility portal.",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dictionary = getDictionary((lang as ValidLocale) || "en");

  return (
    <html lang={lang || "en"}>
      <body className={inter.className}>
        <DictionaryProvider dictionary={dictionary}>
          <nav className="navbar">
            <div className="container">
              <Link href={`/${lang}`} className="navbar-brand">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20"></path>
                  <path d="M2 12h20"></path>
                </svg>
                {dictionary.nav.title}
              </Link>
              <div className="flex gap-sm items-center">
                <Link href={`/${lang}`} style={{ marginRight: '1rem', color: 'var(--text-dark)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  {dictionary.nav.home}
                </Link>
                <Link href={`/${lang}/medicine-savings`} style={{ marginRight: '1rem', color: 'var(--text-dark)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 5.8a6 6 0 1 1 8.5 8.5l-8.5 8.5-8.5-8.5a6 6 0 0 1 8.5-8.5z"></path><line x1="4.8" y1="5.8" x2="13.3" y2="14.3"></line></svg>
                  {dictionary.nav.medicineSavings}
                </Link>
                <LanguageSwitcher currentLang={lang} />
{/* <ReadAloudButton currentLang={lang} /> */}
                <Link href={`/${lang}/eligibility`} className="btn btn-primary text-sm" style={{ padding: '0.5rem 1rem', marginLeft: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
                  {dictionary.nav.checkEligibility}
                </Link>
              </div>
            </div>
          </nav>
          <main style={{ minHeight: 'calc(100vh - 70px)' }}>{children}</main>
          <footer style={{ backgroundColor: 'var(--bg-card)', padding: '2rem 0', marginTop: '2rem', borderTop: '1px solid var(--border-color)', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p>&copy; 2026 Government Health Portal. All rights reserved.</p>
          </footer>
        </DictionaryProvider>
      </body>
    </html>
  );
}
