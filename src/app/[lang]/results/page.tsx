"use client";

import ResultsDashboard from "@/components/ResultsDashboard";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDictionary } from "@/components/DictionaryContext";

export default function ResultsPage() {
  const pathname = usePathname();
  const currentLang = pathname.split("/")[1] || "en";
  const dictionary = useDictionary();
  const t = dictionary.resultsPage;

  return (
    <div className="container py-xl">
      <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "2.5rem", color: "var(--primary-dark)", marginBottom: "0.5rem" }}>
            {t.title}
          </h1>
          <p className="text-muted" style={{ fontSize: "1.125rem" }}>
            {t.subtitle}
          </p>
        </div>
        <Link href={`/${currentLang}/eligibility`} className="btn btn-secondary">
          {t.recalculate}
        </Link>
      </div>
      
      <ResultsDashboard />
    </div>
  );
}
