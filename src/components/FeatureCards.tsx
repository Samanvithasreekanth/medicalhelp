"use client";

import { useDictionary } from "./DictionaryContext";

export default function FeatureCards() {
  const dictionary = useDictionary();
  const t = dictionary.features;

  const features = [
    {
      title: t.f1_title,
      description: t.f1_desc,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <path d="M9 15l2 2 4-4"></path>
        </svg>
      )
    },
    {
      title: t.f2_title,
      description: t.f2_desc,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    },
    {
      title: t.f3_title,
      description: t.f3_desc,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <path d="M9 12l2 2 4-4"></path>
        </svg>
      )
    }
  ];

  return (
    <section id="features" className="container py-xl">
      <div className="text-center" style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "2.25rem", color: "var(--primary-dark)", marginBottom: "1rem" }}>{t.title}</h2>
        <p className="text-muted" style={{ fontSize: "1.125rem", maxWidth: "800px", margin: "0 auto" }}>
          {t.subtitle}
        </p>
      </div>
      
      <div className="grid grid-cols-3 gap-lg">
        {features.map((feature, idx) => (
          <div key={idx} className="card" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ padding: "1rem", backgroundColor: "var(--secondary)", borderRadius: "var(--radius-lg)", alignSelf: "flex-start" }}>
              {feature.icon}
            </div>
            <h3 style={{ fontSize: "1.25rem" }}>{feature.title}</h3>
            <p className="text-muted">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
