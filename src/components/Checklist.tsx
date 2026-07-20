"use client";

import { useDictionary } from "./DictionaryContext";

export default function Checklist() {
  const dictionary = useDictionary();
  const t = dictionary.checklist;

  const documents = t.documents || [];

  return (
    <div style={{ backgroundColor: "#f1f5f9", padding: "1rem", borderRadius: "var(--radius-md)", border: "1px dashed var(--text-muted)" }}>
      <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "var(--radius-sm)", boxShadow: "var(--shadow-sm)", fontFamily: "monospace" }}>
        <div style={{ textAlign: "center", borderBottom: "2px solid #000", paddingBottom: "1rem", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", textTransform: "uppercase", letterSpacing: "2px" }}>{t.title}</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>{t.subtitle}</p>
        </div>
        
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontWeight: "bold", marginBottom: "1rem" }}>{t.instructionsTitle}</p>
          <p style={{ fontSize: "0.875rem" }}>{t.instructions}</p>
        </div>

        <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {documents.map((doc, idx) => (
            <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
              <div style={{ width: "20px", height: "20px", border: "2px solid #000", flexShrink: 0, marginTop: "2px" }}></div>
              <span style={{ fontSize: "1rem", lineHeight: "1.4" }}>{doc}</span>
            </li>
          ))}
        </ul>
        
        <div style={{ marginTop: "3rem", display: "flex", justifyContent: "space-between", fontSize: "0.875rem", borderTop: "1px solid #e2e8f0", paddingTop: "1rem" }}>
          <div>Generated on: {new Date().toLocaleDateString()}</div>
          <div>Ref: GH-{Math.floor(Math.random() * 100000)}</div>
        </div>
      </div>
      
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <button className="btn btn-secondary" onClick={() => window.print()} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          {t.print}
        </button>
      </div>
    </div>
  );
}
