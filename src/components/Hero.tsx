"use client";

import Link from "next/link";
import { useDictionary } from "./DictionaryContext";

export default function Hero() {
  const dictionary = useDictionary();
  const t = dictionary.hero;

  return (
    <section className="hero-section" style={{ backgroundColor: "var(--secondary)", overflow: "hidden", position: "relative" }}>
      <style>{`
        .hero-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
          padding: 4rem var(--spacing-sm);
        }
        
        .hero-text {
          flex: 1 1 100%;
          z-index: 2;
          order: 2;
          text-align: center;
        }

        .hero-image-wrapper {
          flex: 1 1 100%;
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          order: 1;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }

        @media (min-width: 992px) {
          .hero-container {
            flex-direction: row;
            text-align: left;
          }
          .hero-text {
            order: 1;
            flex: 1 1 500px;
            text-align: left;
          }
          .hero-image-wrapper {
            order: 2;
            flex: 1 1 500px;
          }
        }
          
        .hero-badge {
          display: inline-block;
          margin-bottom: 1.5rem;
          padding: 0.5rem 1rem;
          background-color: var(--primary);
          color: white;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.875rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          animation: fadeIn 1s ease-out;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          line-height: 1.15;
          margin-bottom: 1.5rem;
          color: var(--primary-dark);
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        
        .hero-desc {
          font-size: 1.25rem;
          line-height: 1.6;
          margin-bottom: 2.5rem;
          max-width: 600px;
          color: #4b5563;
        }
        
        @media (max-width: 991px) {
          .hero-desc {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-actions {
            justify-content: center;
          }
        }
      `}</style>
      <div className="container hero-container">
        <div className="hero-text">
          <span className="hero-badge">{t.badge}</span>
          <h1 className="hero-title">
            {t.title}
          </h1>
          <p className="hero-desc">
            {t.subtitle}
          </p>
          <div className="flex gap-sm hero-actions" style={{ flexWrap: "wrap" }}>
            <Link href="eligibility" className="btn btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "1.125rem", borderRadius: "12px", fontWeight: 600, boxShadow: "0 10px 15px -3px rgba(46, 125, 50, 0.3)" }}>
              {t.checkEligibility}
            </Link>
            <Link href="#features" className="btn btn-secondary" style={{ padding: "1rem 2.5rem", fontSize: "1.125rem", borderRadius: "12px", fontWeight: 600 }}>
              {t.learnMore}
            </Link>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", maxWidth: "600px", borderRadius: "24px", overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 8px rgba(255,255,255,0.5)" }}>
            <img
              src="/gov_healthcare_hero.jpg"
              alt="Government Healthcare"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
