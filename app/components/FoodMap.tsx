
"use client";

import { useEffect, useRef, useState } from "react";
import { shops, type Shop } from "../data/shops";

export default function FoodMap() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [zoom, setZoom] = useState(1);
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    x: number;
    y: number;
    left: number;
    top: number;
  } | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  function openMap() {
    setSelectedShop(null);
    setZoom(1);
    setIsOpen(true);
  }

  function closeMap() {
    setIsOpen(false);
    setSelectedShop(null);
  }

  function changeZoom(amount: number) {
    setZoom((previous) =>
      Math.max(1, Math.min(3, Math.round((previous + amount) * 10) / 10))
    );
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    // 觸控裝置保留原生捲動操作
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    // 點擊店家按鈕時，不啟動拖曳
    if ((event.target as HTMLElement).closest("button")) return;

    dragRef.current = {
      x: event.clientX,
      y: event.clientY,
      left: viewport.scrollLeft,
      top: viewport.scrollTop,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const viewport = viewportRef.current;
    const drag = dragRef.current;

    if (!viewport || !drag) return;

    viewport.scrollLeft = drag.left - (event.clientX - drag.x);
    viewport.scrollTop = drag.top - (event.clientY - drag.y);
  }

  function onPointerUp() {
    dragRef.current = null;
  }

  
  return (
    <section id="food-map" className="section food-map-section">
      <div className="container">
        <p className="eyebrow">FOOD MAP / 木柵美食地圖</p>

        <div className="food-map-intro">
          <div className="food-map-intro-main">
            <h2>沿著街道，尋找木柵的味道。</h2>

            <p>
              二十家在地店舖，二十張木柵日常的剪影。
            </p>

            <button
              type="button"
              className="food-map-open-link"
              onClick={openMap}
            >
              查看美食地圖
              <span aria-hidden="true">↗</span>
            </button>
          </div>

          <div
            className="food-map-decoration"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 500 320"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* 木柵街道：抽象化的道路線條 */}
              <path
                className="food-map-road"
                d="M-20 215 C 90 180, 140 225, 235 165 S 390 75, 520 115"
              />
              <path
                className="food-map-road"
                d="M75 -20 C 110 80, 100 190, 185 340"
              />
              <path
                className="food-map-road"
                d="M-20 285 L 165 215 L 295 235 L 520 185"
              />

              {/* 景美溪：藍色曲線 */}
              <path
                className="food-map-river"
                d="M355 -20 C 290 80, 380 155, 315 340"
              />

              {/* 少量店家位置提示，不顯示編號 */}
              <circle
                className="food-map-decoration-pin"
                cx="145"
                cy="205"
                r="8"
              />
              <circle
                className="food-map-decoration-pin"
                cx="245"
                cy="158"
                r="8"
              />
              <circle
                className="food-map-decoration-pin"
                cx="405"
                cy="108"
                r="8"
              />
            </svg>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="food-map-modal"
          role="dialog"
          aria-modal="true"
          aria-label="木柵互動美食地圖"
        >
          <header className="food-map-modal-header">
            <div>
              <strong>食話食說 · 木柵美食地圖</strong>
            </div>

            <div className="food-map-controls">
              <button
                type="button"
                onClick={() => changeZoom(-0.25)}
                disabled={zoom <= 1}
                aria-label="縮小地圖"
              >
                −
              </button>
              <span>{Math.round(zoom * 100)}%</span>
              <button
                type="button"
                onClick={() => changeZoom(0.25)}
                disabled={zoom >= 3}
                aria-label="放大地圖"
              >
                +
              </button>
              <button
                type="button"
                onClick={closeMap}
                aria-label="關閉地圖"
                className="food-map-close"
              >
                ✕
              </button>
            </div>
          </header>

          <div
            className="food-map-modal-viewport"
            ref={viewportRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <div
              className="food-map-stage"
              style={{ width: `${zoom * 100}%` }}
            >
              <img
                src="/image/foodmapmuzha.png"
                alt="木柵地區街道與店家位置圖"
                draggable={false}
              />

              {shops.map((shop) => (
                <button
                  key={shop.id}
                  type="button"
                  className={
                    "food-map-pin" +
                    (selectedShop?.id === shop.id ? " is-active" : "")
                  }
                  style={{
                    left: `${shop.x}%`,
                    top: `${shop.y}%`,
                  }}
                  aria-label={`查看 ${shop.name}`}
                  onClick={() => setSelectedShop(shop)}
                >
                  {shop.id}
                </button>
              ))}
            </div>
          </div>

          
{selectedShop && (
  <div
    className="food-map-detail-backdrop"
    onClick={() => setSelectedShop(null)}
  >
    <div
      className="food-map-detail"
      role="dialog"
      aria-modal="true"
      aria-label={`${selectedShop.name} 店家資訊`}
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        className="food-map-detail-close"
        onClick={() => setSelectedShop(null)}
        aria-label="關閉店家資訊"
      >
        ✕
      </button>

      <div className="food-map-detail-photos">
        {selectedShop.photo && (
          <img
            src={selectedShop.photo}
            alt={`${selectedShop.name} 店家照片`}
            className="food-map-detail-main-photo"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        )}

        <div className="food-map-detail-photo-placeholder">
          店家照片
        </div>

        {selectedShop.ownerPhoto && (
          <div className="food-map-detail-owner">
            <img
              src={selectedShop.ownerPhoto}
              alt={`${selectedShop.name} 店主照片`}
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            <span>店主／經營者</span>
          </div>
        )}
      </div>

      <div className="food-map-detail-content">
        <span className="food-map-detail-number">
          SHOP NO. {String(selectedShop.id).padStart(2, "0")}
        </span>

        <h2>{selectedShop.name}</h2>

        <span className="food-map-detail-type">
          {selectedShop.type}
        </span>

        <p className="food-map-detail-description">
          {selectedShop.description}
        </p>

        <dl className="food-map-detail-list">
          <div>
            <dt>地址</dt>
            <dd>{selectedShop.address}</dd>
          </div>

          <div>
            <dt>電話</dt>
            <dd>{selectedShop.phone}</dd>
          </div>

          <div>
            <dt>營業時間</dt>
            <dd>{selectedShop.hours}</dd>
          </div>
        </dl>

        <button
          type="button"
          className="food-map-detail-done"
          onClick={() => setSelectedShop(null)}
        >
          返回美食地圖
        </button>
      </div>
    </div>
  </div>
)}


          <footer className="food-map-modal-footer">
            點擊編號查看店家詳細資訊 · 使用 ＋／− 縮放地圖 ·
            電腦可拖曳、手機可滑動地圖
          </footer>
        </div>
      )}
    </section>
  );
}
