"use client";

/*
 * 설치 확인용 시작 페이지입니다.
 * 각 라이브러리가 제대로 동작하는지 한 화면에서 볼 수 있게 최소한으로만 사용했습니다.
 * 실제 홈페이지 디자인을 시작할 때 이 파일을 통째로 바꾸면 됩니다.
 */

import { useEffect, useRef } from "react";
import { animate, splitText, stagger } from "animejs";
import { motion } from "motion/react";
import { HeartbeatIcon, LeafIcon, UsersThreeIcon } from "@phosphor-icons/react";
import dynamic from "next/dynamic";

// bklit 차트의 숫자 애니메이션(NumberFlow)은 브라우저에서만 그려야 경고가 나지 않아서
// 서버 렌더링을 끄고 불러옵니다. 다른 bklit 차트도 같은 방식으로 쓰면 됩니다.
const BedRingChart = dynamic(() => import("@/components/bed-ring-chart"), {
  ssr: false,
  loading: () => <div className="size-[260px]" />,
});

const features = [
  { icon: HeartbeatIcon, title: "Anime.js", body: "제목 글자가 하나씩 떠오르는 효과" },
  { icon: LeafIcon, title: "Motion", body: "스크롤하면 카드가 부드럽게 나타나는 효과" },
  { icon: UsersThreeIcon, title: "bklit UI", body: "숫자를 보기 좋게 보여 주는 차트" },
];

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const { chars } = splitText(titleRef.current, { chars: true });
    const anim = animate(chars, {
      opacity: [0, 1],
      y: ["0.4em", "0em"],
      delay: stagger(40),
      duration: 700,
      ease: "out(3)",
    });
    return () => {
      anim.revert();
    };
  }, []);

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-24 md:py-32">
      <p className="text-sm tracking-[0.2em] text-muted-foreground">INSTALL CHECK</p>
      <h1 ref={titleRef} className="mt-4 font-serif text-4xl leading-tight md:text-6xl">
        머무는 시간이 편안한 곳
      </h1>
      <p className="mt-6 max-w-xl text-lg text-muted-foreground">
        라이브러리가 모두 설치되었습니다. 아래 카드와 차트가 움직이면 정상입니다.
      </p>

      <section className="mt-20 grid gap-6 md:grid-cols-3">
        {features.map(({ icon: Icon, title, body }, i) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-border p-6"
          >
            <Icon size={28} weight="light" className="text-accent" />
            <h2 className="mt-4 font-serif text-xl">{title}</h2>
            <p className="mt-2 text-muted-foreground">{body}</p>
          </motion.article>
        ))}
      </section>

      <section className="mt-20 flex justify-center">
        <BedRingChart />
      </section>

      <div className="h-[40vh]" aria-hidden />
    </main>
  );
}
