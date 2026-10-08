import { east } from "@/data/east";
import { eastMore } from "@/data/east-more";
import type { Era, ExternalLink, Person, PersonCard, Tradition } from "@/data/types";
import { west } from "@/data/west";
import { westMore } from "@/data/west-more";
import { linkCheckAllow404Hosts, sisters } from "@/lib/site";

const sisterHosts = new Set(sisters.map((sister) => new URL(sister.href).host));
const linkCheckAllow404 = new Set<string>(linkCheckAllow404Hosts);

const westOrder = [
  "homer",
  "heraclitus",
  "parmenides",
  "democritus",
  "socrates",
  "plato",
  "aristotle",
  "epicurus",
  "seneca",
  "epictetus",
  "marcus-aurelius",
  "plotinus",
  "hypatia",
  "augustine",
  "anselm",
  "ibn-rushd",
  "aquinas",
  "hobbes",
  "descartes",
  "pascal",
  "spinoza",
  "locke",
  "leibniz",
  "berkeley",
  "hume",
  "rousseau",
  "kant",
  "wollstonecraft",
  "hegel",
  "schopenhauer",
  "mill",
  "kierkegaard",
  "marx",
  "nietzsche",
  "wittgenstein",
  "heidegger",
  "sartre",
  "arendt",
  "beauvoir",
  "camus",
  "rawls",
  "foucault",
] as const;

const eastOrder = [
  "buddha",
  "confucius",
  "laozi",
  "mozi",
  "mencius",
  "zhuangzi",
  "gongsun-long",
  "xunzi",
  "hanfeizi",
  "dong-zhongshu",
  "wang-chong",
  "patanjali",
  "nagarjuna",
  "wang-bi",
  "vasubandhu",
  "wonhyo",
  "uisang",
  "huineng",
  "fazang",
  "kukai",
  "shankara",
  "linji",
  "ramanuja",
  "zhou-dunyi",
  "zhang-zai",
  "cheng-yi",
  "zhu-xi",
  "lu-xiangshan",
  "jinul",
  "shinran",
  "dogen",
  "wang-yangming",
  "seo-gyeong-deok",
  "toegye",
  "yulgok",
  "ogyu-sorai",
  "dasan",
  "choi-han-gi",
  "nishida",
] as const;

function orderPeople(list: Person[], order: readonly string[], tradition: Tradition) {
  const map = new Map(list.map((person) => [person.slug, person]));
  if (map.size !== list.length) throw new Error(`${tradition} duplicate slugs in source`);
  if (map.size !== order.length) {
    throw new Error(`${tradition} count ${map.size} vs order ${order.length}`);
  }
  return order.map((slug) => {
    const person = map.get(slug);
    if (!person) throw new Error(`${tradition} order missing ${slug}`);
    if (person.tradition !== tradition) throw new Error(`${slug} tagged ${person.tradition}`);
    return person;
  });
}

export const people: Person[] = [
  ...orderPeople([...west, ...westMore], westOrder, "west"),
  ...orderPeople([...east, ...eastMore], eastOrder, "east"),
];

function assertPeople(list: Person[]) {
  if (list.length < 60 || list.length > 90) {
    throw new Error(`roster size ${list.length} is outside 60–90`);
  }
  const slugs = new Set<string>();
  const westCount = list.filter((person) => person.tradition === "west").length;
  const eastCount = list.filter((person) => person.tradition === "east").length;
  if (westCount < 28 || eastCount < 28 || Math.abs(westCount - eastCount) > 6) {
    throw new Error(`unbalanced roster west ${westCount} east ${eastCount}`);
  }
  for (const person of list) {
    if (slugs.has(person.slug)) throw new Error(`duplicate slug ${person.slug}`);
    slugs.add(person.slug);
    if (person.ideas.length < 3 || person.ideas.length > 5) {
      throw new Error(`${person.slug} ideas ${person.ideas.length}`);
    }
    if (person.works.length < 1) throw new Error(`${person.slug} missing works`);
    if (person.quotes.length < 1) throw new Error(`${person.slug} missing quotes`);
    for (const quote of person.quotes) {
      if (!quote.source.trim()) throw new Error(`${person.slug} quote missing source`);
      if (!quote.ko.trim()) throw new Error(`${person.slug} empty quote`);
    }
    for (const film of person.films ?? []) {
      if (!film.titleKo || !film.titleEn || !film.year || !film.blurb) {
        throw new Error(`${person.slug} incomplete film`);
      }
      if (film.blurb.includes("http")) throw new Error(`${person.slug} film has a link`);
      for (const link of film.links ?? []) assertExternal(person.slug, link, "film link");
    }
    for (const link of person.elsewhere ?? []) assertExternal(person.slug, link, "elsewhere");
  }
  for (const person of list) {
    for (const slug of person.related) {
      if (!slugs.has(slug)) throw new Error(`${person.slug} related missing ${slug}`);
    }
  }
  const banned = ["진성", "로빈", "엄진성"];
  const blob = JSON.stringify(list);
  for (const word of banned) {
    if (blob.includes(word)) throw new Error(`banned name in content: ${word}`);
  }
}

function assertExternal(slug: string, link: ExternalLink, kind: string) {
  let url: URL;
  try {
    url = new URL(link.href);
  } catch {
    throw new Error(`${slug} ${kind} bad url`);
  }
  if (url.protocol !== "https:") throw new Error(`${slug} ${kind} not https`);
  if (!link.label.trim()) throw new Error(`${slug} ${kind} empty label`);
  if (sisterHosts.has(url.host) || linkCheckAllow404.has(url.host)) return;
  throw new Error(`${slug} ${kind} host not allowed: ${url.host}`);
}

assertPeople(people);

const bySlug = new Map(people.map((person) => [person.slug, person]));

export function getPerson(slug: string) {
  return bySlug.get(slug);
}

export function personCards(): PersonCard[] {
  return people.map((person) => ({
    slug: person.slug,
    nameKo: person.nameKo,
    nameEn: person.nameEn,
    nativeName: person.nativeName,
    tradition: person.tradition,
    era: person.era,
    years: person.years,
    region: person.region,
    school: person.school,
    oneLiner: person.oneLiner,
  }));
}

export function neighbors(slug: string) {
  const person = getPerson(slug);
  if (!person) return { prev: undefined, next: undefined };
  const group = people.filter((item) => item.tradition === person.tradition);
  const index = group.findIndex((item) => item.slug === slug);
  return {
    prev: index > 0 ? group[index - 1] : undefined,
    next: index < group.length - 1 ? group[index + 1] : undefined,
  };
}

export function countBy(tradition: Tradition | "all", era: Era | "all" = "all") {
  return people.filter((person) => {
    if (tradition !== "all" && person.tradition !== tradition) return false;
    if (era !== "all" && person.era !== era) return false;
    return true;
  }).length;
}

export const readingOrder: { slug: string; why: string }[] = [
  { slug: "homer", why: "철학 전에 그리스가 배운 뛰어남과 귀향" },
  { slug: "heraclitus", why: "같은 강에 두 번 들어가지 않는다는 말의 출처" },
  { slug: "socrates", why: "아는 척을 한번 의심해 보기" },
  { slug: "confucius", why: "사람 사이의 예와 인" },
  { slug: "buddha", why: "괴로움은 어디서 오는가" },
  { slug: "plato", why: "동굴 밖을 상상하기" },
  { slug: "laozi", why: "말로 다 담기지 않는 것" },
  { slug: "aristotle", why: "행복은 기분이 아니라 활동" },
  { slug: "mencius", why: "선은 싹인가, 가공인가 — 맹자" },
  { slug: "epictetus", why: "내 손에 있는 것과 없는 것" },
  { slug: "descartes", why: "의심한 뒤에 남는 한 점" },
  { slug: "zhu-xi", why: "성리학의 뼈대. 공자 그대로는 아님" },
  { slug: "kant", why: "사람을 수단으로만 쓰지 않기" },
  { slug: "mill", why: "남에게 해를 끼치지 않는 한" },
  { slug: "nietzsche", why: "옛 가치의 보증이 흔들릴 때" },
  { slug: "dogen", why: "도를 배우는 일은 자기를 배우는 일" },
  { slug: "beauvoir", why: "만들어진 역할을 되묻기" },
];
