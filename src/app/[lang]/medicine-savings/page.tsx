"use client";

import { useState, useEffect } from "react";
import { useDictionary } from "@/components/DictionaryContext";

interface Medicine {
  id: string;
  brandName: string;
  genericName: string;
  dosage: string;
  brandPrice: number;
  genericPrice: number;
  brandMfg: string;
  genericMfg: string;
}

const MEDICINE_DATABASE: Medicine[] = [
  {
    id: "med-1",
    brandName: "Augmentin 625 Duo",
    genericName: "Amoxycillin (500mg) + Clavulanic Acid (125mg)",
    dosage: "625mg",
    brandPrice: 223.50,
    genericPrice: 58.20,
    brandMfg: "GSK Pharmaceuticals",
    genericMfg: "Jan Aushadhi",
  },
  {
    id: "med-2",
    brandName: "Dolo 650",
    genericName: "Paracetamol",
    dosage: "650mg",
    brandPrice: 30.90,
    genericPrice: 9.50,
    brandMfg: "Micro Labs Ltd",
    genericMfg: "Jan Aushadhi",
  },
  {
    id: "med-3",
    brandName: "Lipitor 10mg",
    genericName: "Atorvastatin",
    dosage: "10mg",
    brandPrice: 148.00,
    genericPrice: 24.00,
    brandMfg: "Pfizer India",
    genericMfg: "Jan Aushadhi",
  },
  {
    id: "med-4",
    brandName: "Pantocid 40",
    genericName: "Pantoprazole",
    dosage: "40mg",
    brandPrice: 152.00,
    genericPrice: 21.80,
    brandMfg: "Alkem Laboratories",
    genericMfg: "Jan Aushadhi",
  },
  {
    id: "med-5",
    brandName: "Glycomet GP2",
    genericName: "Metformin (500mg) + Glimepiride (2mg)",
    dosage: "502mg",
    brandPrice: 114.30,
    genericPrice: 32.00,
    brandMfg: "USV Private Ltd",
    genericMfg: "Jan Aushadhi",
  },
  {
    id: "med-6",
    brandName: "Telma 40",
    genericName: "Telmisartan",
    dosage: "40mg",
    brandPrice: 98.00,
    genericPrice: 16.50,
    brandMfg: "Glenmark Pharmaceuticals",
    genericMfg: "Jan Aushadhi",
  },
  {
    id: "med-7",
    brandName: "Rosuvas 10",
    genericName: "Rosuvastatin",
    dosage: "10mg",
    brandPrice: 162.00,
    genericPrice: 28.00,
    brandMfg: "Sun Pharmaceutical Industries",
    genericMfg: "Jan Aushadhi",
  },
  {
    id: "med-8",
    brandName: "Januvia 100mg",
    genericName: "Sitagliptin",
    dosage: "100mg",
    brandPrice: 385.00,
    genericPrice: 82.00,
    brandMfg: "MSD India",
    genericMfg: "Jan Aushadhi",
  },
  {
    id: "med-9",
    brandName: "Volibo 0.3",
    genericName: "Voglibose",
    dosage: "0.3mg",
    brandPrice: 120.00,
    genericPrice: 22.00,
    brandMfg: "Sun Pharmaceutical Industries",
    genericMfg: "Jan Aushadhi",
  },
  {
    id: "med-10",
    brandName: "Thyronorm 100mcg",
    genericName: "Levothyroxine",
    dosage: "100mcg",
    brandPrice: 184.00,
    genericPrice: 42.00,
    brandMfg: "Abbott Healthcare",
    genericMfg: "Jan Aushadhi",
  }
];

export default function MedicineSavings() {
  const dictionary = useDictionary();
  const t = dictionary.medicineSavingsPage;

  const [searchTerm, setSearchTerm] = useState("");
  const [basket, setBasket] = useState<Record<string, number>>({});
  const [filteredMeds, setFilteredMeds] = useState<Medicine[]>(MEDICINE_DATABASE);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = MEDICINE_DATABASE.filter(
      (med) =>
        med.brandName.toLowerCase().includes(term) ||
        med.genericName.toLowerCase().includes(term)
    );
    setFilteredMeds(filtered);
  }, [searchTerm]);

  const addToBasket = (id: string) => {
    setBasket((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const updateQty = (id: string, amount: number) => {
    setBasket((prev) => {
      const newQty = (prev[id] || 0) + amount;
      if (newQty <= 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return {
        ...prev,
        [id]: newQty,
      };
    });
  };

  const removeFromBasket = (id: string) => {
    setBasket((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  // Calculate totals
  const basketItems = Object.entries(basket).map(([id, qty]) => {
    const med = MEDICINE_DATABASE.find((m) => m.id === id)!;
    return { med, qty };
  });

  const totalBrandCost = basketItems.reduce(
    (acc, item) => acc + item.med.brandPrice * item.qty,
    0
  );
  const totalGenericCost = basketItems.reduce(
    (acc, item) => acc + item.med.genericPrice * item.qty,
    0
  );
  const totalSavings = totalBrandCost - totalGenericCost;
  const savingsPct = totalBrandCost > 0 ? (totalSavings / totalBrandCost) * 100 : 0;

  return (
    <div className="container py-xl">
      <style>{`
        .savings-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-top: 2rem;
        }

        @media (min-width: 992px) {
          .savings-grid {
            grid-template-columns: 2fr 1fr;
          }
        }

        .search-box {
          position: relative;
          margin-bottom: 2rem;
        }

        .search-box svg {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .search-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background-color: var(--bg-card);
          font-size: 1rem;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.15);
        }

        .med-card {
          border-radius: var(--radius-md);
          background-color: var(--bg-card);
          padding: 1.5rem;
          border: 1px solid var(--border-color);
          margin-bottom: 1rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .med-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .med-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .mfg-tag {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .price-comparison {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          padding: 1rem;
          background-color: var(--bg-main);
          border-radius: var(--radius-sm);
        }

        .price-box {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .price-box.brand {
          border-right: 1px solid var(--border-color);
          padding-right: 1rem;
        }

        .price-box.generic {
          padding-left: 1rem;
        }

        .discount-badge {
          background-color: #d1e7dd;
          color: #0f5132;
          font-weight: 700;
          font-size: 0.8rem;
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          display: inline-block;
          margin-top: 0.25rem;
        }

        .basket-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .basket-item:last-child {
          border-bottom: none;
        }

        .qty-btn {
          background: none;
          border: 1px solid var(--border-color);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.2s ease;
        }

        .qty-btn:hover {
          background-color: var(--secondary);
          border-color: var(--primary);
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
        }

        .savings-box {
          background-color: var(--secondary);
          border: 2px dashed var(--primary);
          padding: 1.5rem;
          border-radius: var(--radius-md);
          text-align: center;
          margin-top: 1.5rem;
        }
      `}</style>

      <div className="text-center" style={{ marginBottom: "3rem" }}>
        <div style={{ display: "inline-flex", padding: "1rem", backgroundColor: "var(--secondary)", borderRadius: "50%", marginBottom: "1rem" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
        <h1 style={{ fontSize: "2.5rem", color: "var(--primary-dark)", marginBottom: "0.5rem", fontWeight: 800 }}>
          {t.title}
        </h1>
        <p className="text-muted" style={{ fontSize: "1.125rem", maxWidth: "700px", margin: "0 auto" }}>
          {t.subtitle}
        </p>
      </div>

      <div className="savings-grid">
        {/* Left Column: Search & Medicine List */}
        <div>
          <div className="search-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {filteredMeds.map((med) => {
              const discount = Math.round(((med.brandPrice - med.genericPrice) / med.brandPrice) * 100);
              return (
                <div key={med.id} className="med-card">
                  <div className="med-header">
                    <div>
                      <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="7" width="20" height="10" rx="5" ry="5"></rect>
                          <path d="M12 7v10"></path>
                        </svg>
                        {med.brandName}
                      </h3>
                      <p className="mfg-tag">{t.brandLabel}: {med.brandMfg}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span className="badge" style={{ backgroundColor: "var(--secondary)", color: "var(--primary-dark)", fontWeight: 600 }}>
                        {t.tableDosage}: {med.dosage}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p style={{ fontSize: "0.95rem", color: "var(--text-dark)", marginBottom: "0.5rem" }}>
                      <strong>{t.genericLabel}:</strong> {med.genericName}
                    </p>
                    <p className="mfg-tag">{t.manufacturerLabel}: {med.genericMfg}</p>
                  </div>

                  <div className="price-comparison">
                    <div className="price-box brand">
                      <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{t.tableBrand}</span>
                      <strong style={{ fontSize: "1.25rem", color: "#b30000" }}>₹{med.brandPrice.toFixed(2)}</strong>
                    </div>
                    <div className="price-box generic">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{t.tableGeneric}</span>
                        <span className="discount-badge">-{discount}% {t.savingsRate || "Off"}</span>
                      </div>
                      <strong style={{ fontSize: "1.25rem", color: "var(--primary-dark)" }}>₹{med.genericPrice.toFixed(2)}</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => addToBasket(med.id)}
                    className="btn btn-primary"
                    style={{
                      alignSelf: "flex-end",
                      padding: "0.6rem 1.2rem",
                      fontSize: "0.9rem",
                      borderRadius: "8px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem"
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    {t.addToBasket}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Savings Basket */}
        <div>
          <div className="card" style={{ position: "sticky", top: "100px", border: "1px solid var(--border-color)", padding: "1.5rem" }}>
            <h2 style={{ fontSize: "1.5rem", color: "var(--primary-dark)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem", borderBottom: "2px solid var(--secondary)", paddingBottom: "0.75rem" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {t.basketTitle}
              {basketItems.length > 0 && (
                <span className="badge" style={{ backgroundColor: "var(--primary)", color: "white", fontSize: "0.8rem", padding: "0.25rem 0.5rem" }}>
                  {basketItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </h2>

            {basketItems.length === 0 ? (
              <div style={{ textAlign: "center", padding: "2rem 0", color: "var(--text-muted)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "1rem", opacity: 0.5 }}>
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <p>{t.basketEmpty}</p>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", flexDirection: "column", maxHeight: "300px", overflowY: "auto", marginBottom: "1.5rem" }}>
                  {basketItems.map(({ med, qty }) => (
                    <div key={med.id} className="basket-item">
                      <div style={{ flex: 1, marginRight: "1rem" }}>
                        <h4 style={{ fontSize: "0.95rem", color: "var(--primary-dark)", margin: 0 }}>{med.brandName}</h4>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                          {med.genericName.split(" (")[0]}
                        </span>
                      </div>
                      
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <button className="qty-btn" onClick={() => updateQty(med.id, -1)}>-</button>
                        <span style={{ fontWeight: 600, width: "20px", textAlign: "center" }}>{qty}</span>
                        <button className="qty-btn" onClick={() => addToBasket(med.id)}>+</button>
                        
                        <button
                          onClick={() => removeFromBasket(med.id)}
                          style={{ background: "none", border: "none", cursor: "pointer", color: "#dc3545", padding: "0.25rem", marginLeft: "0.5rem" }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" }}>
                  <div className="summary-row">
                    <span style={{ color: "var(--text-muted)" }}>{t.totalBrandCost}:</span>
                    <strong>₹{totalBrandCost.toFixed(2)}</strong>
                  </div>
                  <div className="summary-row">
                    <span style={{ color: "var(--text-muted)" }}>{t.totalGenericCost}:</span>
                    <strong style={{ color: "var(--primary-dark)" }}>₹{totalGenericCost.toFixed(2)}</strong>
                  </div>

                  <div className="savings-box">
                    <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--primary-dark)", fontWeight: 600 }}>
                      {t.totalSavings}
                    </span>
                    <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--primary-dark)", margin: "0.25rem 0" }}>
                      ₹{totalSavings.toFixed(2)}
                    </div>
                    <span className="badge" style={{ backgroundColor: "var(--primary)", color: "white", fontWeight: 700, padding: "0.35rem 0.75rem" }}>
                      {t.savingsPercentage}: {savingsPct.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
