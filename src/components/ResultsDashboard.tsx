"use client";

import Checklist from "./Checklist";
import { useDictionary } from "./DictionaryContext";

export default function ResultsDashboard() {
  const dictionary = useDictionary();
  const t = dictionary.dashboard;

  const schemes = t.schemes || [];
  const insurance = t.insurancePlans || [];
  const loans = t.loansPlans || [];

  return (
    <div className="grid grid-cols-3 gap-lg">
      <div style={{ gridColumn: "span 2" }} className="flex-col gap-lg">
        
        {/* Schemes Section */}
        <section>
          <h2 style={{ fontSize: "1.75rem", color: "var(--primary-dark)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            {t.schemesTitle}
          </h2>
          <div className="flex-col gap-md">
            {schemes.map((scheme, idx) => (
              <div key={idx} className="card" style={{ borderLeft: "4px solid var(--primary)" }}>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>{scheme.name}</h3>
                <div style={{ marginBottom: "1rem" }}>
                  <p><strong>{t.benefits}:</strong> {scheme.benefits}</p>
                  <p><strong>{t.criteria}:</strong> {scheme.criteria}</p>
                </div>
                <div style={{ backgroundColor: "var(--bg-main)", padding: "1rem", borderRadius: "var(--radius-sm)" }}>
                  <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>{t.process}:</p>
                  <ol style={{ paddingLeft: "1.5rem" }}>
                    {scheme.process.map((step, i) => (
                      <li key={i} style={{ marginBottom: "0.25rem", color: "var(--text-muted)" }}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Private Alternatives Section */}
        <section style={{ marginTop: "3rem" }}>
          <h2 style={{ fontSize: "1.75rem", color: "var(--primary-dark)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"></path><path d="M10 21V10a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v11"></path><path d="M5 21V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v15"></path></svg>
            {t.privateOptions}
          </h2>
          <p className="text-muted" style={{ marginBottom: "1.5rem" }}>{t.privateOptionsDesc}</p>
          
          <div className="grid grid-cols-2 gap-md">
            <div className="card">
              <h3 style={{ fontSize: "1.125rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                {t.insurance}
              </h3>
              <ul className="flex-col gap-sm">
                {insurance.map((plan, idx) => (
                  <li key={idx} style={{ backgroundColor: "var(--secondary)", padding: "0.75rem", borderRadius: "var(--radius-sm)" }}>
                    <p style={{ fontWeight: 600 }}>{plan.provider}</p>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{t.coverLabel}: {plan.cover} | {t.premiumLabel}: {plan.premium}</p>
                    <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
                      {plan.tags.map(tag => <span key={tag} className="badge">{tag}</span>)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="card">
              <h3 style={{ fontSize: "1.125rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                {t.loans}
              </h3>
              <ul className="flex-col gap-sm">
                {loans.map((loan, idx) => (
                  <li key={idx} style={{ backgroundColor: "var(--secondary)", padding: "0.75rem", borderRadius: "var(--radius-sm)" }}>
                    <p style={{ fontWeight: 600 }}>{loan.name}</p>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{t.limitLabel}: {loan.limit}</p>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{t.interestLabel}: {loan.interest}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
      
      {/* Sidebar - Checklist */}
      <div style={{ gridColumn: "span 1" }}>
        <div style={{ position: "sticky", top: "100px" }}>
          <Checklist />
        </div>
      </div>
    </div>
  );
}
