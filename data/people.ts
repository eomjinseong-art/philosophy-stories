import { east } from "@/data/east";
import type { Era, Person, PersonCard, Tradition } from "@/data/types";
import { west } from "@/data/west";

export const people: Person[] = [...west, ...east];

function assertPeople(list: Person[]) {
  if (list.length < 25 || list.length > 35) {
    throw new Error(`roster size ${list.length} is outside 25–35`);
  }
  const slugs = new Set<string>();
  const westCount = list.filter((person) => person.tradition === "west").length;
  const eastCount = list.filter((person) => person.tradition === "east").length;
  if (westCount < 10 || eastCount < 10) {
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
    }
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
  { slug: "socrates", why: "아는 척을 한번 의심해 보기" },
  { slug: "confucius", why: "사람 사이의 예와 인" },
  { slug: "buddha", why: "괴로움은 어디서 오는가" },
  { slug: "plato", why: "동굴 밖을 상상하기" },
  { slug: "laozi", why: "말로 다 담기지 않는 것" },
  { slug: "aristotle", why: "행복은 기분이 아니라 활동" },
  { slug: "mencius", why: "선은 싹인가, 가공인가 — 맹자" },
  { slug: "epictetus", why: "내 손에 있는 것과 없는 것" },
  { slug: "descartes", why: "의심한 뒤에 남는 한 점" },
  { slug: "kant", why: "사람을 수단으로만 쓰지 않기" },
  { slug: "nietzsche", why: "옛 가치의 보증이 흔들릴 때" },
  { slug: "beauvoir", why: "만들어진 역할을 되묻기" },
];
