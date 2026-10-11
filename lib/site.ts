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

/** 일리아스이야기 is deploying in parallel and may 404 until that site is live. */
export const iliadStoriesHref = "https://iliad-stories.vercel.app" as const;

export const linkCheckAllow404Hosts = ["iliad-stories.vercel.app"] as const;

export const sisters = [
  { href: "https://nadoo-myth.vercel.app", label: "나두신화", en: "Myth" },
  { href: iliadStoriesHref, label: "일리아스이야기", en: "The Iliad" },
  { href: "https://greece-stories.vercel.app", label: "그리스이야기", en: "Greece" },
  { href: "https://rome-stories.vercel.app", label: "로마이야기", en: "Rome" },
  { href: "https://germanic-stories.vercel.app", label: "게르만이야기", en: "Germanic" },
  { href: "https://viking-stories.vercel.app", label: "바이킹이야기", en: "Vikings" },
  { href: "https://egypt-stories.vercel.app", label: "이집트이야기", en: "Egypt" },
  { href: "https://persia-stories.vercel.app", label: "페르시아이야기", en: "Persia" },
  { href: "https://the-chosen-korean.vercel.app", label: "더 초즌 · 성경", en: "The Chosen · Bible" },
  { href: "https://korea-stories.vercel.app", label: "대한민국이야기", en: "Korea" },
  { href: "https://nadoo-world.vercel.app", label: "나두세계", en: "World" },
  { href: "https://nadoo-timeline.vercel.app", label: "나두연표", en: "Timeline" },
  { href: "https://tinalinkeom.vercel.app", label: "나두 허브", en: "Nadoo Hub" },
] as const;

export const familyTrees = [
  { href: "https://nadoo-myth.vercel.app/family-tree", label: "나두신화", en: "Myth" },
  { href: "https://greece-stories.vercel.app/family-tree", label: "그리스이야기", en: "Greece" },
  { href: "https://rome-stories.vercel.app/family-tree", label: "로마이야기", en: "Rome" },
  { href: "https://germanic-stories.vercel.app/family-tree", label: "게르만이야기", en: "Germanic" },
  { href: "https://viking-stories.vercel.app/family-tree", label: "바이킹이야기", en: "Vikings" },
  { href: "https://egypt-stories.vercel.app/family-tree", label: "이집트이야기", en: "Egypt" },
  { href: "https://persia-stories.vercel.app/family-tree", label: "페르시아이야기", en: "Persia" },
  { href: "https://the-chosen-korean.vercel.app/family-tree", label: "더 초즌 · 성경", en: "The Chosen" },
  { href: "https://korea-stories.vercel.app/family-tree", label: "대한민국이야기", en: "Korea" },
] as const;

export const sisterFilms = [
  { href: "https://nadoo-myth.vercel.app/in-media", label: "나두신화", en: "Myth" },
  { href: "https://greece-stories.vercel.app/movies", label: "그리스이야기", en: "Greece" },
  { href: "https://rome-stories.vercel.app/movies", label: "로마이야기", en: "Rome" },
  { href: "https://germanic-stories.vercel.app/films", label: "게르만이야기", en: "Germanic" },
  { href: "https://viking-stories.vercel.app/films", label: "바이킹이야기", en: "Vikings" },
  { href: "https://egypt-stories.vercel.app/movies", label: "이집트이야기", en: "Egypt" },
  { href: "https://persia-stories.vercel.app/movies", label: "페르시아이야기", en: "Persia" },
  { href: "https://the-chosen-korean.vercel.app/together", label: "더 초즌 · 성경", en: "The Chosen" },
  { href: "https://korea-stories.vercel.app/films", label: "대한민국이야기", en: "Korea" },
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
  before: "철학 이전 · 그리스 정신의 뿌리 (Before Philosophy)",
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
  { id: "before", label: "철학 이전" },
  { id: "ancient", label: "고대" },
  { id: "medieval", label: "중세" },
  { id: "modern", label: "근세·근대" },
  { id: "contemporary", label: "현대" },
] as const;
