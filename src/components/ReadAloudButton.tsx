"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const localDict: Record<string, { readAloud: string; stop: string }> = {
  en: { readAloud: "🔊 Read Aloud", stop: "⏹️ Stop" },
  hi: { readAloud: "🔊 ज़ोर से पढ़ें", stop: "⏹️ रोकें" },
  kn: { readAloud: "🔊 ಗಟ್ಟಿಯಾಗಿ ಓദി", stop: "⏹️ ನಿಲ್ಲಿಸಿ" },
  ta: { readAloud: "🔊 சத்தமாக வாசிக்க", stop: "⏹️ நிறுத்து" },
  te: { readAloud: "🔊 గట్టిగా చదవండి", stop: "⏹️ ఆపండి" },
};

export default function ReadAloudButton({ currentLang }: { currentLang: string }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const pathname = usePathname();

  // Extract language from URL pathname dynamically to ensure it is always up to date
  const pathParts = pathname.split("/");
  const urlLang = pathParts[1];
  const activeLang = localDict[urlLang] ? urlLang : (currentLang || "en");

  // Load voices and listen for changes (Chrome loads voices asynchronously)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    updateVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Cancel speech synthesis when language or page changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [activeLang, pathname]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleSpeech = async () => {
    if (typeof window === "undefined") return;

    // Toggle off if currently speaking
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Cancel any previous speech before starting a new one and wait 100ms
    // to prevent Chrome's immediate cancel-speak race condition.
    window.speechSynthesis.cancel();
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Ensure voices are loaded; wait for onvoiceschanged if empty or incomplete
    const ensureVoices = (): Promise<SpeechSynthesisVoice[]> => {
      return new Promise((resolve) => {
        const checkVoices = (list: SpeechSynthesisVoice[]) => {
          if (!list.length) return false;
          // If activeLang is English, any voice list is fine
          if (activeLang === "en") return true;
          // Check if there is a voice matching activeLang
          const langMatchMap: Record<string, string[]> = {
            en: ["en", "eng"],
            hi: ["hi", "hin"],
            kn: ["kn", "kan"],
            ta: ["ta", "tam"],
            te: ["te", "tel"],
          };
          const prefixes = langMatchMap[activeLang] || [activeLang];
          const hasMatch = list.some(v => {
            const vLang = v.lang.toLowerCase().replace(/_/g, "-");
            return prefixes.some(prefix => vLang.startsWith(prefix.toLowerCase()));
          });
          if (hasMatch) return true;
          // If the list is already populated with many voices, we shouldn't wait
          if (list.length > 5) return true;
          return false;
        };

        const v = window.speechSynthesis.getVoices();
        if (checkVoices(v)) {
          resolve(v);
          return;
        }
        
        const oldHandler = window.speechSynthesis.onvoiceschanged;
        window.speechSynthesis.onvoiceschanged = () => {
          const vv = window.speechSynthesis.getVoices();
          if (checkVoices(vv)) {
            resolve(vv);
            window.speechSynthesis.onvoiceschanged = oldHandler;
          }
        };

        // Fallback timeout in case onvoiceschanged does not fire
        setTimeout(() => {
          resolve(window.speechSynthesis.getVoices());
          window.speechSynthesis.onvoiceschanged = oldHandler;
        }, 1000);
      });
    };

    const voiceList = await ensureVoices();
    setVoices(voiceList);
    
    console.log("ReadAloudButton: activeLang =", activeLang);
    console.log("ReadAloudButton: pathname =", pathname);
    console.log("ReadAloudButton: currentLang prop =", currentLang);
    console.log("ReadAloudButton: voiceList count =", voiceList.length);

    // Grab all readable visible text on the page inside main element
    const mainElement = document.querySelector("main") || document.body;
    const elements = mainElement.querySelectorAll("h1, h2, h3, h4, h5, h6, p, label, button:not(.read-aloud-btn), a:not(.navbar-brand), li, option");

    const textChunks: string[] = [];
    elements.forEach((el) => {
      if (el.closest("nav") || el.closest("footer") || el.closest(".no-read")) return;
      const text = el.textContent?.trim();
      if (text) textChunks.push(text);
    });

    const fullText = textChunks.join(". ");
    if (!fullText) return;

    const langMap: Record<string, string> = {
      en: "en-US",
      hi: "hi-IN",
      kn: "kn-IN",
      ta: "ta-IN",
      te: "te-IN",
    };
    const targetLang = langMap[activeLang] || "en-US";
    console.log("ReadAloudButton: targetLang =", targetLang);

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = targetLang;

    // Select best matching voice
    let voice = voiceList.find((v) => v.lang.toLowerCase().replace(/_/g, "-") === targetLang.toLowerCase());
    if (!voice) {
      const langMatchMap: Record<string, string[]> = {
        en: ["en", "eng"],
        hi: ["hi", "hin"],
        kn: ["kn", "kan"],
        ta: ["ta", "tam"],
        te: ["te", "tel"],
      };
      const prefixes = langMatchMap[activeLang] || [activeLang];
      voice = voiceList.find((v) => {
        const vLang = v.lang.toLowerCase().replace(/_/g, "-");
        return prefixes.some(prefix => vLang.startsWith(prefix.toLowerCase()));
      });
    }
    console.log("ReadAloudButton: selected voice =", voice ? `${voice.name} (${voice.lang})` : "none");
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (e) => {
      console.error("ReadAloudButton error event:", e);
      setIsSpeaking(false);
    };

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const t = localDict[activeLang] || localDict.en;

  return (
    <button
      onClick={toggleSpeech}
      className="btn btn-secondary read-aloud-btn"
      style={{
        padding: "0.4rem 0.8rem",
        fontSize: "0.875rem",
        borderRadius: "var(--radius-sm)",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.25rem",
        backgroundColor: isSpeaking ? "var(--primary)" : "transparent",
        color: isSpeaking ? "var(--text-light)" : "var(--primary)",
        border: "1px solid var(--primary)",
        marginLeft: "0.5rem",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      {isSpeaking ? t.stop : t.readAloud}
    </button>
  );
}
