
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import FoodMap from "./components/FoodMap";
import FoodGuide from "./components/FoodGuide";
import MagazineReader from "./components/MagazineReader";

const stories = [
  {
    category: "PEOPLE & FOOD",
    title: "一碗麵線裡的地方記憶",
    description: "從熟悉的味道出發，聽一間老店說起木柵的日常。",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=85",
  },
  {
    category: "LOCAL CULTURE",
    title: "茶香與山城的生活風景",
    description: "沿著街道與茶香，重新認識城市裡的地方風景。",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=85",
  },
  {
    category: "BEHIND THE SCENES",
    title: "一本地方誌是如何誕生的？",
    description: "從採訪、拍攝到編輯，記錄每一段製作的過程。",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  // 全螢幕封面捲動動畫
  const coverRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: coverRef,
    offset: ["start start", "end start"],
  });

  // 捲動時封面逐漸上浮
  const coverY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vh", "-18vh"]
  );

  // 捲動時封面逐漸透明
  const coverOpacity = useTransform(
    scrollYProgress,
    [0, 0.85],
    [1, 0]
  );

  // 捲動時稍微縮小，增加景深感
  const coverScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.96]
  );

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      {/* 導覽列 */}
            {/* 全螢幕封面 */}
      <motion.section
        ref={coverRef}
        className="intro-cover"
        aria-label="食話食說木柵篇封面"
        style={{
          y: coverY,
          opacity: coverOpacity,
          scale: coverScale,
        }}
      >
        <div className="intro-cover-photo" />

        <div className="intro-cover-texture" />

        <div className="intro-cover-content">
          <p className="intro-cover-kicker">
            一場關於美食，
            <br />
            也關於這座城市的對話
          </p>

          <div className="intro-cover-rule" />

          <p className="intro-cover-label">
            LOCAL FOOD JOURNAL
          </p>

          <h1>
            食話食說
          </h1>

          <p className="intro-cover-english">
            Foodie Talks
          </p>

          <div className="intro-cover-edition">
            <span />
            木柵篇
            <span />
          </div>
        </div>

        <div className="intro-cover-bottom">
          <span>FOOD · PEOPLE · PLACE</span>
          <span className="intro-cover-scroll">
          <span aria-hidden="true">↓</span>
          </span>
          <span>TAIPEI · MUZHA</span>
        </div>
      </motion.section>

      <header className="site-header">
        <div className="nav-inner">
          <Link href="#home" className="brand" onClick={closeMenu}>
            <span className="brand-chinese">食話食說</span>
            <span className="brand-english">Foodie Talks</span>
          </Link>

          <span className="brand-divider" aria-hidden="true" />
          <span className="brand-edition">木柵篇</span>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "關閉導覽選單" : "開啟導覽選單"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
  
        <nav
          className={`main-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="主要導覽"
        >
          <a href="#home" onClick={closeMenu}>首頁</a>
          <a href="#food-map" onClick={closeMenu}>美食地圖</a>
          <a href="#food-guide" onClick={closeMenu}>店家指南</a>
          <a href="#publication" onClick={closeMenu}>雜誌檔案室</a>
        </nav>


        <button
          type="button"
          className="nav-cta"
          onClick={() => {
            closeMenu();

            window.dispatchEvent(
              new Event("open-foodie-magazine")
            );
          }}
          aria-label="開啟食話食說電子雜誌閱讀器"
        >
          <span aria-hidden="true">▤</span>
          閱讀雜誌
        </button>
        </div>
      </header>

      {/* 美食地圖 */}
      <FoodMap />

      {/* Food Guide：飲食指南 */}
      <FoodGuide />

      {/* 電子雜誌入口 */}
      <section className="publication-section" id="publication">
        <div className="publication-copy">
          <p className="eyebrow">PRINT × DIGITAL</p>
          <h2>
            紙本 × 數位
            <br />
            一同收藏木柵的味道
          </h2>
          <p>
            翻閱紙本雜誌，也在網站繼續探索，
            <br />
            讓每段飲食故事被更多人看見。
          </p>
          <MagazineReader />
        </div>
        <div className="publication-mark" aria-hidden="true">
          <span>食</span>
          <span>話</span>
          <span>食</span>
          <span>說</span>
        </div>
      </section>

      {/* Footer 頁尾 */}
      <footer className="site-footer" id="footer">
        <div className="footer-main">
          <Link href="#home" className="brand footer-brand">
            <span className="brand-chinese">食話食說</span>
            <span className="brand-english">Foodie Talks</span>
          </Link>

          <span className="brand-divider" aria-hidden="true" />
          <span className="brand-edition">Bon appétit~</span>

          <nav className="footer-nav" aria-label="頁尾導覽">
            <a href="#about">美食地圖</a>
            <p>˙</p>
            <a href="#food-guide">店家指南</a>
            <p>˙</p>
            <a href="#publication">雜誌檔案室</a>
          </nav>
        </div>

        <div className="footer-bottom">
          <p>© 2026 NCCU USR</p>
          <p>Email : foodietalks114@gmail.com</p>
        </div>
      </footer>
    </main>
  );
}
