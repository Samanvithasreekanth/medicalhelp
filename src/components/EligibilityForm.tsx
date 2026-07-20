"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDictionary } from "./DictionaryContext";

export default function EligibilityForm() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = pathname.split("/")[1] || "en";
  const dictionary = useDictionary();
  const t = dictionary.eligibilityPage;

  const [formData, setFormData] = useState({
    age: "",
    income: "",
    category: "General",
    disability: "no",
    area: "Urban",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/${currentLang}/results`);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }} className="card">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="age" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            {t.ageLabel}
          </label>
          <input
            type="number"
            id="age"
            name="age"
            className="form-control"
            value={formData.age}
            onChange={handleChange}
            placeholder={t.agePlaceholder}
            required
            min="1"
            max="120"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="income" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path></svg>
            {t.incomeLabel}
          </label>
          <input
            type="number"
            id="income"
            name="income"
            className="form-control"
            value={formData.income}
            onChange={handleChange}
            placeholder={t.incomePlaceholder}
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="category" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            {t.categoryLabel}
          </label>
          <select
            id="category"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="General">{t.categoryOptions.General}</option>
            <option value="OBC">{t.categoryOptions.OBC}</option>
            <option value="SC">{t.categoryOptions.SC}</option>
            <option value="ST">{t.categoryOptions.ST}</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="disability" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            {t.disabilityLabel}
          </label>
          <select
            id="disability"
            name="disability"
            className="form-control"
            value={formData.disability}
            onChange={handleChange}
          >
            <option value="no">{t.disabilityOptions.no}</option>
            <option value="yes">{t.disabilityOptions.yes}</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="area" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            {t.areaLabel}
          </label>
          <select
            id="area"
            name="area"
            className="form-control"
            value={formData.area}
            onChange={handleChange}
          >
            <option value="Urban">{t.areaOptions.Urban}</option>
            <option value="Rural">{t.areaOptions.Rural}</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: "1.5rem", display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
          {t.submitBtn}
        </button>
      </form>
    </div>
  );
}
