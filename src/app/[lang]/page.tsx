"use client";

import Hero from "@/components/Hero";
import FeatureCards from "@/components/FeatureCards";
import { useDictionary } from "@/components/DictionaryContext";

export default function Home() {
  const dictionary = useDictionary();
  const t = dictionary.info;

  return (
    <>
      <Hero />
      <FeatureCards />
      
      {/* Information Banner */}
      <section style={{ backgroundColor: "var(--primary-dark)", color: "var(--text-light)", padding: "3rem 0" }}>
        <div className="container text-center">
          <h2 style={{ color: "var(--text-light)", marginBottom: "1rem" }}>{t.title}</h2>
          <p style={{ fontSize: "1.125rem", opacity: 0.9, marginBottom: "2rem" }}>
            {t.desc}
          </p>
          <div style={{ display: "inline-block", backgroundColor: "rgba(255,255,255,0.1)", padding: "1rem 2rem", borderRadius: "var(--radius-lg)", border: "1px solid rgba(255,255,255,0.2)" }}>
            <p style={{ margin: 0, fontWeight: 500 }}>{t.privacy}</p>
          </div>
        </div>
      </section>
    </>
  );
}
