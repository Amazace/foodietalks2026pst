
"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  guideShops,
  meals,
  type GuideShop,
  type Meal,
} from "../data/guideShops";

export default function FoodGuide() {
  const [activeMeal, setActiveMeal] =
    useState<Meal>("全部");
  // 飲食指南橫向展示櫃
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  const carouselTrackRef = useRef<HTMLDivElement>(null);

  // 根據裝置寬度決定顯示的店家數量
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth <= 600) {
        setVisibleCount(1);
      } else if (window.innerWidth <= 1000) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();

    window.addEventListener("resize", updateVisibleCount);

    return () => {
      window.removeEventListener(
        "resize",
        updateVisibleCount
      );
    };
  }, []);

  const [selectedShop, setSelectedShop] =
    useState<GuideShop | null>(null);

  const [photoIndex, setPhotoIndex] = useState(0);

  const closeButtonRef =
    useRef<HTMLButtonElement>(null);

  const triggerRef =
    useRef<HTMLButtonElement | null>(null);

  const visibleShops = guideShops.filter(
    (shop) =>
      activeMeal === "全部" ||
      shop.meal === activeMeal
  );
    // 最後可以移動到的位置
  const maxCarouselIndex = Math.max(
    0,
    visibleShops.length - visibleCount
  );

  // 防止切換裝置寬度後，索引超出範圍
  useEffect(() => {
    setCarouselIndex((previous) =>
      Math.min(previous, maxCarouselIndex)
    );
  }, [maxCarouselIndex]);

  // 每次向左或向右移動一家
  function moveCarousel(direction: number) {
    setCarouselIndex((previous) =>
      Math.max(
        0,
        Math.min(maxCarouselIndex, previous + direction)
      )
    );
  }

  // 切換用餐時段時，回到第一家
  function changeMeal(meal: Meal) {
    setActiveMeal(meal);
    setCarouselIndex(0);
  }
  const photoCount = selectedShop?.images.length ?? 0;

  function openShop(
    shop: GuideShop,
    trigger: HTMLButtonElement
  ) {
    triggerRef.current = trigger;
    setPhotoIndex(0);
    setSelectedShop(shop);
  }

  function closeShop() {
    setSelectedShop(null);
    setPhotoIndex(0);

    // 關閉後將焦點返回原本點擊的卡片
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }

  function changePhoto(direction: number) {
    if (photoCount <= 1) return;

    setPhotoIndex((previous) =>
      (previous + direction + photoCount) %
      photoCount
    );
  }

  useEffect(() => {
    if (!selectedShop) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedShop(null);
        setPhotoIndex(0);

        requestAnimationFrame(() => {
          triggerRef.current?.focus();
        });
      }

      if (event.key === "ArrowLeft") {
        setPhotoIndex((previous) =>
          photoCount > 1
            ? (previous - 1 + photoCount) % photoCount
            : previous
        );
      }

      if (event.key === "ArrowRight") {
        setPhotoIndex((previous) =>
          photoCount > 1
            ? (previous + 1) % photoCount
            : previous
        );
      }

      // 將 Tab 焦點限制在故事視窗內
      if (event.key === "Tab") {
        const dialog = document.querySelector(
          ".guide-story-dialog"
        );

        if (!dialog) return;

        const focusable = Array.from(
          dialog.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
          )
        );

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [selectedShop, photoCount]);

  return (
    <section
      id="food-guide"
      className="food-section section"
    >
      <div className="container">
        <div className="guide-intro">
          <p className="eyebrow">
            FOOD GUIDE / 木柵飲食指南
          </p>

          <h2>今天，想在木柵吃什麼？</h2>

          <p className="guide-subtitle">
            探索木柵 20 家美食店
          </p>

          <p className="body-copy">
            從早餐、午餐到宵夜，
            <br />
            一起走進木柵的美味日常。
          </p>

          <a
            href="#shop-list"
            className="button button-primary"
          >
            探索店家
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div
          className="guide-content"
          id="shop-list"
        >
          <div
            className="meal-filters"
            aria-label="依用餐時段篩選"
          >
            {meals.map((meal) => (
              <button
                key={meal}
                type="button"
                aria-pressed={activeMeal === meal}
                className={
                  activeMeal === meal
                    ? "meal-button active"
                    : "meal-button"
                }
                onClick={() => changeMeal(meal)}
              >
                {meal}
              </button>
            ))}
          </div>
                    
          {/* 飲食指南：橫向展示櫃 */}
          <div className="guide-carousel">
            <button
              type="button"
              className="guide-carousel-arrow guide-carousel-prev"
              onClick={() => moveCarousel(-1)}
              disabled={carouselIndex === 0}
              aria-label="查看上一家店"
            >
              ‹
            </button>

            <div className="guide-carousel-viewport">
              <div
                ref={carouselTrackRef}
                className="guide-carousel-track"
                style={
                  {
                    "--carousel-index": carouselIndex,
                    "--visible-count": visibleCount,
                  } as React.CSSProperties
                }
              >
                {visibleShops.map((shop) => (
                  <article
                    className="shop-card guide-carousel-item"
                    key={shop.id}
                  >
                    <button
                      type="button"
                      className="guide-shop-trigger"
                      aria-haspopup="dialog"
                      aria-label={`閱讀${shop.name}的店家故事`}
                      onClick={(event) =>
                        openShop(shop, event.currentTarget)
                      }
                    >
                      <div className="shop-image">
                        {shop.images.length > 0 ? (
                          <img
                            src={shop.images[0]}
                            alt={`${shop.name}的料理或店內環境`}
                            loading="lazy"
                          />
                        ) : (
                          <div className="guide-image-empty">
                            店家照片準備中
                          </div>
                        )}

                        <span className="meal-label">
                          {shop.meal}
                        </span>
                      </div>

                      <div className="shop-copy">
                        <p className="shop-index">
                          MUZHA · FOOD GUIDE
                        </p>

                        <h3>{shop.name}</h3>

                        <p>{shop.description}</p>

                        <span className="text-link">
                          閱讀店家故事
                          <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </button>
                  </article>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="guide-carousel-arrow guide-carousel-next"
              onClick={() => moveCarousel(1)}
              disabled={carouselIndex >= maxCarouselIndex}
              aria-label="查看下一家店"
            >
              ›
            </button>
          </div>

          {/* 輪播進度與頁數 */}
          {visibleShops.length > 0 && (
            <div className="guide-carousel-bottom">
              <span className="guide-carousel-counter">
                {String(carouselIndex + 1).padStart(2, "0")}
                {" — "}
                {String(
                  Math.min(
                    carouselIndex + visibleCount,
                    visibleShops.length
                  )
                ).padStart(2, "0")}
                {" / "}
                {String(visibleShops.length).padStart(2, "0")}
              </span>

              <div
                className="guide-carousel-progress"
                role="progressbar"
                aria-label="飲食指南瀏覽進度"
                aria-valuemin={0}
                aria-valuemax={Math.max(1, maxCarouselIndex)}
                aria-valuenow={carouselIndex}
              >
                <span
                  style={{
                    width: `${
                      ((carouselIndex + visibleCount) /
                        visibleShops.length) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          )}

          {visibleShops.length === 0 && (
            <p className="empty-state">
              目前沒有這個時段的店家資料。
            </p>
          )}
        </div>
      </div>

      {selectedShop && (
        <div
          className="guide-story-backdrop"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              closeShop();
            }
          }}
        >
          <div
            className="guide-story-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="guide-story-title"
            aria-describedby="guide-story-description"
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="guide-story-close"
              onClick={closeShop}
              aria-label="關閉店家故事"
            >
              ✕
            </button>

            <div className="guide-story-gallery">
              <div className="guide-story-photo">
                {photoCount > 0 ? (
                  <img
                    key={`${selectedShop.id}-${photoIndex}`}
                    src={
                      selectedShop.images[photoIndex]
                    }
                    alt={`${selectedShop.name}照片 ${
                      photoIndex + 1
                    }`}
                  />
                ) : (
                  <div className="guide-image-empty">
                    店家照片準備中
                  </div>
                )}
              </div>

              {photoCount > 1 && (
                <div className="guide-story-gallery-controls">
                  <button
                    type="button"
                    onClick={() => changePhoto(-1)}
                    aria-label="上一張照片"
                  >
                    ←
                  </button>

                  <span>
                    {photoIndex + 1} / {photoCount}
                  </span>

                  <button
                    type="button"
                    onClick={() => changePhoto(1)}
                    aria-label="下一張照片"
                  >
                    →
                  </button>
                </div>
              )}

              {photoCount > 1 && (
                <div className="guide-story-dots">
                  {selectedShop.images.map(
                    (_, index) => (
                      <button
                        key={index}
                        type="button"
                        className={
                          photoIndex === index
                            ? "is-active"
                            : ""
                        }
                        aria-label={`查看第 ${
                          index + 1
                        } 張照片`}
                        aria-current={
                          photoIndex === index
                            ? "true"
                            : undefined
                        }
                        onClick={() =>
                          setPhotoIndex(index)
                        }
                      />
                    )
                  )}
                </div>
              )}
            </div>

            <div className="guide-story-content">
              <p className="guide-story-kicker">
                FOODIE TALKS · SHOP NO.{" "}
                {String(selectedShop.id).padStart(
                  2,
                  "0"
                )}
              </p>

              <h2 id="guide-story-title">
                {selectedShop.name}
              </h2>

              <span className="guide-story-meal">
                {selectedShop.meal}
              </span>

              <p
                className="guide-story-lead"
                id="guide-story-description"
              >
                {selectedShop.description}
              </p>

              <div className="guide-story-article">
                {selectedShop.story.map(
                  (paragraph, index) => (
                    <p key={index}>
                      {paragraph}
                    </p>
                  )
                )}
              </div>

              <button
                type="button"
                className="guide-story-done"
                onClick={closeShop}
              >
                返回飲食指南
                <span aria-hidden="true">↗</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
