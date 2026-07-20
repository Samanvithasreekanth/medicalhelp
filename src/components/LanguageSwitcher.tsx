"use client";

  import { useEffect } from "react";
  import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Keep cookie and localStorage updated with the current language URL parameter
    document.cookie = `NEXT_LOCALE=${currentLang}; path=/; max-age=31536000; SameSite=Lax`;
    localStorage.setItem("NEXT_LOCALE", currentLang);
  }, [currentLang]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
    localStorage.setItem("NEXT_LOCALE", newLang);
    
    // Replace the current language in the pathname
    const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <select
      value={currentLang}
      onChange={handleLanguageChange}
      className="form-control"
      style={{ padding: "0.25rem 2rem 0.25rem 0.75rem", width: "auto", fontSize: "0.875rem" }}
    >
      <option value="en">English</option>
      <option value="hi">हिंदी</option>
      <option value="kn">ಕನ್ನಡ</option>
      <option value="ta">தமிழ்</option>
    </select>
  );
}
