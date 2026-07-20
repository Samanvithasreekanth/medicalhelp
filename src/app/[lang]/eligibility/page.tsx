"use client";

import EligibilityForm from "@/components/EligibilityForm";
import { useDictionary } from "@/components/DictionaryContext";

export default function EligibilityPage() {
  const dictionary = useDictionary();
  const t = dictionary.eligibilityPage;

  return (
    <div className="container py-xl">
      <div className="text-center" style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2.5rem", color: "var(--primary-dark)", marginBottom: "1rem" }}>
          {t.title}
        </h1>
        <p className="text-muted" style={{ fontSize: "1.125rem", maxWidth: "600px", margin: "0 auto" }}>
          {t.subtitle}
        </p>
      </div>
      
      <EligibilityForm />
    </div>
  );
}
