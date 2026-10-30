
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MagazineFlipbook = dynamic(
  () => import("./MagazineFlipbook"),
  {
    ssr: false,
    loading: () => (
      <p className="reader-loading">
        正在準備雜誌，請稍候……
      </p>
    ),
  }
);

export default function MagazineReader() {
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    function handleOpenMagazine() {
      setIsOpen(true);
    }

    window.addEventListener(
      "open-foodie-magazine",
      handleOpenMagazine
    );

    return () => {
      window.removeEventListener(
        "open-foodie-magazine",
        handleOpenMagazine
      );
    };
  }, []);


  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className="button button-light"
        onClick={() => setIsOpen(true)}
      >
        瀏覽雜誌
        <span aria-hidden="true"> →</span>
      </button>

      {isOpen && (
        <div
          className="magazine-reader-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="食話食說電子雜誌閱讀器"
        >
          <header className="reader-toolbar">
            <div className="reader-brand">
              <span className="reader-brand-title">
                食話食說
              </span>
              <span className="reader-brand-subtitle">
                FOODIE TALKS · 木柵篇
              </span>
            </div>

            <p className="reader-hint">
              點擊書頁兩側或使用方向鍵翻頁
            </p>

            <button
              type="button"
              className="reader-close"
              onClick={() => setIsOpen(false)}
              aria-label="關閉電子雜誌"
            >
              ×
            </button>
          </header>

          <main className="reader-stage">
            <MagazineFlipbook
              onClose={() => setIsOpen(false)}
            />
          </main>
        </div>
      )}
    </>
  );
}
