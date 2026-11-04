"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** 페이지 전체에 부드러운 스크롤(Lenis)을 켭니다. "움직임 줄이기" 설정 사용자는 제외합니다. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
    return () => lenis.destroy();
  }, []);
  return <>{children}</>;
}
