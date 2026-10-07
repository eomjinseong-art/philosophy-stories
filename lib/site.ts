export const site = {
  name: "철학이야기",
  nameEn: "Philosophy Stories",
  tagline: "어려운 철학을, 짧은 한국어로",
  description:
    "어려운 철학을, 짧은 한국어로. 서양과 동양의 사람을 나라 탭이 아니라 한 사람씩 읽습니다. 핵심 생각, 대표 저작, 출처가 있는 말, 관련 영화를 전설과 학설을 구분해 적습니다.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://philosophy-stories.vercel.app",
  namespace: "philosophy-stories",
  locale: "ko_KR",
  brand: "나두 — 나의 모든 일상을 AI와 함께",
  coupangHref: "https://link.coupang.com/a/hsdzLh1vB6",
  coupangLine:
    "생각만 하다 보면 저녁이 됩니다. 로켓배송은 동굴 밖으로 나가지 않아도 옵니다 · 쿠팡 둘러보기",
} as const;

export const sisters = [
  { href: "https://nadoo-myth.vercel.app", label: "나두신화", en: "Myth" },
  { href: "https://greece-stories.vercel.app", label: "그리스이야기", en: "Greece Stories" },
  { href: "https://rome-stories.vercel.app", label: "로마이야기", en: "Rome Stories" },
  { href: "https://nadoo-timeline.vercel.app", label: "나두연표", en: "Timeline" },
] as const;

export const nav = [
  { href: "/people", label: "사람들" },
  { href: "/films", label: "영화" },
  { href: "/sources", label: "출처" },
] as const;

export const traditionLabel = {
  west: "서양",
  east: "동양",
} as const;

export const eraLabel = {
  ancient: "고대",
  medieval: "중세",
  modern: "근세·근대",
  contemporary: "현대",
} as const;

export const traditions = [
  { id: "all", label: "전체" },
  { id: "west", label: "서양" },
  { id: "east", label: "동양" },
] as const;

export const eras = [
  { id: "all", label: "모든 시대" },
  { id: "ancient", label: "고대" },
  { id: "medieval", label: "중세" },
  { id: "modern", label: "근세·근대" },
  { id: "contemporary", label: "현대" },
] as const;
