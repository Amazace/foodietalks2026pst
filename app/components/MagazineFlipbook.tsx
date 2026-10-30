
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

const PDF_URL =
  "https://nkfblirgebgivqfepwor.supabase.co/storage/v1/object/public/magazine/FoodietalksMuzha.pdf";


pdfjs.GlobalWorkerOptions.workerSrc =
  "/pdfjs/pdf.worker.min.mjs";


type FlipBookHandle = {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
  };
};

type MagazineFlipbookProps = {
  onClose: () => void;
};

const PAGE_RATIO = 1.414;
const MAX_PAGE_WIDTH = 500;

export default function MagazineFlipbook({
  onClose,
}: MagazineFlipbookProps) {
  const [numPages, setNumPages] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [pageWidth, setPageWidth] = useState(300);
  const [pageHeight, setPageHeight] = useState(424);
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [error, setError] = useState("");

  const bookRef = useRef<FlipBookHandle | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  // 根據實際閱讀器空間等比例計算尺寸
  const updateSize = useCallback(() => {
    const wrap = wrapRef.current;
    const viewport = viewportRef.current;

    if (!wrap || !viewport) return;

    const mobile = viewport.clientWidth <= 768;

    const availableWidth = Math.max(
      0,
      viewport.clientWidth - 12
    );

    const availableHeight = Math.max(
      0,
      viewport.clientHeight - 12
    );

    if (!availableWidth || !availableHeight) return;

    const pageCount = mobile ? 1 : 2;

    const widthFromScreen =
      availableWidth / pageCount;

    const widthFromHeight =
      availableHeight / PAGE_RATIO;

    const width = Math.max(
      1,
      Math.floor(
        Math.min(
          widthFromScreen,
          widthFromHeight,
          MAX_PAGE_WIDTH
        )
      )
    );

    const height = Math.floor(width * PAGE_RATIO);

    setIsMobile(mobile);
    setPageWidth(width);
    setPageHeight(height);
    setIsReady(true);
  }, []);

  useEffect(() => {
    updateSize();

    const observer = new ResizeObserver(() => {
      updateSize();
    });

    if (viewportRef.current) {
      observer.observe(viewportRef.current);
    }

    window.addEventListener("resize", updateSize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, [updateSize]);

  function onDocumentLoadSuccess({
    numPages: totalPages,
  }: {
    numPages: number;
  }) {
    setNumPages(totalPages);
    setCurrentPage(0);
    setLoadProgress(100);
    setError("");
  }

  function onDocumentLoadError(error: Error) {
    console.error("[PDF 載入失敗]", error);

    setError(
      "Sorry...目前雜誌電子版暫時無法載入。請確認您的網路連線。"
    );
  }

  // 鍵盤左右方向鍵翻頁
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;

      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }

      if (event.key === "ArrowRight") {
        bookRef.current?.pageFlip().flipNext();
      }

      if (event.key === "ArrowLeft") {
        bookRef.current?.pageFlip().flipPrev();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className="magazine-book-wrap"
      ref={wrapRef}
    >
      <div
        className="magazine-book-viewport"
        ref={viewportRef}
      >
        {error ? (
          <div className="reader-error" role="alert">
            <p>{error}</p>

            <a
              href={PDF_URL}
              target="_blank"
              rel="noreferrer"
            >
              直接開啟雜誌 PDF
            </a>
          </div>
        ) : (
          <Document
            file={PDF_URL}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            onSourceError={(error) => {
              console.error("[PDF 來源錯誤]", error);
            }}
            onLoadProgress={({ loaded, total }) => {
              if (total > 0) {
                setLoadProgress(
                  Math.min(
                    99,
                    Math.round((loaded / total) * 100)
                  )
                );
              }
            }}
            loading={
              <div className="reader-progress">
                <p>
                  正在載入雜誌…… {loadProgress}%
                </p>

                <div
                  className="reader-progress-track"
                  role="progressbar"
                  aria-label="雜誌下載進度"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={loadProgress}
                >
                  <div
                    className="reader-progress-fill"
                    style={{
                      width: `${loadProgress}%`,
                    }}
                  />
                </div>

                <p className="reader-progress-note">
                  正在準備雜誌檔案，請稍候
                </p>
              </div>
            }
            error={
              <p className="reader-error">
                PDF 載入失敗，請確認檔案網址與格式。
              </p>
            }
          >
            {numPages > 0 && isReady && (
              <HTMLFlipBook
                key={`${pageWidth}-${pageHeight}-${isMobile}-${numPages}`}
                ref={bookRef}
                width={pageWidth}
                height={pageHeight}
                size="fixed"
                minWidth={1}
                maxWidth={MAX_PAGE_WIDTH}
                minHeight={1}
                maxHeight={Math.ceil(MAX_PAGE_WIDTH * PAGE_RATIO)}
                showCover={true}
                mobileScrollSupport={false}
                useMouseEvents={true}
                clickEventForward={true}
                drawShadow={true}
                flippingTime={700}
                usePortrait={isMobile}
                startPage={0}
                className="magazine-flipbook"
                style={{ margin: "0 auto" }}
                startZIndex={0}
                autoSize={true}
                maxShadowOpacity={0.35}
                showPageCorners={true}
                disableFlipByClick={false}
                swipeDistance={30}
                onFlip={(event: { data: number }) => {
                  setCurrentPage(event.data);
                }}
              >
                {Array.from(
                  { length: numPages },
                  (_, index) => {
                    const shouldRender =
                      Math.abs(index - currentPage) <= 3;

                    return (
                      <div
                        className="magazine-page"
                        key={index}
                        data-page-number={index + 1}
                      >
                        {shouldRender ? (
                          <Page
                            pageNumber={index + 1}
                            width={pageWidth}
                            devicePixelRatio={1.5}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            loading={
                              <div className="page-loading" />
                            }
                            onRenderError={(error) => {
                              console.error(
                                `[PDF 第 ${index + 1} 頁] 繪製失敗`,
                                error
                              );
                            }}
                          />
                        ) : (
                          <div className="page-loading" />
                        )}
                      </div>
                    );
                  }
                )}
              </HTMLFlipBook>
            )}
          </Document>
        )}
      </div>

      {numPages > 0 && !error && (
        <p className="reader-page-count">
          第 {Math.min(currentPage + 1, numPages)} 頁
          ／共 {numPages} 頁
          {" · "}
          點擊書頁兩側或使用方向鍵翻頁，
          按 Esc 即可退出閱讀
        </p>
      )}

      
      <div className="reader-page-controls">
        <button
          type="button"
          onClick={() =>
            bookRef.current?.pageFlip().flipPrev()
          }
          aria-label="上一頁"
        >
          ← 上一頁
        </button>

        <button
          type="button"
          className="reader-exit-button"
          onClick={onClose}
          aria-label="離開電子雜誌閱讀器"
        >
          離開
        </button>

        <button
          type="button"
          onClick={() =>
            bookRef.current?.pageFlip().flipNext()
          }
          aria-label="下一頁"
        >
          下一頁 →
        </button>
      </div>
    </div>
  );
}
