export type Tradition = "west" | "east";
export type Era = "before" | "ancient" | "medieval" | "modern" | "contemporary";
export type QuoteMode = "번역" | "풀이";

export type ExternalLink = {
  href: string;
  label: string;
};

export type Idea = {
  title: string;
  body: string;
};

export type Work = {
  title: string;
  note: string;
};

export type Quote = {
  ko: string;
  original?: string;
  source: string;
  mode: QuoteMode;
  note?: string;
};

export type Film = {
  titleKo: string;
  titleEn: string;
  year: number;
  kind: "영화" | "다큐멘터리";
  blurb: string;
  links?: ExternalLink[];
};

export type Person = {
  slug: string;
  nameKo: string;
  nameEn: string;
  nativeName?: string;
  tradition: Tradition;
  era: Era;
  years: string;
  region: string;
  school: string;
  oneLiner: string;
  caution?: string;
  ideas: Idea[];
  works: Work[];
  quotes: Quote[];
  films?: Film[];
  related: string[];
  elsewhere?: ExternalLink[];
};

export type PersonCard = Pick<
  Person,
  | "slug"
  | "nameKo"
  | "nameEn"
  | "nativeName"
  | "tradition"
  | "era"
  | "years"
  | "region"
  | "school"
  | "oneLiner"
>;
