# 새 홈페이지 (site 폴더)

기존 `web/` 폴더는 건드리지 않았고, 새 홈페이지는 이 `site/` 폴더에서 만듭니다.
뼈대는 **Next.js 16 + React 19 + Tailwind CSS 4** 입니다.

## 실행 방법

```bash
cd site
npm install      # 처음 한 번만
npm run dev      # http://localhost:3000 에서 미리보기
npm run build    # 배포용으로 만들기
```

## 설치한 라이브러리와 이유

### 요청하신 3가지

| 라이브러리 | 하는 일 | 쉽게 말하면 |
|---|---|---|
| **Anime.js** (`animejs` 4.x) | 글자·도형·SVG 애니메이션 | 제목 글자가 한 자씩 떠오르는 등 "연출" 담당 |
| **Motion** (`motion`, 옛 Framer Motion) | React 화면 요소의 등장·전환 효과 | 스크롤하면 카드가 부드럽게 나타나는 효과 담당 |
| **bklit UI** | 움직이는 차트 모음 | 병상 수, 만족도 같은 숫자를 보기 좋게 보여 주는 그래프 |

bklit UI는 npm 패키지가 아니라 "코드를 프로젝트에 복사해 쓰는" 방식입니다.
그래서 `src/components/charts/` 폴더에 코드가 들어 있고, 아래 차트를 넣어 두었습니다.
영역(area)·막대(bar)·선(line)·파이(pie)·링(ring)·게이지(gauge)·스파크라인(sparkline)·범례(legend).
쓸 때는 `import { RingChart } from "@/components/charts"` 처럼 가져옵니다.

### 세련되고 "AI가 만든 티"가 덜 나게 해 주는 것 (꼭 필요한 것만)

| 라이브러리 | 왜 넣었나 |
|---|---|
| **Pretendard** (`pretendard`) | 한국 웹사이트에서 가장 많이 쓰는 깔끔한 한글 본문 글꼴. AI 템플릿이 흔히 쓰는 영문 기본 글꼴(Inter 등) 대신 씁니다. |
| **Noto Serif KR** (`@fontsource-variable/noto-serif-kr`) | 제목용 명조 글꼴. 병원·요양 시설에 어울리는 차분하고 신뢰감 있는 인상. |
| **Phosphor Icons** (`@phosphor-icons/react`) | 아이콘. AI가 만든 사이트에 거의 항상 들어가는 Lucide 아이콘 대신, 선 굵기를 고를 수 있는 다른 아이콘 세트. |
| **Lenis** (`lenis`) | 마우스 스크롤을 부드럽게. 고급 브랜드 사이트의 "매끄러운 느낌"의 핵심. 움직임 줄이기 설정을 한 사용자에게는 자동으로 꺼집니다. |

bklit 차트가 쓰는 보조 도구도 함께 설치됐습니다: `d3-array`, `d3-scale`, `d3-shape`(그래프 계산), `@number-flow/react`(숫자 굴러가는 효과), `@base-ui/react`, `clsx`, `tailwind-merge`.

### 일부러 넣지 않은 것

- **GSAP**: Anime.js + Motion과 역할이 겹칩니다.
- **shadcn/ui 버튼·카드 세트**: 그대로 쓰면 오히려 "AI 템플릿" 느낌이 강해집니다. 필요해지면 그때 직접 만듭니다.

## 기본 디자인 설정 (`src/app/globals.css`)

- 배경은 순백 대신 **따뜻한 아이보리**, 글자는 **먹색**, 강조색은 **깊은 녹색**
- 보라색 그라데이션(전형적인 AI 사이트 색)은 쓰지 않음
- 한국어 단어가 중간에서 끊기지 않게 `word-break: keep-all` 적용
- 다크 모드 색도 같이 정해 둠

## 지금 첫 화면 (`src/app/page.tsx`)

설치가 잘 됐는지 확인하는 **임시 화면**입니다. 제목 애니메이션(Anime.js), 카드 등장(Motion),
링 차트(bklit UI), 아이콘(Phosphor), 글꼴, 부드러운 스크롤이 한 화면에서 동작합니다.
실제 홈페이지 디자인을 시작할 때 이 파일을 바꾸면 됩니다.

## 참고

- bklit 차트는 숫자 애니메이션 때문에 `next/dynamic`으로 `ssr: false` 로 불러와야 경고가 나지 않습니다. (`src/components/bed-ring-chart.tsx` 예시 참고)
- bklit에서 복사해 온 차트 코드는 원본 그대로 두기 위해 코드 검사(eslint) 대상에서 뺐습니다.
